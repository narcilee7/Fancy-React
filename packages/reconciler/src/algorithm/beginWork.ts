import type { FiberNode } from '../fiber/FiberNode';
import { WorkTag } from '../../../shared/src/constants/WorkTag';
import { reconcileChildren } from './reconcileChildren';
import { ReactCurrentDispatcher, mountDispatcher, updateDispatcher } from '../hooks';
import { prepareHooks } from '../hooks/useState';
import { REACT_PROVIDER_TYPE, REACT_CONSUMER_TYPE } from '../context/ReactContext';

export function beginWork(current: FiberNode | null, workInProgress: FiberNode): FiberNode | null {
  switch (workInProgress.tag) {
    case WorkTag.FunctionComponent:
      // 更新函数组件
      return updateFunctionComponent(current, workInProgress);
    case WorkTag.HostComponent:
      // 更新宿主组件
      return updateHostComponent(current, workInProgress);
    case WorkTag.Fragment:
      // 更新片段
      return updateFragment(current, workInProgress);
    case WorkTag.HostText:
      // 文本节点无子节点
      return null;
    case WorkTag.ContextProvider:
      // 更新上下文提供者
      return updateContextProvider(current, workInProgress);
    case WorkTag.ContextConsumer:
      // 更新上下文消费者
      return updateContextConsumer(current, workInProgress);
    default:
      return null;
  }
}

/**
 * 更新函数组件
 * @param current 当前 fiber 节点
 * @param workInProgress 工作中的 fiber 节点
 * @returns 更新后的 fiber 节点
 */
function updateFunctionComponent(current: FiberNode | null, workInProgress: FiberNode): FiberNode | null {
  // 准备 hooks 环境
  const isMount = current === null;
  prepareHooks(workInProgress, isMount);
  
  // 设置 dispatcher
  ReactCurrentDispatcher.current = isMount ? mountDispatcher : updateDispatcher;
  
  // 执行函数组件，收集 hooks
  const children = workInProgress.pendingProps?.children;
  if (typeof workInProgress.type === 'function') {
    const result = workInProgress.type(workInProgress.pendingProps);
    workInProgress.pendingProps = { ...workInProgress.pendingProps, children: result };
  }
  
  // 清理 dispatcher
  ReactCurrentDispatcher.current = null;
  
  // diff 子节点
  reconcileChildren(workInProgress, current?.child ?? null, workInProgress.pendingProps.children);
  return workInProgress.child;
}

function updateHostComponent(current: FiberNode | null, workInProgress: FiberNode): FiberNode | null {
  const children = workInProgress.pendingProps?.children;
  reconcileChildren(workInProgress, current?.child ?? null, children);
  return workInProgress.child;
}

function updateFragment(current: FiberNode | null, workInProgress: FiberNode): FiberNode | null {
  const children = workInProgress.pendingProps?.children;
  reconcileChildren(workInProgress, current?.child ?? null, children);
  return workInProgress.child;
}

function updateContextProvider(current: FiberNode | null, workInProgress: FiberNode): FiberNode | null {
  const context = workInProgress.type;
  const newValue = workInProgress.pendingProps.value;
  
  // 更新 context 值
  context._currentValue = newValue;
  context._currentValue2 = newValue;
  
  const children = workInProgress.pendingProps.children;
  reconcileChildren(workInProgress, current?.child ?? null, children);
  return workInProgress.child;
}

function updateContextConsumer(current: FiberNode | null, workInProgress: FiberNode): FiberNode | null {
  const context = workInProgress.type;
  const newValue = context._currentValue;
  
  // 执行 children 函数，传入 context 值
  const children = workInProgress.pendingProps.children;
  const result = children(newValue);
  
  reconcileChildren(workInProgress, current?.child ?? null, result);
  return workInProgress.child;
} 