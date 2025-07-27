import type { FiberNode } from '../fiber/FiberNode';
import { WorkTag } from '../../../shared/src/constants/WorkTag';
import { createInstance, appendInitialChild, finalizeInitialChildren } from '../hostConfig/hostConfig';
import { bubbleProperties, markRef } from '../effects/effectTags';

export function completeWork(current: FiberNode | null, workInProgress: FiberNode): void {
  switch (workInProgress.tag) {
    case WorkTag.FunctionComponent:
      // 函数组件无宿主节点，但需要处理 hooks 相关逻辑
      // TODO: 处理 hooks 的 effect 收集
      bubbleProperties(workInProgress);
      break;
    case WorkTag.HostComponent:
      if (current === null) {
        // 首次挂载，创建 DOM
        const instance = createInstance(workInProgress.type, workInProgress.pendingProps);
        workInProgress.stateNode = instance;
        // 挂载子节点
        appendAllChildren(instance, workInProgress);
        finalizeInitialChildren(instance, workInProgress.type, workInProgress.pendingProps);
        // 处理 ref
        if (workInProgress.ref != null) {
          if (typeof workInProgress.ref === 'function') {
            workInProgress.ref(instance);
          } else if ('current' in workInProgress.ref) {
            workInProgress.ref.current = instance;
          }
          markRef(workInProgress);
        }
      } else {
        // 更新阶段，复用 DOM
        workInProgress.stateNode = current.stateNode;
        // 处理 ref
        if (workInProgress.ref != null) {
          if (typeof workInProgress.ref === 'function') {
            workInProgress.ref(workInProgress.stateNode);
          } else if ('current' in workInProgress.ref) {
            workInProgress.ref.current = workInProgress.stateNode;
          }
          markRef(workInProgress);
        }
      }
      bubbleProperties(workInProgress);
      break;
    case WorkTag.HostText:
      if (current === null) {
        // 创建文本节点
        workInProgress.stateNode = workInProgress.pendingProps.text;
      } else {
        workInProgress.stateNode = current.stateNode;
      }
      bubbleProperties(workInProgress);
      break;
    case WorkTag.Fragment:
      // Fragment 无宿主节点
      bubbleProperties(workInProgress);
      break;
    case WorkTag.ContextProvider:
      // ContextProvider 无宿主节点
      bubbleProperties(workInProgress);
      break;
    default:
      bubbleProperties(workInProgress);
      break;
  }
}

function appendAllChildren(parent: any, workInProgress: FiberNode) {
  let node = workInProgress.child;
  while (node) {
    if (node.tag === WorkTag.HostComponent || node.tag === WorkTag.HostText) {
      appendInitialChild(parent, node.stateNode);
    }
    node = node.sibling;
  }
} 