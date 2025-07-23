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
