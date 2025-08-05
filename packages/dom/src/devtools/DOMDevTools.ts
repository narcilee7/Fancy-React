/**
 * DOM DevTools支持
 * 提供React DevTools的DOM集成
 */

// DevTools连接状态
let isDevToolsConnected = false;
let devToolsHook: any = null;

/**
 * 初始化DevTools
 */
export function initializeDevTools(): void {
  // 检查是否在浏览器环境
  if (typeof window === 'undefined') return;
  
  // 检查是否已有DevTools
  const hook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook && typeof hook.register === 'function') {
    try {
      devToolsHook = hook;
      isDevToolsConnected = true;
      
      // 注册渲染器
      devToolsHook.register({
        name: 'Fancy React DOM',
        version: '1.0.0',
        rendererPackageName: '@fancy-react/dom',
        bundleType: 1, // 开发环境
        rendererConfig: {
          bundleType: 1,
          userAgent: navigator.userAgent,
        },
      });
      
      console.log('Fancy React DevTools registered successfully');
    } catch (error) {
      console.warn('Failed to register Fancy React DevTools:', error);
      isDevToolsConnected = false;
      devToolsHook = null;
    }
  }
}

/**
 * 通知DevTools组件更新
 */
export function notifyDevToolsOfUpdate(fiberNode: any): void {
  if (!isDevToolsConnected || !devToolsHook) return;
  
  // 这里应该发送更新通知给DevTools
  // 实际实现需要更复杂的Fiber树遍历
}

/**
 * 获取DevTools状态
 */
export function getDevToolsStatus(): { connected: boolean; hook: any } {
  return {
    connected: isDevToolsConnected,
    hook: devToolsHook,
  };
}

/**
 * 清理DevTools
 */
export function cleanupDevTools(): void {
  if (devToolsHook) {
    devToolsHook.unregister();
    devToolsHook = null;
    isDevToolsConnected = false;
  }
}

// 延迟初始化，确保DevTools hook已经准备好
if (typeof window !== 'undefined') {
  // 使用setTimeout确保在DOM加载完成后初始化
  setTimeout(() => {
    initializeDevTools();
  }, 0);
} 