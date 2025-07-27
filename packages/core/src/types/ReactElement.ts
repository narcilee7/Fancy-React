// ReactElement 类型定义
export interface ReactElement {
  type: any;
  props: Record<string, any>;
  key: null | string;
  ref: any;
  // 可扩展：标记为 React 元素
  $$typeof?: symbol | string;
}

