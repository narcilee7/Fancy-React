# @fancy-react/dom

Fancy React的DOM渲染器实现，提供Web平台的React渲染能力。

## 功能特性

### ✅ 已实现

- **DOM元素创建**: 支持所有HTML标签的创建
- **属性处理**: className、style、事件绑定、ref等
- **文本节点**: 支持文本内容的渲染
- **事件系统**: 基础的事件监听器管理
- **API接口**: createRoot、render、hydrate等React API
- **SSR支持**: renderToString等服务端渲染API

### 🔄 进行中

- **合成事件**: 完整的React合成事件系统
- **性能优化**: 批量更新和优化渲染
- **DevTools集成**: React DevTools支持

### 📋 计划中

- **Portal支持**: 渲染到不同DOM容器
- **错误边界**: 错误捕获和处理
- **并发特性**: 完整的并发渲染支持

## 使用方法

### 基础渲染

```typescript
import { createElement } from '@fancy-react/core';
import { createRoot } from '@fancy-react/dom';

function App() {
  return createElement('div', { 
    style: { color: 'blue' } 
  }, 'Hello Fancy React!');
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(createElement(App, null));
```

### 函数组件

```typescript
function Greeting({ name }: { name: string }) {
  return createElement('h1', null, `Hello, ${name}!`);
}

function App() {
  return createElement(Greeting, { name: 'World' });
}
```

### 事件处理

```typescript
function Counter() {
  let count = 0;
  
  const increment = () => {
    count++;
    console.log('Count:', count);
  };
  
  return createElement('button', { 
    onClick: increment 
  }, `Count: ${count}`);
}
```

## API参考

### createRoot(container, options?)

创建React 18风格的并发根节点。

```typescript
const root = createRoot(container, { hydrate: false });
root.render(element);
root.unmount();
```

### render(element, container, callback?)

React 17风格的同步渲染API。

```typescript
render(createElement(App, null), container, () => {
  console.log('渲染完成');
});
```

### hydrate(element, container, callback?)

服务端渲染的客户端注水API。

```typescript
hydrate(createElement(App, null), container);
```

## 架构设计

### HostConfig接口

DOM渲染器通过HostConfig接口与Reconciler解耦：

```typescript
// 创建DOM实例
createInstance(type: string, props: any): HTMLElement | Text

// 挂载子节点
appendInitialChild(parent: HTMLElement, child: HTMLElement): void

// 更新属性
updateInstance(instance: HTMLElement, oldProps: any, newProps: any): void

// 移除节点
removeChild(parent: HTMLElement, child: HTMLElement): void
```

### 事件系统

DOM事件系统提供：

- 事件监听器管理
- 合成事件创建
- 事件清理机制

### SSR支持

服务端渲染支持：

- `renderToString()`: 渲染为HTML字符串
- `renderToStream()`: 流式渲染（Node.js）

## 开发

### 安装依赖

```bash
pnpm install
```

### 构建

```bash
pnpm build
```

### 测试

```bash
pnpm test
```

### 开发模式

```bash
pnpm dev
```

## 与React的兼容性

这个DOM渲染器旨在与React 18 API兼容，但有一些限制：

- 目前只支持同步渲染
- 部分高级特性（如Suspense、并发特性）尚未实现
- 事件系统是简化版本

## 贡献

欢迎提交Issue和Pull Request来改进这个DOM渲染器！

## 许可证

MIT 