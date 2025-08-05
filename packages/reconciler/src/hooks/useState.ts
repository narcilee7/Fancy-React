import type { Hook } from './hookTypes';
// import { ReactCurrentDispatcher } from './ReactCurrentDispatcher';
import { createUpdate, enqueueUpdate, createUpdateQueue, processUpdateQueue } from '../fiber/updateQueue';
import { scheduleUpdateOnFiber } from '../index';

let currentlyRenderingFiber: any = null;
let workInProgressHook: Hook | null = null;
let isMount = true;

function mountWorkInProgressHook(): Hook {
  const hook: Hook = {
    memoizedState: null,
    updateQueue: null,
    next: null,
  };
  if (!currentlyRenderingFiber.memorizedState) {
    currentlyRenderingFiber.memorizedState = hook;
  } else {
    let last = currentlyRenderingFiber.memorizedState;
    while (last.next) last = last.next;
    last.next = hook;
  }
  workInProgressHook = hook;
  return hook;
}

function updateWorkInProgressHook(): Hook {
  let nextCurrentHook: Hook;
  if (!workInProgressHook) {
    nextCurrentHook = currentlyRenderingFiber.memorizedState;
  } else {
    // TODO: 这里需要优化，尽量减少类型断言, 从根本上解决问题
    nextCurrentHook = workInProgressHook.next as Hook;
  }
  workInProgressHook = nextCurrentHook;
  return workInProgressHook!;
}

export function mountState<S>(initialState: S | (() => S)) {
  const hook = mountWorkInProgressHook();
  hook.memoizedState = typeof initialState === 'function' ? (initialState as Function)() : initialState;
  hook.updateQueue = createUpdateQueue();
  const dispatch = (action: S | ((prev: S) => S)) => {
    const update = createUpdate(action);
    enqueueUpdate(hook.updateQueue, update);
    scheduleUpdateOnFiber(currentlyRenderingFiber);
  };
  return [hook.memoizedState, dispatch] as const;
}

export function updateState<S>(initialState?: S) {
  const hook = updateWorkInProgressHook();
  const queue = hook.updateQueue;
  const pending = queue.shared.pending;
  if (pending) {
    hook.memoizedState = processUpdateQueue(hook.memoizedState, queue);
  }
  const dispatch = (action: S | ((prev: S) => S)) => {
    const update = createUpdate(action);
    enqueueUpdate(queue, update);
    scheduleUpdateOnFiber(currentlyRenderingFiber);
  };
  return [hook.memoizedState, dispatch] as const;
}

export function prepareHooks(fiber: any, mount: boolean) {
  currentlyRenderingFiber = fiber;
  workInProgressHook = null;
  isMount = mount;
} 