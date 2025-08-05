/**
 * render API
 * React 17风格的同步渲染API
 */

import type { DOMContainer } from './types';
import { createFiberRootNode } from '@fancy-react/reconciler';
import { renderRoot } from '@fancy-react/reconciler';

/**
 * 渲染React元素到DOM容器
 * @param element React元素
 * @param container DOM容器
 * @param callback 渲染完成后的回调
 */
export function render(element: any, container: DOMContainer, callback?: () => void) {
  // 创建Fiber根节点
  const root = createFiberRootNode(container, false);
  
  // 创建初始更新
  const update = {
    element,
    lane: 1, // 同步优先级
  };
  
  // 调度渲染
  root.current.updateQueue = update;
  renderRoot(root);
  
  // 执行回调
  if (callback) {
    callback();
  }
  
  return root;
} 