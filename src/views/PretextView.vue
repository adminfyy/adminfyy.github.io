<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import {
  SAMPLE_TEXTS,
  BODY_FONT,
  renderTextOnCanvas,
  flowTextAroundObstacle,
  predictHeights,
  computeShrinkWrap,
  benchmarkVsDOM,
  prepareWithSegments,
  layoutWithLines,
  measureLineStats,
  measureNaturalWidth,
} from '@/utils/pretext'
import type { VirtualItem, BenchmarkResult, ShrinkWrapResult } from '@/utils/pretext'

type Tab = 'canvas' | 'flow' | 'virtual' | 'bench'
const activeTab = ref<Tab>('canvas')

// ─── Demo 1: Canvas Text ───
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasText = ref(SAMPLE_TEXTS[0])
const canvasWidth = ref(480)
const lineHeight = ref(24)
const lineResults = ref<{ text: string; width: number }[]>([])
const canvasHeight = ref(0)
const lineCount = ref(0)

const drawCanvas = () => {
  const c = canvasRef.value
  if (!c) return
  c.width = canvasWidth.value
  const ctx = c.getContext('2d')
  if (!ctx) return
  const result = renderTextOnCanvas(ctx, canvasText.value, BODY_FONT, canvasWidth.value - 24, lineHeight.value, '#1e293b')
  lineResults.value = result.lines
  lineCount.value = result.lineCount
  c.height = Math.max(result.height + 40, 100)
  canvasHeight.value = result.height
}

watch([canvasText, canvasWidth, lineHeight], () => nextTick(drawCanvas))
onMounted(() => nextTick(drawCanvas))

// ─── Demo 2: Text Around Obstacle ───
const flowCanvasRef = ref<HTMLCanvasElement | null>(null)
const flowText = ref(SAMPLE_TEXTS[1])
const obstacleX = ref(160)
const obstacleY = ref(20)
const obstacleW = ref(120)
const obstacleH = ref(100)
const flowLines = ref(0)
let flowDragging = false

const drawFlow = () => {
  const c = flowCanvasRef.value
  if (!c) return
  const w = c.clientWidth || 520
  c.width = w
  const ctx = c.getContext('2d')
  if (!ctx) return

  const lines = flowTextAroundObstacle(
    flowText.value, BODY_FONT, w - 24, lineHeight.value,
    { x: obstacleX.value, y: obstacleY.value, w: obstacleW.value, h: obstacleH.value },
  )

  ctx.clearRect(0, 0, w, c.height)

  // Draw obstacle
  ctx.fillStyle = 'rgba(99, 102, 241, 0.12)'
  ctx.strokeStyle = '#6366f1'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.roundRect(obstacleX.value, obstacleY.value, obstacleW.value, obstacleH.value, 10)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = '#6366f1'
  ctx.font = '600 13px Inter, system-ui, sans-serif'
  ctx.fillText('Drag me!', obstacleX.value + 28, obstacleY.value + obstacleH.value / 2 + 4)

  // Draw text
  ctx.font = BODY_FONT
  ctx.fillStyle = '#1e293b'
  const maxY = lines.reduce((m, l) => Math.max(m, l.y + lineHeight.value), 0)
  c.height = Math.max(maxY + 20, 180)

  for (const line of lines) {
    ctx.fillText(line.text, line.x + 12, line.y)
  }
  flowLines.value = lines.length
}

const onFlowMouseDown = (e: MouseEvent) => {
  const c = flowCanvasRef.value
  if (!c) return
  const rect = c.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  if (mx >= obstacleX.value && mx <= obstacleX.value + obstacleW.value &&
      my >= obstacleY.value && my <= obstacleY.value + obstacleH.value) {
    flowDragging = true
  }
}
const onFlowMouseMove = (e: MouseEvent) => {
  if (!flowDragging) return
  const c = flowCanvasRef.value
  if (!c) return
  const rect = c.getBoundingClientRect()
  obstacleX.value = Math.max(0, e.clientX - rect.left - obstacleW.value / 2)
  obstacleY.value = Math.max(0, e.clientY - rect.top - obstacleH.value / 2)
  drawFlow()
}
const onFlowMouseUp = () => { flowDragging = false }

