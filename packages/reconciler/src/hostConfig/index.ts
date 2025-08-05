/**
 * HostConfig入口
 * 提供reconciler与宿主环境的连接
 */

export * from './hostConfig';

// 初始化函数，用于连接DOM hostConfig
export function initializeHostConfig(hostConfig: any) {
  const { setHostConfig } = require('./hostConfig');
  setHostConfig(hostConfig);
}
