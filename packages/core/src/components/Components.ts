import { ReactNode } from "../types/ReactElement";


export interface ComponentLifecycle<P, S> {
  componentDidMount?(): void;
  shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
  componentWillUnmount?(): void;
  componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: any): void;
  getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): any;
  componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
  getDerivedStateFromError?(error: Error): any;
  getDerivedStateFromProps?(props: any, state: any): any;
}

export interface ErrorInfo {
  componentStack: string;
}

export abstract class Component<P = {}, S = {}> implements ComponentLifecycle<P, S> {
  static contextType?: any;
  static defaultProps?: any;
  static displayName?: string;

  public readonly props: Readonly<P> & Readonly<{ children?: ReactNode }>;
  public state: Readonly<S>;
  public context: any;
  public refs: { [key: string]: any } = {};

  // 内部使用
  public _reactInternals: any = null;
  public _reactInternalInstance: any = {};

  constructor(props: P, context?: any) {
    this.props = props;
    this.state = {} as S;
    this.context = context;
  }

  public setState<K extends keyof S>(
    partialState: ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null) | (Pick<S, K> | S | null),
    callback?: () => void,
  ): void {
    if (typeof partialState !== 'object' && typeof partialState !== 'function') {
      throw new Error('setState(...): takes an object of state variables to update or a function which returns an object of state variables.');
    }

    // TODO 这里需要与 reconciler 交互来安排更新
    // 现在先做一个简单的实现
    this.enqueueSetState(partialState, callback);
  }

  /**
   * 强制更新组件
   */
  public forceUpdate(callback?: () => void): void {
    // 这里需要与 reconciler 交互来强制更新
    this.enqueueForceUpdate(callback);
  }

  /**
   * 渲染方法 - 子类必须实现
   */
  public abstract render(): ReactNode;

    // 内部方法，将由 reconciler 实现
  private enqueueSetState(partialState: any, callback?: () => void): void {
    // TODO: 实现状态更新队列
    console.warn('setState not implemented yet - needs reconciler');
  }

  private enqueueForceUpdate(callback?: () => void): void {
    // TODO: 实现强制更新
    console.warn('forceUpdate not implemented yet - needs reconciler');
  }
}