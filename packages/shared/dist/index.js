'use strict';

const objectUtils = {
    /**
     * 浅比较两个对象是否相等
     */
    shallowEqual(objA, objB) {
        if (Object.is(objA, objB)) {
            return true;
        }
        if (typeof objA !== 'object' || objA === null ||
            typeof objB !== 'object' || objB === null) {
            return false;
        }
        const keysA = Object.keys(objA);
        const keysB = Object.keys(objB);
        if (keysA.length !== keysB.length) {
            return false;
        }
        for (const key of keysA) {
            if (!Object.prototype.hasOwnProperty.call(objB, key) ||
                !Object.is(objA[key], objB[key])) {
                return false;
            }
        }
        return true;
    },
    /**
     * 检查对象是否为空
     */
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    },
    /**
     * 深度克隆对象
     */
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        if (obj instanceof Array) {
            return obj.map(item => this.deepClone(item));
        }
        if (typeof obj === 'object') {
            const cloned = {};
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    cloned[key] = this.deepClone(obj[key]);
                }
            }
            return cloned;
        }
        return obj;
    }
};

/**
 * 函数工具函数
 */
const functionUtils = {
    /**
     * 空操作函数
     */
    noop() {
        // Intentionally empty
    },
    /**
     * 恒等函数
     */
    identity(value) {
        return value;
    },
    /**
     * 创建节流函数
     */
    throttle(func, wait) {
        let timeout = null;
        let previous = 0;
        return function (...args) {
            const now = Date.now();
            const remaining = wait - (now - previous);
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(this, args);
            }
            else if (!timeout) {
                timeout = setTimeout(() => {
                    previous = Date.now();
                    timeout = null;
                    func.apply(this, args);
                }, remaining);
            }
        };
    },
    /**
     * 创建防抖函数
     */
    debounce(func, wait) {
        let timeout = null;
        return function (...args) {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        };
    }
};

/**
 * 类型守卫函数
 */
const typeGuards = {
    /**
     * 检查是否为函数
     */
    isFunction(value) {
        return typeof value === 'function';
    },
    /**
     * 检查是否为对象（非null）
     */
    isObject(value) {
        return value !== null && typeof value === 'object';
    },
    /**
     * 检查是否为字符串
     */
    isString(value) {
        return typeof value === 'string';
    },
    /**
     * 检查是否为数字
     */
    isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    },
    /**
     * 检查是否为布尔值
     */
    isBoolean(value) {
        return typeof value === 'boolean';
    },
    /**
     * 检查是否为数组
     */
    isArray(value) {
        return Array.isArray(value);
    },
    /**
     * 检查是否为null或undefined
     */
    isNullOrUndefined(value) {
        return value === null || value === undefined;
    },
    /**
     * 检查是否为有效的React元素key
     */
    isValidElementKey(key) {
        return this.isString(key) || this.isNumber(key);
    }
};

/**
 * 性能工具函数
 */
const performanceUtils = {
    /**
     * 高精度时间测量
     */
    now() {
        return performance.now();
    },
    /**
     * 测量函数执行时间
     */
    measure(func, label) {
        return function (...args) {
            const start = performanceUtils.now();
            const result = func.apply(this, args);
            const end = performanceUtils.now();
            if (label) {
                console.log(`${label}: ${end - start}ms`);
            }
            return result;
        };
    },
    /**
     * 创建性能标记
     */
    mark(name) {
        if (typeof performance !== 'undefined' && performance.mark) {
            performance.mark(name);
        }
    },
    /**
     * 测量两个标记之间的时间
     */
    measureBetween(startMark, endMark, measureName) {
        if (typeof performance !== 'undefined' && performance.measure) {
            performance.measure(measureName, startMark, endMark);
        }
    }
};

/**
 * 数组工具函数
 */
const arrayUtils = {
    /**
     * 移除数组中的指定元素
     */
    remove(arr, item) {
        const index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    },
    /**
     * 检查数组是否包含指定元素
     */
    includes(arr, item) {
        return arr.indexOf(item) !== -1;
    },
    /**
     * 数组去重
     */
    unique(arr) {
        return Array.from(new Set(arr));
    },
    /**
     * 扁平化数组
     */
    flatten(arr) {
        return arr.reduce((acc, val) => {
            return acc.concat(Array.isArray(val) ? this.flatten(val) : val);
        }, []);
    }
};

function warn(condition, message) {
    if (!condition) {
        console.warn(message);
    }
}
function invariant(condition, message) {
    if (!condition) {
        throw new Error(`Invariant Violation: ${message}`);
    }
}

const enableSuspense = true;
const enableBatching = false;

/**
 * 事件优先级
 */
const EventPriority = {
    DiscreteEventPriority: 0,
    ContinuousEventPriority: 1,
    DefaultEventPriority: 2,
    IdleEventPriority: 3,
};

/**
 * Fiber副作用标志位
 * 用于标记Fiber节点在协调过程中需要执行的操作
 */
