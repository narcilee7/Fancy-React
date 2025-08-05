import type { FiberNode } from '../fiber/FiberNode';
import { createFiberNode } from '../fiber/FiberNode';
import { WorkTag } from '@fancy-react/shared';
import type { ReactElement, Key } from '@fancy-react/shared';

function isReactElement(child: any): child is ReactElement {
  return typeof child === 'object' && child !== null && (child as ReactElement).type;
}

export function reconcileChildren(
  returnFiber: FiberNode,
  currentFirstChild: FiberNode | null,
  newChild: any
) {
  // 处理 children 为数组
  if (Array.isArray(newChild)) {
    let prevFiber: FiberNode | null = null;
    let oldFiber = currentFirstChild;
    const existingKeyed: Record<string | number, FiberNode> = {};
    // 先建立 key->oldFiber 映射
    while (oldFiber) {
      if (oldFiber.key != null) {
        existingKeyed[oldFiber.key] = oldFiber;
      }
      oldFiber = oldFiber.sibling;
    }
    for (let i = 0; i < newChild.length; i++) {
      const child = newChild[i];
      let fiber: FiberNode | null = null;
      if (isReactElement(child)) {
        // key diff
        if (child.key != null && existingKeyed[child.key]) {
          fiber = existingKeyed[child.key] as FiberNode;
          fiber.pendingProps = child.props;
          fiber.type = child.type;
          fiber.return = returnFiber;
        } else {
          fiber = createFiberNode(WorkTag.HostComponent, child.props, child.key as Key);
          fiber.type = child.type;
          fiber.return = returnFiber;
        }
      } else if (typeof child === 'string' || typeof child === 'number') {
        fiber = createFiberNode(WorkTag.HostText, { text: child }, null);
        fiber.return = returnFiber;
      }
      if (fiber) {
        fiber.index = i;
        if (prevFiber) {
          prevFiber.sibling = fiber;
        } else {
          returnFiber.child = fiber;
        }
        prevFiber = fiber;
      }
    }
    return;
  }
  // 处理单个 ReactElement
  if (isReactElement(newChild)) {
    const element = newChild as ReactElement;
    const fiber = createFiberNode(WorkTag.HostComponent, element.props, element.key as Key);
    fiber.type = element.type;
    fiber.return = returnFiber;
    returnFiber.child = fiber;
    return;
  }
  // 处理文本节点
  if (typeof newChild === 'string' || typeof newChild === 'number') {
    const fiber = createFiberNode(WorkTag.HostText, { text: newChild }, null);
    fiber.return = returnFiber;
    returnFiber.child = fiber;
    return;
  }
  // TODO: 支持 Fragment、删除多余旧节点等
}
