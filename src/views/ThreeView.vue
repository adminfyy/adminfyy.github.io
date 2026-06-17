<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

type SceneMode = 'geometric' | 'particles' | 'terrain'
const activeMode = ref<SceneMode>('geometric')

const mountRef = ref<HTMLDivElement | null>(null)
const fpsRef = ref(0)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let rafId: number | null = null
let objects: THREE.Object3D[] = []
let particles: THREE.Points | null = null
let terrain: THREE.Mesh | null = null
let lights: THREE.Light[] = []

// Mouse orbit
let isDragging = false
let prevMouse = { x: 0, y: 0 }
let orbitAngle = { theta: 0.5, phi: 1.2 }
const orbitRadius = 12

const updateCamera = () => {
  if (!camera) return
  camera.position.x = orbitRadius * Math.sin(orbitAngle.phi) * Math.cos(orbitAngle.theta)
  camera.position.y = orbitRadius * Math.cos(orbitAngle.phi)
  camera.position.z = orbitRadius * Math.sin(orbitAngle.phi) * Math.sin(orbitAngle.theta)
  camera.lookAt(0, 0, 0)
}

const handleMouseDown = (e: MouseEvent) => {
  isDragging = true
  prevMouse = { x: e.clientX, y: e.clientY }
}
const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging) return
  const dx = e.clientX - prevMouse.x
  const dy = e.clientY - prevMouse.y
  orbitAngle.theta -= dx * 0.005
  orbitAngle.phi = Math.max(0.3, Math.min(Math.PI - 0.3, orbitAngle.phi + dy * 0.005))
  prevMouse = { x: e.clientX, y: e.clientY }
  updateCamera()
}
const handleMouseUp = () => { isDragging = false }

const handleWheel = (e: WheelEvent) => {
  e.preventDefault()
}

// ─── Scene builders ───

const clearScene = () => {
  if (!scene) return
  for (const obj of objects) scene.remove(obj)
  if (particles) { scene.remove(particles); particles = null }
  if (terrain) { scene.remove(terrain); terrain = null }
  for (const l of lights) scene.remove(l)
  objects = []
  lights = []
}

const buildGeometric = () => {
  if (!scene) return

  // Ambient light
  const ambient = new THREE.AmbientLight(0x404060, 0.6)
  scene.add(ambient)
  lights.push(ambient)

  // Point lights
  const p1 = new THREE.PointLight(0x6366f1, 2, 30)
  p1.position.set(5, 5, 5)
  scene.add(p1)
  lights.push(p1)

  const p2 = new THREE.PointLight(0xec4899, 1.5, 25)
  p2.position.set(-5, -3, -5)
  scene.add(p2)
  lights.push(p2)

  // Torus knot (center)
  const torusGeo = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 32)
  const torusMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, metalness: 0.7, roughness: 0.2 })
  const torusKnot = new THREE.Mesh(torusGeo, torusMat)
  scene.add(torusKnot)
  objects.push(torusKnot)

  // Orbiting icosahedrons
  const icoGeo = new THREE.IcosahedronGeometry(0.5, 0)
  const colors = [0xec4899, 0x06b6d4, 0x10b981, 0xf59e0b, 0x8b5cf6]
  for (let i = 0; i < 5; i++) {
    const mat = new THREE.MeshStandardMaterial({ color: colors[i], metalness: 0.5, roughness: 0.3 })
    const ico = new THREE.Mesh(icoGeo, mat)
    ico.userData = { orbit: i * (Math.PI * 2 / 5), speed: 0.5 + i * 0.1, radius: 3.5 }
    scene.add(ico)
    objects.push(ico)
  }

  // Wireframe octahedron (outer)
  const octGeo = new THREE.OctahedronGeometry(5, 0)
  const octMat = new THREE.MeshBasicMaterial({ color: 0x334155, wireframe: true, transparent: true, opacity: 0.3 })
  const oct = new THREE.Mesh(octGeo, octMat)
  scene.add(oct)
  objects.push(oct)
}

const buildParticles = () => {
  if (!scene) return

  const ambient = new THREE.AmbientLight(0x6366f1, 0.3)
  scene.add(ambient)
  lights.push(ambient)

  const count = 5000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const palette = [
    new THREE.Color(0x6366f1),
    new THREE.Color(0xec4899),
    new THREE.Color(0x06b6d4),
    new THREE.Color(0x10b981),
  ]

  for (let i = 0; i < count; i++) {
    const r = 8 * Math.random()
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
    const c = palette[Math.floor(Math.random() * palette.length)]
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const mat = new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.8 })
  particles = new THREE.Points(geo, mat)
  scene.add(particles)
}