// 不包含任何副作用
const NoFlags = 0b0000000000000000000000000000;
// 更新操作
const Update = 0b0000000000000000000000000100;
// 插入或移动操作  
const Placement = 0b0000000000000000000000001000;
// 删除操作
const Deletion = 0b0000000000000000000000010000;
// 子节点有删除操作
const ChildDeletion = 0b0000000000000000000000100000;
// 内容重置（清空文本内容）
const ContentReset = 0b0000000000000000000001000000;
// useLayoutEffect 相关
const LayoutMask = Update;
const HookLayout = 0b0000000000000000000010000000;
// useEffect 相关
const PassiveMask = Update;
const HookPassive = 0b0000000000000000000100000000;
// ref 相关
const Ref = 0b0000000000000000001000000000;
// Suspense 相关
const ShouldCapture = 0b0000000000000001000000000000;
const DidCapture = 0b0000000000000010000000000000;
// Hydration 相关（服务端渲染）
const Hydrating = 0b0000000000000100000000000000;
const HydrateKids = 0b0000000000001000000000000000;
// 错误边界相关
const DidMount = 0b0000000000010000000000000000;
const DidUnmount = 0b0000000000100000000000000000;
// 调度优先级相关
const ForceUpdate = 0b0000000001000000000000000000;
const PerformedWork = 0b000000000000000000000001;
const PlacementAndUpdate = Placement | Update;
const Callback = 0b000000000000000000100000;
const Snapshot = 0b000000000000000100000000;
const Passive = 0b000000000000001000000000;
const PassiveStatic = 0b000000000000010000000000;
const Visibility = 0b000000000001000000000000;
// 组合标志位
const MutationMask = Placement |
    Update |
    ChildDeletion |
    ContentReset |
    Ref |
    Hydrating;
const LayoutMaskAll = Update |
    Ref |
    HookLayout;
const PassiveMaskAll = Update |
    HookPassive;
// 静态标志位（不会在运行时更改）
const StaticMask = LayoutMask | PassiveMask | Ref;

/**
 * Hook 类型常量
 */
const HookTypesEnum = {
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
};

/**
 * Lane 模型 - React 18+ 的优先级模型
 * 使用位掩码来表示不同的优先级通道
 */
const TotalLanes = 31;
// 同步相关的 Lane
const NoLanes = 0b0000000000000000000000000000000;
const NoLane = 0b0000000000000000000000000000000;
const SyncLane = 0b0000000000000000000000000000001;
// 输入相关的 Lane
const InputContinuousHydrationLane = 0b0000000000000000000000000000010;
const InputContinuousLane = 0b0000000000000000000000000000100;
// 默认相关的 Lane  
const DefaultHydrationLane = 0b0000000000000000000000000001000;
const DefaultLane = 0b0000000000000000000000000010000;
// Transition 相关的 Lane
const TransitionHydrationLane = 0b0000000000000000000000000100000;
const TransitionLanes = 0b0000000001111111111111111000000;
const TransitionLane1 = 0b0000000000000000000000001000000;
const TransitionLane2 = 0b0000000000000000000000010000000;
// TODO 更多 TransitionLane
// Retry 相关的 Lane
const RetryLanes = 0b0000111110000000000000000000000;
const RetryLane1 = 0b0000000010000000000000000000000;
const RetryLane2 = 0b0000000100000000000000000000000;
const RetryLane3 = 0b0000001000000000000000000000000;
const RetryLane4 = 0b0000010000000000000000000000000;
// 其他优先级
const SomeRetryLane = RetryLane1;
const SelectiveHydrationLane = 0b0000100000000000000000000000000;
const NonIdleLanes = 0b0000111111111111111111111111111;
const IdleHydrationLane = 0b0001000000000000000000000000000;
const IdleLane = 0b0010000000000000000000000000000;
const OffscreenLane = 0b0100000000000000000000000000000;
/**
 * Lane 优先级映射
 */
function getHighestPriorityLane(lanes) {
    return lanes & -lanes;
}
function getLanesToRetrySynchronouslyOnError(root) {
    return SyncLane;
}
function includesSomeLane(a, b) {
    return (a & b) !== NoLanes;
}
function isSubsetOfLanes(set, subset) {
    return (set & subset) === subset;
}
function mergeLanes(a, b) {
    return a | b;
}
function removeLanes(set, subset) {
    return set & ~subset;
}

/**
 * React 元素类型常量
 */
const REACT_ELEMENT_TYPE = Symbol.for('react.element');
const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
const REACT_PORTAL_TYPE = Symbol.for('react.portal');
const REACT_CONTEXT_TYPE = Symbol.for('react.context');
const REACT_PROVIDER_TYPE = Symbol.for('react.provider');
const REACT_CONSUMER_TYPE = Symbol.for('react.consumer');
const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
const REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
const REACT_MEMO_TYPE = Symbol.for('react.memo');
const REACT_LAZY_TYPE = Symbol.for('react.lazy');

