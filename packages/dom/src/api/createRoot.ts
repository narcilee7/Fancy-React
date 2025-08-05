/**
 * createRoot API
 * 创建React 18风格的并发根节点
 */

import type { DOMContainer, ReactRoot } from './types';
import { createFiberRoot } from '@fancy-react/reconciler';
import { renderRoot } from '@fancy-react/reconciler';

/**
 * 创建React根节点
 * @param container DOM容器
 * @param options 渲染选项
 * @returns ReactRoot实例
 */
export function createRoot(container: DOMContainer, options?: { hydrate?: boolean }): ReactRoot {
  // 创建Fiber根节点
  const root = createFiberRoot(container, options?.hydrate || false);
  
  // 创建ReactRoot对象
  const reactRoot: ReactRoot = {
    render(children: any) {
      // 创建更新
      const update = {
        element: children,
        lane: 1, // 默认优先级
      };
      
      // 调度更新
      root.current.updateQueue = update;
      renderRoot(root);
    },
    
    unmount() {
      // 创建卸载更新
      const update = {
        element: null,
        lane: 1,
      };
      
      root.current.updateQueue = update;
      renderRoot(root);
    }
  };
  
  return reactRoot;
} 