import type { ReactNode } from '@fancy-react/shared';

export interface Context<T> {
  /** 类型 */
  $$typeof: symbol;
  /** 当前值 */
  _currentValue: T;
  /** 当前值2 */
  _currentValue2: T;
  /** 提供者 */
  Provider: Provider<T>;
  /** 消费者 */
  Consumer: Consumer<T>;
  /** 显示名称 */
  displayName?: string;
}

/** 提供者 */
export interface Provider<T> {
  /** 提供者函数 */
  (props: { value: T; children?: ReactNode }): any;
  /** 类型 */
  $$typeof: symbol;
}

/** 消费者 */
export interface Consumer<T> {
  /** 消费者函数 */
  (props: { children: (value: T) => ReactNode }): any;
  /** 类型 */
  $$typeof: symbol;
}

/** 上下文类型 */
export const REACT_CONTEXT_TYPE = Symbol.for('react.context');
/** 提供者类型 */
export const REACT_PROVIDER_TYPE = Symbol.for('react.provider');
/** 消费者类型 */
export const REACT_CONSUMER_TYPE = Symbol.for('react.consumer');

/**
 * 创建上下文
 * @param defaultValue 默认值
 * @returns 上下文
 */
export function createContext<T>(defaultValue: T): Context<T> {
  const context: Context<T> = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    Provider: null as any,
    Consumer: null as any,
  };

  /** 提供者 */
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
  } as any;

  /** 消费者 */
  context.Consumer = {
    $$typeof: REACT_CONSUMER_TYPE,
  } as any;

  return context;
}
