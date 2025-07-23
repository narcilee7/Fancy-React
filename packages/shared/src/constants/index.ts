/**
 * React 元素类型常量
 */
export const REACT_ELEMENT_TYPE = Symbol.for('react.element');
export const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
export const REACT_PORTAL_TYPE = Symbol.for('react.portal');
export const REACT_CONTEXT_TYPE = Symbol.for('react.context');
export const REACT_PROVIDER_TYPE = Symbol.for('react.provider');
export const REACT_CONSUMER_TYPE = Symbol.for('react.consumer');
export const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
export const REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
export const REACT_MEMO_TYPE = Symbol.for('react.memo');
export const REACT_LAZY_TYPE = Symbol.for('react.lazy');

/**
 * 优先级常量 (Lane Model)
 */
export const NoLanes = 0b0000000000000000000000000000000;
export const NoLane = 0b0000000000000000000000000000000;

export const SyncLane = 0b0000000000000000000000000000001;
export const InputContinuousLane = 0b0000000000000000000000000000010;
export const DefaultLane = 0b0000000000000000000000000000100;
export const TransitionLane1 = 0b0000000000000000000000000001000;
export const TransitionLane2 = 0b0000000000000000000000000010000;
export const TransitionLane3 = 0b0000000000000000000000000100000;
export const RetryLane1 = 0b0000000000000000000000001000000;
export const RetryLane2 = 0b0000000000000000000000010000000;
export const IdleLane = 0b0100000000000000000000000000000;
export const OffscreenLane = 0b1000000000000000000000000000000;

/**
 * Fiber 标志位
 */
export const NoFlags = 0b000000000000000000000000;
export const PerformedWork = 0b000000000000000000000001;
export const Placement = 0b000000000000000000000010;
export const Update = 0b000000000000000000000100;
export const PlacementAndUpdate = Placement | Update;
export const Deletion = 0b000000000000000000001000;
export const ContentReset = 0b000000000000000000010000;
export const Callback = 0b000000000000000000100000;
export const DidCapture = 0b000000000000000001000000;
export const Ref = 0b000000000000000010000000;
export const Snapshot = 0b000000000000000100000000;
export const Passive = 0b000000000000001000000000;
export const PassiveStatic = 0b000000000000010000000000;
export const Hydrating = 0b000000000000100000000000;
export const Visibility = 0b000000000001000000000000;

/**
 * Hook 类型常量
 */
export const HookTypesEnum = {
  useState: 0,
  useReducer: 1,
  useEffect: 2,
  useLayoutEffect: 3,
  useMemo: 4,
  useCallback: 5,
  useRef: 6,
  useImperativeHandle: 7,
  useContext: 8,
  useTransition: 9,
  useDeferredValue: 10,
  useId: 11,
} as const;

export type HookType = (typeof HookTypesEnum)[keyof typeof HookTypesEnum];

/**
 * 工作标签 (WorkTag)
 */
export const WorkTag = {
  FunctionComponent: 0,
  ClassComponent: 1,
  IndeterminateComponent: 2,
  HostRoot: 3,
  HostComponent: 4,
  HostText: 5,
  Fragment: 7,
  Mode: 8,
  ContextConsumer: 9,
  ContextProvider: 10,
  ForwardRef: 11,
  Profiler: 12,
  SuspenseComponent: 13,
  MemoComponent: 14,
  SimpleMemoComponent: 15,
  LazyComponent: 16,
  IncompleteClassComponent: 17,
  DehydratedFragment: 18,
  SuspenseListComponent: 19,
  ScopeComponent: 21,
  OffscreenComponent: 22,
  LegacyHiddenComponent: 23,
  CacheComponent: 24,
} as const;

export type WorkTagType = (typeof WorkTag)[keyof typeof WorkTag];

/**
 * 事件优先级
 */
export const EventPriority = {
  DiscreteEventPriority: 0,
  ContinuousEventPriority: 1,
  DefaultEventPriority: 2,
  IdleEventPriority: 3,
} as const;

export type EventPriorityType = (typeof EventPriority)[keyof typeof EventPriority];

/**
 * 调度优先级
 */
export const SchedulerPriority = {
  ImmediatePriority: 1,
  UserBlockingPriority: 2,
  NormalPriority: 3,
  LowPriority: 4,
  IdlePriority: 5,
} as const;

export type SchedulerPriorityType = (typeof SchedulerPriority)[keyof typeof SchedulerPriority];