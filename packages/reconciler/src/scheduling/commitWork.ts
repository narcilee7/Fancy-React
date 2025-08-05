import type { FiberNode } from '../fiber/FiberNode';
import { Placement, Update, Deletion } from '@fancy-react/shared';
import { createInstance, appendInitialChild, updateInstance, removeChild } from '../hostConfig/hostConfig';

/**
 * 提交 Fiber 树的副作用
 * 在 commit 阶段执行所有收集到的副作用
 * @param root Fiber 根节点
 */
export function commitRoot(root: FiberNode) {
  // 遍历 Fiber 树，处理副作用
  commitWork(root.child);
}

/**
 * 递归处理 Fiber 节点的副作用
 * 按照深度优先的顺序处理：当前节点 -> 子节点 -> 兄弟节点
 * @param fiber 当前 Fiber 节点
 */
function commitWork(fiber: FiberNode | null) {
  if (fiber === null) return;

  // 处理当前节点副作用
  const flags = fiber.flags;
  if (flags & Placement) {
    // 处理节点插入副作用
    commitPlacement(fiber);
  }
  if (flags & Update) {
    // 处理节点更新副作用
    commitUpdate(fiber);
  }
  if (flags & Deletion) {
    // 处理节点删除副作用
    commitDeletion(fiber);
  }

  // 处理 hooks effects
  if (fiber.tag === 0) { // FunctionComponent
    commitHooksEffects(fiber);
  }

  // 递归处理子节点
  commitWork(fiber.child);
  // 递归处理兄弟节点
  commitWork(fiber.sibling);
}

/**
 * 执行 hooks 的副作用
 * 包括 useEffect、useLayoutEffect 等
 * @param fiber 函数组件 Fiber 节点
 * 
 * TODO: 实现完整的 effects 执行逻辑
 * 1. 清理旧的 effects（执行 destroy 函数）
 * 2. 执行新的 effects（执行 create 函数）
 * 3. 收集清理函数（用于下次更新时清理）
 * 4. 区分同步 effects（useLayoutEffect）和异步 effects（useEffect）
 */
function commitHooksEffects(fiber: FiberNode) {
  // TODO: 执行 effects
  // 1. 清理旧的 effects
  // 2. 执行新的 effects
  // 3. 收集清理函数
}

/**
 * 处理节点插入副作用
 * 创建宿主节点并挂载到父节点
 * @param fiber 待插入的 Fiber 节点
 */
function commitPlacement(fiber: FiberNode) {
  if (fiber.stateNode == null) {
    // 创建宿主节点
    fiber.stateNode = createInstance(fiber.type, fiber.pendingProps);
    // 挂载所有子节点
    let child = fiber.child;
    while (child) {
      if (child.stateNode) {
        appendInitialChild(fiber.stateNode, child.stateNode);
      }
      child = child.sibling;
    }
  }
  // TODO: 挂载到父节点
  // 需要找到父节点的宿主节点，然后调用 appendChild
}

/**
 * 处理节点更新副作用
 * 更新宿主节点的属性
 * @param fiber 待更新的 Fiber 节点
 */
function commitUpdate(fiber: FiberNode) {
  if (fiber.stateNode) {
    updateInstance(fiber.stateNode, fiber.memoizedProps, fiber.pendingProps);
  }
}

/**
 * 处理节点删除副作用
 * 递归卸载子节点并从父节点移除
 * @param fiber 待删除的 Fiber 节点
 */
function commitDeletion(fiber: FiberNode) {
  // 递归卸载子节点
  let node = fiber;
  while (node) {
    if (node.stateNode && node.return && node.return.stateNode && (node.tag === 4 || node.tag === 5)) {
      removeChild(node.return.stateNode, node.stateNode);
    }
    if (node.child) {
      node = node.child;
    }
    // TODO: 逻辑完善
  }
} 