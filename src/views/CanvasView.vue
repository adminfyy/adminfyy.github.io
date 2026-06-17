<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import {
  clearCanvas,
  createGravityBodies, updateGravityBodies, drawGravityBodies,
  generateTree, drawTree,
  createRipple, updateRipples, drawRipples,
  createFlowParticles, updateFlowParticles, drawFlowParticles,
} from '@/utils/canvas'
import type { GravityBody, TreeSegment, Ripple, FlowParticle } from '@/utils/canvas'

type Tab = 'gravity' | 'tree' | 'ripple' | 'flow'
const activeTab = ref<Tab>('gravity')
const initializedTabs = ref(new Set<Tab>())

// ─── Gravity Field ───
const gravityCanvas = ref<HTMLCanvasElement | null>(null)
const gravityBodies = ref<GravityBody[]>([])
const mousePos = ref({ x: 400, y: 200 })
let gravityRAF: number | null = null

const initGravity = () => {
  const c = gravityCanvas.value
  if (!c || c.clientWidth === 0) return false
  c.width = c.clientWidth; c.height = c.clientHeight
  gravityBodies.value = createGravityBodies(c.width, c.height, 120)
  mousePos.value = { x: c.width / 2, y: c.height / 2 }
  return true
}

const animateGravity = () => {
  const c = gravityCanvas.value
  if (!c) return
  const ctx = c.getContext('2d')!
  clearCanvas(ctx, c.width, c.height)
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, c.width, c.height)
  updateGravityBodies(gravityBodies.value, mousePos.value.x, mousePos.value.y, c.width, c.height, 150)
  drawGravityBodies(ctx, gravityBodies.value)
  // Draw attractor indicator
  ctx.beginPath()
  ctx.arc(mousePos.value.x, mousePos.value.y, 6, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(mousePos.value.x, mousePos.value.y, 18, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(255,255,255,0.15)'
  ctx.lineWidth = 1
  ctx.stroke()
  gravityRAF = requestAnimationFrame(animateGravity)
}

const handleGravityMove = (e: MouseEvent) => {
  const c = gravityCanvas.value; if (!c) return
  const rect = c.getBoundingClientRect()
  mousePos.value = { x: e.clientX - rect.left, y: e.clientY - rect.top }
}

const startGravity = () => { if (gravityRAF) cancelAnimationFrame(gravityRAF); animateGravity() }
const stopGravity = () => { if (gravityRAF) { cancelAnimationFrame(gravityRAF); gravityRAF = null } }

// ─── Fractal Tree ───
const treeCanvas = ref<HTMLCanvasElement | null>(null)
const treeDepth = ref(10)
const treeAngle = ref(0.45)
const treeWind = ref(0)
let treeRAF: number | null = null

const initTree = () => {
  const c = treeCanvas.value
  if (!c || c.clientWidth === 0) return false
  c.width = c.clientWidth; c.height = c.clientHeight
  return true
}

const renderTree = () => {
  const c = treeCanvas.value; if (!c) return
  const ctx = c.getContext('2d')!
  clearCanvas(ctx, c.width, c.height)
  ctx.fillStyle = '#fefce8'
  ctx.fillRect(0, 0, c.width, c.height)
  // Ground
  ctx.fillStyle = '#d4a574'
  ctx.fillRect(0, c.height - 30, c.width, 30)
  const segments: TreeSegment[] = generateTree(
    c.width / 2, c.height - 30, -Math.PI / 2,
    c.height * 0.25, 0, treeDepth.value, treeAngle.value, treeWind.value,
  )
  drawTree(ctx, segments, treeDepth.value)
}

const animateTree = () => {
  treeWind.value += 0.02
  renderTree()
  treeRAF = requestAnimationFrame(animateTree)
}

const startTree = () => { if (treeRAF) cancelAnimationFrame(treeRAF); animateTree() }
const stopTree = () => { if (treeRAF) { cancelAnimationFrame(treeRAF); treeRAF = null } }

// ─── Ripple Waves ───
const rippleCanvas = ref<HTMLCanvasElement | null>(null)
const ripples = ref<Ripple[]>([])
const rippleFrame = ref(0)
let rippleRAF: number | null = null

const initRipple = () => {
  const c = rippleCanvas.value
  if (!c || c.clientWidth === 0) return false
  c.width = c.clientWidth; c.height = c.clientHeight
  return true
}

const animateRipple = () => {
  const c = rippleCanvas.value; if (!c) return
  const ctx = c.getContext('2d')!
  clearCanvas(ctx, c.width, c.height)
  ctx.fillStyle = '#0c0a1d'
  ctx.fillRect(0, 0, c.width, c.height)
  rippleFrame.value++
  ripples.value = updateRipples(ripples.value, 2.5)
  drawRipples(ctx, ripples.value)
  // Hint text
  if (ripples.value.length === 0) {
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.font = '14px system-ui'
    ctx.textAlign = 'center'
    ctx.fillText('Click anywhere to create ripples', c.width / 2, c.height / 2)
  }
  rippleRAF = requestAnimationFrame(animateRipple)
}

const handleRippleClick = (e: MouseEvent) => {
  const c = rippleCanvas.value; if (!c) return
  const rect = c.getBoundingClientRect()
  const scaleX = c.width / rect.width
  const scaleY = c.height / rect.height
  ripples.value.push(createRipple(
    (e.clientX - rect.left) * scaleX,
    (e.clientY - rect.top) * scaleY,
    rippleFrame.value,
  ))
}

const startRipple = () => { if (rippleRAF) cancelAnimationFrame(rippleRAF); animateRipple() }
const stopRipple = () => { if (rippleRAF) { cancelAnimationFrame(rippleRAF); rippleRAF = null } }

// ─── Flow Field ───
const flowCanvas = ref<HTMLCanvasElement | null>(null)
const flowParticles = ref<FlowParticle[]>([])
const flowScale = ref(0.005)
const flowTime = ref(0)
let flowRAF: number | null = null

const initFlow = () => {
  const c = flowCanvas.value
  if (!c || c.clientWidth === 0) return false
  c.width = c.clientWidth; c.height = c.clientHeight
  // Pre-fill dark background
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, c.width, c.height)
  flowParticles.value = createFlowParticles(c.width, c.height, 2000)
  return true
}

