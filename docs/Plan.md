# 实现路线

### **阶段 0 — 基础搭建（1\~2 天）**

目标：搭建 Monorepo 工程环境，保证所有包可编译、可测试、可调试
重点：工程基建，而非功能实现

* **工程工具**

  * 初始化 `pnpm-workspace.yaml`
  * 创建 `packages/*` 目录（core、reconciler、scheduler、shared、dom、examples/basic-web-app）
  * 配置 TypeScript 基础文件 `tsconfig.base.json`
  * 配置 ESLint + Prettier + Husky
  * 配置 Vite（开发）+ Rollup（构建）
  * 配置 Vitest 测试环境
  * 配置 Changesets 版本管理
  * 配置 GitHub Actions CI/CD

✅ **产出**：

* 可以执行 `pnpm dev` 启动示例 Web App
* 可以执行 `pnpm test` 运行测试
* 各包能正常被构建

---

### **阶段 1 — Core Layer MVP（3\~5 天）**

目标：实现最小可用的 React 核心 API（函数组件渲染 → DOM）

**步骤**

1. **Element System**

   * `createElement(type, props, ...children)` → 返回一个 JS 对象（虚拟 DOM）
   * `Fragment` 支持
2. **Component System**

   * 函数组件支持（仅 props）
   * 类组件（继承 `Component`，支持 `render`）
3. **Context System（基础版）**

   * `createContext`、`Provider`、`Consumer`（仅单层传递）
4. **类型定义**

   * TS 类型：`ReactNode`、`ReactElement`、`FunctionComponent`

✅ **产出**：

* 写一个简单的函数组件 → `createRoot` → 渲染到 DOM
* 类组件渲染到 DOM
* Context 单层传递可用

---

### **阶段 2 — Reconciler 基础（5\~7 天）**

目标：实现 Fiber 架构的最小版本（一次性渲染）

**步骤**

1. **FiberNode 定义**

   * `type`, `key`, `props`, `stateNode`, `child`, `sibling`, `return`
2. **Fiber 树构建**

   * 从 Element 树创建 Fiber 树
3. **一次性渲染（同步模式）**

   * workLoop（DFS 构建 Fiber 树）
   * commit 阶段：执行 DOM 操作
4. **Diff 算法（基础版）**

   * 对比新旧 Fiber 树（仅 type 对比）
   * 支持 key（列表渲染）

✅ **产出**：

* 初次渲染 + 简单更新可用
* 列表 Diff 正确运行

---

### **阶段 3 — Scheduler 引入（5\~7 天）**

目标：引入优先级调度，让渲染可中断恢复（Time Slicing）

**步骤**

1. **任务队列**

   * 最小堆或优先队列
2. **requestIdleCallback / MessageChannel polyfill**
3. **Lane 模型（简化版）**

   * `NormalPriority` / `HighPriority`
4. **可中断渲染**

   * 将 `workLoop` 拆成小块
   * 任务切片 + 恢复

✅ **产出**：

* 大量节点渲染不阻塞主线程
* 优先级任务可插队

---

### **阶段 4 — Hooks Runtime（7\~10 天）**

目标：实现 React Hooks 核心机制

**步骤**

1. **Hooks 数据结构**

   * 单链表保存 hook 状态
2. **内置 Hooks**

   * `useState`（基本版本）
   * `useEffect`（被动副作用）
   * `useReducer`
3. **Hooks 调度**

   * mount / update 两种阶段
   * Hooks 调用顺序固定
4. **依赖数组机制**

✅ **产出**：

* 函数组件可用 `useState` 管理状态
* `useEffect` 在 commit 阶段执行
* 多个 Hooks 组合可正常运行

---

### **阶段 5 — 完整副作用系统（3\~5 天）**

目标：支持 React 生命周期与副作用管理

**步骤**

1. **Effect Tags**

   * Placement, Update, Deletion
2. **Layout Effects**

   * 类似 `useLayoutEffect`
3. **类组件生命周期**

   * `componentDidMount` / `componentDidUpdate` / `componentWillUnmount`

✅ **产出**：

* DOM 操作与副作用分阶段执行
* 类组件生命周期可用

---

### **阶段 6 — DOM 渲染器完善（3\~5 天）**

目标：实现完整的 Web DOM 渲染能力

**步骤**

1. **DOM 属性处理**

   * 事件绑定（合成事件系统简化版）
   * style / className 支持
2. **文本节点处理**
3. **Portal 支持**

✅ **产出**：

* 常见 HTML 属性可正确渲染
* 支持事件监听
* 支持渲染到不同 DOM 容器（Portal）

---

### **阶段 7 — 并发特性 & Suspense（5\~7 天）**

目标：支持并发模式与 Suspense

**步骤**

1. **并发模式开关**

   * `createRoot` 支持 concurrent 模式
2. **Suspense 运行时**

   * 占位符逻辑
   * 数据未就绪时中断渲染

✅ **产出**：

* 并发模式下可平滑加载组件
* Suspense 可用

---

### **阶段 8 — SSR & Hydration（10\~14 天）**

目标：支持 React 服务端渲染与客户端注水

**步骤**

1. **SSR 渲染器**

   * 将 Fiber 树输出 HTML
2. **Hydration**

   * 将 HTML 转换为可交互 Fiber 树
3. **流式渲染**

   * HTML 流输出（Node.js Stream API）

✅ **产出**：

* SSR + Hydration 可用
* 流式 SSR 可减少首屏时间

---

### **阶段 9 — DevTools & 性能优化（7\~10 天）**

目标：完善调试体验与性能

**步骤**

1. **性能分析 API**
2. **Fiber Tree 可视化**
3. **时间旅行调试（记录 Fiber 变化）**
4. **性能优化**

   * `memo` / `useMemo` / `useCallback`
   * Keyed Diff 优化

✅ **产出**：

* 浏览器 DevTools 支持
* 性能对比数据

---

### **阶段 10 — React Native 渲染器（可选）（14\~21 天）**

目标：支持 Native 渲染

---
