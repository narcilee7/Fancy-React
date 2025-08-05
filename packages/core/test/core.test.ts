import { describe, it, expect } from 'vitest';
import { createElement, Component, createContext, isFunctionComponent, isClassComponent } from '../src';

describe('Fancy-React Core', () => {
  describe('createElement', () => {
    it ('should create basic react element', () => {
      const element = createElement('div', { className: 'test' }, 'Hello');

      expect(element.type).toBe('div');
      expect(element.props.className).toBe('test');
      expect(element.props.children).toBe('Hello');
      expect(element.$$typeof).toBe(Symbol.for('react.element'));
    });

    it ('should handle multiple children', () => {
      const element = createElement('div', {}, 'Hello', 'World');

      expect(element.props.children).toEqual(['Hello', 'World']);
    });

    it ('should handle key and ref', () => {
      const ref = { current: null };
      const element = createElement('div', { key: 'test-key', ref });

      expect(element.key).toBe('test-key');
    });

    it ('should handle props', () => {
      const element = createElement('div', { className: 'test', id: 'test-id' });

      expect(element.props.className).toBe('test');
      expect(element.props.id).toBe('test-id');
    });
  });

  describe('函数组件', () => {
    it('应该正确识别函数组件', () => {
      function TestComponent() {
        return createElement('div', {}, 'test');
      }
      
      expect(isFunctionComponent(TestComponent)).toBe(true);
    });

    it('应该执行函数组件并返回结果', () => {
      function Greeting({ name }: { name: string }) {
        return createElement('div', {}, `Hello, ${name}!`);
      }
      
      const element = createElement(Greeting, { name: 'World' });
      
      expect(element.type).toBe(Greeting);
      expect(element.props.name).toBe('World');
    });
  });

  describe('类组件', () => {
    it('应该正确识别类组件', () => {
      class TestComponent extends Component {
        render() {
          return createElement('div', {}, 'test');
        }
      }
      
      expect(isClassComponent(TestComponent)).toBe(true);
    });

    it('应该创建类组件实例', () => {
      class Counter extends Component<{}, { count: number }> {
        constructor(props: {}) {
          super(props);
          this.state = { count: 0 };
        }

        render() {
          return createElement('div', {}, this.state.count.toString());
        }
      }
      
      const element = createElement(Counter, {});
      const instance = new element.type(element.props);
      
      expect(instance.state.count).toBe(0);
      expect(instance.props).toEqual({});
    });
  });

  describe('Context 系统', () => {
    it('应该创建 Context', () => {
      const context = createContext('default');
      
      expect(context._currentValue).toBe('default');
      expect(context.Provider).toBeDefined();
      expect(context.Consumer).toBeDefined();
    });

    it('应该创建 Provider 和 Consumer 元素', () => {
      const context = createContext('default');
      
      const providerElement = createElement(context.Provider, { value: 'new-value' });
      const consumerElement = createElement(context.Consumer, { children: (value: string) => value });
      
      expect(providerElement.type).toBe(context.Provider);
      expect(consumerElement.type).toBe(context.Consumer);
    });
  });

  describe('Fragment', () => {
    it('应该创建 Fragment 元素', () => {
      const fragment = createElement(Symbol.for('react.fragment'), {}, 'child1', 'child2');
      
      expect(fragment.type).toBe(Symbol.for('react.fragment'));
      expect(fragment.props.children).toEqual(['child1', 'child2']);
    });
  });
}); 