import { describe, expect, it, vi, beforeEach } from 'vitest'

// Mock @chenglou/pretext since jsdom lacks real Canvas measureText
vi.mock('@chenglou/pretext', () => {
  // Simulate simple text measurement: ~8px per char, wrapping at maxWidth
  const charWidth = 8

  const mockPrepare = (text: string) => ({ text, _prepared: true })
  const mockPrepareWithSegments = (text: string) => ({
    text,
    _segments: true,
    segLevels: [],
  })

  const mockLayout = (prepared: any, maxWidth: number, lineHeight: number) => {
    const text = prepared.text || ''
    if (!text) return { height: 0, lineCount: 0 }
    const totalWidth = text.length * charWidth
    const lineCount = Math.max(1, Math.ceil(totalWidth / maxWidth))
    return { height: lineCount * lineHeight, lineCount }
  }

  const mockLayoutWithLines = (prepared: any, maxWidth: number, lineHeight: number) => {
    const text = prepared.text || ''
    if (!text) return { height: 0, lineCount: 0, lines: [] }
    const charsPerLine = Math.max(1, Math.floor(maxWidth / charWidth))
    const lines: { text: string; width: number; start: any; end: any }[] = []
    for (let i = 0; i < text.length; i += charsPerLine) {
      const slice = text.slice(i, i + charsPerLine)
      lines.push({
        text: slice,
        width: slice.length * charWidth,
        start: { segmentIndex: 0, graphemeIndex: i },
        end: { segmentIndex: 0, graphemeIndex: Math.min(i + charsPerLine, text.length) },
      })
    }
    return {
      height: lines.length * lineHeight,
      lineCount: lines.length,
      lines,
    }
  }

  const mockLayoutNextLineRange = (prepared: any, cursor: any, maxWidth: number) => {
    const text = prepared.text || ''
    const idx = cursor.graphemeIndex || 0
    if (idx >= text.length) return null
    const charsPerLine = Math.max(1, Math.floor(maxWidth / charWidth))
    const endIdx = Math.min(idx + charsPerLine, text.length)
    return {
      width: (endIdx - idx) * charWidth,
      start: { segmentIndex: 0, graphemeIndex: idx },
      end: { segmentIndex: 0, graphemeIndex: endIdx },
    }
  }

  const mockMaterializeLineRange = (prepared: any, range: any) => {
    const text = prepared.text || ''
    return {
      text: text.slice(range.start.graphemeIndex, range.end.graphemeIndex),
      width: range.width,
      start: range.start,
      end: range.end,
    }
  }

  const mockMeasureLineStats = (prepared: any, maxWidth: number) => {
    const text = prepared.text || ''
    const charsPerLine = Math.max(1, Math.floor(maxWidth / charWidth))
    const lineCount = Math.max(1, Math.ceil(text.length / charsPerLine))
    const lastLineLen = text.length % charsPerLine || charsPerLine
    const maxLineWidth = Math.min(text.length, charsPerLine) * charWidth
    return { lineCount, maxLineWidth }
  }

  const mockWalkLineRanges = (prepared: any, maxWidth: number, onLine: (l: any) => void) => {
    const stats = mockMeasureLineStats(prepared, maxWidth)
    const charsPerLine = Math.max(1, Math.floor(maxWidth / charWidth))
    const text = prepared.text || ''
    for (let i = 0; i < text.length; i += charsPerLine) {
      const end = Math.min(i + charsPerLine, text.length)
      onLine({
        width: (end - i) * charWidth,
        start: { segmentIndex: 0, graphemeIndex: i },
        end: { segmentIndex: 0, graphemeIndex: end },
      })
    }
    return stats.lineCount
  }

  const mockMeasureNaturalWidth = (prepared: any) => {
    const text = prepared.text || ''
    return text.length * charWidth
  }

  return {
    prepare: mockPrepare,
    prepareWithSegments: mockPrepareWithSegments,
    layout: mockLayout,
    layoutWithLines: mockLayoutWithLines,
    layoutNextLineRange: mockLayoutNextLineRange,
    materializeLineRange: mockMaterializeLineRange,
    measureLineStats: mockMeasureLineStats,
    walkLineRanges: mockWalkLineRanges,
    measureNaturalWidth: mockMeasureNaturalWidth,
  }
})

import {
  predictHeights,
  computeShrinkWrap,
  flowTextAroundObstacle,
  SAMPLE_TEXTS,
  BODY_FONT,
} from '@/utils/pretext'

