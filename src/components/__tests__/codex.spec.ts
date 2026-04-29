import { describe, expect, it } from 'vitest'

import { buildCodexPrompt, buildCommitMessage } from '@/utils/codex'

describe('codex utils', () => {
  it('builds commit message with scope', () => {
    expect(buildCommitMessage('feat', 'router', 'add codex page')).toBe(
      'feat(router): add codex page'
    )
  })

  it('builds commit message without scope', () => {
    expect(buildCommitMessage('fix', '', 'repair prompt generation')).toBe(
      'fix: repair prompt generation'
    )
  })

  it('fills fallback values when prompt fields are blank', () => {
    const prompt = buildCodexPrompt({
      objective: '',
      stack: '',
      constraints: '',
      acceptance: '',
      codeContext: ''
    })
    expect(prompt).toContain('任务目标：未提供')
    expect(prompt).toContain('技术栈：未提供')
  })
})
