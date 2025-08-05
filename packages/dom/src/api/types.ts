/**
 * DOM API 类型定义
 */
// 事件类型
export type EventType = 
  | 'click' | 'dblclick' | 'mousedown' | 'mouseup' | 'mousemove' | 'mouseenter' | 'mouseleave'
  | 'keydown' | 'keyup' | 'keypress'
  | 'focus' | 'blur'
  | 'change' | 'input' | 'submit'
  | 'load' | 'error';

// DOM容器类型
export type DOMContainer = Element | DocumentFragment;

// React Root类型
export interface ReactRoot {
  render(children: any): void;
  unmount(): void;
}

// 渲染选项
export interface RenderOptions {
  hydrate?: boolean;
}

// 事件监听器类型
export interface EventListener {
  (event: Event): void;
}

// DOM事件映射
export interface DOMEventMap {
  click: MouseEvent;
  dblclick: MouseEvent;
  mousedown: MouseEvent;
  mouseup: MouseEvent;
  mousemove: MouseEvent;
  mouseenter: MouseEvent;
  mouseleave: MouseEvent;
  keydown: KeyboardEvent;
  keyup: KeyboardEvent;
  keypress: KeyboardEvent;
  focus: FocusEvent;
  blur: FocusEvent;
  change: Event;
  input: Event;
  submit: Event;
  load: Event;
  error: Event;
} 