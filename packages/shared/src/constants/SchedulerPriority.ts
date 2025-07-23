/**
 * 调度优先级
 */

export const ImmediatePriority = 1;
export const UserBlockingPriority = 2;
export const NormalPriority = 3;
export const LowPriority = 4;
export const IdlePriority = 5;
export const NoPriority = 0;


export type PriorityLevel = 
  | typeof ImmediatePriority
  | typeof UserBlockingPriority  
  | typeof NormalPriority
  | typeof LowPriority
  | typeof IdlePriority
  | typeof NoPriority;