/**
 * 调度优先级
 */
const ImmediatePriority = 1;
const UserBlockingPriority = 2;
const NormalPriority = 3;
const LowPriority = 4;
const IdlePriority = 5;
const NoPriority = 0;

/**
 * 工作标签 (WorkTag)
 */
const WorkTag = {
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
};

exports.Callback = Callback;
exports.ChildDeletion = ChildDeletion;
exports.ContentReset = ContentReset;
exports.DefaultHydrationLane = DefaultHydrationLane;
exports.DefaultLane = DefaultLane;
exports.Deletion = Deletion;
exports.DidCapture = DidCapture;
exports.DidMount = DidMount;
exports.DidUnmount = DidUnmount;
exports.EventPriority = EventPriority;
exports.ForceUpdate = ForceUpdate;
exports.HookLayout = HookLayout;
exports.HookPassive = HookPassive;
exports.HookTypesEnum = HookTypesEnum;
exports.HydrateKids = HydrateKids;
exports.Hydrating = Hydrating;
exports.IdleHydrationLane = IdleHydrationLane;
exports.IdleLane = IdleLane;
exports.IdlePriority = IdlePriority;
exports.ImmediatePriority = ImmediatePriority;
exports.InputContinuousHydrationLane = InputContinuousHydrationLane;
exports.InputContinuousLane = InputContinuousLane;
exports.LayoutMask = LayoutMask;
exports.LayoutMaskAll = LayoutMaskAll;
exports.LowPriority = LowPriority;
exports.MutationMask = MutationMask;
exports.NoFlags = NoFlags;
exports.NoLane = NoLane;
exports.NoLanes = NoLanes;
exports.NoPriority = NoPriority;
exports.NonIdleLanes = NonIdleLanes;
exports.NormalPriority = NormalPriority;
exports.OffscreenLane = OffscreenLane;
exports.Passive = Passive;
exports.PassiveMask = PassiveMask;
exports.PassiveMaskAll = PassiveMaskAll;
exports.PassiveStatic = PassiveStatic;
exports.PerformedWork = PerformedWork;
exports.Placement = Placement;
exports.PlacementAndUpdate = PlacementAndUpdate;
exports.REACT_CONSUMER_TYPE = REACT_CONSUMER_TYPE;
exports.REACT_CONTEXT_TYPE = REACT_CONTEXT_TYPE;
exports.REACT_ELEMENT_TYPE = REACT_ELEMENT_TYPE;
exports.REACT_FORWARD_REF_TYPE = REACT_FORWARD_REF_TYPE;
exports.REACT_FRAGMENT_TYPE = REACT_FRAGMENT_TYPE;
exports.REACT_LAZY_TYPE = REACT_LAZY_TYPE;
exports.REACT_MEMO_TYPE = REACT_MEMO_TYPE;
exports.REACT_PORTAL_TYPE = REACT_PORTAL_TYPE;
exports.REACT_PROVIDER_TYPE = REACT_PROVIDER_TYPE;
exports.REACT_SUSPENSE_TYPE = REACT_SUSPENSE_TYPE;
exports.Ref = Ref;
exports.RetryLane1 = RetryLane1;
exports.RetryLane2 = RetryLane2;
exports.RetryLane3 = RetryLane3;
exports.RetryLane4 = RetryLane4;
exports.RetryLanes = RetryLanes;
exports.SelectiveHydrationLane = SelectiveHydrationLane;
exports.ShouldCapture = ShouldCapture;
exports.Snapshot = Snapshot;
exports.SomeRetryLane = SomeRetryLane;
exports.StaticMask = StaticMask;
exports.SyncLane = SyncLane;
exports.TotalLanes = TotalLanes;
exports.TransitionHydrationLane = TransitionHydrationLane;
exports.TransitionLane1 = TransitionLane1;
exports.TransitionLane2 = TransitionLane2;
exports.TransitionLanes = TransitionLanes;
exports.Update = Update;
exports.UserBlockingPriority = UserBlockingPriority;
exports.Visibility = Visibility;
exports.WorkTag = WorkTag;
exports.arrayUtils = arrayUtils;
exports.enableBatching = enableBatching;
exports.enableSuspense = enableSuspense;
exports.functionUtils = functionUtils;
exports.getHighestPriorityLane = getHighestPriorityLane;
exports.getLanesToRetrySynchronouslyOnError = getLanesToRetrySynchronouslyOnError;
exports.includesSomeLane = includesSomeLane;
exports.invariant = invariant;
exports.isSubsetOfLanes = isSubsetOfLanes;
exports.mergeLanes = mergeLanes;
exports.objectUtils = objectUtils;
exports.performanceUtils = performanceUtils;
exports.removeLanes = removeLanes;
exports.typeGuards = typeGuards;
exports.warn = warn;
//# sourceMappingURL=index.js.map
