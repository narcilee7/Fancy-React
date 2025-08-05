/**
 * DOM事件系统
 * 处理React的合成事件
 */

// 事件类型
export type EventType = 
  | 'click' | 'dblclick' | 'mousedown' | 'mouseup' | 'mousemove' | 'mouseenter' | 'mouseleave'
  | 'keydown' | 'keyup' | 'keypress'
  | 'focus' | 'blur'
  | 'change' | 'input' | 'submit'
  | 'load' | 'error';

// 事件监听器
export type EventListener = (event: Event) => void;

// 事件映射表
const eventListeners = new Map<Element, Map<EventType, EventListener[]>>();

/**
 * 添加事件监听器
 */
export function addEventListener(element: Element, eventType: EventType, listener: EventListener): void {
  if (!eventListeners.has(element)) {
    eventListeners.set(element, new Map());
  }
  
  const elementListeners = eventListeners.get(element)!;
  if (!elementListeners.has(eventType)) {
    elementListeners.set(eventType, []);
  }
  
  elementListeners.get(eventType)!.push(listener);
  element.addEventListener(eventType, listener);
}

/**
 * 移除事件监听器
 */
export function removeEventListener(element: Element, eventType: EventType, listener: EventListener): void {
  const elementListeners = eventListeners.get(element);
  // 如果这个事件监听器还没有被注册过，说明这个事件监听器不存在
  if (!elementListeners) return;

  const listeners = elementListeners.get(eventType);
  if (!listeners) return;

  const index = listeners.indexOf(listener);

  if (index !== -1) {
    listeners.splice(index, 1);
    element.removeEventListener(eventType, listener);
  }

  if (listeners.length === 0) {
    elementListeners.delete(eventType);
  }

  if (elementListeners.size === 0) {
    eventListeners.delete(element);
  }
}

/**
 * 清理元素的所有事件监听器
 */
export function cleanupElementListeners(element: Element): void {
  const elementListeners = eventListeners.get(element);
  if (!elementListeners) return;
  // @ts-ignore
  for (const [eventType, listeners] of elementListeners) {
    for (const listener of listeners) {
      element.removeEventListener(eventType, listener);
    }
  }
  
  eventListeners.delete(element);
}

/**
 * 创建合成事件
 */
export function createSyntheticEvent(nativeEvent: Event): any {
  return {
    nativeEvent, // 原始事件对象  
    target: nativeEvent.target,
    currentTarget: nativeEvent.currentTarget, // 当前事件目标
    type: nativeEvent.type, // 事件类型
    preventDefault() {
      nativeEvent.preventDefault(); // 阻止默认行为
    },
    stopPropagation() {
      nativeEvent.stopPropagation(); // 阻止事件冒泡
    },
  }
}
