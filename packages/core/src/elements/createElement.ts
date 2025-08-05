import type { ReactElement, ReactNode, Key, Ref } from '../types/ReactElement';

interface ElementConfig {
  type: any;
  key?: Key;
  ref?: Ref;
  props: any;
}

/**
 * 创建React元素
 * @param type 元素类型（函数组件、类组件、DOM标签）
 * @param config 配置对象（包含key、ref、props等）
 * @param children 子元素
 * @returns ReactElement
 */
function createElement(
  type: any,
  config: any,
  ...children: ReactNode[]
): ReactElement {
  let key: Key = null;
  let ref: Ref = null;
  const props: any = {};

  // 处理config为null或undefined的情况
  if (config != null) {
    if (config.key !== undefined) {
      key = config.key;
    }
    if (config.ref !== undefined) {
      ref = config.ref;
    }

    for (const propName in config) {
      if (config.hasOwnProperty(propName) && propName !== 'key' && propName !== 'ref') {
        props[propName] = config[propName];
      }
    }
  }

  // 处理children
  if (children.length === 1) {
    props.children = children[0];
  } else if (children.length > 1) {
    props.children = children;
  }

  return {
    $$typeof: Symbol.for('react.element'),
    type,
    key,
    ref,
    props,
  };
}

/**
 * 创建Fragment元素
 */
function createFragment(children: ReactNode[]): ReactElement {
  return createElement(
    Fragment, // 使用Fragment符号作为类型
    null,
    ...children
  )
}

// 导出Fragment
const Fragment = Symbol.for('react.fragment');

export {
  // Function
  createElement,
  createFragment,
  // Symbol
  Fragment,
}

export type {
  ElementConfig,
}