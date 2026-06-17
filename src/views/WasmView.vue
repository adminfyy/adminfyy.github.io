<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import {
  createArithModule,
  createFibModule,
  createPrimeModule,
  createMatrixModule,
  wasmMatrixMul,
  fibJS,
  sumPrimesJS,
  matrixMulJS,
  createMatrix,
  benchmark,
  hexDump,
  ARITH_WAT,
  FIB_WAT,
  PRIME_WAT,
  MATRIX_WAT,
} from '@/utils/wasm'
import type { WasmArithModule, WasmFibModule, WasmPrimeModule, WasmMatrixModule, BenchmarkResult } from '@/utils/wasm'

// ─── WASM module state ───
const wasmReady = ref(false)
const wasmError = ref('')
const loadingStatus = ref('Initializing wabt...')

let arithModule: WasmArithModule | null = null
let fibModule: WasmFibModule | null = null
let primeModule: WasmPrimeModule | null = null
let matrixModule: WasmMatrixModule | null = null

// ─── Arithmetic demo ───
const aInput = ref(42)
const bInput = ref(17)

const arithResult = computed(() => {
  if (!arithModule) return null
  const a = aInput.value, b = bInput.value
  return {
    wasmAdd: arithModule.add(a, b), jsAdd: a + b,
    wasmSub: arithModule.sub(a, b), jsSub: a - b,
    wasmMul: arithModule.mul(a, b), jsMul: a * b,
  }
})

