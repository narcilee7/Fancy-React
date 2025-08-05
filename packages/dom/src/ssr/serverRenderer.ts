/**
 * 服务端渲染器
 * 将React元素渲染为HTML字符串
 */

import type { ReactElement } from '../../../core/src/types/ReactElement';

const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];

/**
 * 渲染React元素为HTML字符串
 * @param element React元素
 * @returns HTML字符串
 */
export function renderToString(element: ReactElement): string {
  return renderElementToString(element);
}

/**
 * 渲染React元素为HTML字符串（递归）
 */
function renderElementToString(element: ReactElement): string {
  if (!element) return '';
  
  // 处理文本节点
  if (typeof element === 'string' || typeof element === 'number') {
    return String(element);
  }
  
  // 处理Fragment
  if (element.type === Symbol.for('react.fragment')) {
    return renderChildrenToString(element.props.children);
  }
  
  // 处理函数组件
  if (typeof element.type === 'function') {
    const Component = element.type;
    const props = element.props;
    const rendered = Component(props);
    return renderElementToString(rendered);
  }
  
  // 处理DOM元素
  if (typeof element.type === 'string') {
    const tagName = element.type;
    const props = element.props;

    const attributes = buildAttributesString(props);

    if (selfClosingTags.includes(tagName)) {
      return `<${tagName}${attributes} />`;
    }

    const children = renderChildrenToString(props.children);

    return `<${tagName}${attributes}>${children}</${tagName}>`;
  }
  
  return '';
}

/**
 * 渲染子元素为字符串
 */
function renderChildrenToString(children: any): string {
  if (!children) return '';

  return Array.isArray(children) ? children.map(child => renderElementToString(child)).join('') : renderElementToString(children);
}

/**
 * 构建HTML属性字符串
 */
function buildAttributesString(props: any): string {
  if (!props) return '';
  
  const attributes: string[] = [];
  
  for (const key in props) {
    if (key === 'children') continue;
    
    const value = props[key];
    
    // 跳过事件处理器
    if (key.startsWith('on')) continue;
    
    // 处理布尔属性
    if (typeof value === 'boolean') {
      if (value) {
        attributes.push(key);
      }
      continue;
    }
    
    // 处理style对象
    if (key === 'style' && typeof value === 'object') {
      const styleString = Object.entries(value)
        .map(([k, v]) => `${k}: ${v}`)
        .join('; ');
      attributes.push(`${key}="${styleString}"`);
      continue;
    }
    
    // 处理其他属性
    attributes.push(`${key}="${String(value)}"`);
  }
  
  return attributes.length > 0 ? ' ' + attributes.join(' ') : '';
}

/**
 * 渲染到流（Node.js环境）
 */
export function renderToStream(element: ReactElement): NodeJS.ReadableStream {
  // 这里需要Node.js的stream API
  // 暂时返回一个简单的实现
  const { Readable } = require('stream');
  
  return new Readable({
    read() {
      const html = renderToString(element);
      this.push(html);
      this.push(null);
    }
  });
} 