const animateFlow = () => {
  const c = flowCanvas.value; if (!c) return
  const ctx = c.getContext('2d')!
  // Semi-transparent overlay for trail effect
  ctx.fillStyle = 'rgba(15, 23, 42, 0.03)'
  ctx.fillRect(0, 0, c.width, c.height)
  updateFlowParticles(flowParticles.value, c.width, c.height, flowTime.value, flowScale.value)
  drawFlowParticles(ctx, flowParticles.value)
  flowTime.value += 0.005
  flowRAF = requestAnimationFrame(animateFlow)
}

const startFlow = () => { if (flowRAF) cancelAnimationFrame(flowRAF); animateFlow() }
const stopFlow = () => { if (flowRAF) { cancelAnimationFrame(flowRAF); flowRAF = null } }

// ─── Lazy tab init ───
const stopAll = () => { stopGravity(); stopTree(); stopRipple(); stopFlow() }

const activateTab = async (tab: Tab) => {
  activeTab.value = tab
  stopAll()
  await nextTick()
  if (!initializedTabs.value.has(tab)) {
    let ok = false
    if (tab === 'gravity') { ok = initGravity(); if (ok) startGravity() }
    else if (tab === 'tree') { ok = initTree(); if (ok) startTree() }
    else if (tab === 'ripple') { ok = initRipple(); if (ok) startRipple() }
    else if (tab === 'flow') { ok = initFlow(); if (ok) startFlow() }
    if (ok) initializedTabs.value.add(tab)
  } else {
    if (tab === 'gravity') startGravity()
    else if (tab === 'tree') startTree()
    else if (tab === 'ripple') startRipple()
    else if (tab === 'flow') startFlow()
  }
}

onMounted(async () => { await nextTick(); activateTab('gravity') })
onUnmounted(() => { stopAll() })
</script>

