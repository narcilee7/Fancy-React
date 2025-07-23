/**
 * Fiber副作用标志位
 * 用于标记Fiber节点在协调过程中需要执行的操作
 */

// 不包含任何副作用
export const NoFlags = 0b0000000000000000000000000000;

// 更新操作
export const Update = 0b0000000000000000000000000100;

// 插入或移动操作  
export const Placement = 0b0000000000000000000000001000;

// 删除操作
export const Deletion = 0b0000000000000000000000010000;

// 子节点有删除操作
export const ChildDeletion = 0b0000000000000000000000100000;

// 内容重置（清空文本内容）
export const ContentReset = 0b0000000000000000000001000000;

// useLayoutEffect 相关
export const LayoutMask = Update;
export const HookLayout = 0b0000000000000000000010000000;

// useEffect 相关
export const PassiveMask = Update;
export const HookPassive = 0b0000000000000000000100000000;

// ref 相关
export const Ref = 0b0000000000000000001000000000;

// Suspense 相关
export const ShouldCapture = 0b0000000000000001000000000000;
export const DidCapture = 0b0000000000000010000000000000;

// Hydration 相关（服务端渲染）
export const Hydrating = 0b0000000000000100000000000000;
export const HydrateKids = 0b0000000000001000000000000000;

// 错误边界相关
export const DidMount = 0b0000000000010000000000000000;
export const DidUnmount = 0b0000000000100000000000000000;

// 调度优先级相关
export const ForceUpdate = 0b0000000001000000000000000000;

export const PerformedWork = 0b000000000000000000000001;
export const PlacementAndUpdate = Placement | Update;
export const Callback = 0b000000000000000000100000;
export const Snapshot = 0b000000000000000100000000;
export const Passive = 0b000000000000001000000000;
export const PassiveStatic = 0b000000000000010000000000;
export const Visibility = 0b000000000001000000000000;

// 组合标志位
export const MutationMask = 
  Placement | 
  Update | 
  ChildDeletion | 
  ContentReset | 
  Ref | 
  Hydrating;

export const LayoutMaskAll = 
  Update | 
  Ref | 
  HookLayout;

export const PassiveMaskAll = 
  Update | 
  HookPassive;

// 静态标志位（不会在运行时更改）
export const StaticMask = LayoutMask | PassiveMask | Ref;

// 所有标志位的联合类型
export type FiberFlags = number;

