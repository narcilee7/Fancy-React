import { createElement, Component, createContext } from '../../packages/core/src';

// 创建一个Context
const ThemeContext = createContext('light');

// 函数组件示例
function Greeting({ name }: { name: string }) {
  return createElement('div', { 
    style: { 
      fontSize: '18px', 
      color: '#333',
      marginBottom: '10px'
    } 
  }, `你好，${name}！`);
}

// 类组件示例
class Counter extends Component<{}, { count: number }> {
  constructor(props: {}) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return createElement('div', { className: 'counter' },
      createElement('button', { onClick: this.decrement }, '-'),
      createElement('span', { className: 'count' }, this.state.count.toString()),
      createElement('button', { onClick: this.increment }, '+')
    );
  }
}

// Context消费者组件
function ThemeDisplay() {
  return createElement(ThemeContext.Consumer, { children: (theme: string) =>
    createElement('div', { 
      style: { 
        padding: '10px',
        backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0',
        color: theme === 'dark' ? '#fff' : '#333',
        borderRadius: '4px',
        marginTop: '10px'
      }
    }, `当前主题: ${theme}`)
  });
}

// 主应用组件
function App() {
  return createElement('div', {},
    createElement('h2', {}, 'Fancy-React 功能演示'),
    createElement(Greeting, { name: '开发者' }),
    createElement('h3', {}, '计数器组件（类组件）'),
    createElement(Counter, {}),
    createElement('h3', {}, 'Context 示例'),
    createElement(ThemeContext.Provider, { value: 'dark' },
      createElement(ThemeDisplay, {})
    )
  );
}

// 渲染应用
function render() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    // 这里需要与reconciler集成来实现真正的渲染
    // 目前只是展示createElement的使用
    console.log('App element:', App());
    
    // 临时显示一些信息
    rootElement.innerHTML = `
      <div style="padding: 20px; border: 2px dashed #ccc; border-radius: 8px;">
        <h3>Fancy-React 已加载</h3>
        <p>✅ createElement API 已实现</p>
        <p>✅ 函数组件支持</p>
        <p>✅ 类组件支持</p>
        <p>✅ Context 系统</p>
        <p>🔄 下一步：集成 Reconciler 实现真实渲染</p>
        <p>请查看控制台查看生成的 ReactElement 结构</p>
      </div>
    `;
  }
}

// 启动应用
render(); 