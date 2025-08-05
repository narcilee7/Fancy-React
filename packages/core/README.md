# Fancy-React Core Layer

这是 Fancy-React 的核心层实现，提供了 React 的基础 API 和组件系统。

## 已实现功能

### ✅ 核心 API
- `createElement(type, config, ...children)` - 创建 React 元素
- `createFragment(children)` - 创建 Fragment 元素
- `Fragment` - Fragment 组件

### ✅ 组件系统
- **函数组件** - 支持 props 传递和返回值
- **类组件** - 继承 `Component` 基类，支持生命周期
- **组件类型判断** - `isFunctionComponent`、`isClassComponent`

### ✅ Context 系统
- `createContext(defaultValue)` - 创建 Context
- `Provider` 和 `Consumer` 组件
- Context 值传递和消费

### ✅ 类型系统
- `ReactElement` - React 元素类型
- `ReactNode` - React 节点类型
- `Key`、`Ref` - 基础类型定义
- `FunctionComponent`、`ComponentClass` - 组件类型

## 使用示例

```typescript
import { createElement, Component, createContext } from '@fancy-react/core';

// 创建 Context
const ThemeContext = createContext('light');

// 函数组件
function Greeting({ name }: { name: string }) {
  return createElement('div', {}, `你好，${name}！`);
}

// 类组件
class Counter extends Component<{}, { count: number }> {
  constructor(props: {}) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return createElement('div', {},
      createElement('span', {}, this.state.count.toString()),
      createElement('button', { onClick: () => this.setState({ count: this.state.count + 1 }) }, '+')
    );
  }
}

// 使用 Context
function App() {
  return createElement(ThemeContext.Provider, { value: 'dark' },
    createElement(ThemeContext.Consumer, { children: (theme: string) =>
      createElement('div', {}, `主题: ${theme}`)
    })
  );
}
```

## 与 Reconciler 的集成

Core Layer 与 Reconciler 通过以下方式集成：

1. **setState 集成** - 类组件的 setState 会触发 Reconciler 的更新流程
2. **Fiber 节点创建** - createElement 创建的 ReactElement 会被转换为 Fiber 节点
3. **Context 更新** - Context 值变化会触发相关组件的重新渲染

## 下一步计划

- [ ] 集成 Reconciler 实现真实渲染
- [ ] 支持更多生命周期方法
- [ ] 实现 ref 系统
- [ ] 支持 Portal 组件
- [ ] 添加错误边界支持

## 开发

```bash
# 安装依赖
pnpm install

# 运行测试
pnpm test

# 构建
pnpm build
```

