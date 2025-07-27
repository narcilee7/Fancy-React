import type { FiberNode } from './FiberNode';

export function createWorkInProgress(
  current: FiberNode, 
  pendingProps: any): FiberNode {
  let workInProgress = current.alternate;
  if (workInProgress === null) {
    // 首次创建 workInProgress
    workInProgress = {
      ...current,
      pendingProps,
      memoizedProps: null,
      memoizedState: null,
      updateQueue: null,
      flags: 0,
      subtreeFlags: 0,
      deletions: null,
      alternate: current,
    };
    current.alternate = workInProgress;
  } else {
    // 复用 workInProgress
    workInProgress.pendingProps = pendingProps;
    workInProgress.flags = 0;
    workInProgress.subtreeFlags = 0;
    workInProgress.deletions = null;
  }
  return workInProgress;
}