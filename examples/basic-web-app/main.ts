/**
 * 基础Web应用示例
 * 演示Fancy React的DOM渲染功能
 */

import { createElement, Fragment } from '../../packages/core/src';
import { createRoot } from '../../packages/dom/src';

// 简单的函数组件
function Greeting({ name }: { name: string }) {
  return createElement('h1', { 
    style: { color: 'blue', textAlign: 'center' } 
  }, `Hello, ${name}!`);
}

// 计数器组件
function Counter() {
  let count = 0;
  
  const increment = () => {
    count++;
    console.log('Count:', count);
    // TODO: 实现状态更新和重新渲染
  };
  
  return createElement('div', { 
    style: { 
      textAlign: 'center', 
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      margin: '20px'
    } 
  }, [
    createElement('h2', null, `Count: ${count}`),
    createElement('button', {
      onClick: increment,
      style: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }
    }, 'Increment')
  ]);
}

// 主应用组件
function App() {
  return createElement(Fragment, null, [
    createElement(Greeting, { name: 'Fancy React' }),
    createElement(Counter, null),
    createElement('p', { 
      style: { textAlign: 'center', color: '#666' } 
    }, '这是一个使用Fancy React构建的简单应用')
  ]);
}

// 渲染应用
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(createElement(App, null));
  
  console.log('Fancy React应用已启动！');
} else {
  console.error('找不到root容器元素');
} 