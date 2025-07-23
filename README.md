# Fancy-React

## Description

一个旨在深入理解并实现 React 核心机制（包括 React 核心库、React DOM 和 React Native 渲染器）的 Monorepo 项目

## 核心技术栈

- 语言: TypeScript 5.0+
- 构建工具: Vite 5.0+ (开发) + Rollup (生产构建)
- 测试框架: Vitest + @testing-library/react
- 编译: Babel
- 包管理: pnpm (Monorepo 支持)
- 类型检查: TypeScript + strict mode
- 代码规范: ESLint + Prettier
- 版本管理: Changesets
- CI/CD: GitHub Actions

## 架构

```bash
fancy-react (Monorepo)
├── Core Layer (平台无关)
│   ├── @fancy-react/core                    # React 核心：定义 React API、组件、Hooks、Context 和元素系统
│   │   ├── Component System                 # 组件系统
│   │   │   ├── Component & PureComponent    # 类组件
│   │   │   ├── Function Components          # 函数组件
│   │   │   ├── Forward Ref                  # 引用转发
│   │   │   ├── Memo & Lazy                  # 性能优化
│   │   │   └── Error Boundaries             # 错误边界
│   │   ├── Hooks Runtime                    # Hooks 系统：管理 Hooks 内部状态、链表和运行时行为
│   │   │   ├── Built-in Hooks               # 内置 Hooks
│   │   │   ├── Custom Hooks Support         # 自定义 Hooks
│   │   │   └── Hooks Scheduler              # Hooks 调度器 (管理 Hooks 内部执行顺序，非任务调度器)
│   │   ├── Context System                   # 上下文系统
│   │   │   ├── Context API                  # 上下文 API
│   │   │   ├── Provider/Consumer            # 提供者/消费者
│   │   │   └── Context Propagation          # 上下文传播
│   │   ├── Element System                   # 元素系统：定义 React 元素的结构和类型
│   │   │   ├── createElement                # 元素创建
│   │   │   ├── Fragment                     # 片段
│   │   │   ├── Portal                       # 传送门
│   │   │   └── Suspense                     # 悬停 (作为特殊元素类型存在)
│   │   └── Type System                      # 类型系统：提供类型定义和开发模式警告
│   │       ├── TypeScript Definitions       # TS 类型定义
│   │       └── Dev Mode Warnings            # 开发模式警告
│   │
│   ├── @fancy-react/reconciler              # 协调器 (Fiber)：React 的“大脑”，负责计算和更新组件树
│   │   ├── Fiber Architecture               # Fiber 架构：定义 Fiber 节点结构和树构建原理
│   │   │   ├── Fiber Node Structure         # Fiber 节点结构
│   │   │   ├── Fiber Tree Construction      # Fiber 树构建 (工作循环的一部分)
│   │   │   ├── Double Buffering             # 双缓冲
│   │   │   └── Work Loop                    # 工作循环
│   │   ├── Reconciliation Algorithm         # 协调算法：高效更新 UI 的核心算法
│   │   │   ├── Diff Algorithm               # Diff 算法
│   │   │   ├── Key-based Reconciliation     # 基于 key 的协调
│   │   │   ├── Component Reconciliation     # 组件协调
│   │   │   └── List Reconciliation          # 列表协调
│   │   ├── Priority & Scheduling            # 优先级调度：与调度器协作，管理更新优先级
│   │   │   ├── Lane Model                   # 车道模型
│   │   │   ├── Time Slicing                 # 时间切片
│   │   │   ├── Concurrent Features          # 并发特性 (包含 Suspense 运行时逻辑)
│   │   │   └── Interruption & Resumption    # 中断与恢复
│   │   ├── Side Effects Management          # 副作用管理：处理 DOM 操作、生命周期等
│   │   │   ├── Effect List                  # 副作用列表
│   │   │   ├── Commit Phase                 # 提交阶段
│   │   │   ├── Layout Effects               # 布局副作用
│   │   │   └── Passive Effects              # 被动副作用
│   │   └── Host Config Interface            # 宿主配置接口：Reconciler 与平台无关的抽象接口
│   │       ├── Platform Abstraction         # 平台抽象
│   │       ├── Host Component Interface     # 宿主组件接口
│   │       └── Event System Interface       # 事件系统接口
│   │
│   ├── @fancy-react/scheduler               # 调度器：负责根据优先级调度任务，管理时间切片
│   │   ├── Task Scheduling                  # 任务调度：将任务放入优先级队列并进行调度
│   │   │   ├── Priority Queue               # 优先级队列
│   │   │   ├── Task Prioritization          # 任务优先级
│   │   │   ├── Deadline Scheduling          # 截止时间调度
│   │   │   └── Yield Control                # 让出控制
│   │   ├── Time Management                  # 时间管理：与浏览器事件循环结合
│   │   │   ├── Frame Timing                 # 帧时序
│   │   │   ├── Idle Callback                # 空闲回调
│   │   │   └── Performance Monitoring       # 性能监控
│   │   └── Concurrent Mode                  # 并发模式：实现批量更新、Suspense 等并发特性
│   │       ├── Batched Updates              # 批量更新
│   │       ├── Suspense Support             # Suspense 支持 (运行时调度)
│   │       └── Error Recovery               # 错误恢复
│   │
│   └── @fancy-react/shared                  # 共享工具：提供通用工具函数、常量、错误处理等
│       ├── Utilities                        # 工具函数
│       │   ├── Object Utils                 # 对象工具
│       │   ├── Array Utils                  # 数组工具
│       │   ├── Function Utils               # 函数工具
│       │   └── Type Guards                  # 类型守卫
│       ├── Constants                        # 常量定义
│       │   ├── React Types                  # React 类型常量
│       │   ├── Priority Levels              # 优先级常量
│       │   ├── Fiber Flags                  # Fiber 标志
│       │   └── Hook Types                   # Hook 类型
│       ├── Error Handling                   # 错误处理
│       │   ├── Error Boundary Utils         # 错误边界工具
│       │   ├── Dev Warnings                 # 开发警告
│       │   └── Error Recovery               # 错误恢复
│       └── Feature Flags                    # 特性标志：控制实验性、平台和性能特性
│           ├── Experimental Features        # 实验性特性
│           ├── Platform Features            # 平台特性
│           └── Performance Features         # 性能特性
│
├── Platform Layer (平台特定)
│   ├── @fancy-react/dom                     # Web 平台渲染器：实现 React 在 Web DOM 环境下的渲染
│   │   ├── DOM Host Config                  # DOM 宿主配置：实现 Reconciler 的 Host Config Interface
│   │   │   ├── DOM Node Operations          # DOM 节点操作
│   │   │   ├── Property Handling            # 属性处理
│   │   │   ├── Style Management             # 样式管理
│   │   │   └── Text Content Handling        # 文本内容处理
│   │   ├── Event System                     # 事件系统：React 的合成事件机制
│   │   │   ├── Synthetic Events             # 合成事件
│   │   │   ├── Event Delegation             # 事件委托
│   │   │   ├── Event Pooling                # 事件池化
│   │   │   ├── Event Priorities             # 事件优先级
│   │   │   └── Browser Compatibility        # 浏览器兼容性
│   │   ├── Server Side Rendering            # 服务端 HTML 渲染与客户端注水
│   │   │   ├── SSR Renderer (HTML Output)   # SSR 渲染器 (负责将 Fiber 树生成为 HTML 字符串/流)
│   │   │   ├── Hydration (Client Side)      # 客户端注水 (将服务端 HTML 变为交互式 React 应用)
│   │   │   ├── Stream Rendering (HTML Stream)# HTML 流式渲染
│   │   │   └── Partial Hydration            # 部分注水
│   │   ├── Client API                       # 客户端 API：用户直接调用的入口函数
│   │   │   ├── createRoot                   # 创建根节点
│   │   │   ├── render (Legacy)              # 渲染 (旧版)
│   │   │   ├── unmountComponentAtNode       # 卸载组件
│   │   │   └── findDOMNode                  # 查找 DOM 节点
│   │   └── Development Tools                # 开发工具：DOM 特定的调试和性能分析集成
│   │       ├── React DevTools Support       # React DevTools 支持
│   │       ├── Profiling                    # 性能分析
│   │       └── Debug Information            # 调试信息
│   │
│   ├── @fancy-react/native                  # React Native 渲染器：实现 React 在 Native 端的渲染
│   │   ├── Native Host Config               # Native 宿主配置：实现 Reconciler 的 Host Config Interface
│   │   │   ├── Native Component Mapping     # 原生组件映射
│   │   │   ├── Props Transformation         # 属性转换
│   │   │   ├── Layout Calculation           # 布局计算
│   │   │   └── Native Module Interface      # 原生模块接口
│   │   ├── Bridge System                    # 桥接系统：JS 与原生代码通信
│   │   │   ├── JavaScript Bridge            # JavaScript 桥接
│   │   │   ├── Native Method Calls          # 原生方法调用
│   │   │   ├── Event Handling               # 事件处理
│   │   │   └── Async Communication          # 异步通信
│   │   ├── Layout Engine                    # 布局引擎：处理 Native UI 的布局
│   │   │   ├── Flexbox Layout               # Flexbox 布局
│   │   │   ├── Absolute Positioning         # 绝对定位
│   │   │   ├── Dimension Calculation        # 尺寸计算
│   │   │   └── Layout Tree                  # 布局树
│   │   ├── Style System                     # 样式系统：处理 Native UI 样式
│   │   │   ├── StyleSheet                   # 样式表
│   │   │   ├── Style Resolution             # 样式解析
│   │   │   ├── CSS-in-JS Support            # CSS-in-JS 支持
│   │   │   └── Platform Styles              # 平台样式
│   │   ├── Animation System                 # 动画系统：Native 动画与手势
│   │   │   ├── Native Animations            # 原生动画
│   │   │   ├── JavaScript Animations        # JavaScript 动画
│   │   │   ├── Gesture Handling             # 手势处理
│   │   │   └── Reanimated Support           # Reanimated 支持
│   │   └── Platform Services                # 平台服务：iOS/Android 特定功能
│   │       ├── iOS Platform                 # iOS 平台
│   │       ├── Android Platform             # Android 平台
│   │       └── Platform Utilities           # 平台工具
│   │
│   └── @fancy-react/server-runtime          # 服务端运行时：通用的服务端渲染逻辑与 React Server Components
│       ├── Host Config Bridge               # 宿主配置桥接器：连接 Reconciler 到平台特定 SSR 实现
│       │   ├── SSR Node Operations          # 服务端节点操作抽象 (构建内部树而非真实 DOM/Native 节点)
│       │   ├── Data Serialization           # 数据序列化 (例如 Props, State 用于客户端 Hydration)
│       │   └── Stream Management            # 流管理 (用于通用流式渲染，与具体输出格式无关)
│       ├── Render Pipeline                  # 渲染管道：服务端渲染的核心流程
│       │   ├── Initial Render               # 初始渲染
│       │   ├── Suspense Handling (Server)   # Suspense 服务端处理
│       │   ├── Error Recovery (Server)      # 服务端错误恢复
│       │   └── Data Fetching Orchestration  # 数据获取编排
│       ├── Hydration Metadata               # 注水元数据生成：为客户端注水提供所需信息
│       │   ├── Client Manifest Generation   # 客户端清单生成
│       │   ├── Hydration Script Injection   # 注水脚本注入
│       │   └── Boundary Markers             # 边界标记生成
│       └── Server Components                # 服务端组件：实现 RSC 核心逻辑
│           ├── RSC Implementation           # RSC 实现
│           ├── Streaming Support            # 流式支持
│           ├── Data Fetching                # 数据获取
│           └── Asset Management             # 资源管理 (CSS, JS)
│
├── Developer Tools
│   ├── @fancy-react/devtools                # 开发者工具：提供调试和性能分析功能
│   │   ├── Browser Extension                # 浏览器扩展
│   │   ├── Profiler                         # 性能分析器
│   │   ├── Component Inspector              # 组件检查器
│   │   └── Time Travel Debugging            # 时间旅行调试
│   │
│   ├── @fancy-react/test-utils              # 测试工具：提供组件测试辅助
│   │   ├── Testing Library                  # 测试库
│   │   ├── Test Renderer                    # 测试渲染器
│   │   ├── Mock Utilities                   # Mock 工具
│   │   └── Shallow Renderer                 # 浅渲染器
│   │
│   └── @fancy-react/eslint-plugin           # ESLint 插件：提供代码规范检查规则
│       ├── Rules of Hooks                   # Hooks 规则
│       ├── JSX Rules                        # JSX 规则
│       └── Performance Rules                # 性能规则
│
├── Build & Tooling
│   ├── build-scripts/                       # 构建脚本：包含各种构建工具的配置
│   │   ├── rollup.config.ts                 # Rollup 配置
│   │   ├── webpack.config.ts                # Webpack 配置
│   │   └── vite.config.ts                   # Vite 配置
│   │
│   └── scripts/                             # 工具脚本：常用的开发和维护脚本
│       ├── build.ts                         # 构建脚本
│       ├── test.ts                          # 测试脚本
│       ├── release.ts                       # 发布脚本
│       └── benchmark.ts                     # 基准测试
│
└── Documentation & Examples
    ├── docs/                                # 文档
    │   ├── api/                             # API 文档
    │   ├── guides/                          # 使用指南
    │   └── internals/                       # 内部实现
    │
    ├── examples/                            # 示例：展示不同场景下的应用
    │   ├── basic-web-app/                   # 基础 Web 应用
    │   ├── ssr-app/                         # SSR 应用
    │   ├── native-app/                      # Native 应用
    │   └── concurrent-features/             # 并发特性示例
    │
    └── benchmarks/                          # 基准测试：衡量性能指标
        ├── render-performance/              # 渲染性能
        ├── memory-usage/                    # 内存使用
        └── bundle-size/                     # 包大小
```