const buildTerrain = () => {
  if (!scene) return

  const ambient = new THREE.AmbientLight(0x94a3b8, 0.4)
  scene.add(ambient)
  lights.push(ambient)

  const dir = new THREE.DirectionalLight(0x6366f1, 1.5)
  dir.position.set(5, 10, 5)
  scene.add(dir)
  lights.push(dir)

  const p1 = new THREE.PointLight(0xec4899, 1, 20)
  p1.position.set(-5, 3, 0)
  scene.add(p1)
  lights.push(p1)

  // Procedural terrain
  const size = 20
  const segments = 80
  const geo = new THREE.PlaneGeometry(size, size, segments, segments)
  const posAttr = geo.getAttribute('position')
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i)
    const y = posAttr.getY(i)
    const height = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 1.5 +
                   Math.sin(x * 1.2 + 1) * 0.5 +
                   Math.cos(y * 0.8 + 2) * 0.7
    posAttr.setZ(i, height)
  }
  geo.computeVertexNormals()

  const mat = new THREE.MeshStandardMaterial({
    color: 0x4f46e5,
    metalness: 0.3,
    roughness: 0.6,
    wireframe: false,
    flatShading: true,
  })
  terrain = new THREE.Mesh(geo, mat)
  terrain.rotation.x = -Math.PI / 2
  terrain.position.y = -2
  scene.add(terrain)
}

// ─── Animation ───

let lastTime = performance.now()
let frameCount = 0

const animate = () => {
  if (!renderer || !scene || !camera) return

  const time = performance.now() * 0.001

  // FPS counter
  frameCount++
  if (performance.now() - lastTime >= 1000) {
    fpsRef.value = frameCount
    frameCount = 0
    lastTime = performance.now()
  }

  // Animate objects based on mode
  if (activeMode.value === 'geometric') {
    // Rotate torus knot
    if (objects[0]) {
      objects[0].rotation.x = time * 0.3
      objects[0].rotation.y = time * 0.5
    }
    // Orbit icosahedrons
    for (let i = 1; i <= 5 && i < objects.length; i++) {
      const obj = objects[i]
      const { orbit, speed, radius } = obj.userData
      obj.position.x = Math.cos(time * speed + orbit) * radius
      obj.position.z = Math.sin(time * speed + orbit) * radius
      obj.position.y = Math.sin(time * speed * 2 + orbit) * 0.8
      obj.rotation.x = time * 2
      obj.rotation.y = time * 1.5
    }
    // Rotate wireframe
    if (objects[6]) {
      objects[6].rotation.x = time * 0.1
      objects[6].rotation.y = time * 0.15
    }
    // Animate lights
    if (lights[1]) {
      const pl = lights[1] as THREE.PointLight;
      pl.position.x = Math.sin(time) * 5;
      pl.position.z = Math.cos(time) * 5;
    }
  } else if (activeMode.value === 'particles' && particles) {
    particles.rotation.y = time * 0.1
    particles.rotation.x = Math.sin(time * 0.2) * 0.1
  } else if (activeMode.value === 'terrain' && terrain) {
    // Subtle terrain wave
    const posAttr = (terrain.geometry as THREE.PlaneGeometry).getAttribute('position')
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i)
      const y = posAttr.getY(i)
      const height = Math.sin(x * 0.5 + time * 0.5) * Math.cos(y * 0.5 + time * 0.3) * 1.5 +
                     Math.sin(x * 1.2 + 1 + time * 0.2) * 0.5 +
                     Math.cos(y * 0.8 + 2) * 0.7
      posAttr.setZ(i, height)
    }
    posAttr.needsUpdate = true
    terrain.geometry.computeVertexNormals()
  }

  // Auto-rotate when not dragging
  if (!isDragging) {
    orbitAngle.theta += 0.002
    updateCamera()
  }

  renderer.render(scene, camera)
  rafId = requestAnimationFrame(animate)
}

// ─── Scene switching ───

const switchMode = (mode: SceneMode) => {
  activeMode.value = mode
  clearScene()
  if (mode === 'geometric') buildGeometric()
  else if (mode === 'particles') buildParticles()
  else if (mode === 'terrain') buildTerrain()
}

// ─── Lifecycle ───

onMounted(() => {
  const container = mountRef.value
  if (!container) return

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  container.appendChild(renderer.domElement)

  // Scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0f172a)
  scene.fog = new THREE.Fog(0x0f172a, 15, 30)

  // Camera
  camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100)
  updateCamera()

  // Build initial scene
  buildGeometric()

  // Start animation
  animate()

  // Resize handler
  const handleResize = () => {
    if (!container || !renderer || !camera) return
    renderer.setSize(container.clientWidth, container.clientHeight)
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
  }
})
</script>

