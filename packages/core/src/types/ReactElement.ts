// import { REACT_ELEMENT_TYPE } from '@fancy-react/shared'

// export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
//   type: T;
//   props: P;
//   key: string | number | null;
//   ref: Ref<any> | null;
//   _owner: ReactElement | null;
//   _store: {
//     validated: boolean;
//   };
//   $$typeof: typeof REACT_ELEMENT_TYPE;
// }

// export type JSXElementConstructor<P> = 
//   | ((props: P) => ReactElement<any, any> | null)
//   | (new (props: P) => Component<any, any>);

// export interface Component<P = {}, S = {}> {
//   props: Readonly<P>;
//   state: Readonly<S>;
//   setState(
//     partialState: Partial<S> | ((prevState: Readonly<S>, props: Readonly<P>) => Partial<S>),
//     callback?: () => void,
//   ): void;
//   forceUpdate(callback?: () => void): void;
//   render(): ReactElement | null;
// };

// export type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;

// export interface ComponentClass<P = {}> {
//   new (props: P, context?: any): Component<P, any>;
//   displayName?: string;
//   defaultProps?: Partial<P>;
//   contextType?: Context<any>;
// }

// export interface FunctionComponent<P = {}> {
//   (props: P, context?: any): ReactElement<any, any> | null;
//   displayName?: string;
//   defaultProps?: Partial<P>;
//   contextTypes?: any;
// }

// export type Ref<T> = 
//   | { current: T | null }
//   | ((instance: T | null) => void)
//   | null;

//   export interface Context<T> {
//   Provider: ComponentType<{ value: T; children?: ReactNode }>;
//   Consumer: ComponentType<{ children: (value: T) => ReactNode }>;
//   displayName?: string;
//   _calculateChangedBits?: (a: T, b: T) => number;
//   _currentValue: T;
//   _currentValue2: T;
//   _threadCount: number;
// }

// export type ReactNode = 
//   | ReactElement
//   | string
//   | number
//   | boolean
//   | null
//   | undefined
//   | ReactNode[];

import { REACT_ELEMENT_TYPE } from '@fancy-react/shared/dist'

// React key类型
export type Key = string | number | null | undefined

