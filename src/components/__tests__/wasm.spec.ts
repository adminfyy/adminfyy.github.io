import { describe, expect, it } from 'vitest'

import {
  fibJS,
  sumPrimesJS,
  matrixMulJS,
  createMatrix,
  benchmark,
  hexDump,
} from '@/utils/wasm'

describe('wasm utils', () => {
  describe('fibJS (iterative)', () => {
    it('returns correct Fibonacci values', () => {
      expect(fibJS(0)).toBe(0)
      expect(fibJS(1)).toBe(1)
      expect(fibJS(5)).toBe(5)
      expect(fibJS(10)).toBe(55)
      expect(fibJS(20)).toBe(6765)
    })
  })

  describe('sumPrimesJS', () => {
    it('returns sum of primes up to limit', () => {
      // Primes ≤ 10: 2, 3, 5, 7 = 17
      expect(sumPrimesJS(10)).toBe(17)
      // Primes ≤ 2: 2
      expect(sumPrimesJS(2)).toBe(2)
      // No primes below 2
      expect(sumPrimesJS(1)).toBe(0)
    })
  })

  describe('matrixMulJS', () => {
    it('multiplies 2x2 matrices correctly', () => {
      const a = [[1, 2], [3, 4]]
      const b = [[5, 6], [7, 8]]
      const c = matrixMulJS(a, b, 2)
      expect(c[0][0]).toBe(1 * 5 + 2 * 7) // 19
      expect(c[0][1]).toBe(1 * 6 + 2 * 8) // 22
      expect(c[1][0]).toBe(3 * 5 + 4 * 7) // 43
      expect(c[1][1]).toBe(3 * 6 + 4 * 8) // 50
    })

    it('handles identity matrix', () => {
      const identity = [[1, 0], [0, 1]]
      const m = [[3, 7], [2, 5]]
      const result = matrixMulJS(m, identity, 2)
      expect(result).toEqual(m)
    })
  })

  describe('createMatrix', () => {
    it('creates an NxN matrix', () => {
      const m = createMatrix(3)
      expect(m.length).toBe(3)
      expect(m[0].length).toBe(3)
    })

    it('values are deterministic', () => {
      const m1 = createMatrix(5)
      const m2 = createMatrix(5)
      expect(m1).toEqual(m2)
    })
  })

  describe('benchmark', () => {
    it('returns a result with name and timeMs', () => {
      const result = benchmark('test', () => 42, 10)
      expect(result.name).toBe('test')
      expect(result.timeMs).toBeGreaterThanOrEqual(0)
      expect(result.value).toBe(42)
    })

    it('runs the function the specified number of iterations', () => {
      let count = 0
      benchmark('counter', () => ++count, 5)
      expect(count).toBe(5)
    })
  })

  describe('hexDump', () => {
    it('formats bytes as hex with ASCII', () => {
      const bytes = new Uint8Array([0x00, 0x61, 0x73, 0x6d])
      const dump = hexDump(bytes, 4)
      expect(dump).toContain('00 61 73 6d')
      expect(dump).toContain('.asm')
    })

    it('handles empty bytes', () => {
      const dump = hexDump(new Uint8Array(0))
      expect(dump).toBe('')
    })

    it('respects the limit parameter', () => {
      const bytes = new Uint8Array(100)
      const dump = hexDump(bytes, 16)
      // Should only show 1 line (16 bytes)
      expect(dump.split('\n').length).toBe(1)
    })
  })
})