watch(flowText, () => nextTick(drawFlow))
onMounted(() => nextTick(drawFlow))

// ─── Demo 3: Virtual List ───
const virtualTexts = ref(SAMPLE_TEXTS)
const virtualItems = ref<VirtualItem[]>([])
const virtualWidth = ref(400)
const totalDomHeight = ref(0)
const totalPredictedHeight = ref(0)

const computeVirtual = () => {
  virtualItems.value = predictHeights(virtualTexts.value, BODY_FONT, virtualWidth.value - 32, lineHeight.value)
  totalPredictedHeight.value = virtualItems.value.reduce((s, i) => s + i.predictedHeight + 16, 0)
  // Actual DOM measurement for comparison
  nextTick(() => {
    const cards = document.querySelectorAll('.v-card-actual')
    let h = 0
    cards.forEach(c => { h += (c as HTMLElement).offsetHeight + 16 })
    totalDomHeight.value = h
  })
}

watch(virtualWidth, computeVirtual)
onMounted(computeVirtual)

// ─── Demo 4: Benchmark ───
const benchText = ref(SAMPLE_TEXTS[0])
const benchIterations = ref(500)
const benchResult = ref<BenchmarkResult | null>(null)
const benchRunning = ref(false)

const runBench = async () => {
  benchRunning.value = true
  benchResult.value = null
  await nextTick()
  benchResult.value = await benchmarkVsDOM(benchText.value, BODY_FONT, 480, lineHeight.value, benchIterations.value)
  benchRunning.value = false
}

// ─── Shrink-wrap demo (bonus inside canvas tab) ───
const shrinkText = ref(SAMPLE_TEXTS[3])
const shrinkMaxWidth = ref(500)
const shrinkResult = computed<ShrinkWrapResult | null>(() => {
  if (!shrinkText.value) return null
  return computeShrinkWrap(shrinkText.value, BODY_FONT, shrinkMaxWidth.value)
})
</script>

