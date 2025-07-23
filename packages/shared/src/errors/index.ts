function warn(condition: boolean, message: string) {
  if (!condition) {
    console.warn(message)
  }
}

function invariant(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Invariant Violation: ${message}`)
  }
}

export {
  warn,
  invariant,
}