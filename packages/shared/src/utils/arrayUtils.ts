/**
 * 数组工具函数
 */
export const arrayUtils = {
  /**
   * 移除数组中的指定元素
   */
  remove<T>(arr: T[], item: T): T[] {
    const index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  },

  /**
   * 检查数组是否包含指定元素
   */
  includes<T>(arr: T[], item: T): boolean {
    return arr.indexOf(item) !== -1;
  },

  /**
   * 数组去重
   */
  unique<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
  },

  /**
   * 扁平化数组
   */
  flatten<T>(arr: (T | T[])[]): T[] {
    return arr.reduce<T[]>((acc, val) => {
      return acc.concat(Array.isArray(val) ? this.flatten(val) : val);
    }, []);
  }
};