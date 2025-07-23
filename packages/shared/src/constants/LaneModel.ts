/**
 * Lane 模型 - React 18+ 的优先级模型
 * 使用位掩码来表示不同的优先级通道
 */
export const TotalLanes = 31;

// 同步相关的 Lane
export const NoLanes = 0b0000000000000000000000000000000;
export const NoLane = 0b0000000000000000000000000000000;
export const SyncLane = 0b0000000000000000000000000000001;

// 输入相关的 Lane
export const InputContinuousHydrationLane = 0b0000000000000000000000000000010;
export const InputContinuousLane = 0b0000000000000000000000000000100;

// 默认相关的 Lane  
export const DefaultHydrationLane = 0b0000000000000000000000000001000;
export const DefaultLane = 0b0000000000000000000000000010000;

// Transition 相关的 Lane
export const TransitionHydrationLane = 0b0000000000000000000000000100000;
export const TransitionLanes = 0b0000000001111111111111111000000;
export const TransitionLane1 = 0b0000000000000000000000001000000;
export const TransitionLane2 = 0b0000000000000000000000010000000;
// TODO 更多 TransitionLane

// Retry 相关的 Lane
export const RetryLanes = 0b0000111110000000000000000000000;
export const RetryLane1 = 0b0000000010000000000000000000000;
export const RetryLane2 = 0b0000000100000000000000000000000;
export const RetryLane3 = 0b0000001000000000000000000000000;
export const RetryLane4 = 0b0000010000000000000000000000000;

// 其他优先级
export const SomeRetryLane = RetryLane1;
export const SelectiveHydrationLane = 0b0000100000000000000000000000000;
export const NonIdleLanes = 0b0000111111111111111111111111111;
export const IdleHydrationLane = 0b0001000000000000000000000000000;
export const IdleLane = 0b0010000000000000000000000000000;
export const OffscreenLane = 0b0100000000000000000000000000000;

export type Lane = number;
export type Lanes = number;

/**
 * Lane 优先级映射
 */
export function getHighestPriorityLane(lanes: Lanes): Lane {
  return lanes & -lanes;
}

export function getLanesToRetrySynchronouslyOnError(root: any): Lanes {
  return SyncLane;
}

export function includesSomeLane(a: Lanes, b: Lanes): boolean {
  return (a & b) !== NoLanes;
}

export function isSubsetOfLanes(set: Lanes, subset: Lanes): boolean {
  return (set & subset) === subset;
}

export function mergeLanes(a: Lanes, b: Lanes): Lanes {
  return a | b;
}

export function removeLanes(set: Lanes, subset: Lanes): Lanes {
  return set & ~subset;
}