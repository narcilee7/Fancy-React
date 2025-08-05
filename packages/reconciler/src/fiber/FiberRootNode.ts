import type { FiberNode } from './FiberNode';

export interface FiberRootNode {
  /** 宿主环境的根节点（如 DOM 容器） */
  containerInfo: any;
  /** 是否正在注水 */
  isHydrate: boolean;
  /** 当前 Fiber 树的根节点 */
  current: FiberNode;
  /** 待处理的更新队列 */
  pendingLanes: any;
  /** 已完成的更新队列 */
  finishedWork: FiberNode | null;
  /** 是否正在渲染 */
  isRendering: boolean;
}

export function createFiberRoot(
  containerInfo: any, 
  isHydrate: boolean,
  rootFiber: FiberNode
): FiberRootNode {
  return {
    containerInfo,
    isHydrate,
    current: rootFiber,
    pendingLanes: null,
    finishedWork: null,
    isRendering: false,
  };
} 