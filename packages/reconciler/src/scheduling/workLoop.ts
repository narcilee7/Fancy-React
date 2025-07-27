import type { FiberNode } from '../fiber/FiberNode';
import { beginWork } from '../algorithm/beginWork';
import { completeWork } from '../algorithm/completeWork';
import { scheduleCallback, shouldYieldToHost, getCurrentPriorityLevel } from './scheduler';
import { NormalPriority } from '../../../shared/src/constants/SchedulerPriority';

// 当前正在执行的工作 fiberNode
let workInProgress: FiberNode | null = null;
// 是否正在执行工作
let isPerformingWork = false;

export function scheduleWork(root: FiberNode) {
  if (isPerformingWork) {
    // 如果正在执行工作，调度异步任务
    scheduleCallback(NormalPriority, () => {
      workInProgress = root;
      workLoop();
    });
  } else {
    workInProgress = root;
    workLoop();
  }
}

function workLoop() {
  // 标志正在执行工作
  isPerformingWork = true;
  try {
    while (workInProgress !== null && !shouldYieldToHost()) {
      // 如果当前工作未完成且没有让出控制权，则继续执行工作
      performUnitOfWork(workInProgress);
    }
  } finally {
    isPerformingWork = false;
  }
  
  // 如果还有工作未完成，继续调度
  if (workInProgress !== null) {
    scheduleCallback(getCurrentPriorityLevel(), workLoop);
  }
}

/**
 * 执行工作单元
 * @param unit 工作单元
 */
function performUnitOfWork(unit: FiberNode) {
  // 执行工作单元
  const next = beginWork(null, unit);
  unit.memoizedProps = unit.pendingProps;
  if (next !== null) {
    workInProgress = next;
  } else {
    completeUnitOfWork(unit);
  }
}

/**
 * 完成工作单元
 * @param unit 工作单元
 */
function completeUnitOfWork(unit: FiberNode) {
  let node: FiberNode | null = unit;
  while (node !== null) {
    completeWork(null, node);
    const sibling = node.sibling;
    // 如果存在兄弟节点，则继续执行兄弟节点
    if (sibling !== null) {
      workInProgress = sibling;
      return;
    }
    // 如果不存在兄弟节点，则继续执行父节点
    node = node.return
    workInProgress = node;
  }
} 