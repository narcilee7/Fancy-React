/**
 * DOM渲染器测试
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createInstance, appendInitialChild, removeChild } from '../src/hostConfig/hostConfig';

// 模拟DOM环境
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('DOM HostConfig', () => {
  let dom: any;
  let document: Document;
  let window: Window;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>');
    document = dom.window.document;
    window = dom.window;
    
    // 将document和window设为全局
    (global as any).document = document;
    (global as any).window = window;
  });

  afterEach(() => {
    delete (global as any).document;
    delete (global as any).window;
  });

  describe('createInstance', () => {
    it('should create a div element', () => {
      const element = createInstance('div', {});
      expect(element).toBeInstanceOf((window as any).HTMLDivElement);
    });
    
    it('should create a text node', () => {
      const element = createInstance('#text', { children: 'Hello World' });
      expect(element).toBeInstanceOf((window as any).Text);
      expect((element as Text).textContent).toBe('Hello World');
    });
  })

  describe('appendInitialChild', () => {
    it('应该将子节点添加到父节点', () => {
      const parent = createInstance('div', {});
      const child = createInstance('span', {});
      
      appendInitialChild(parent, child);
      expect(parent.firstChild).toBe(child);
    });

    it('应该处理文本节点', () => {
      const parent = createInstance('div', {});
      const textChild = createInstance('#text', { children: 'Hello' });
      
      appendInitialChild(parent, textChild);
      expect(parent.firstChild).toBe(textChild);
      expect(parent.textContent).toBe('Hello');
    });
  });

  describe('removeChild', () => {
    it('应该从父节点移除子节点', () => {
      const parent = createInstance('div', {});
      const child = createInstance('span', {});
      
      appendInitialChild(parent, child);
      expect(parent.firstChild).toBe(child);
      
      removeChild(parent, child);
      expect(parent.firstChild).toBeNull();
    });
  });

  describe('DOM API', () => {
    it('应该创建React根节点', () => {
      const container = document.getElementById('root');
      expect(container).toBeTruthy();
      
      // 这里需要导入createRoot，但为了避免循环依赖，暂时跳过
      // const root = createRoot(container);
      // expect(root).toBeDefined();
    });
  });
});
