function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export {
  isFunction,
  isObject
}