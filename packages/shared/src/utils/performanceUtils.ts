/**
 * 性能工具函数
 */
export const performanceUtils = {
  /**
   * 高精度时间测量
   */
  now(): number {
    return performance.now();
  },

  /**
   * 测量函数执行时间
   */
  measure<T extends (...args: any[]) => any>(
    func: T,
    label?: string
  ): (...args: Parameters<T>) => ReturnType<T> {
    return function (this: any, ...args: Parameters<T>) {
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
  mark(name: string): void {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(name);
    }
  },

  /**
   * 测量两个标记之间的时间
   */
  measureBetween(startMark: string, endMark: string, measureName: string): void {
    if (typeof performance !== 'undefined' && performance.measure) {
      performance.measure(measureName, startMark, endMark);
    }
  }
};