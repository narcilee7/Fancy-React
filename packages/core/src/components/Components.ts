import type { ReactElement, ReactNode } from '../types/ReactElement';

// 函数组件类型
export interface FunctionComponent<P = any> {
  (props: P): ReactElement | ReactNode;
  displayName?: string;
}

// 类组件类型
// export interface ComponentClass<P = any, S = any> {
//   new (props: P): Component<P, S>;
//   displayName?: string;
// }
export interface ClassComponent<P = any, S = any> {
  new (props: P): Component<P, S>;
  displayName?: string;
}

// 组件基类
export abstract class Component<P = any, S = any> {
  props: P;
  state: S;
  refs: Record<string, any> = {};

  constructor(props: P) {
    this.props = props;
    this.state = {} as S;
  }

  // 抽象方法，子类必须实现
  abstract render(): ReactElement | ReactNode;

  // 生命周期方法
  componentDidMount?(): void;
  componentDidUpdate?(prevProps: P, prevState: S): void;
  componentWillUnmount?(): void;
  shouldComponentUpdate?(nextProps: P, nextState: S): boolean;



  forceUpdate(callback?: () => void): void {
    if (callback) {
      // TODO: 强制重新渲染
      callback();
    }
  }

  // setState方法
  setState(
    partialState: Partial<S> | ((state: S, props: P) => Partial<S>),
    callback?: () => void
  ): void {
    // TODO: 与reconciler集成
    const newState = typeof partialState === 'function'
      ? partialState(this.state, this.props)
      : partialState;
    this.state = { ...this.state, ...newState };
    // 强制刷新调用callback，在state更新后调用
    this.forceUpdate(callback);
  }

}

// 判断是否为函数组件
export function isFunctionComponent(type: any): type is FunctionComponent {
  // 沿着原型链向上查找，直到找到原型链的顶端
  return typeof type === 'function' && !(type.prototype && type.prototype.isReactComponent);
}

// 判断是否为类组件
export function isClassComponent(type: any): type is ClassComponent {
  return typeof type === 'function' && type.prototype && (type.prototype as any).isReactComponent;
}

// 标记类组件
(Component.prototype as any).isReactComponent = true;