describe('pretext utils', () => {
  describe('predictHeights', () => {
    it('returns an item for each input text', () => {
      const items = predictHeights(SAMPLE_TEXTS, BODY_FONT, 400, 24)
      expect(items.length).toBe(SAMPLE_TEXTS.length)
    })

    it('each item has predictedHeight and lineCount', () => {
      const items = predictHeights(['Hello world', 'Short'], BODY_FONT, 400, 24)
      for (const item of items) {
        expect(item.predictedHeight).toBeGreaterThan(0)
        expect(item.lineCount).toBeGreaterThanOrEqual(1)
      }
    })

    it('longer text produces more lines than shorter text', () => {
      const short = predictHeights(['Hi'], BODY_FONT, 200, 24)
      const long = predictHeights(['This is a much longer sentence that should wrap to multiple lines'], BODY_FONT, 200, 24)
      expect(long[0].lineCount).toBeGreaterThanOrEqual(short[0].lineCount)
    })

    it('narrower width produces more lines', () => {
      const wide = predictHeights([SAMPLE_TEXTS[0]], BODY_FONT, 800, 24)
      const narrow = predictHeights([SAMPLE_TEXTS[0]], BODY_FONT, 200, 24)
      expect(narrow[0].lineCount).toBeGreaterThanOrEqual(wide[0].lineCount)
    })

    it('height equals lineCount * lineHeight', () => {
      const items = predictHeights([SAMPLE_TEXTS[0]], BODY_FONT, 400, 24)
      expect(items[0].predictedHeight).toBe(items[0].lineCount * 24)
    })
  })

  describe('computeShrinkWrap', () => {
    it('returns valid shrink-wrap results', () => {
      const result = computeShrinkWrap(SAMPLE_TEXTS[0], BODY_FONT, 500)
      expect(result.lineCount).toBeGreaterThanOrEqual(1)
      expect(result.maxLineWidth).toBeGreaterThan(0)
      expect(result.naturalWidth).toBeGreaterThan(0)
    })

    it('naturalWidth is greater than maxLineWidth for long text', () => {
      const result = computeShrinkWrap(SAMPLE_TEXTS[0], BODY_FONT, 200)
      // Natural width is the single-line width, always >= wrapped maxLineWidth
      expect(result.naturalWidth).toBeGreaterThanOrEqual(result.maxLineWidth)
    })

    it('empty text returns sensible defaults', () => {
      const result = computeShrinkWrap('', BODY_FONT, 400)
      // Empty text should have 0 or 1 lineCount depending on implementation
      expect(result.lineCount).toBeGreaterThanOrEqual(0)
    })
  })

  describe('flowTextAroundObstacle', () => {
    it('returns flow lines for given text', () => {
      const lines = flowTextAroundObstacle(
        SAMPLE_TEXTS[0], BODY_FONT, 500, 24,
        { x: 200, y: 0, w: 100, h: 80 },
      )
      expect(lines.length).toBeGreaterThan(0)
    })

    it('each line has text, x, y, width', () => {
      const lines = flowTextAroundObstacle(
        'Short text here', BODY_FONT, 500, 24,
        { x: 200, y: 0, w: 100, h: 80 },
      )
      for (const line of lines) {
        expect(line.text).toBeDefined()
        expect(typeof line.x).toBe('number')
        expect(typeof line.y).toBe('number')
        expect(typeof line.width).toBe('number')
      }
    })

    it('lines near obstacle have x offset', () => {
      const lines = flowTextAroundObstacle(
        SAMPLE_TEXTS[0], BODY_FONT, 500, 24,
        { x: 100, y: 0, w: 150, h: 200 },
      )
      // First few lines should have x offset since they overlap obstacle
      const offsetLines = lines.filter(l => l.x > 0)
      expect(offsetLines.length).toBeGreaterThan(0)
    })

    it('lines below obstacle have no x offset', () => {
      const lines = flowTextAroundObstacle(
        SAMPLE_TEXTS[0] + ' ' + SAMPLE_TEXTS[0], BODY_FONT, 500, 24,
        { x: 100, y: 0, w: 150, h: 30 }, // very short obstacle
      )
      // Lines after the obstacle should start at x=0
      const zeroLines = lines.filter(l => l.x === 0)
      expect(zeroLines.length).toBeGreaterThan(0)
    })
  })

  describe('SAMPLE_TEXTS', () => {
    it('contains multiple sample texts', () => {
      expect(SAMPLE_TEXTS.length).toBeGreaterThanOrEqual(3)
    })

    it('includes multilingual text', () => {
      const joined = SAMPLE_TEXTS.join(' ')
      // Should contain CJK characters
      expect(/[\u4e00-\u9fff]/.test(joined)).toBe(true)
    })
  })

  describe('BODY_FONT', () => {
    it('is a valid canvas font string', () => {
      expect(BODY_FONT).toMatch(/\d+px/)
    })
  })
})
