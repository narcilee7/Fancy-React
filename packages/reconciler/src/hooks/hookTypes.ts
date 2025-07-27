export interface Hook {
  memoizedState: any;
  updateQueue: any;
  next: Hook | null;
}

export interface Effect {
  tag: number;
  create: () => void | (() => void);
  destroy: (() => void) | void;
  deps: any[] | undefined;
  next: Effect | null;
}

export interface HookList {
  memorizedState: Hook | null;
  lastEffect: Effect | null;
} 