import type { ReactElement } from '../types/ReactElement';

// 唯一标识 React 元素类型
export const REACT_ELEMENT_TYPE = Symbol.for('fancy.react.element');

export function createElement(
  type: any,
  config: Record<string, any> | null,
  ...children: any[]
): ReactElement {
  const props: Record<string, any> = {};
  let key: string | null = null;
  let ref: any = null;

  if (config != null) {
    if (config.key !== undefined) {
      key = '' + config.key;
    }
    if (config.ref !== undefined) {
      ref = config.ref;
    }
    // 其余属性归入 props
    for (const prop in config) {
      if (prop !== 'key' && prop !== 'ref' && Object.prototype.hasOwnProperty.call(config, prop)) {
        props[prop] = config[prop];
      }
    }
  }

  // 处理 children
  if (children.length === 1) {
    props.children = children[0];
  } else if (children.length > 1) {
    props.children = children;
  }

  return {
    type,
    props,
    key,
    ref,
    $$typeof: REACT_ELEMENT_TYPE,
  };
}