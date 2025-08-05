/**
 * HostConfig接口
 * 定义reconciler与宿主环境的交互接口
 */

export interface HostConfig {
  createInstance(type: string, props: any): any;
  appendInitialChild(parent: any, child: any): void;
  finalizeInitialChildren(instance: any, type: string, props: any): boolean;
  updateInstance(instance: any, oldProps: any, newProps: any): void;
  removeChild(parent: any, child: any): void;
  insertInContainerBefore(container: any, child: any, beforeChild: any): void;
  getParentInstance(instance: any): any;
  getChildInstance(instance: any): any;
  getNextSiblingInstance(instance: any): any;
  prepareUpdate(instance: any, type: string, oldProps: any, newProps: any): any;
  commitUpdate(instance: any, updatePayload: any, type: string, oldProps: any, newProps: any): void;
}

// 默认的空实现
export const defaultHostConfig: HostConfig = {
  createInstance: () => ({}),
  appendInitialChild: () => {},
  finalizeInitialChildren: () => false,
  updateInstance: () => {},
  removeChild: () => {},
  insertInContainerBefore: () => {},
  getParentInstance: () => null,
  getChildInstance: () => null,
  getNextSiblingInstance: () => null,
  prepareUpdate: () => null,
  commitUpdate: () => {},
};

// 当前使用的hostConfig实例
let currentHostConfig: HostConfig = defaultHostConfig;

export function setHostConfig(config: HostConfig) {
  currentHostConfig = config;
}

export function getHostConfig(): HostConfig {
  return currentHostConfig;
}

// 导出便捷函数
export const createInstance = (type: string, props: any) => currentHostConfig.createInstance(type, props);
export const appendInitialChild = (parent: any, child: any) => currentHostConfig.appendInitialChild(parent, child);
export const finalizeInitialChildren = (instance: any, type: string, props: any) => currentHostConfig.finalizeInitialChildren(instance, type, props);
export const updateInstance = (instance: any, oldProps: any, newProps: any) => currentHostConfig.updateInstance(instance, oldProps, newProps);
export const removeChild = (parent: any, child: any) => currentHostConfig.removeChild(parent, child);
export const insertInContainerBefore = (container: any, child: any, beforeChild: any) => currentHostConfig.insertInContainerBefore(container, child, beforeChild);
export const getParentInstance = (instance: any) => currentHostConfig.getParentInstance(instance);
export const getChildInstance = (instance: any) => currentHostConfig.getChildInstance(instance);
export const getNextSiblingInstance = (instance: any) => currentHostConfig.getNextSiblingInstance(instance);
export const prepareUpdate = (instance: any, type: string, oldProps: any, newProps: any) => currentHostConfig.prepareUpdate(instance, type, oldProps, newProps);
export const commitUpdate = (instance: any, updatePayload: any, type: string, oldProps: any, newProps: any) => currentHostConfig.commitUpdate(instance, updatePayload, type, oldProps, newProps); 