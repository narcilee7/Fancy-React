/**
 * hydrate API
 * 服务端渲染的客户端注水API
 */

import type { DOMContainer } from './types';
import { createFiberRoot } from '@fancy-react/reconciler';
import { renderRoot } from '@fancy-react/reconciler';

/**
 * 注水React元素到已有的DOM容器
 * @param element React元素
 * @param container DOM容器
 * @param callback 注水完成后的回调
 */
export function hydrate(element: any, container: DOMContainer, callback?: () => void) {
  // 创建Fiber根节点，启用注水模式
  const root = createFiberRoot(container, true);
  
  // 创建初始更新
  const update = {
    element,
    lane: 1, // 同步优先级
  };
  
  // 调度注水
  root.current.updateQueue = update;
  renderRoot(root);
  
  // 执行回调
  if (callback) {
    callback();
  }
  
  return root;
}
