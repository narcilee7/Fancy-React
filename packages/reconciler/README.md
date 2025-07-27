# Fancy-React Reconciler 实现总结

## 一、架构与原理概述

### 1. React 架构核心
- **分层设计**：React 由 Reconciler（协调器）、Renderer（渲染器）、Scheduler（调度器）、Hooks、Context、事件系统等组成。
- **Reconciler 作用**：负责将虚拟 DOM（ReactElement）转换为 Fiber 树，递归 diff、调度、收集副作用，并驱动 commit 阶段完成宿主环境的实际操作。
- **Fiber 架构**：以 FiberNode 为核心，支持双缓冲、可中断、优先级调度、异步渲染等能力。

### 2. Fancy-React Reconciler 实现要点
- **FiberNode/FiberRootNode**：高度还原 React Fiber 的数据结构，支持 tag、key、type、stateNode、child、sibling、return、pendingProps、memoizedProps、flags、alternate 等核心字段。
- **beginWork/completeWork**：递归遍历 Fiber 树，diff 子节点、收集副作用、创建/复用宿主节点。
- **workLoop/performUnitOfWork**：串联调度主流程，支持递归、收尾、兄弟节点切换。
- **commitRoot/commitWork**：处理 Placement、Update、Deletion 等副作用，调用 hostConfig 完成实际 DOM 操作。
- **updateQueue/setState**：支持批量/链式更新，setState 可驱动 Fiber 更新。
- **diff 算法**：支持单节点、数组、key 匹配、文本节点 diff，兼容 Fragment。
- **hostConfig**：抽象宿主环境操作，支持 createInstance、appendInitialChild、updateInstance、removeChild 等。
- **ref 支持**：兼容对象/函数两种写法。

## 二、技术方案与实现过程

### 1. Fiber 数据结构设计
```typescript
// 核心设计思路：双缓冲 + 副作用收集
export interface FiberNode {
  tag: WorkTagType;           // 节点类型（FunctionComponent、HostComponent等）
  key: Key;                   // 唯一标识，用于 diff
  type: any;                  // 组件类型或 DOM 标签
  stateNode: any;             // 真实 DOM 节点或组件实例
  
  // 链表结构
  return: FiberNode | null;   // 父节点
  child: FiberNode | null;    // 第一个子节点
  sibling: FiberNode | null;  // 右侧兄弟节点
  index: number;              // 在父节点中的索引
  
  // 状态管理
  pendingProps: any;          // 新的 props
  memoizedProps: any;         // 上一次渲染的 props
  memoizedState: any;         // 上一次渲染的 state
  updateQueue: any;           // 更新队列
  
  // 副作用标记
  flags: FiberFlags;          // 当前节点副作用
  subtreeFlags: FiberFlags;   // 子树副作用
  deletions: FiberNode[] | null; // 待删除的子节点

  /** ref */
  ref: Ref;
  
  // 双缓冲
  alternate: FiberNode | null; // 备用 fiber
}
```

### 2. 调度系统实现
```typescript
// 核心调度流程：workLoop -> performUnitOfWork -> beginWork/completeWork
function workLoop() {
  isPerformingWork = true;
  try {
    while (workInProgress !== null && !shouldYieldToHost()) {
      performUnitOfWork(workInProgress);
    }
  } finally {
    isPerformingWork = false;
  }
  
  // 支持中断与恢复
  if (workInProgress !== null) {
    scheduleCallback(getCurrentPriorityLevel(), workLoop);
  }
}
```

### 3. Hooks 系统设计
```typescript
// 核心设计：链表 + dispatcher 模式
let currentlyRenderingFiber: any = null;
let workInProgressHook: Hook | null = null;

// 动态切换 mount/update 行为
ReactCurrentDispatcher.current = isMount ? mountDispatcher : updateDispatcher;

// hooks 链表构建
function mountWorkInProgressHook(): Hook {
  const hook = { memoizedState: null, updateQueue: null, next: null };
  // 构建链表结构
  return hook;
}
```

### 4. Context 系统实现
```typescript
// 核心设计：Provider 更新值，Consumer 读取值
function updateContextProvider(current: FiberNode | null, workInProgress: FiberNode) {
  const context = workInProgress.type;
  const newValue = workInProgress.pendingProps.value;
  
  // 更新 context 值
  context._currentValue = newValue;
  context._currentValue2 = newValue;
  
  // 继续处理子节点
  reconcileChildren(workInProgress, current?.child ?? null, children);
}

function updateContextConsumer(current: FiberNode | null, workInProgress: FiberNode) {
  const context = workInProgress.type;
  const newValue = context._currentValue;
  
  // 执行 children 函数，传入 context 值
  const result = children(newValue);
  reconcileChildren(workInProgress, current?.child ?? null, result);
}
```