// ─── Hex dump ───
const WASM_BYTES = new Uint8Array([
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
const hexDumpText = ref('')

// ─── WAT source viewer ───
type WatTab = 'arith' | 'fib' | 'prime' | 'matrix'
const activeWat = ref<WatTab>('arith')
const activeWatSource = computed(() => {
  switch (activeWat.value) {
    case 'arith': return ARITH_WAT
    case 'fib': return FIB_WAT
    case 'prime': return PRIME_WAT
    case 'matrix': return MATRIX_WAT
  }
})

// ─── Performance benchmark ───
const benchRunning = ref(false)
const benchResults = ref<{ name: string; results: BenchmarkResult[] }[]>([])
const fibN = ref(35)
const primeLimit = ref(50000)
const matrixSize = ref(80)
const loopCount = ref(1000)

const runBenchmarks = async () => {
  benchRunning.value = true
  benchResults.value = []
  await new Promise(r => setTimeout(r, 50))

  const groups: { name: string; results: BenchmarkResult[] }[] = []

  // 1. Fibonacci
  const n = fibN.value
  const fibIter: BenchmarkResult[] = []
  fibIter.push(benchmark('JS iterative', () => fibJS(n), loopCount.value))
  if (fibModule) {
    const wasmFib = fibModule
    fibIter.push(benchmark('WASM iterative', () => wasmFib.fib(n), loopCount.value))
  }
  groups.push({ name: `Fibonacci(${n})`, results: fibIter })

  // 2. Prime sieve
  const limit = primeLimit.value
  const primeRes: BenchmarkResult[] = []
  primeRes.push(benchmark('JS sumPrimes', () => sumPrimesJS(limit), 1))
  if (primeModule) {
    const wasmPrime = primeModule
    primeRes.push(benchmark('WASM sumPrimes', () => wasmPrime.sumPrimes(limit), 1))
  }
  groups.push({ name: `Sum Primes(≤${limit})`, results: primeRes })

  // 3. Matrix multiply
  const sz = matrixSize.value
  const matA = createMatrix(sz)
  const matB = createMatrix(sz)
  const matRes: BenchmarkResult[] = []
  matRes.push(benchmark('JS matrixMul', () => matrixMulJS(matA, matB, sz), 1))
  if (matrixModule) {
    const wasmMat = matrixModule
    matRes.push(benchmark('WASM matrixMul', () => {
      const mem = wasmMat.mem
      const buf = new Int32Array(mem.buffer)
      const aOff = 0, bOff = sz * sz, cOff = 2 * sz * sz
      for (let i = 0; i < sz; i++)
        for (let j = 0; j < sz; j++) {
          buf[aOff + i * sz + j] = matA[i][j]
          buf[bOff + i * sz + j] = matB[i][j]
        }
      wasmMat.matMul(aOff * 4, bOff * 4, cOff * 4, sz)
      return buf[cOff] // return first element
    }, 1))
  }
  groups.push({ name: `Matrix ${sz}×${sz}`, results: matRes })

  // 4. Arithmetic tight loop
  const a = aInput.value, b = bInput.value
  const arithRes: BenchmarkResult[] = []
  arithRes.push(benchmark('JS (a*b+a-b)', () => {
    let s = 0
    for (let i = 0; i < loopCount.value; i++) s += a * b + a - b
    return s
  }, 1))
  if (arithModule) {
    const mod = arithModule
    arithRes.push(benchmark('WASM (a*b+a-b)', () => {
      let s = 0
      for (let i = 0; i < loopCount.value; i++) s += mod.mul(a, b) + mod.add(a, b) - mod.sub(a, b)
      return s
    }, 1))
  }
  groups.push({ name: `Arithmetic ×${loopCount.value}`, results: arithRes })

  benchResults.value = groups
  benchRunning.value = false
}

// ─── Chart rendering ───
const chartCanvas = ref<HTMLCanvasElement | null>(null)

const renderChart = () => {
  const canvas = chartCanvas.value
  if (!canvas || benchResults.value.length === 0) return
  const ctx = canvas.getContext('2d')!
  canvas.width = canvas.clientWidth
  canvas.height = 280

  const allTimes: number[] = []
  benchResults.value.forEach((g: any) => g.results.forEach((r: any) => allTimes.push(r.timeMs)))
  const maxTime = Math.max(...allTimes, 1)

  const padding = { top: 20, right: 20, bottom: 40, left: 140 }
  const chartW = canvas.width - padding.left - padding.right
  const chartH = canvas.height - padding.top - padding.bottom

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#f8fafc'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  let y = padding.top
  const barH = 18
  const gap = 6
  const groupGap = 16
  const colors = { 'JS': '#6366f1', 'WASM': '#059669' }

  for (const group of benchResults.value) {
    ctx.fillStyle = '#1e293b'
    ctx.font = 'bold 11px system-ui'
    ctx.textAlign = 'right'
    ctx.fillText(group.name, padding.left - 10, y + barH)

    y += 4
    for (const r of group.results) {
      const isWasm = r.name.includes('WASM')
      const color = isWasm ? colors.WASM : colors.JS
      const w = Math.max(2, (r.timeMs / maxTime) * chartW)

      y += barH + gap
      ctx.fillStyle = color
      ctx.fillRect(padding.left, y - barH + 2, w, barH - 2)

      ctx.fillStyle = '#334155'
      ctx.font = '11px system-ui'
      ctx.textAlign = 'left'
      const label = `${r.name}: ${r.timeMs.toFixed(2)}ms`
      ctx.fillText(label, padding.left + w + 6, y - 2)
    }
    y += groupGap
  }
}

// ─── Init ───
onMounted(async () => {
  try {
    loadingStatus.value = 'Loading arithmetic module...'
    arithModule = await createArithModule()

    loadingStatus.value = 'Compiling WAT fibonacci module...'
    fibModule = await createFibModule()

    loadingStatus.value = 'Compiling WAT prime module...'
    primeModule = await createPrimeModule()

    loadingStatus.value = 'Compiling WAT matrix module...'
    matrixModule = await createMatrixModule()

    wasmReady.value = true
    hexDumpText.value = hexDump(WASM_BYTES)
  } catch (e) {
    wasmError.value = (e as Error).message
    console.error('WASM init failed:', e)
  }
})
</script>

<template>
  <main class="wasm-page">
    <section class="hero">
      <p class="eyebrow">WebAssembly</p>
      <h1>WASM Performance Benchmarks</h1>
      <p>Compare WebAssembly vs JavaScript across Fibonacci, prime sieve, matrix multiplication, and arithmetic loops.</p>
    </section>

    <div v-if="wasmError" class="error-banner">
      <strong>WASM Error:</strong> {{ wasmError }}
      <p>Some benchmarks require WebAssembly support. JS-only benchmarks still work.</p>
    </div>
    <div v-if="!wasmReady && !wasmError" class="loading-banner">
      <span class="spinner"></span> {{ loadingStatus }}
    </div>

    <section class="card" v-if="wasmReady">
      <h2>Arithmetic Module (Pre-compiled WASM)</h2>
      <p class="hint">A minimal hand-crafted WASM module: add, sub, mul on i32.</p>
      <div class="input-row">
        <label>A = <input v-model.number="aInput" type="number" /></label>
        <label>B = <input v-model.number="bInput" type="number" /></label>
      </div>
      <div v-if="arithResult" class="results-grid">
        <div class="result-item"><span class="label">WASM add</span><span class="value">{{ arithResult.wasmAdd }}</span></div>
        <div class="result-item"><span class="label">JS add</span><span class="value">{{ arithResult.jsAdd }}</span></div>
        <div class="result-item"><span class="label">WASM sub</span><span class="value">{{ arithResult.wasmSub }}</span></div>
        <div class="result-item"><span class="label">JS sub</span><span class="value">{{ arithResult.jsSub }}</span></div>
        <div class="result-item"><span class="label">WASM mul</span><span class="value">{{ arithResult.wasmMul }}</span></div>
        <div class="result-item"><span class="label">JS mul</span><span class="value">{{ arithResult.jsMul }}</span></div>
      </div>
    </section>

    <section class="card">
      <h2>WASM Binary Hex Dump</h2>
      <p class="hint">Raw bytes of the arithmetic module (51 bytes). This is the actual machine code that runs in the WASM VM.</p>
      <pre class="hex-dump">{{ hexDumpText }}</pre>
    </section>

    <section class="card">
      <h2>WAT Source Code</h2>
      <p class="hint">
        WebAssembly Text Format (WAT) — the human-readable assembly language that compiles to WASM bytecode.
        These modules are compiled at runtime via <code>wabt</code>.
      </p>
      <div class="wat-tabs">
        <button :class="{ active: activeWat === 'arith' }" @click="activeWat = 'arith'">Arithmetic</button>
        <button :class="{ active: activeWat === 'fib' }" @click="activeWat = 'fib'">Fibonacci</button>
        <button :class="{ active: activeWat === 'prime' }" @click="activeWat = 'prime'">Prime Sieve</button>
        <button :class="{ active: activeWat === 'matrix' }" @click="activeWat = 'matrix'">Matrix Mul</button>
      </div>
      <pre class="wat-source"><code>{{ activeWatSource }}</code></pre>
      <div class="wat-legend">
        <span><code>i32</code> 32-bit integer</span>
        <span><code>local.get</code> read variable</span>
        <span><code>i32.add/sub/mul</code> arithmetic</span>
        <span><code>i32.load/store</code> memory access</span>
        <span><code>block/loop/br_if</code> control flow</span>
      </div>
    </section>

    <section class="card benchmark-card">
      <h2>Performance Comparison</h2>
      <p class="hint">Run benchmarks comparing JS vs WASM implementations.</p>
      <div class="bench-config">
        <label>Fib N: <input v-model.number="fibN" type="number" min="5" max="45" /></label>
        <label>Prime ≤: <input v-model.number="primeLimit" type="number" min="100" max="500000" /></label>
        <label>Matrix: <input v-model.number="matrixSize" type="number" min="10" max="200" /></label>
        <label>Loops: <input v-model.number="loopCount" type="number" min="100" max="100000" /></label>
        <button @click="runBenchmarks" :disabled="benchRunning || !wasmReady">
          {{ benchRunning ? 'Running...' : 'Run Benchmarks' }}
        </button>
      </div>

      <div v-if="benchResults.length > 0" class="bench-output">
        <canvas ref="chartCanvas" class="bench-chart"></canvas>
        <div class="bench-table">
          <div v-for="group in benchResults" :key="group.name" class="bench-group">
            <h3>{{ group.name }}</h3>
            <div v-for="r in group.results" :key="r.name" class="bench-row" :class="{ winner: isWinner(group, r) }">
              <span class="bench-name" :class="r.name.includes('WASM') ? 'wasm' : 'js'">{{ r.name }}</span>
              <span class="bench-time">{{ r.timeMs.toFixed(2) }} ms</span>
              <span v-if="r.value !== undefined" class="bench-val">= {{ r.value }}</span>
              <span v-if="isWinner(group, r)" class="bench-badge">Fastest</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
export default {
  methods: {
    isWinner(group: { results: { timeMs: number }[] }, r: { timeMs: number }) {
      const min = Math.min(...group.results.map(x => x.timeMs))
      return r.timeMs === min && group.results.length > 1
    },
  },
}
</script>

<style scoped>
.wasm-page { width: 100%; display: grid; gap: 1rem; animation: rise-in 0.5s var(--ease-out) both; }

.hero {
  border-radius: var(--radius-xl); padding: 1.2rem; color: #fff;
  background: linear-gradient(136deg, #065f46, #059669 48%, #10b981);
  box-shadow: var(--shadow-lg); position: relative; overflow: hidden;
}
.hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 84% 10%, rgba(255,255,255,0.08), transparent 30%);
  pointer-events: none;
}
.eyebrow { text-transform: uppercase; letter-spacing: 0.12em; font-size: 11px; opacity: 0.7; font-weight: 600; }
.hero h1 { font-family: var(--font-display); font-size: clamp(1.6rem, 4vw, 2.2rem); margin: 0.3rem 0; letter-spacing: -0.03em; }
.hero p { opacity: 0.85; font-size: 0.92rem; }

.error-banner { background: #fef2f2; border: 1px solid #fca5a5; border-radius: var(--radius-md); padding: 0.75rem 1rem; color: #991b1b; font-size: 0.92rem; }
.error-banner p { margin: 0.25rem 0 0; opacity: 0.7; font-size: 0.85rem; }
.loading-banner { background: var(--bg-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.92rem; }
.spinner { width: 16px; height: 16px; border: 2px solid var(--color-border); border-top-color: #059669; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.card { border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1rem; background: var(--surface-glass); }
.card h2 { font-family: var(--font-display); margin-bottom: 0.5rem; font-size: 1rem; }
.hint { font-size: 0.92rem; color: var(--color-text-secondary); margin-bottom: 0.75rem; }

.input-row { display: flex; gap: 1rem; margin-bottom: 0.75rem; }
label { display: grid; gap: 0.35rem; font-size: 0.92rem; }
input { width: 100%; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 0.5rem; color: var(--color-text); background: var(--bg-0); font-size: 0.92rem; }

.results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
.result-item { border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 0.5rem; background: var(--bg-2); display: flex; flex-direction: column; align-items: center; gap: 0.2rem; }
.result-item .label { font-size: 11px; color: var(--color-text-secondary); }
.result-item .value { font-size: 1rem; font-weight: 600; color: #059669; }

.hex-dump { white-space: pre; border: 1px dashed var(--color-border-hover); padding: 0.75rem; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.85rem; background: var(--bg-2); overflow-x: auto; }

.wat-tabs { display: flex; gap: 0.35rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
.wat-tabs button {
  border: 1px solid var(--color-border); border-radius: var(--radius-pill);
  padding: 0.3rem 0.7rem; background: var(--bg-2); color: var(--color-text-secondary);
  cursor: pointer; font-size: 0.85rem; transition: all var(--duration-fast) ease;
}
.wat-tabs button:hover { border-color: var(--color-border-hover); background: var(--accent-bg-subtle); }
.wat-tabs button.active { border-color: #059669; background: rgba(5, 150, 105, 0.1); color: #059669; font-weight: 600; }

.wat-source {
  white-space: pre; border: 1px solid var(--color-border); padding: 0.75rem 1rem;
  border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.82rem;
  background: #1e293b; color: #e2e8f0; overflow-x: auto; line-height: 1.6;
  max-height: 400px; overflow-y: auto; margin: 0;
}
.wat-source code { color: #e2e8f0; }

.wat-legend {
  display: flex; gap: 0.8rem; flex-wrap: wrap; margin-top: 0.5rem;
  font-size: 0.78rem; color: var(--color-text-secondary);
}
.wat-legend code {
  font-family: var(--font-mono); font-size: 0.75rem; color: #059669;
  background: rgba(5, 150, 105, 0.08); padding: 0.1rem 0.3rem; border-radius: 3px;
}

.benchmark-card { border-color: rgba(16, 185, 129, 0.3); }
.bench-config { display: flex; gap: 0.75rem; align-items: end; margin-bottom: 1rem; flex-wrap: wrap; }
.bench-config label { flex: 1; min-width: 80px; }
button { border: 1px solid rgba(16, 185, 129, 0.4); border-radius: var(--radius-pill); padding: 0.5rem 1rem; background: #059669; color: #fff; cursor: pointer; font-size: 0.92rem; font-weight: 600; transition: all var(--duration-fast) ease; white-space: nowrap; }
button:hover { background: #047857; }
button:disabled { opacity: 0.5; cursor: not-allowed; }

.bench-chart { width: 100%; height: 280px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: #f8fafc; margin-bottom: 1rem; }

.bench-table { display: grid; gap: 0.75rem; }
.bench-group h3 { font-size: 0.88rem; font-weight: 600; margin-bottom: 0.35rem; color: var(--color-heading); }
.bench-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.4rem 0.6rem; border-radius: var(--radius-sm); font-size: 0.92rem; }
.bench-row.winner { background: rgba(16, 185, 129, 0.08); }
.bench-name { font-weight: 500; min-width: 120px; }
.bench-name.wasm { color: #059669; }
.bench-name.js { color: #6366f1; }
.bench-time { font-family: var(--font-mono); font-weight: 600; color: var(--color-heading); }
.bench-val { color: var(--color-text-secondary); font-size: 0.85rem; }
.bench-badge { margin-left: auto; background: #059669; color: #fff; font-size: 11px; padding: 0.15rem 0.5rem; border-radius: var(--radius-pill); font-weight: 600; }

@media (max-width: 640px) {
  .results-grid { grid-template-columns: repeat(2, 1fr); }
  .bench-config { flex-direction: column; }
}
</style>
