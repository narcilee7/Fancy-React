/**
 * DOM宿主环境配置
 * 实现 Reconciler 与 DOM 环境的对接
 */

// DOM事件类型映射
const DOM_EVENT_NAMES = {
  onClick: 'click',
  onDoubleClick: 'dblclick',
  onMouseDown: 'mousedown',
  onMouseUp: 'mouseup',
  onMouseMove: 'mousemove',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onKeyDown: 'keydown',
  onKeyUp: 'keyup',
  onKeyPress: 'keypress',
  onFocus: 'focus',
  onBlur: 'blur',
  onChange: 'change',
  onInput: 'input',
  onSubmit: 'submit',
  onLoad: 'load',
  onError: 'error',
} as const;

// 需要特殊处理的DOM属性
const DOM_PROPERTIES = {
  className: 'class',
  htmlFor: 'for',
  tabIndex: 'tabindex',
} as const;

// 布尔属性（不需要值的属性）
const BOOLEAN_PROPERTIES = new Set([
  'checked',
  'disabled',
  'readonly',
  'required',
  'selected',
  'multiple',
  'autofocus',
  'autoplay',
  'controls',
  'loop',
  'muted',
  'playsinline',
  'default',
  'defer',
  'ismap',
  'reversed',
  'scoped',
  'seamless',
  'async',
  'autocomplete',
  'novalidate',
  'open',
  'pubdate',
  'radiogroup',
  'spellcheck',
  'translate',
]);

/**
 * 创建DOM实例
 */
export function createInstance(type: string, props: any): HTMLElement | Text {
  // 处理文本节点
  if (type === '#text') {
    return document.createTextNode(props.children || '');
  }
  
  // 创建DOM元素
  const element = document.createElement(type);
  
  // 设置属性
  if (props) {
    setInitialProperties(element, type, props);
  }
  
  return element;
}

/**
 * 设置初始属性
 */
function setInitialProperties(element: HTMLElement, type: string, props: any) {
  for (const propName in props) {
    if (props.hasOwnProperty(propName) && propName !== 'children') {
      setProperty(element, propName, props[propName]);
    }
  }
}

/**
 * 设置DOM属性
 */
function setProperty(element: HTMLElement, propName: string, value: any) {
  // 处理事件
  if (propName.startsWith('on') && propName in DOM_EVENT_NAMES) {
    const eventName = DOM_EVENT_NAMES[propName as keyof typeof DOM_EVENT_NAMES];
    if (typeof value === 'function') {
      element.addEventListener(eventName, value);
    }
    return;
  }
  
  // 处理ref
  if (propName === 'ref') {
    if (typeof value === 'function') {
      // 函数ref
      value(element);
    } else if (value && typeof value === 'object' && 'current' in value) {
      // 对象ref
      value.current = element;
    }
    return;
  }
  
  // 处理style
  if (propName === 'style' && typeof value === 'object') {
    Object.assign(element.style, value);
    return;
  }
  
  // 处理className
  if (propName === 'className') {
    element.className = value || '';
    return;
  }
  
  // 处理布尔属性
  if (BOOLEAN_PROPERTIES.has(propName)) {
    if (value) {
      element.setAttribute(propName, '');
    } else {
      element.removeAttribute(propName);
    }
    return;
  }
  
  // 处理其他属性
  if (propName in DOM_PROPERTIES) {
    const domPropName = DOM_PROPERTIES[propName as keyof typeof DOM_PROPERTIES];
    element.setAttribute(domPropName, value);
  } else if (propName.startsWith('data-') || propName.startsWith('aria-')) {
    element.setAttribute(propName, value);
  } else {
    try {
      (element as any)[propName] = value;
    } catch {
      element.setAttribute(propName, value);
    }
  }
}

/**
 * 挂载子节点到父节点
 */
export function appendInitialChild(parent: HTMLElement | Text, child: HTMLElement | Text): void {
  if (parent instanceof window.Text) {
    throw new Error('Cannot append child to text node');
  }
  parent.appendChild(child);
}

/**
 * 完成节点初始化
 */
export function finalizeInitialChildren(instance: HTMLElement, type: string, props: any): boolean {
  // 处理自动聚焦
  if (props.autoFocus && instance.focus) {
    instance.focus();
    return true;
  }
  
  // 处理表单控件的初始值
  if (type === 'input' || type === 'textarea') {
    if (props.defaultValue !== undefined) {
      (instance as HTMLInputElement | HTMLTextAreaElement).defaultValue = props.defaultValue;
    }
  }
  else if (type === 'select') {
    if (props.defaultValue !== undefined) {
      (instance as HTMLSelectElement).value = props.defaultValue;
    }
  }
  
  return false;
}