## 目录结构

```bash
fancy-react/
├── .github/                                # GitHub Actions CI/CD 配置
│   ├── workflows/
│   │   ├── ci.yml                          # 持续集成工作流
│   │   └── release.yml                     # 发布工作流
│
├── .vscode/                                # VSCode 编辑器配置
│   ├── extensions.json                     # 推荐扩展
│   └── settings.json                       # 工作区设置
│
├── node_modules/                           # pnpm 安装的依赖
│
├── packages/                               # 所有 Monorepo NPM 包的根目录
│   ├── core/                               # @fancy-react/core - React 核心
│   │   ├── src/
│   │   │   ├── components/                 # 组件系统 (Component, FunctionComponent, ForwardRef, Memo, Lazy, ErrorBoundary)
│   │   │   ├── hooks/                      # Hooks Runtime (Built-in Hooks, Custom Hooks Support, Hooks Scheduler)
│   │   │   ├── context/                    # 上下文系统 (Context API, Provider/Consumer, Context Propagation)
│   │   │   ├── elements/                   # 元素系统 (createElement, Fragment, Portal, Suspense)
│   │   │   ├── types/                      # 类型系统 (TypeScript Definitions, Dev Mode Warnings)
│   │   │   └── index.ts                    # 包入口文件
│   │   ├── test/                           # 单元测试
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── reconciler/                         # @fancy-react/reconciler - 协调器 (Fiber)
│   │   ├── src/
│   │   │   ├── fiber/                      # Fiber 架构 (FiberNode, FiberTreeConstruction, DoubleBuffering, WorkLoop)
│   │   │   ├── algorithm/                  # 协调算法 (Diff, Key-based, Component, List)
│   │   │   ├── scheduling/                 # 优先级调度 (LaneModel, TimeSlicing, ConcurrentFeatures, Interruption)
│   │   │   ├── effects/                    # 副作用管理 (EffectList, CommitPhase, LayoutEffects, PassiveEffects)
│   │   │   ├── hostConfig/                 # 宿主配置接口定义 (PlatformAbstraction, HostComponentInterface, EventSystemInterface)
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── scheduler/                          # @fancy-react/scheduler - 调度器
│   │   ├── src/
│   │   │   ├── task/                       # 任务调度 (PriorityQueue, TaskPrioritization, DeadlineScheduling, YieldControl)
│   │   │   ├── time/                       # 时间管理 (FrameTiming, IdleCallback, PerformanceMonitoring)
│   │   │   ├── concurrent/                 # 并发模式 (BatchedUpdates, SuspenseSupport, ErrorRecovery)
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared/                             # @fancy-react/shared - 共享工具
│   │   ├── src/
│   │   │   ├── utils/                      # 工具函数 (Object, Array, Function, TypeGuards)
│   │   │   ├── constants/                  # 常量定义 (ReactTypes, PriorityLevels, FiberFlags, HookTypes)
│   │   │   ├── errors/                     # 错误处理 (ErrorBoundaryUtils, DevWarnings, ErrorRecovery)
│   │   │   ├── features/                   # 特性标志 (Experimental, Platform, Performance)
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── dom/                                # @fancy-react/dom - Web 平台渲染器
│   │   ├── src/
│   │   │   ├── hostConfig/                 # DOM 宿主配置 (DOMNodeOperations, PropertyHandling, StyleManagement, TextContentHandling)
│   │   │   ├── events/                     # 事件系统 (SyntheticEvents, EventDelegation, EventPooling, EventPriorities, BrowserCompatibility)
│   │   │   ├── ssr/                        # 服务端 HTML 渲染与客户端注水 (SSRRenderer(HTML Output), Hydration(Client Side), StreamRendering(HTML Stream), PartialHydration)
│   │   │   ├── api/                        # 客户端 API (createRoot, render, unmountComponentAtNode, findDOMNode)
│   │   │   ├── devtools/                   # 开发工具集成 (ReactDevToolsSupport, Profiling, DebugInformation)
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── native/                             # @fancy-react/native - React Native 渲染器
│   │   ├── src/
│   │   │   ├── hostConfig/                 # Native 宿主配置 (NativeComponentMapping, PropsTransformation, LayoutCalculation, NativeModuleInterface)
│   │   │   ├── bridge/                     # 桥接系统 (JavaScriptBridge, NativeMethodCalls, EventHandling, AsyncCommunication)
│   │   │   ├── layout/                     # 布局引擎 (Flexbox, AbsolutePositioning, DimensionCalculation, LayoutTree)
│   │   │   ├── styles/                     # 样式系统 (StyleSheet, StyleResolution, CSS-in-JS, PlatformStyles)
│   │   │   ├── animation/                  # 动画系统 (NativeAnimations, JavaScriptAnimations, GestureHandling, ReanimatedSupport)
│   │   │   ├── platforms/                  # 平台服务 (iOSPlatform, AndroidPlatform, PlatformUtilities)
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── server-runtime/                     # @fancy-react/server-runtime - 服务端运行时 (通用 SSR 逻辑与 RSC)
│   │   ├── src/
│   │   │   ├── hostConfigBridge/           # 宿主配置桥接器 (SSRNodeOperations, DataSerialization, StreamManagement)
│   │   │   ├── pipeline/                   # 渲染管道 (InitialRender, SuspenseHandling, ErrorRecovery, DataFetchingOrchestration)
│   │   │   ├── hydration/                  # 注水元数据生成 (ClientManifestGeneration, HydrationScriptInjection, BoundaryMarkers)
│   │   │   ├── rsc/                        # Server Components (RSCImplementation, StreamingSupport, DataFetching, AssetManagement)
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── devtools/                           # @fancy-react/devtools - 开发者工具
│   │   ├── src/
│   │   │   ├── extension/                  # 浏览器扩展
│   │   │   ├── profiler/                   # 性能分析器
│   │   │   ├── inspector/                  # 组件检查器
│   │   │   ├── timetraveledbg/             # 时间旅行调试
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── test-utils/                         # @fancy-react/test-utils - 测试工具
│   │   ├── src/
│   │   │   ├── testing-library/            # Testing Library 适配
│   │   │   ├── test-renderer/              # 测试渲染器
│   │   │   ├── mocks/                      # Mock 工具
│   │   │   ├── shallow-renderer/           # 浅渲染器
│   │   │   └── index.ts
│   │   ├── test/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── eslint-plugin/                      # @fancy-react/eslint-plugin - ESLint 插件
│       ├── src/
│       │   ├── rules/                      # ESLint 规则 (Hooks, JSX, Performance)
│       │   ├── configs/                    # 配置预设
│       │   └── index.ts
│       ├── test/
│       ├── package.json
│       └── tsconfig.json
│
├── build-scripts/                          # Monorepo 级别的构建脚本和配置
│   ├── rollup.config.ts                    # Rollup 生产构建配置
│   ├── webpack.config.ts                   # Webpack 示例应用配置 (如果示例需要)
│   └── vite.config.ts                      # Vite 开发服务器配置 (用于本地开发和示例)
│
├── scripts/                                # Monorepo 级别的工具脚本
│   ├── build.ts                            # 全局构建脚本 (调用各个包的构建)
│   ├── test.ts                             # 全局测试脚本 (运行所有包的测试)
│   ├── release.ts                          # 发布脚本 (使用 Changesets)
│   ├── benchmark.ts                        # 基准测试运行脚本
│   └── clean.ts                            # 清理脚本
│
├── docs/                                   # 项目文档
│   ├── api/                                # API 文档 (由 TypeDoc 等工具生成或手写)
│   ├── guides/                             # 使用指南、入门教程
│   ├── internals/                          # 内部实现文档 (例如，详细的 Fiber 机制图解)
│   └── README.md                           # 文档目录说明
│
├── examples/                               # 示例应用
│   ├── basic-web-app/                      # 基础 Web 应用 (使用 @fancy-react/dom)
│   │   ├── src/
│   │   ├── public/
│   │   ├── index.html
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ssr-app/                            # SSR 应用 (使用 @fancy-react/dom 和 @fancy-react/server-runtime)
│   │   ├── src/
│   │   ├── server/
│   │   ├── public/
│   │   ├── index.html
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── native-app/                         # React Native 应用 (使用 @fancy-react/native)
│   │   ├── App.tsx
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── android/
│   │   └── ios/
│   │
│   └── concurrent-features/                # 并发特性示例
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
│
├── benchmarks/                             # 性能基准测试
│   ├── render-performance/                 # 渲染性能测试
│   ├── memory-usage/                       # 内存使用测试
│   ├── bundle-size/                        # 包大小分析
│   └── index.ts                            # 基准测试入口
│
├── package.json                            # Monorepo 根 package.json (pnpm-workspace, scripts, devDependencies)
├── pnpm-workspace.yaml                     # pnpm workspace 配置文件 (定义 packages 路径)
├── tsconfig.base.json                      # Monorepo 共享的 TypeScript 配置
├── .prettierrc.js                          # Prettier 配置
├── .eslintrc.js                            # ESLint 配置
├── README.md                               # 项目总 README
└── CHANGELOG.md                            # 变更日志 (由 Changesets 维护)
```