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