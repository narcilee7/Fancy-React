import type { Hook, Effect } from './hookTypes';

let currentlyRenderingFiber: any = null;
let workInProgressHook: Hook | null = null;

function mountWorkInProgressHook(): Hook {
  const hook: Hook = {
    memoizedState: null,
    updateQueue: null,
    next: null,
  };
  if (!currentlyRenderingFiber.memorizedState) {
    currentlyRenderingFiber.memorizedState = hook;
  } else {
    let last = currentlyRenderingFiber.memorizedState;
    while (last.next) last = last.next;
    last.next = hook;
  }
  workInProgressHook = hook;
  return hook;
}

function updateWorkInProgressHook(): Hook {
  let nextCurrentHook: Hook;
  if (!workInProgressHook) {
    nextCurrentHook = currentlyRenderingFiber.memorizedState;
  } else {
    // TODO: 这里需要优化，尽量减少类型断言
    nextCurrentHook = workInProgressHook.next as Hook;
  }
  workInProgressHook = nextCurrentHook;
  return workInProgressHook!;
}

function pushEffect(fiber: any, effect: Effect) {
  if (!fiber.lastEffect) {
    fiber.lastEffect = effect;
    effect.next = effect;
  } else {
    effect.next = fiber.lastEffect.next;
    fiber.lastEffect.next = effect;
    fiber.lastEffect = effect;
  }
}

function areHookInputsEqual(nextDeps: any[], prevDeps: any[]): boolean {
  if (prevDeps === null) return false;
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (!Object.is(nextDeps[i], prevDeps[i])) {
      return false;
    }
  }
  return true;
}

export function mountEffect(create: () => void | (() => void), deps?: any[]) {
  const hook = mountWorkInProgressHook();
  const effect: Effect = {
    tag: 0,
    create,
    destroy: undefined,
    deps,
    next: null,
  };
  hook.memoizedState = effect;
  pushEffect(currentlyRenderingFiber, effect);
  return undefined;
}

export function updateEffect(create: () => void | (() => void), deps?: any[]) {
  const hook = updateWorkInProgressHook();
  const currentEffect = hook.memoizedState as Effect;
  const currentDeps = currentEffect.deps;
  
  if (deps && currentDeps && areHookInputsEqual(deps, currentDeps)) {
    // 依赖未变，复用当前 effect
    return undefined;
  }
  
  const effect: Effect = {
    tag: 0,
    create,
    destroy: undefined,
    deps,
    next: null,
  };
  hook.memoizedState = effect;
  pushEffect(currentlyRenderingFiber, effect);
  return undefined;
}

export function prepareHooks(fiber: any) {
  currentlyRenderingFiber = fiber;
  workInProgressHook = null;
} 