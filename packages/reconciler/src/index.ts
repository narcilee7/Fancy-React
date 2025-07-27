export * from './fiber';
export * from './algorithm';
export * from './hostConfig';
export * from './scheduling';
export * from './hooks';
export * from './context';
export * from './effects';
import { scheduleWork } from './scheduling';
import { commitRoot } from './scheduling';

// 主流程入口：渲染 Fiber 树
export function renderRoot(root: any) {
  // 以 root.current 作为 Fiber 树入口
  scheduleWork(root.current);
  commitRoot(root.current);
}

// 调度入口：触发 Fiber 更新
export function scheduleUpdateOnFiber(fiber: any) {
  // 以 fiber 为入口调度
  scheduleWork(fiber);
}

/**
 * Reconciler 协调器负责将虚拟DOM(ReactElement)转换为Fiber Tree，递归diff、调度、收集副作用，并驱动commit阶段完成宿主环境的实际操作
 * 
 * Fiber架构：以FiberNode为核心，支持双缓冲树、可中断、优先级调度、异步渲染、并发渲染等能力
 */

