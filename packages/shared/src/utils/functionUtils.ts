/**
 * 函数工具函数
 */
export const functionUtils = {
  /**
   * 空操作函数
   */
  noop(): void {
    // Intentionally empty
  },

  /**
   * 恒等函数
   */
  identity<T>(value: T): T {
    return value;
  },

  /**
   * 创建节流函数
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let previous = 0;

    return function (this: any, ...args: Parameters<T>) {
      const now = Date.now();
      const remaining = wait - (now - previous);

      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(this, args);
      } else if (!timeout) {
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
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function (this: any, ...args: Parameters<T>) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }
};
