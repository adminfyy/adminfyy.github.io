/**
 * Pretext.js demo utilities
 *
 * Showcases @chenglou/pretext — a 15 KB zero-dependency text measurement & layout
 * engine that bypasses DOM reflow. Created by Cheng Lou (ex-React core, Midjourney).
 */

import {
  prepare,
  prepareWithSegments,
  layout,
  layoutWithLines,
  layoutNextLineRange,
  materializeLineRange,
  measureLineStats,
  walkLineRanges,
  measureNaturalWidth,
} from '@chenglou/pretext'
import type { LayoutCursor, PreparedTextWithSegments } from '@chenglou/pretext'

// ─── Sample texts ───

export const SAMPLE_TEXTS = [
  'Pretext is a pure JavaScript library for multiline text measurement & layout. Fast, accurate & supports all the languages you didn\'t even know about. It side-steps DOM reflow entirely.',
  'AGI 春天到了，人工智能的未来已经开始。بسم الله الرحمن الرحيم. The quick brown fox jumps over the lazy dog. 🚀✨',
  'In the beginning was the Word, and the Word was with God, and the Word was God. He was in the beginning with God. All things were made through him, and without him was not any thing made that was made.',
  'Typography is the craft of endowing human language with a durable visual form. It mediates between the author and the reader, shaping how meaning is received.',
]

export const BODY_FONT = '16px Inter, system-ui, sans-serif'
export const HEADING_FONT = '700 20px Inter, system-ui, sans-serif'

// ─── Demo 1: Canvas text renderer ───

export interface CanvasTextResult {
  lines: { text: string; width: number }[]
  height: number
  lineCount: number
}

export function renderTextOnCanvas(
  ctx: CanvasRenderingContext2D,
  text: string,
  font: string,
  maxWidth: number,
  lineHeight: number,
  color: string,
): CanvasTextResult {
  const prepared = prepareWithSegments(text, font)
  const result = layoutWithLines(prepared, maxWidth, lineHeight)

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.font = font
  ctx.fillStyle = color

  for (let i = 0; i < result.lines.length; i++) {
    ctx.fillText(result.lines[i].text, 12, 24 + i * lineHeight)
  }

  return {
    lines: result.lines.map(l => ({ text: l.text, width: l.width })),
    height: result.height,
    lineCount: result.lineCount,
  }
}

// ─── Demo 2: Text around obstacle ───

export interface FlowLine {
  text: string
  x: number
  y: number
  width: number
}

export function flowTextAroundObstacle(
  text: string,
  font: string,
  columnWidth: number,
  lineHeight: number,
  obstacle: { x: number; y: number; w: number; h: number },
): FlowLine[] {
  const prepared = prepareWithSegments(text, font)
  const lines: FlowLine[] = []
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
  let y = 0

  while (true) {
    // Variable width: if line overlaps obstacle horizontally, reduce width
    const overlapsObstacle = y >= obstacle.y && y < obstacle.y + obstacle.h
    const width = overlapsObstacle ? columnWidth - obstacle.w - 16 : columnWidth
    const xOffset = overlapsObstacle ? obstacle.x + obstacle.w + 16 : 0

    const range = layoutNextLineRange(prepared, cursor, width)
    if (range === null) break

    const line = materializeLineRange(prepared, range)
    lines.push({ text: line.text, x: xOffset, y: y + 20, width: line.width })
    cursor = range.end
    y += lineHeight
  }

  return lines
}

// ─── Demo 3: Virtualized list height prediction ───

export interface VirtualItem {
  text: string
  predictedHeight: number
  lineCount: number
}

export function predictHeights(items: string[], font: string, maxWidth: number, lineHeight: number): VirtualItem[] {
  return items.map(text => {
    const prepared = prepare(text, font)
    const { height, lineCount } = layout(prepared, maxWidth, lineHeight)
    return { text, predictedHeight: height || lineHeight, lineCount }
  })
}

// ─── Demo 4: Shrink-wrap / balanced text ───

export interface ShrinkWrapResult {
  lineCount: number
  maxLineWidth: number
  naturalWidth: number
  widestLineAtNatural: number
}

export function computeShrinkWrap(text: string, font: string, maxWidth: number): ShrinkWrapResult {
  const prepared = prepareWithSegments(text, font)
  const { lineCount, maxLineWidth } = measureLineStats(prepared, maxWidth)
  const naturalWidth = measureNaturalWidth(prepared)

  // Find the tightest balanced width
  let bestWidth = maxWidth
  let bestLines = lineCount
  const stats = measureLineStats(prepared, maxWidth)

  // Binary search for the narrowest width that still produces same line count
  let lo = 50
  let hi = maxWidth
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    const s = measureLineStats(prepared, mid)
    if (s.lineCount <= bestLines) {
      hi = mid
    } else {
      lo = mid + 1
    }
  }
  bestWidth = lo

  const naturalStats = measureLineStats(prepared, naturalWidth)

  return {
    lineCount: stats.lineCount,
    maxLineWidth: stats.maxLineWidth,
    naturalWidth,
    widestLineAtNatural: naturalStats.maxLineWidth,
  }
}

// ─── Performance benchmark ───

export interface BenchmarkResult {
  pretextTimeMs: number
  domTimeMs: number
  speedup: number
  iterations: number
}

export async function benchmarkVsDOM(
  text: string,
  font: string,
  maxWidth: number,
  lineHeight: number,
  iterations = 200,
): Promise<BenchmarkResult> {
  // Pretext benchmark
  const prepared = prepare(text, font)
  const t0 = performance.now()
  for (let i = 0; i < iterations; i++) {
    layout(prepared, maxWidth, lineHeight)
  }
  const pretextTimeMs = performance.now() - t0

  // DOM benchmark: measure via hidden element
  const div = document.createElement('div')
  div.style.cssText = `position:absolute;visibility:hidden;width:${maxWidth}px;font:${font};line-height:${lineHeight}px;white-space:normal;word-break:normal;`
  div.textContent = text
  document.body.appendChild(div)

  const t1 = performance.now()
  for (let i = 0; i < iterations; i++) {
    // Force reflow each iteration
    div.offsetHeight
  }
  const domTimeMs = performance.now() - t1
  document.body.removeChild(div)

  return {
    pretextTimeMs: Math.round(pretextTimeMs * 100) / 100,
    domTimeMs: Math.round(domTimeMs * 100) / 100,
    speedup: Math.round((domTimeMs / Math.max(pretextTimeMs, 0.01)) * 10) / 10,
    iterations,
  }
}

// ─── Re-exports for convenience ───
export {
  prepare,
  prepareWithSegments,
  layout,
  layoutWithLines,
  layoutNextLineRange,
  materializeLineRange,
  measureLineStats,
  walkLineRanges,
  measureNaturalWidth,
}
