import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach
} from 'vitest'
import { 
  objectUtils, 
  arrayUtils, 
  functionUtils, 
  typeGuards, 
  performanceUtils 
} from '../src/utils'

describe('objectUtils', () => {
  describe('shallowEqual', () => {
    it('should return true for identical objects', () => {
      const obj = { a: 1, b: 2 }
      const obj2 = { a: 1, b: 2 }
      expect(objectUtils.shallowEqual(obj, obj2)).toBe(true)
    })
  })
})