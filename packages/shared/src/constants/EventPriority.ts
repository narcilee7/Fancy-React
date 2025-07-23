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
