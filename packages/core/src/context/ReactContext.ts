import type { ReactNode } from '../types/ReactElement';

// Context类型定义
export interface ReactContext<T> {
  $$typeof: symbol;
  // 当前值
  _currentValue: T;
  // 当前值2
  _currentValue2: T;
  // Provider组件类型
  Provider: ReactProviderType<T>;
  // Consumer组件类型
  Consumer: ReactConsumerType<T>;
  // 组件名称
  displayName?: string;
}

// Provider组件类型
export interface ReactProviderType<T> {
  $$typeof: symbol;
  _context: ReactContext<T>;
}

// Consumer组件类型
export interface ReactConsumerType<T> {
  $$typeof: symbol;
  _context: ReactContext<T>;
}

// Symbol
export const ReactContextSymbol = Symbol.for('react.context');
export const ReactProviderSymbol = Symbol.for('react.provider');
export const ReactConsumerSymbol = Symbol.for('react.context');

// 创建Context
export function createContext<T>(defaultValue: T): ReactContext<T> {
  const context = {
    $$typeof: ReactContextSymbol,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    Provider: null as any,
    Consumer: null as any,
  } as ReactContext<T>

  // 创建Provider组件
  context.Provider = {
    $$typeof: ReactProviderSymbol,
    _context: context,
  };

  // 创建Consumer组件
  context.Consumer = {
    $$typeof: ReactConsumerSymbol,
    _context: context,
  };

  return context;
}

// Provider组件实现
export function ContextProvider<T>({ value, children }: { value: T, children: ReactNode }) {
  const context = (ContextProvider as any)._context;
  context._currentValue = value;
  context._currentValue2 = value;
  return children;
}

// Consumer组件实现
export function ContextConsumer<T>({ children }: { children: (value: T) => ReactNode }) {
  const context = (ContextConsumer as any)._context;
  return children(context._currentValue);
}

// 判断是否为Context
export function isContext(type: any): type is ReactContext<any> {
  return type && type.$$typeof === ReactContextSymbol;
}

// 判断是否为Provider
export function isProvider(type: any): type is ReactProviderType<any> {
  return type && type.$$typeof === ReactProviderSymbol;
}

// 判断是否为Consumer
export function isConsumer(type: any): type is ReactConsumerType<any> {
  return type && type.$$typeof === ReactConsumerSymbol;
} 