<template>
  <main class="pretext-page">
    <section class="hero">
      <p class="eyebrow">@chenglou/pretext</p>
      <h1>Pretext.js — Zero-DOM Text Engine</h1>
      <p>
        15 KB pure TypeScript library by Cheng Lou (ex-React core, Midjourney).
        Measures &amp; lays out text without touching the DOM — 600× faster than reflow.
      </p>
    </section>

    <section class="tab-bar">
      <button :class="{ active: activeTab === 'canvas' }" @click="activeTab = 'canvas'">Canvas Rendering</button>
      <button :class="{ active: activeTab === 'flow' }" @click="activeTab = 'flow'">Text Flow</button>
      <button :class="{ active: activeTab === 'virtual' }" @click="activeTab = 'virtual'">Virtual List</button>
      <button :class="{ active: activeTab === 'bench' }" @click="activeTab = 'bench'">Benchmark</button>
    </section>

    <!-- ─── Canvas Text Rendering ─── -->
    <template v-if="activeTab === 'canvas'">
      <section class="card">
        <h2>Canvas Text Rendering</h2>
        <p class="hint">Pretext computes line breaks in pure arithmetic — then renders to Canvas, no DOM layout needed.</p>
        <div class="controls">
          <label>Width: <input type="range" v-model.number="canvasWidth" min="200" max="800" /><span>{{ canvasWidth }}px</span></label>
          <label>Line-height: <input type="range" v-model.number="lineHeight" min="16" max="36" /><span>{{ lineHeight }}px</span></label>
        </div>
        <textarea v-model="canvasText" rows="3" class="text-input" placeholder="Type text here..." />
        <div class="canvas-wrap">
          <canvas ref="canvasRef" class="text-canvas"></canvas>
        </div>
        <div class="stats-row">
          <span class="stat">{{ lineCount }} lines</span>
          <span class="stat">{{ canvasHeight.toFixed(0) }}px height</span>
          <span class="stat">No DOM reflow</span>
        </div>
      </section>

      <section class="card">
        <h2>Shrink-Wrap: Tightest Balanced Width</h2>
        <p class="hint">
          Find the narrowest container that still produces the same number of lines — a layout trick impossible without Pretext.
        </p>
        <div class="controls">
          <label>Max width: <input type="range" v-model.number="shrinkMaxWidth" min="100" max="800" /><span>{{ shrinkMaxWidth }}px</span></label>
        </div>
        <textarea v-model="shrinkText" rows="2" class="text-input" />
        <div v-if="shrinkResult" class="shrink-visual">
          <div class="shrink-box max-box">
            <div class="shrink-label">Max width ({{ shrinkMaxWidth }}px)</div>
            <div class="shrink-lines">{{ shrinkResult.lineCount }} lines · widest: {{ shrinkResult.maxLineWidth.toFixed(0) }}px</div>
          </div>
          <div class="shrink-box tight-box">
            <div class="shrink-label">Tightest balanced width</div>
            <div class="shrink-lines">Natural: {{ shrinkResult.naturalWidth.toFixed(0) }}px</div>
          </div>
        </div>
      </section>
    </template>

    <!-- ─── Text Flow Around Obstacle ─── -->
    <template v-if="activeTab === 'flow'">
      <section class="card">
        <h2>Variable-Width Text Flow</h2>
        <p class="hint">
          Each line can have a different width — Pretext's <code>layoutNextLineRange</code> routes text around obstacles in real-time.
          <strong>Drag the box!</strong>
        </p>
        <textarea v-model="flowText" rows="3" class="text-input" />
        <div class="canvas-wrap flow-wrap">
          <canvas
            ref="flowCanvasRef"
            class="flow-canvas"
            @mousedown="onFlowMouseDown"
            @mousemove="onFlowMouseMove"
            @mouseup="onFlowMouseUp"
            @mouseleave="onFlowMouseUp"
          ></canvas>
        </div>
        <div class="stats-row">
          <span class="stat">{{ flowLines }} lines flowed</span>
          <span class="stat">Variable width per line</span>
        </div>
      </section>
    </template>

    <!-- ─── Virtual List ─── -->
    <template v-if="activeTab === 'virtual'">
      <section class="card">
        <h2>Height Prediction Without DOM</h2>
        <p class="hint">
          <code>layout()</code> predicts each card's height with pure arithmetic — enabling perfect virtualization without
          render-measure-render cycles.
        </p>
        <div class="controls">
          <label>Container width: <input type="range" v-model.number="virtualWidth" min="200" max="700" /><span>{{ virtualWidth }}px</span></label>
        </div>
        <div class="virtual-grid" :style="{ maxWidth: virtualWidth + 'px' }">
          <div v-for="(item, i) in virtualItems" :key="i" class="v-card">
            <div class="v-predicted">
              <div class="v-label">Predicted: {{ item.predictedHeight.toFixed(0) }}px · {{ item.lineCount }}L</div>
              <div class="v-bar" :style="{ height: item.predictedHeight + 'px' }"></div>
            </div>
            <div class="v-card-actual">
              <p>{{ item.text }}</p>
            </div>
          </div>
        </div>
        <div class="stats-row">
          <span class="stat">Predicted total: {{ totalPredictedHeight.toFixed(0) }}px</span>
          <span class="stat">DOM total: {{ totalDomHeight || '...' }}px</span>
          <span class="stat" v-if="totalDomHeight">
            Δ {{ Math.abs(totalPredictedHeight - totalDomHeight).toFixed(0) }}px
          </span>
        </div>
      </section>
    </template>

    <!-- ─── Benchmark ─── -->
    <template v-if="activeTab === 'bench'">
      <section class="card">
        <h2>Pretext vs DOM Reflow</h2>
        <p class="hint">
          Compares Pretext's pure-arithmetic <code>layout()</code> against forcing a DOM reflow (<code>offsetHeight</code>)
          for the same text — over many iterations.
        </p>
        <div class="controls">
          <label>Iterations: <input type="range" v-model.number="benchIterations" min="100" max="5000" step="100" /><span>{{ benchIterations }}</span></label>
        </div>
        <textarea v-model="benchText" rows="3" class="text-input" />
        <button class="run-btn" :disabled="benchRunning" @click="runBench">
          {{ benchRunning ? 'Running...' : 'Run Benchmark' }}
        </button>
        <div v-if="benchResult" class="bench-results">
          <div class="bench-bar-group">
            <div class="bench-bar-label">Pretext</div>
            <div class="bench-bar pretext-bar" :style="{ width: Math.min(benchResult.pretextTimeMs / benchResult.domTimeMs * 100, 100) + '%' }">
              {{ benchResult.pretextTimeMs }}ms
            </div>
          </div>
          <div class="bench-bar-group">
            <div class="bench-bar-label">DOM reflow</div>
            <div class="bench-bar dom-bar" style="width: 100%">
              {{ benchResult.domTimeMs }}ms
            </div>
          </div>
          <div class="bench-speedup">
            <span class="speedup-number">{{ benchResult.speedup }}×</span>
            <span>faster than DOM</span>
          </div>
          <div class="bench-meta">{{ benchResult.iterations }} iterations · 480px width</div>
        </div>
      </section>
    </template>

    <!-- ─── Knowledge points ─── -->
    <section class="card">
      <h2>How Pretext Works</h2>
      <ul class="knowledge-list">
        <li><code>prepare()</code> — one-time: normalize whitespace, segment via <code>Intl.Segmenter</code>, measure with Canvas 2D</li>
        <li><code>layout()</code> — hot path: pure arithmetic over cached widths. No DOM, no reflow, 600× faster</li>
        <li><code>prepareWithSegments()</code> + <code>layoutWithLines()</code> — returns individual lines for Canvas/SVG/WebGL rendering</li>
        <li><code>layoutNextLineRange()</code> — per-line variable width, enabling text flow around arbitrary obstacles</li>
        <li><code>measureLineStats()</code> — speculative layout for binary-searching optimal widths (shrink-wrap, balanced text)</li>
        <li>Supports CJK, Arabic, emoji, bidirectional text — grapheme-accurate via <code>Intl.Segmenter</code></li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.pretext-page { width: 100%; display: grid; gap: 1rem; animation: rise-in 0.5s var(--ease-out) both; }

