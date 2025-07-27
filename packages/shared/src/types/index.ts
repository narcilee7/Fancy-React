// Key 类型
export type Key = string | number | null;

// Ref 类型
export type Ref<T = any> = ((instance: T | null) => void) | { current: T | null } | null;

// ReactNode 类型
export type ReactNode =
  | ReactElement
  | string
  | number
  | boolean
  | null
  | undefined
  | ReactNode[];

// ReactElement 类型（引用 core 包定义）
export interface ReactElement {
  type: any;
  props: Record<string, any>;
  key: Key;
  ref: Ref;
  $$typeof?: symbol | string;
}

// 组件类型
export type ComponentType<P = {}> = FunctionComponent<P> | ClassComponent<P>;

// 函数组件类型
export type FunctionComponent<P = {}> = (props: P) => ReactElement | null;

// 类组件类型
export interface ClassComponent<P = {}, S = {}> {
  new (props: P): {
    props: Readonly<P>;
    state: Readonly<S>;
    setState(
      partialState: Partial<S> | ((prevState: Readonly<S>, props: Readonly<P>) => Partial<S>),
      callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactElement | null;
  };
}

// JSXElementConstructor 类型
export type JSXElementConstructor<P> =
  | ((props: P) => ReactElement | null)
  | (new (props: P) => any);

// Context 类型
export interface Context<T> {
  Provider: Provider<T>;
  Consumer: Consumer<T>;
  displayName?: string;
  _currentValue?: T;
}

export interface Provider<T> {
  (props: { value: T; children?: ReactNode }): ReactElement | null;
}

export interface Consumer<T> {
  (props: { children: (value: T) => ReactNode }): ReactElement | null;
} 