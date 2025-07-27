export interface Dispatcher {
  useState: <S>(initialState: S | (() => S)) => [S, (action: S | ((prev: S) => S)) => void];
  useEffect: (effect: () => void | (() => void), deps?: any[]) => void;
  // 可扩展更多 hooks
}

export const ReactCurrentDispatcher: { current: Dispatcher | null } = {
  current: null,
}; 