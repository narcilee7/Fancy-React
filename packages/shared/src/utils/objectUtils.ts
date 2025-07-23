export const objectUtils = {
  /**
   * 浅比较两个对象是否相等
   */
  shallowEqual<T extends Record<string, any>>(objA: T, objB: T): boolean {
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
  isEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
  },

  /**
   * 深度克隆对象
   */
  deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime()) as T;
    }

    if (obj instanceof Array) {
      return obj.map(item => this.deepClone(item)) as T;
    }

    if (typeof obj === 'object') {
      const cloned = {} as Record<string, any>;
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          cloned[key] = this.deepClone((obj as any)[key]);
        }
      }
      return cloned as T;
    }

    return obj;
  }
};