<template>
  <main class="canvas-page">
    <section class="hero">
      <p class="eyebrow">HTML5 Canvas</p>
      <h1>Canvas Interactive Demos</h1>
      <p>Physics simulation, generative art, wave interference, and vector fields — all powered by the Canvas API.</p>
    </section>

    <section class="tab-bar">
      <button :class="{ active: activeTab === 'gravity' }" @click="activateTab('gravity')">Gravity Field</button>
      <button :class="{ active: activeTab === 'tree' }" @click="activateTab('tree')">Fractal Tree</button>
      <button :class="{ active: activeTab === 'ripple' }" @click="activateTab('ripple')">Ripple Waves</button>
      <button :class="{ active: activeTab === 'flow' }" @click="activateTab('flow')">Flow Field</button>
    </section>

    <section v-show="activeTab === 'gravity'" class="card">
      <div class="card-header">
        <h2>Gravity Field</h2>
        <p class="hint">Move your mouse over the canvas to attract particles with gravitational force.</p>
      </div>
      <ul class="knowledge-list">
        <li><code>F = G / d²</code> — inverse-distance gravitational attraction toward cursor</li>
        <li><code>velocity *= 0.985</code> — friction damping prevents infinite acceleration</li>
        <li><code>trail[]</code> array — stores last N positions for motion blur trails</li>
        <li>Screen wrapping — particles exiting one edge reappear on the opposite side</li>
      </ul>
      <canvas ref="gravityCanvas" class="demo-canvas dark" @mousemove="handleGravityMove"></canvas>
    </section>

    <section v-show="activeTab === 'tree'" class="card">
      <div class="card-header">
        <h2>Fractal Tree</h2>
        <p class="hint">A recursively branching tree that sways in a simulated wind.</p>
      </div>
      <ul class="knowledge-list">
        <li><code>recursion</code> — each branch spawns 2 children at ±<code>branchAngle</code></li>
        <li><code>length *= 0.72</code> — geometric shrink creates natural tapering</li>
        <li><code>sin(wind + depth)</code> — phase-offset wind sway increases with branch depth</li>
        <li>Color interpolation — brown trunk <code>rgb(101,67,33)</code> → green tips <code>rgb(34,197,94)</code></li>
      </ul>
      <canvas ref="treeCanvas" class="demo-canvas"></canvas>
      <div class="controls">
        <label>Depth: {{ treeDepth }} <input v-model.number="treeDepth" type="range" min="4" max="13" @input="renderTree" /></label>
        <label>Angle: {{ treeAngle.toFixed(2) }} <input v-model.number="treeAngle" type="range" min="0.1" max="1.2" step="0.01" /></label>
      </div>
    </section>

    <section v-show="activeTab === 'ripple'" class="card">
      <div class="card-header">
        <h2>Ripple Waves</h2>
        <p class="hint">Click anywhere on the canvas to create expanding ring interference patterns.</p>
      </div>
      <ul class="knowledge-list">
        <li><code>ctx.arc(x, y, r)</code> — expanding circles with radius growing per frame</li>
        <li><code>HSL color</code> — hue shifts over time for rainbow interference</li>
        <li><code>alpha = 1 - r / maxR</code> — linear fade-out as rings expand</li>
        <li>Multi-ring layering — 3 concentric strokes per ripple for depth effect</li>
      </ul>
      <canvas ref="rippleCanvas" class="demo-canvas dark" @click="handleRippleClick"></canvas>
    </section>

    <section v-show="activeTab === 'flow'" class="card">
      <div class="card-header">
        <h2>Flow Field</h2>
        <p class="hint">2,000 particles follow a sine-noise vector field, painting trails on a dark canvas.</p>
      </div>
      <ul class="knowledge-list">
        <li><code>sin(x·s + t) · cos(y·s + t)</code> — 2D noise approximation for flow angle</li>
        <li><code>angle → (cos, sin)</code> — polar-to-cartesian conversion for velocity</li>
        <li>Semi-transparent overlay — <code>rgba(15,23,42,0.03)</code> creates persistent trails</li>
        <li>Particle recycling — out-of-bounds particles respawn at random positions</li>
      </ul>
      <canvas ref="flowCanvas" class="demo-canvas dark"></canvas>
      <div class="controls">
        <label>Scale: {{ flowScale.toFixed(4) }} <input v-model.number="flowScale" type="range" min="0.001" max="0.02" step="0.001" /></label>
      </div>
    </section>
  </main>
</template>

<style scoped>
.canvas-page { width: 100%; display: grid; gap: 1rem; animation: rise-in 0.5s var(--ease-out) both; }

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
.tab-bar button { border: 1px solid var(--color-border); border-radius: var(--radius-pill); padding: 0.35rem 0.75rem; background: var(--bg-2); color: var(--color-text-secondary); cursor: pointer; font-size: 0.92rem; transition: all var(--duration-fast) ease; }
.tab-bar button:hover { border-color: var(--color-border-hover); background: var(--accent-bg-subtle); }
.tab-bar button.active { border-color: var(--accent-500); background: var(--accent-bg-light); color: var(--accent-600); font-weight: 600; }

.card { border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1rem; background: var(--surface-glass); }
.card-header { margin-bottom: 0.5rem; }
.card h2 { font-family: var(--font-display); margin-bottom: 0.25rem; font-size: 1rem; }
.hint { font-size: 0.92rem; color: var(--color-text-secondary); margin-bottom: 0; }
.knowledge-list { list-style: none; padding: 0; margin: 0 0 0.75rem; display: grid; gap: 0.3rem; }
.knowledge-list li { font-size: 0.85rem; color: var(--color-text-secondary); padding: 0.3rem 0.55rem; background: var(--bg-2); border-radius: var(--radius-sm); line-height: 1.4; }
.knowledge-list li code { font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-600); background: var(--accent-bg-subtle); padding: 0.1rem 0.3rem; border-radius: 4px; }

.demo-canvas { width: 100%; aspect-ratio: 2 / 1; border: 1px solid var(--color-border); border-radius: var(--radius-sm); display: block; background: #f3f4f6; }
.demo-canvas.dark { background: #0f172a; }

.controls { display: flex; gap: 1rem; align-items: center; margin-top: 0.75rem; flex-wrap: wrap; }
.controls label { display: grid; gap: 0.25rem; font-size: 0.92rem; }
input[type="range"] { width: 140px; accent-color: var(--accent-500); }

@media (max-width: 640px) { .demo-canvas { aspect-ratio: 3 / 2; } }
</style>
