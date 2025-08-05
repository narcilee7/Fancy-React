// 核心API导出
export { createElement, createFragment, Fragment } from './elements/createElement';
export { Component, isFunctionComponent, isClassComponent } from './components/Components';
export { createContext } from './context/ReactContext';

// 类型导出
export type { ReactElement, ReactNode, Key, Ref } from './types/ReactElement';
export type { FunctionComponent, ClassComponent } from './components/Components';
export type { ReactContext, ReactProviderType, ReactConsumerType } from './context/ReactContext';

// 与reconciler的集成
// export { setState } from './setState';