/**
 * 更新节点属性
 */
export function updateInstance(instance: HTMLElement, oldProps: any, newProps: any) {
  // 移除旧的事件监听器
  for (const propName in oldProps) {
    if (propName.startsWith('on') && propName in DOM_EVENT_NAMES) {
      const eventName = DOM_EVENT_NAMES[propName as keyof typeof DOM_EVENT_NAMES];
      const oldHandler = oldProps[propName];
      if (typeof oldHandler === 'function') {
        instance.removeEventListener(eventName, oldHandler);
      }
    }
  }
  
  // 设置新属性
  for (const propName in newProps) {
    if (propName !== 'children') {
      const oldValue = oldProps?.[propName];
      const newValue = newProps[propName];
      
      if (oldValue !== newValue) {
        setProperty(instance, propName, newValue);
      }
    }
  }
  
  // 移除不再存在的属性
  for (const propName in oldProps) {
    if (!(propName in newProps) && propName !== 'children') {
      removeProperty(instance, propName);
    }
  }
}

/**
 * 移除DOM属性
 */
function removeProperty(element: HTMLElement, propName: string) {
  // 移除事件监听器
  if (propName.startsWith('on') && propName in DOM_EVENT_NAMES) {
    const eventName = DOM_EVENT_NAMES[propName as keyof typeof DOM_EVENT_NAMES];
    // 注意：这里无法移除具体的监听器，因为我们需要保存引用
    // TODO: 在实际实现中，应该维护一个事件监听器映射表
    return;
  }
  
  // 移除ref
  if (propName === 'ref') {
    return;
  }
  
  // 移除style
  if (propName === 'style') {
    element.removeAttribute('style');
    return;
  }
  
  // 移除className
  if (propName === 'className') {
    element.className = '';
    return;
  }
  
  // 移除布尔属性
  if (BOOLEAN_PROPERTIES.has(propName)) {
    element.removeAttribute(propName);
    return;
  }
  
  // 移除其他属性
  if (propName in DOM_PROPERTIES) {
    const domPropName = DOM_PROPERTIES[propName as keyof typeof DOM_PROPERTIES];
    element.removeAttribute(domPropName);
  } else if (propName.startsWith('data-') || propName.startsWith('aria-')) {
    element.removeAttribute(propName);
  } else {
    try {
      delete (element as any)[propName];
    } catch {
      element.removeAttribute(propName);
    }
  }
}

/**
 * 从父节点移除子节点
 */
export function removeChild(parent: HTMLElement | Text, child: HTMLElement | Text): void {
  if (parent instanceof window.Text) {
    throw new Error('Cannot remove child from text node');
  }
  parent.removeChild(child);
}

/**
 * 插入子节点到指定位置
 */
export function insertInContainerBefore(container: HTMLElement, child: HTMLElement | Text, beforeChild: HTMLElement | Text): void {
  container.insertBefore(child, beforeChild);
}

/**
 * 获取父节点
 */
export function getParentInstance(instance: HTMLElement | Text): HTMLElement | null {
  return instance.parentElement;
}

/**
 * 获取子节点
 */
export function getChildInstance(instance: HTMLElement | Text): HTMLElement | Text | null {
  if (instance instanceof window.Text) {
    return null;
  }
  return instance.firstChild as HTMLElement | Text | null;
}

/**
 * 获取下一个兄弟节点
 */
export function getNextSiblingInstance(instance: HTMLElement | Text): HTMLElement | Text | null {
  return instance.nextSibling as HTMLElement | Text | null;
}

/**
 * 准备更新
 */
export function prepareUpdate(instance: HTMLElement, type: string, oldProps: any, newProps: any): any {
  // 返回需要更新的属性差异
  const updatePayload: any = {};

  for (const propName in newProps) {
    if (propName !== 'children' && oldProps[propName] !== newProps[propName]) {
      updatePayload[propName] = newProps[propName];
    }
  }

  for (const propName in oldProps) {
    if (!(propName in newProps) && propName !== 'children') {
      // 标记删除
      updatePayload[propName] = null;
    }
  }

  return Object.keys(updatePayload).length > 0 ? updatePayload : null;
}

/**
 * 提交更新
 */
export function commitUpdate(instance: HTMLElement, updatePayload: any, type: string, oldProps: any, newProps: any): void {
  // 提交更新
  for (const propName in updatePayload) {
    const value = updatePayload[propName];
    if (value === null) {
      removeProperty(instance, propName);
    } else {
      setProperty(instance, propName, value);
    }
  }
} 