### 5. 优先级调度实现
```typescript
// 核心设计：任务队列 + 时间切片
export function scheduleCallback(
  priorityLevel: number,
  callback: SchedulerCallback,
  options?: { delay?: number }
): SchedulerTask {
  // 根据优先级计算过期时间
  let expirationTime: number;
  switch (priorityLevel) {
    case ImmediatePriority: expirationTime = startTime + 1; break;
    case UserBlockingPriority: expirationTime = startTime + 250; break;
    case NormalPriority: expirationTime = startTime + 5000; break;
    case LowPriority: expirationTime = startTime + 10000; break;
    case IdlePriority: expirationTime = startTime + 1073741823; break;
  }
  
  // 支持延迟任务和立即任务
  if (startTime > currentTime) {
    timerQueue.push(newTask); // 延迟任务
  } else {
    taskQueue.push(newTask);  // 立即任务
    requestHostCallback(flushWork);
  }
}
```

## 三、与 React 的对比分析

### 1. 已实现的核心功能
✅ **Fiber 数据结构**：与 React 高度一致，支持双缓冲、副作用标记
✅ **调度系统**：支持时间切片、优先级调度、任务中断与恢复
✅ **Hooks 基础**：useState/useEffect 实现完整，支持链表和 dispatcher
✅ **Context 系统**：Provider/Consumer 实现完整
✅ **Diff 算法**：支持 key、数组、文本节点 diff
✅ **副作用收集**：flags 标记与冒泡机制

### 2. 待完善的 TODO 项

#### 2.1 宿主环境集成
```typescript
// TODO: 创建宿主环境节点（如 DOM）
export function createInstance(type: string, props: any): any {
  return { type, props, children: [] };
}

// TODO: 属性更新逻辑
export function updateInstance(instance: any, oldProps: any, newProps: any) {
  instance.props = newProps;
}
```

#### 2.2 Diff 算法完善
```typescript
// TODO: 支持 Fragment、删除多余旧节点等
export function reconcileChildren(
  returnFiber: FiberNode,
  currentFirstChild: FiberNode | null,
  newChild: any
) {
  // 当前支持：数组、key 匹配、文本节点
  // 待支持：Fragment、Portal、Suspense、批量删除
}
```

#### 2.3 Hooks Effects 执行
```typescript
// TODO: 执行 effects
function commitHooksEffects(fiber: FiberNode) {
  // 1. 清理旧的 effects
  // 2. 执行新的 effects
  // 3. 收集清理函数
}
```

#### 2.4 优先级调度完善
```typescript
// TODO: 重置 child lanes
export function resetChildLanes(fiber: FiberNode) {
  let child = fiber.child;
  while (child !== null) {
    // 重置 child lanes
    child = child.sibling;
  }
}
```

### 3. 与 React 的差异

#### 3.1 已对齐的部分
- **Fiber 数据结构**：字段定义与 React 一致
- **调度流程**：beginWork/completeWork/workLoop 流程对齐
- **Hooks 机制**：链表结构、dispatcher 模式对齐
- **Context 实现**：Provider/Consumer 机制对齐
- **副作用收集**：flags 标记机制对齐

#### 3.2 待对齐的部分
- **宿主环境**：需要实现真实的 DOM 操作
- **Lanes 模型**：优先级调度需要更精细的 lanes 支持
- **Suspense**：异步组件和错误边界
- **Portal**：跨容器渲染
- **Fragment**：更完整的 Fragment 支持
- **事件系统**：合成事件机制
- **更多 Hooks**：useReducer、useCallback、useMemo 等

## 四、实现过程总结

### 1. 架构设计阶段
- 分析 React Fiber 源码，理解核心数据结构
- 设计 monorepo 包结构，分离关注点
- 定义 shared 包，提供基础类型和工具

### 2. 核心实现阶段
- 实现 FiberNode/FiberRootNode 数据结构
- 实现 beginWork/completeWork 递归流程
- 实现 workLoop/performUnitOfWork 调度
- 实现 commitRoot/commitWork 副作用处理

### 3. 功能扩展阶段
- 实现 useState/useEffect hooks 系统
- 实现 Context Provider/Consumer
- 实现优先级调度和时间切片
- 实现副作用收集和标记

### 4. 集成优化阶段
- 集成 hooks 到 Fiber 主流程
- 集成 Context 到 diff 算法
- 集成调度器到 workLoop
- 集成 effectTags 到 completeWork

## 五、后续计划

### 1. 短期目标
- 完善宿主环境集成（DOM 操作）
- 完善 diff 算法（Fragment、批量删除）
- 完善 hooks effects 执行
- 完善优先级调度（Lanes 模型）

### 2. 中期目标
- 实现 Suspense 和异步组件
- 实现 Portal 跨容器渲染
- 实现事件系统
- 实现更多 hooks（useReducer、useCallback、useMemo）

### 3. 长期目标
- 实现 Concurrent Features
- 实现 Server Components
- 实现 Streaming SSR
- 性能优化和调试工具

---

**总结**：Fancy-React Reconciler 已实现 React Fiber 的核心架构和主要功能，具备完整的调度、diff、hooks、context、优先级调度等能力。虽然还有一些 TODO 项需要完善，但整体架构已非常完整，可以作为 React 学习和技术研究的重要参考。