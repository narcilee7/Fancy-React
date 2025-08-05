// ReactElement 类型定义
export interface ReactElement {
  type: any;
  props: Record<string, any>;
  key: Key;
  ref: Ref;
  // 可扩展：标记为 React 元素
  $$typeof?: symbol | string;
}

// 基础类型定义
export type Key = string | number | null;
export type Ref<T = any> = ((instance: T | null) => void) | { current: T | null } | null;

// React节点类型
export type ReactNode = 
  | ReactElement
  | string
  | number
  | boolean
  | null
  | undefined
  | ReactNode[];
