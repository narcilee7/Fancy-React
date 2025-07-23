import { ComponentType, ReactElement, ReactNode, Ref } from "../types/ReactElement"
import { REACT_ELEMENT_TYPE } from '@fancy-react/shared'
import { isObject, hasOwnProperty } from '@fancy-react/shared'

const RESERVED_PROPS = {
  // key作为React元素的唯一标识符
  key: true,
  // ref用于获取对组件实例的引用
  ref: true,
  // __self和__source用于调试信息
  __self: true,
  __source: true,
}

/**
 * 创建React元素
 */
export function createElement<P extends {}>(
  type: string | ComponentType<P>,
  config: (P & { key?: string | number; ref?: Ref<any> }) | null,
  ...children: ReactNode[]
): ReactElement<P> {
  let propName: string
  const props: any = {}
  let key: string | number | null = null
  let ref: Ref<any> | null = null

  // 处理 config 对象中的属性
  if (config != null) {
    // 提取ref
    if (config.ref !== undefined) {
      ref = config.ref
    }

    // 提取key
    if (config.key !== undefined) {
      key = '' + config.key
    }

    // 将config中的属性复制到props中
    for (const propName in config) {
      if (
        hasOwnProperty(config, propName) &&
        !REACT_ELEMENT_TYPE.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName]
      }
    }

    // 处理children
    const childrenLength = children.length

    if (childrenLength === 1) {
      props.children = children[0]
    } else if (childrenLength > 1) {
      props.children = children
    }

    // 处理默认props
    if (type && (type as any).defaultProps) {
      const defaultProps = (type as any).defaultProps
      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName]
        }
      }
    }

    return ReactElement(type, key, ref, props)
  }
}

function ReactElement<P> (
  type: any,
  key: string | number | null,
  ref: Ref<any> | null,
  props: P
): ReactElement<P> {
  const element: ReactElement<P> = {
    type,
    props,
    key,
    ref,
    _owner: null, // 这里可以设置为当前组件的实例
    _store: {
      validated: false, // 用于标记是否经过验证
    },
    $$typeof: REACT_ELEMENT_TYPE, // 标识这是一个React元素
  }

  // 如果type是一个函数组件，设置_owner为null
  if (typeof type === 'function') {
    element._owner = null
  }

  return element
}

export function isValidElement(object: any): object is ReactElement {
  return (
    isObject(object) &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}