import type { Key, Ref } from '../../../shared/src/types';
import type { WorkTagType } from '../../../shared/src/constants/WorkTag';
import type { FiberFlags } from '../../../shared/src/constants/FiberFlags';

export interface FiberNode {
  /** Fiber 类型（FunctionComponent、HostComponent等） */
  tag: WorkTagType;
  /** 唯一标识用于diff */
  key: Key;
  /** 组件类型（如 div、函数组件、类组件等） */
  type: any;
  /** 真实DOM节点或类组件实例 */
  stateNode: any;

  /** 链表结构 */
  /** 父节点 */
  return: FiberNode | null;
  /** 第一个子节点 */
  child: FiberNode | null;
  /** 右侧兄弟节点 */
  sibling: FiberNode | null;
  /** 上一个兄弟节点 */
  index: number;

  /** 新的props */
  pendingProps: any;
  /** 上一次渲染的props */
  memoizedProps: any;
  /** 上一次渲染的state */
  memoizedState: any;
  /** 更新队列 */
  updateQueue: any;

  /** 副作用标记 用于标记当前fiber的副作用 */
  flags: FiberFlags;
  /** 子树副作用标记 用于标记当前fiber的子树的副作用 */
  subtreeFlags: FiberFlags;
  /** 删除的子节点集合 */
  deletions: FiberNode[] | null;

  /** ref */
  ref: Ref;

  /** 备用fiber（双缓冲） */
  alternate: FiberNode | null;
}

// FiberNode 构造函数
export function createFiberNode(
  tag: WorkTagType,
  pendingProps: any,
  key: Key
): FiberNode {
  return {
    tag,
    key,
    type: null,
    stateNode: null,
    return: null,
    child: null,
    sibling: null,
    index: 0,
    pendingProps,
    memoizedProps: null,
    memoizedState: null,
    updateQueue: null,
    flags: 0,
    subtreeFlags: 0,
    deletions: null,
    ref: null,
    alternate: null,
  };
} 