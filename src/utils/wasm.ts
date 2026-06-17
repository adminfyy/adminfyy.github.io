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

export const ARITH_WAT = `
(module
  (func (export "add") (param i32 i32) (result i32)
    local.get 0 local.get 1 i32.add)
  (func (export "sub") (param i32 i32) (result i32)
    local.get 0 local.get 1 i32.sub)
  (func (export "mul") (param i32 i32) (result i32)
    local.get 0 local.get 1 i32.mul)
)
`

// ─── Pre-built WASM binary: 32-bit integer arithmetic ───
const ARITH_WASM_BYTES = new Uint8Array([
  0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00,
  0x01, 0x07, 0x01, 0x60, 0x02, 0x7f, 0x7f, 0x01, 0x7f,
  0x03, 0x04, 0x03, 0x00, 0x00, 0x00,
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

export const FIB_WAT = `
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

export const PRIME_WAT = `
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

export const MATRIX_WAT = `
(module
  (memory (export "mem") 1)
  (func (export "matMul")
    (param $aOff i32) (param $bOff i32) (param $cOff i32)
    (param $n i32)
    (local $i i32) (local $j i32) (local $k i32)
    (local $sum i32) (local $aik i32)
    (local.set $i (i32.const 0))
    (block $breakI
      (loop $loopI
        (br_if $breakI (i32.ge_s (local.get $i) (local.get $n)))
        (local.set $j (i32.const 0))
        (block $breakJ
          (loop $loopJ
            (br_if $breakJ (i32.ge_s (local.get $j) (local.get $n)))
            (local.set $sum (i32.const 0))
            (local.set $k (i32.const 0))
            (block $breakK
              (loop $loopK
                (br_if $breakK (i32.ge_s (local.get $k) (local.get $n)))
                ;; aik = mem[(i*n+k)*4 + aOff]
                (local.set $aik
                  (i32.load
                    (i32.add (local.get $aOff)
                      (i32.mul (i32.add (i32.mul (local.get $i) (local.get $n)) (local.get $k)) (i32.const 4)))))
                ;; sum += aik * mem[(k*n+j)*4 + bOff]
                (local.set $sum
                  (i32.add (local.get $sum)
                    (i32.mul (local.get $aik)
                      (i32.load
                        (i32.add (local.get $bOff)
                          (i32.mul (i32.add (i32.mul (local.get $k) (local.get $n)) (local.get $j)) (i32.const 4)))))))
                (local.set $k (i32.add (local.get $k) (i32.const 1)))
                (br $loopK)))
            ;; mem[(i*n+j)*4 + cOff] = sum
            (i32.store
              (i32.add (local.get $cOff)
                (i32.mul (i32.add (i32.mul (local.get $i) (local.get $n)) (local.get $j)) (i32.const 4)))
              (local.get $sum))
            (local.set $j (i32.add (local.get $j) (i32.const 1)))
            (br $loopJ)))
        (local.set $i (i32.add (local.get $i) (i32.const 1)))
        (br $loopI)))
)
`

export interface WasmMatrixModule {
  matMul(aOff: number, bOff: number, cOff: number, n: number): void
  mem: WebAssembly.Memory
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

export async function createMatrixModule(): Promise<WasmMatrixModule> {
  const instance = await compileWat(MATRIX_WAT)
  return instance.exports as unknown as WasmMatrixModule
}

// ─── WASM matrix multiply using linear memory ───

export async function wasmMatrixMul(n: number, a: number[][], b: number[][]): Promise<number[][]> {
  const mod = await createMatrixModule()
  const mem = mod.mem
  const buf = new Int32Array(mem.buffer)
  const aOff = 0
  const bOff = n * n
  const cOff = 2 * n * n

  // Write matrices into WASM memory
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      buf[aOff + i * n + j] = a[i][j]
      buf[bOff + i * n + j] = b[i][j]
    }

  mod.matMul(aOff * 4, bOff * 4, cOff * 4, n)

  // Read result back
  const c: number[][] = []
  for (let i = 0; i < n; i++) {
    c.push([])
    for (let j = 0; j < n; j++) {
      c[i].push(buf[cOff + i * n + j])
    }
  }
  return c
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
