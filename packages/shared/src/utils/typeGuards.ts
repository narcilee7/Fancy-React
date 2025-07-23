/**
 * 类型守卫函数
 */
export const typeGuards = {
  /**
   * 检查是否为函数
   */
  isFunction(value: unknown): value is Function {
    return typeof value === 'function';
  },

  /**
   * 检查是否为对象（非null）
   */
  isObject(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object';
  },

  /**
   * 检查是否为字符串
   */
  isString(value: unknown): value is string {
    return typeof value === 'string';
  },

  /**
   * 检查是否为数字
   */
  isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
  },

  /**
   * 检查是否为布尔值
   */
  isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
  },

  /**
   * 检查是否为数组
   */
  isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  },

  /**
   * 检查是否为null或undefined
   */
  isNullOrUndefined(value: unknown): value is null | undefined {
    return value === null || value === undefined;
  },

  /**
   * 检查是否为有效的React元素key
   */
  isValidElementKey(key: unknown): key is string | number {
    return this.isString(key) || this.isNumber(key);
  }
};