/**
 * Canvas demo utilities
 *
 * Four interactive demos showcasing different Canvas API capabilities:
 * 1. Gravity Field   — N-body simulation with mouse-driven attractor
 * 2. Fractal Tree    — Recursive branching with wind sway
 * 3. Ripple Waves    — Click-spawned expanding ring interference
 * 4. Flow Field      — Sine-noise vector field with particle trails
 */

// ─── Shared ───

export function clearCanvas(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  ctx.clearRect(0, 0, w, h)
}

// ─── 1. Gravity Field ───

export interface GravityBody {
  x: number; y: number
  vx: number; vy: number
  mass: number
  radius: number
  color: string
  trail: { x: number; y: number }[]
}

export function createGravityBodies(w: number, h: number, count = 120): GravityBody[] {
  const palette = ['#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#10b981']
  return Array.from({ length: count }, () => {
    const mass = 1 + Math.random() * 3
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      mass,
      radius: mass * 1.2,
      color: palette[Math.floor(Math.random() * palette.length)],
      trail: [],
    }
  })
}

export function updateGravityBodies(
  bodies: GravityBody[],
  mx: number,
  my: number,
  w: number,
  h: number,
  G = 150,
): void {
  for (const b of bodies) {
    const dx = mx - b.x
    const dy = my - b.y
    const dist = Math.sqrt(dx * dx + dy * dy) + 1
    const force = Math.min(G / (dist * 2), 0.8)
    b.vx += (dx / dist) * force
    b.vy += (dy / dist) * force
    b.vx *= 0.985
    b.vy *= 0.985
    b.trail.push({ x: b.x, y: b.y })
    if (b.trail.length > 10) b.trail.shift()
    b.x += b.vx
    b.y += b.vy
    if (b.x < 0) b.x += w
    if (b.x > w) b.x -= w
    if (b.y < 0) b.y += h
    if (b.y > h) b.y -= h
  }
}

export function drawGravityBodies(ctx: CanvasRenderingContext2D, bodies: GravityBody[]): void {
  for (const b of bodies) {
    if (b.trail.length > 1) {
      ctx.beginPath()
      ctx.moveTo(b.trail[0].x, b.trail[0].y)
      for (let i = 1; i < b.trail.length; i++) {
        ctx.lineTo(b.trail[i].x, b.trail[i].y)
      }
      ctx.strokeStyle = b.color
      ctx.globalAlpha = 0.25
      ctx.lineWidth = b.radius * 0.6
      ctx.stroke()
    }
    ctx.beginPath()
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
    ctx.fillStyle = b.color
    ctx.globalAlpha = 0.85
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

// ─── 2. Fractal Tree ───

export interface TreeSegment {
  x1: number; y1: number
  x2: number; y2: number
  depth: number
}

export function generateTree(
  x: number,
  y: number,
  angle: number,
  length: number,
  depth: number,
  maxDepth: number,
  branchAngle: number,
  wind: number,
): TreeSegment[] {
  if (depth > maxDepth || length < 2) return []
  const windOff = Math.sin(wind + depth * 0.5) * 0.04 * depth
  const a = angle + windOff
  const x2 = x + Math.cos(a) * length
  const y2 = y + Math.sin(a) * length
  return [
    { x1: x, y1: y, x2, y2, depth },
    ...generateTree(x2, y2, a - branchAngle, length * 0.72, depth + 1, maxDepth, branchAngle, wind),
    ...generateTree(x2, y2, a + branchAngle * 0.8, length * 0.65, depth + 1, maxDepth, branchAngle, wind),
  ]
}

export function drawTree(ctx: CanvasRenderingContext2D, segments: TreeSegment[], maxDepth: number): void {
  for (const s of segments) {
    const t = s.depth / maxDepth
    ctx.beginPath()
    ctx.moveTo(s.x1, s.y1)
    ctx.lineTo(s.x2, s.y2)
    const r = Math.round(101 + (34 - 101) * t)
    const g = Math.round(67 + (197 - 67) * t)
    const b = Math.round(33 + (94 - 33) * t)
    ctx.strokeStyle = `rgb(${r},${g},${b})`
    ctx.lineWidth = Math.max(1, (maxDepth - s.depth) * 1.6)
    ctx.lineCap = 'round'
    ctx.stroke()
    if (s.depth >= maxDepth - 1) {
      ctx.beginPath()
      ctx.arc(s.x2, s.y2, 2.5 + Math.random() * 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(34,197,94,${0.35 + Math.random() * 0.3})`
      ctx.fill()
    }
  }
}

// ─── 3. Ripple Waves ───

export interface Ripple {
  x: number; y: number
  radius: number
  maxRadius: number
  hue: number
  born: number
}

export function createRipple(x: number, y: number, now: number): Ripple {
  return { x, y, radius: 0, maxRadius: 180 + Math.random() * 120, hue: (now * 0.05) % 360, born: now }
}

export function updateRipples(ripples: Ripple[], speed: number): Ripple[] {
  for (const r of ripples) r.radius += speed
  return ripples.filter(r => r.radius < r.maxRadius)
}

export function drawRipples(ctx: CanvasRenderingContext2D, ripples: Ripple[]): void {
  for (const r of ripples) {
    const alpha = 1 - r.radius / r.maxRadius
    for (let ring = 0; ring < 3; ring++) {
      const rad = r.radius - ring * 12
      if (rad <= 0) continue
      ctx.beginPath()
      ctx.arc(r.x, r.y, rad, 0, Math.PI * 2)
      ctx.strokeStyle = `hsla(${r.hue + ring * 30},75%,58%,${alpha * (1 - ring * 0.3)})`
      ctx.lineWidth = 2.5 - ring * 0.6
      ctx.stroke()
    }
  }
}

// ─── 4. Flow Field ───

export interface FlowParticle {
  x: number; y: number
  px: number; py: number
  speed: number
  hue: number
}

export function createFlowParticles(w: number, h: number, count: number): FlowParticle[] {
  return Array.from({ length: count }, () => {
    const x = Math.random() * w
    const y = Math.random() * h
    return { x, y, px: x, py: y, speed: 0.5 + Math.random() * 1.5, hue: 220 + Math.random() * 60 }
  })
}

export function updateFlowParticles(
  particles: FlowParticle[],
  w: number,
  h: number,
  time: number,
  scale: number,
): void {
  for (const p of particles) {
    p.px = p.x
    p.py = p.y
    const angle =
      Math.sin(p.x * scale + time) * Math.cos(p.y * scale * 0.8 + time * 0.6) * Math.PI * 2
    p.x += Math.cos(angle) * p.speed
    p.y += Math.sin(angle) * p.speed
    if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
      p.x = Math.random() * w
      p.y = Math.random() * h
      p.px = p.x
      p.py = p.y
    }
  }
}

export function drawFlowParticles(ctx: CanvasRenderingContext2D, particles: FlowParticle[]): void {
  for (const p of particles) {
    ctx.beginPath()
    ctx.moveTo(p.px, p.py)
    ctx.lineTo(p.x, p.y)
    ctx.strokeStyle = `hsla(${p.hue},72%,58%,0.55)`
    ctx.lineWidth = 1.2
    ctx.stroke()
  }
}