.hero {
  border-radius: var(--radius-xl); padding: 1.2rem; color: #fff;
  background: linear-gradient(135deg, #312e81, #4f46e5 50%, #7c3aed);
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

.tab-bar { display: flex; gap: 0.35rem; flex-wrap: wrap; }
.tab-bar button {
  border: 1px solid var(--color-border); border-radius: var(--radius-pill);
  padding: 0.35rem 0.75rem; background: var(--bg-2); color: var(--color-text-secondary);
  cursor: pointer; font-size: 0.92rem; transition: all var(--duration-fast) ease;
}
.tab-bar button:hover { border-color: var(--color-border-hover); background: var(--accent-bg-subtle); }
.tab-bar button.active { border-color: var(--accent-500); background: var(--accent-bg-light); color: var(--accent-600); font-weight: 600; }

.card { border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1rem; background: var(--surface-glass); }
.card h2 { font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 0.3rem; color: var(--color-heading); }
.hint { font-size: 0.88rem; color: var(--color-text-secondary); margin-bottom: 0.6rem; line-height: 1.5; }
.hint code { font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-600); background: var(--accent-bg-subtle); padding: 0.1rem 0.3rem; border-radius: 4px; }

.controls { display: flex; gap: 1.2rem; flex-wrap: wrap; margin-bottom: 0.6rem; }
.controls label { display: flex; align-items: center; gap: 0.4rem; font-size: 0.88rem; color: var(--color-text-secondary); }
.controls input[type="range"] { width: 140px; accent-color: var(--accent-500); }
.controls span { font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-600); min-width: 42px; }

.text-input {
  width: 100%; box-sizing: border-box; padding: 0.5rem 0.7rem;
  border: 1px solid var(--color-border); border-radius: var(--radius-sm);
  font-family: var(--font-body); font-size: 0.88rem; color: var(--color-text);
  background: var(--bg-0); resize: vertical; transition: border-color var(--duration-fast) ease;
}
.text-input:focus { outline: none; border-color: var(--color-border-focus); }

