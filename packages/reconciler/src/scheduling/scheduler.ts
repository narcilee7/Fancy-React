import { ImmediatePriority, UserBlockingPriority, NormalPriority, LowPriority, IdlePriority } from '@fancy-react/shared';

export interface SchedulerCallback {
  (): void;
}

export interface SchedulerTask {
  id: number;
  callback: SchedulerCallback;
  priorityLevel: number;
  startTime: number;
  expirationTime: number;
  sortIndex?: number;
}

let taskIdCounter = 1;
let isSchedulerPaused = false;
let currentTask: SchedulerTask | null = null;
let currentPriorityLevel = NormalPriority;

// 任务队列
const taskQueue: SchedulerTask[] = [];
const timerQueue: SchedulerTask[] = [];

export function scheduleCallback(
  priorityLevel: number,
  callback: SchedulerCallback,
  options?: { delay?: number }
): SchedulerTask {
  const currentTime = getCurrentTime();
  const startTime = options?.delay ? currentTime + options.delay : currentTime;
  
  let expirationTime: number;
  switch (priorityLevel) {
    // 立即执行
    case ImmediatePriority:
      expirationTime = startTime + 1;
      break;
    // 用户阻塞
    case UserBlockingPriority:
      expirationTime = startTime + 250;
      break;
    // 空闲
    case IdlePriority:
      expirationTime = startTime + 1073741823;
      break;
    // 低优先级
    case LowPriority:
      expirationTime = startTime + 10000;
      break;
    // 默认
    default:
      expirationTime = startTime + 5000;
  }

  const newTask: SchedulerTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime,
    expirationTime,
  };
  /**
   * 如果任务的开始时间大于当前时间，则将任务添加到延迟任务队列中
   * 否则将任务添加到立即任务队列中，并请求宿主回调
   */
  if (startTime > currentTime) {
    // 延迟任务
    timerQueue.push(newTask);
  } else {
    // 立即任务
    taskQueue.push(newTask);
    // 请求宿主回调
    requestHostCallback(flushWork);
  }

  return newTask;
}

/**
 * 取消任务
 * @param task 任务
 */
export function cancelCallback(task: SchedulerTask): void {
  task.callback = null as any;
}

/**
 * 获取当前优先级
 * @returns 当前优先级
 */
export function getCurrentPriorityLevel(): number {
  return currentPriorityLevel;
}

/**
 * 是否需要让出控制权给宿主
 * @returns 是否需要让出控制权给宿主
 */
export function shouldYieldToHost(): boolean {
  const timeElapsed = getCurrentTime() - startTime;
  if (timeElapsed < frameInterval) {
    return false;
  }
  return true;
}

  // 内部实现
let startTime = -1;
let frameInterval = 5;

function getCurrentTime(): number {
  return performance.now();
}

/**
 * 请求宿主回调
 * @param callback 回调函数
 */
function requestHostCallback(callback: (hasTimeRemaining: boolean, initialTime: number) => boolean) {
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback((deadline) => callback(deadline.timeRemaining() > 0, getCurrentTime()));
  } else {
    // 降级到 setTimeout
    setTimeout(() => callback(true, getCurrentTime()), 0);
  }
}

function flushWork(hasTimeRemaining: boolean, initialTime: number): boolean {
  if (startTime === -1) {
    startTime = initialTime;
  }

  let currentTime = initialTime;
  let currentTask = peek(taskQueue);

  while (currentTask !== null) {
    if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
      break;
    }

    const callback = currentTask.callback;
    if (typeof callback === 'function') {
      currentTask.callback = null as any;
      currentPriorityLevel = currentTask.priorityLevel;
      const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
      callback();
      currentTime = getCurrentTime();
    } else {
      pop(taskQueue);
    }
    currentTask = peek(taskQueue);
  }

  if (currentTask !== null) {
    return true;
  } else {
    const firstTimer = peek(timerQueue);
    if (firstTimer !== null) {
      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    }
    return false;
  }
}

function peek(queue: SchedulerTask[]): SchedulerTask | null {
  return queue.length > 0 ? queue[0] as SchedulerTask : null;
}

function pop(queue: SchedulerTask[]): SchedulerTask | null {
  return queue.shift() || null;
}

function requestHostTimeout(callback: (currentTime: number) => void, ms: number) {
  setTimeout(() => callback(getCurrentTime()), ms);
}

function handleTimeout(currentTime: number) {
  advanceTimers(currentTime);
  if (!isHostCallbackScheduled) {
    if (peek(taskQueue) !== null) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    } else {
      const firstTimer = peek(timerQueue);
      if (firstTimer !== null) {
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }
    }
  }
}

function advanceTimers(currentTime: number) {
  let timer = peek(timerQueue);
  while (timer !== null) {
    if (timer.callback === null) {
      pop(timerQueue);
    } else if (timer.startTime <= currentTime) {
      pop(timerQueue);
      timer.sortIndex = timer.expirationTime;
      taskQueue.push(timer);
    } else {
      return;
    }
    timer = peek(timerQueue);
  }
}

let isHostCallbackScheduled = false; 