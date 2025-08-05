/**
 * DOM渲染器入口
 * 提供React DOM渲染的核心API
 */

// 导出hostConfig
export * from './hostConfig/hostConfig';

// 导出DOM特定的API
export { createRoot } from './api/createRoot';
export { render } from './api/render';
export { hydrate } from './api/hydrate';

// 导出DOM相关的类型
export type { DOMContainer } from './api/types';

// 导出事件系统
export * from './events/DOMEventSystem';

// 导出SSR相关
export * from './ssr/serverRenderer';

// 导出DevTools相关
export * from './devtools/DOMDevTools';
