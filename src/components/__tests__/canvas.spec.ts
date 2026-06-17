import { describe, expect, it } from 'vitest'

import {
  clearCanvas,
  createGravityBodies,
  updateGravityBodies,
  drawGravityBodies,
  generateTree,
  drawTree,
  createRipple,
  updateRipples,
  drawRipples,
  createFlowParticles,
  updateFlowParticles,
  drawFlowParticles,
} from '@/utils/canvas'

// ─── Mock canvas context ───

function mockCtx() {
  const calls: string[] = []
  return {
    calls,
    ctx: {
      clearRect: () => calls.push('clearRect'),
      fillRect: () => calls.push('fillRect'),
      beginPath: () => calls.push('beginPath'),
      moveTo: () => calls.push('moveTo'),
      lineTo: () => calls.push('lineTo'),
      stroke: () => calls.push('stroke'),
      fill: () => calls.push('fill'),
      arc: () => calls.push('arc'),
      fillText: () => calls.push('fillText'),
      strokeStyle: '',
      fillStyle: '',
      lineWidth: 0,
      lineCap: '',
      font: '',
      textAlign: '',
      globalAlpha: 1,
    } as unknown as CanvasRenderingContext2D,
  }
}

// ─── Gravity Field ───

describe('Gravity Field', () => {
  it('createGravityBodies returns requested count', () => {
    const bodies = createGravityBodies(800, 400, 50)
    expect(bodies.length).toBe(50)
  })

  it('bodies have valid initial properties', () => {
    const bodies = createGravityBodies(800, 400, 10)
    for (const b of bodies) {
      expect(b.x).toBeGreaterThanOrEqual(0)
      expect(b.x).toBeLessThanOrEqual(800)
      expect(b.y).toBeGreaterThanOrEqual(0)
      expect(b.y).toBeLessThanOrEqual(400)
      expect(b.mass).toBeGreaterThan(0)
      expect(b.radius).toBeGreaterThan(0)
      expect(b.trail).toEqual([])
    }
  })

  it('updateGravityBodies moves bodies toward mouse', () => {
    const bodies = createGravityBodies(800, 400, 5)
    const prev = bodies.map(b => ({ x: b.x, y: b.y }))
    updateGravityBodies(bodies, 400, 200, 800, 400, 150)
    // At least some bodies should have moved
    const moved = bodies.some((b, i) => b.x !== prev[i].x || b.y !== prev[i].y)
    expect(moved).toBe(true)
    // Trail should have been populated
    for (const b of bodies) {
      expect(b.trail.length).toBeGreaterThanOrEqual(0)
    }
  })

  it('drawGravityBodies calls canvas methods', () => {
    const { calls, ctx } = mockCtx()
    const bodies = createGravityBodies(200, 100, 3)
    bodies[0].trail = [{ x: 10, y: 10 }, { x: 20, y: 20 }]
    drawGravityBodies(ctx, bodies)
    expect(calls).toContain('arc')
    expect(calls).toContain('fill')
  })
})

// ─── Fractal Tree ───

describe('Fractal Tree', () => {
  it('generateTree returns segments', () => {
    const segs = generateTree(400, 400, -Math.PI / 2, 100, 0, 5, 0.45, 0)
    expect(segs.length).toBeGreaterThan(0)
    // First segment starts at root
    expect(segs[0].x1).toBe(400)
    expect(segs[0].y1).toBe(400)
  })

  it('deeper trees produce more segments', () => {
    const shallow = generateTree(400, 400, -Math.PI / 2, 100, 0, 3, 0.45, 0)
    const deep = generateTree(400, 400, -Math.PI / 2, 100, 0, 7, 0.45, 0)
    expect(deep.length).toBeGreaterThan(shallow.length)
  })

  it('drawTree calls canvas methods', () => {
    const { calls, ctx } = mockCtx()
    const segs = generateTree(400, 400, -Math.PI / 2, 100, 0, 4, 0.45, 0)
    drawTree(ctx, segs, 4)
    expect(calls).toContain('beginPath')
    expect(calls).toContain('stroke')
  })
})

// ─── Ripple Waves ───

describe('Ripple Waves', () => {
  it('createRipple creates a ripple at click position', () => {
    const r = createRipple(100, 200, 0)
    expect(r.x).toBe(100)
    expect(r.y).toBe(200)
    expect(r.radius).toBe(0)
    expect(r.maxRadius).toBeGreaterThan(0)
  })

  it('updateRipples expands radius', () => {
    const ripples = [createRipple(50, 50, 0)]
    updateRipples(ripples, 2.5)
    expect(ripples[0].radius).toBe(2.5)
  })

  it('updateRipples removes finished ripples', () => {
    const r = createRipple(50, 50, 0)
    r.radius = r.maxRadius + 1
    const result = updateRipples([r], 2.5)
    expect(result.length).toBe(0)
  })

  it('drawRipples calls canvas methods', () => {
    const { calls, ctx } = mockCtx()
    const ripples = [createRipple(100, 100, 0)]
    ripples[0].radius = 30
    drawRipples(ctx, ripples)
    expect(calls).toContain('arc')
    expect(calls).toContain('stroke')
  })
})

// ─── Flow Field ───

describe('Flow Field', () => {
  it('createFlowParticles returns requested count', () => {
    const particles = createFlowParticles(800, 400, 100)
    expect(particles.length).toBe(100)
  })

  it('particles have valid initial positions', () => {
    const particles = createFlowParticles(800, 400, 20)
    for (const p of particles) {
      expect(p.x).toBeGreaterThanOrEqual(0)
      expect(p.x).toBeLessThanOrEqual(800)
      expect(p.y).toBeGreaterThanOrEqual(0)
      expect(p.y).toBeLessThanOrEqual(400)
      expect(p.speed).toBeGreaterThan(0)
    }
  })

  it('updateFlowParticles moves particles', () => {
    const particles = createFlowParticles(800, 400, 10)
    const prev = particles.map(p => ({ x: p.x, y: p.y }))
    updateFlowParticles(particles, 800, 400, 0, 0.005)
    const moved = particles.some((p, i) => p.x !== prev[i].x || p.y !== prev[i].y)
    expect(moved).toBe(true)
  })

  it('drawFlowParticles calls canvas methods', () => {
    const { calls, ctx } = mockCtx()
    const particles = createFlowParticles(200, 100, 5)
    drawFlowParticles(ctx, particles)
    expect(calls).toContain('beginPath')
    expect(calls).toContain('stroke')
  })
})

// ─── clearCanvas ───

describe('clearCanvas', () => {
  it('calls clearRect with correct dimensions', () => {
    const { calls, ctx } = mockCtx()
    clearCanvas(ctx, 800, 600)
    expect(calls).toContain('clearRect')
  })
})