.canvas-wrap { margin-top: 0.5rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden; background: var(--bg-0); }
.text-canvas { display: block; width: 100%; }

.stats-row { display: flex; gap: 0.8rem; flex-wrap: wrap; margin-top: 0.5rem; }
.stat {
  font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-600);
  background: var(--accent-bg-subtle); padding: 0.2rem 0.55rem; border-radius: var(--radius-pill);
}

/* Shrink-wrap */
.shrink-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-top: 0.5rem; }
.shrink-box {
  padding: 0.6rem; border-radius: var(--radius-sm); font-size: 0.85rem;
}
.max-box { background: var(--bg-2); border: 1px solid var(--color-border); }
.tight-box { background: var(--accent-bg-subtle); border: 1px solid var(--accent-bg-light); }
.shrink-label { font-weight: 600; color: var(--color-heading); font-size: 0.82rem; margin-bottom: 0.2rem; }
.shrink-lines { font-family: var(--font-mono); font-size: 0.78rem; color: var(--color-text-secondary); }

/* Flow canvas */
.flow-wrap { cursor: grab; }
.flow-wrap:active { cursor: grabbing; }
.flow-canvas { display: block; width: 100%; }

/* Virtual list */
.virtual-grid { display: grid; gap: 16px; margin-top: 0.5rem; }
.v-card { display: flex; gap: 0.6rem; align-items: stretch; }
.v-predicted {
  flex-shrink: 0; width: 50px; display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
}
.v-label { font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-600); text-align: center; white-space: nowrap; }
.v-bar { width: 6px; background: linear-gradient(to bottom, var(--accent-500), #8b5cf6); border-radius: 3px; transition: height 0.3s ease; }
.v-card-actual {
  flex: 1; padding: 0.5rem 0.7rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm);
  background: var(--bg-0); font-size: 0.88rem; color: var(--color-text); line-height: 1.5;
}
.v-card-actual p { margin: 0; }

/* Benchmark */
.run-btn {
  margin-top: 0.5rem; padding: 0.45rem 1.2rem; border: none; border-radius: var(--radius-pill);
  background: var(--accent-500); color: #fff; font-weight: 600; cursor: pointer;
  transition: background var(--duration-fast) ease;
}
.run-btn:hover { background: var(--accent-600); }
.run-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.bench-results { margin-top: 0.8rem; }
.bench-bar-group { margin-bottom: 0.5rem; }
.bench-bar-label { font-size: 0.82rem; color: var(--color-text-secondary); margin-bottom: 0.2rem; }
.bench-bar {
  height: 28px; border-radius: var(--radius-sm); display: flex; align-items: center;
  padding: 0 0.6rem; font-family: var(--font-mono); font-size: 0.82rem; color: #fff;
  transition: width 0.5s var(--ease-out); min-width: 60px;
}
.pretext-bar { background: linear-gradient(90deg, #6366f1, #8b5cf6); }
.dom-bar { background: linear-gradient(90deg, #f59e0b, #ef4444); }
.bench-speedup {
  display: flex; align-items: baseline; gap: 0.4rem; margin-top: 0.6rem;
}
.speedup-number {
  font-family: var(--font-display); font-size: 2.4rem; font-weight: 700;
  color: var(--accent-600); letter-spacing: -0.03em;
}
.bench-speedup span:last-child { font-size: 0.92rem; color: var(--color-text-secondary); }
.bench-meta { font-family: var(--font-mono); font-size: 0.78rem; color: var(--color-text-secondary); margin-top: 0.3rem; }

/* Knowledge */
.knowledge-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.3rem; }
.knowledge-list li {
  font-size: 0.85rem; color: var(--color-text-secondary); padding: 0.3rem 0.55rem;
  background: var(--bg-2); border-radius: var(--radius-sm); line-height: 1.4;
}
.knowledge-list li code {
  font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-600);
  background: var(--accent-bg-subtle); padding: 0.1rem 0.3rem; border-radius: 4px;
}

@media (max-width: 640px) {
  .shrink-visual { grid-template-columns: 1fr; }
  .controls input[type="range"] { width: 100px; }
}
</style>