<template>
  <main class="three-page">
    <section class="hero">
      <p class="eyebrow">Three.js</p>
      <h1>3D WebGL Demos</h1>
      <p>Interactive 3D scenes: geometric animations, particle systems, and procedural terrain — all powered by Three.js.</p>
    </section>

    <section class="mode-bar">
      <button :class="{ active: activeMode === 'geometric' }" @click="switchMode('geometric')">Geometric</button>
      <button :class="{ active: activeMode === 'particles' }" @click="switchMode('particles')">Particles</button>
      <button :class="{ active: activeMode === 'terrain' }" @click="switchMode('terrain')">Terrain</button>
      <span class="fps-badge">{{ fpsRef }} FPS</span>
    </section>

    <section class="card viewport-card">
      <div class="viewport-header">
        <h2>{{ activeMode === 'geometric' ? 'Geometric Orchestra' : activeMode === 'particles' ? 'Particle Nebula' : 'Procedural Terrain' }}</h2>
        <p class="hint">Drag to orbit · Auto-rotates when idle</p>
      </div>
      <div
        ref="mountRef"
        class="viewport"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
        @wheel="handleWheel"
      ></div>
    </section>

    <section class="card" v-if="activeMode === 'geometric'">
      <h2>Scene Breakdown</h2>
      <ul class="knowledge-list">
        <li><code>TorusKnotGeometry</code> — parametric surface with (p,q) winding numbers, 128 segments for smooth curvature</li>
        <li><code>MeshStandardMaterial</code> — PBR material with metalness/roughness workflow, reacts realistically to lights</li>
        <li><code>PointLight</code> — omnidirectional light source with distance falloff, animates position for dynamic shadows</li>
        <li>Orbit animation — parametric circular path: <code>x = cos(t+r) * R</code>, <code>y = sin(2t) * 0.8</code> for bobbing</li>
      </ul>
    </section>

    <section class="card" v-if="activeMode === 'particles'">
      <h2>Scene Breakdown</h2>
      <ul class="knowledge-list">
        <li><code>BufferGeometry</code> — GPU-friendly vertex storage, avoids Object3D overhead for 5,000+ points</li>
        <li><code>PointsMaterial</code> with <code>vertexColors</code> — per-particle color from buffer attribute</li>
        <li>Spherical distribution — <code>φ = acos(2·rand-1)</code> ensures uniform sphere surface sampling</li>
        <li><code>Points</code> render — single draw call for all particles vs. one per mesh</li>
      </ul>
    </section>

    <section class="card" v-if="activeMode === 'terrain'">
      <h2>Scene Breakdown</h2>
      <ul class="knowledge-list">
        <li><code>PlaneGeometry</code> — 80×80 subdivided grid, vertices displaced along Z for heightmap</li>
        <li>Layered sine waves — <code>sin(x·0.5+t) · cos(y·0.5+t)</code> creates organic undulation</li>
        <li><code>flatShading: true</code> — faceted look by computing face normals instead of smooth vertex normals</li>
        <li><code>DirectionalLight</code> — simulates distant sun, uniform parallel rays across the terrain</li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.three-page { width: 100%; display: grid; gap: 1rem; animation: rise-in 0.5s var(--ease-out) both; }

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

.mode-bar { display: flex; gap: 0.35rem; align-items: center; flex-wrap: wrap; }
.mode-bar button { border: 1px solid var(--color-border); border-radius: var(--radius-pill); padding: 0.35rem 0.75rem; background: var(--bg-2); color: var(--color-text-secondary); cursor: pointer; font-size: 0.92rem; transition: all var(--duration-fast) ease; }
.mode-bar button:hover { border-color: var(--color-border-hover); background: var(--accent-bg-subtle); }
.mode-bar button.active { border-color: var(--accent-500); background: var(--accent-bg-light); color: var(--accent-600); font-weight: 600; }
.fps-badge { margin-left: auto; font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-text-secondary); background: var(--bg-2); padding: 0.25rem 0.6rem; border-radius: var(--radius-pill); }

.card { border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1rem; background: var(--surface-glass); }
.viewport-card { padding: 1rem; }
.viewport-header { margin-bottom: 0.5rem; }
.viewport-header h2 { font-family: var(--font-display); font-size: 1rem; margin-bottom: 0.2rem; }
.hint { font-size: 0.88rem; color: var(--color-text-secondary); }

.viewport {
  width: 100%; aspect-ratio: 16 / 9; border-radius: var(--radius-sm); overflow: hidden;
  cursor: grab; background: #0f172a; position: relative;
}
.viewport:active { cursor: grabbing; }
.viewport canvas { display: block; width: 100% !important; height: 100% !important; }

.knowledge-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.3rem; }
.knowledge-list li { font-size: 0.85rem; color: var(--color-text-secondary); padding: 0.3rem 0.55rem; background: var(--bg-2); border-radius: var(--radius-sm); line-height: 1.4; }
.knowledge-list li code { font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-600); background: var(--accent-bg-subtle); padding: 0.1rem 0.3rem; border-radius: 4px; }

@media (max-width: 640px) { .viewport { aspect-ratio: 4 / 3; } }
</style>
