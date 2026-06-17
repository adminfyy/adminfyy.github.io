/**
 * WebAssembly demo utilities
 *
 * Provides:
 * 1. Arithmetic module (pre-compiled bytes) — add/sub/mul
 * 2. WAT-based module compilation via `wabt` — fib, primes, matrix
 * 3. JS reference implementations for benchmarking
 * 4. Benchmark helper with named results
 */

import WabtModule from 'wabt'

// ─── Pre-built WASM binary: 32-bit integer arithmetic ───
const ARITH_WASM_BYTES = new Uint8Array([
  0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00,
  0x01, 0x07, 0x01, 0x60, 0x02, 0x7f, 0x7f, 0x01, 0x7f,
  0x03, 0x02, 0x01, 0x00,
  0x07, 0x19, 0x03,
  0x03, 0x61, 0x64, 0x64, 0x00, 0x00,
  0x03, 0x73, 0x75, 0x62, 0x00, 0x01,
  0x03, 0x6d, 0x75, 0x6c, 0x00, 0x02,
  0x0a, 0x15, 0x03,
  0x07, 0x00, 0x20, 0x00, 0x20, 0x01, 0x6a, 0x0b,
  0x07, 0x00, 0x20, 0x00, 0x20, 0x01, 0x6b, 0x0b,
  0x07, 0x00, 0x20, 0x00, 0x20, 0x01, 0x6c, 0x0b,
])

export interface WasmArithModule {
  add(a: number, b: number): number
  sub(a: number, b: number): number
  mul(a: number, b: number): number
}

export async function createArithModule(): Promise<WasmArithModule> {
  const { instance } = await WebAssembly.instantiate(ARITH_WASM_BYTES)
  return instance.exports as unknown as WasmArithModule
}

// ─── WAT-based modules (compiled at runtime via wabt) ───

const FIB_WAT = `
(module
  (func (export "fib") (param $n i32) (result i32)
    (local $a i32) (local $b i32) (local $tmp i32) (local $i i32)
    (if (i32.le_s (local.get $n) (i32.const 1))
      (then (return (local.get $n))))
    (local.set $a (i32.const 0))
    (local.set $b (i32.const 1))
    (local.set $i (i32.const 2))
    (block $break
      (loop $loop
        (br_if $break (i32.gt_s (local.get $i) (local.get $n)))
        (local.set $tmp (i32.add (local.get $a) (local.get $b)))
        (local.set $a (local.get $b))
        (local.set $b (local.get $tmp))
        (local.set $i (i32.add (local.get $i) (i32.const 1)))
        (br $loop)))
    (local.get $b))
)
`

const PRIME_WAT = `
(module
  (func (export "sumPrimes") (param $limit i32) (result i32)
    (local $sum i32) (local $i i32) (local $j i32) (local $isPrime i32)
    (local.set $sum (i32.const 0))
    (local.set $i (i32.const 2))
    (block $break
      (loop $outer
        (br_if $break (i32.gt_s (local.get $i) (local.get $limit)))
        (local.set $isPrime (i32.const 1))
        (local.set $j (i32.const 2))
        (block $innerBreak
          (loop $inner
            (br_if $innerBreak (i32.gt_s (i32.mul (local.get $j) (local.get $j)) (local.get $i)))
            (if (i32.eqz (i32.rem_u (local.get $i) (local.get $j)))
              (then
                (local.set $isPrime (i32.const 0))
                (br $innerBreak)))
            (local.set $j (i32.add (local.get $j) (i32.const 1)))
            (br $inner)))
        (if (local.get $isPrime)
          (then (local.set $sum (i32.add (local.get $sum) (local.get $i)))))
        (local.set $i (i32.add (local.get $i) (i32.const 1)))
        (br $outer)))
    (local.get $sum))
)
`

export interface WasmFibModule {
  fib(n: number): number
}

export interface WasmPrimeModule {
  sumPrimes(limit: number): number
}

let wabtInstance: any = null

async function getWabt() {
  if (!wabtInstance) {
    wabtInstance = await WabtModule()
  }
  return wabtInstance
}

async function compileWat(wat: string): Promise<WebAssembly.Instance> {
  const wabt = await getWabt()
  const parsed = wabt.parseWat('module.wat', wat)
  const { buffer } = parsed.toBinary({})
  const { instance } = await WebAssembly.instantiate(buffer, {})
  return instance
}

export async function createFibModule(): Promise<WasmFibModule> {
  const instance = await compileWat(FIB_WAT)
  return instance.exports as unknown as WasmFibModule
}

export async function createPrimeModule(): Promise<WasmPrimeModule> {
  const instance = await compileWat(PRIME_WAT)
  return instance.exports as unknown as WasmPrimeModule
}

// ─── JS reference implementations ───

export function fibJS(n: number): number {
  if (n <= 1) return n
  let a = 0, b = 1
  for (let i = 2; i <= n; i++) {
    const tmp = a + b
    a = b
    b = tmp
  }
  return b
}

export function sumPrimesJS(limit: number): number {
  let sum = 0
  for (let i = 2; i <= limit; i++) {
    let isPrime = true
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) { isPrime = false; break }
    }
    if (isPrime) sum += i
  }
  return sum
}

export function matrixMulJS(a: number[][], b: number[][], n: number): number[][] {
  const c: number[][] = Array.from({ length: n }, () => new Array(n).fill(0))
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      const aik = a[i][k]
      for (let j = 0; j < n; j++) {
        c[i][j] += aik * b[k][j]
      }
    }
  }
  return c
}

export function createMatrix(n: number): number[][] {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => ((i * n + j) % 97) - 48)
  )
}

// ─── Benchmarking ───

export interface BenchmarkResult {
  name: string
  timeMs: number
  value?: number | string
}

export function benchmark(name: string, fn: () => any, iterations: number = 1): BenchmarkResult {
  const start = performance.now()
  let result: any
  for (let i = 0; i < iterations; i++) {
    result = fn()
  }
  return { name, timeMs: performance.now() - start, value: result }
}

// ─── Utilities ───

export function hexDump(bytes: Uint8Array, limit = 32): string {
  const slice = bytes.slice(0, limit)
  const lines: string[] = []
  for (let i = 0; i < slice.length; i += 16) {
    const chunk = Array.from(slice.slice(i, i + 16))
    const hex = chunk.map((b) => (b < 16 ? '0' + b.toString(16) : b.toString(16))).join(' ')
    const ascii = chunk.map((b) => (b >= 32 && b < 127 ? String.fromCharCode(b) : '.')).join('')
    const offset = i.toString(16)
    lines.push(`${'0000'.slice(offset.length) + offset}  ${hex}  |${ascii}|`)
  }
  return lines.join('\n')
}
