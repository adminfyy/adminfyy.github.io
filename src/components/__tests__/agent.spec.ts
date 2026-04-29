import { describe, expect, it } from 'vitest'

import { buildExecutionPrompt, buildRolePrompt, buildTaskBreakdownPrompt } from '@/utils/agent'

describe('agent prompt helpers', () => {
  it('builds task breakdown prompt', () => {
    const text = buildTaskBreakdownPrompt({
      goal: '重构首页',
      context: 'src/views/HomeView.vue',
      constraints: '保持移动端可读'
    })
    expect(text).toContain('里程碑')
    expect(text).toContain('目标：重构首页')
  })

  it('builds review role prompt with fallback', () => {
    const text = buildRolePrompt({
      goal: '',
      context: '',
      constraints: ''
    })
    expect(text).toContain('评审目标：未提供')
    expect(text).toContain('必须遵守：未提供')
  })

  it('builds execution prompt', () => {
    const text = buildExecutionPrompt({
      goal: '新增 agent 页面',
      context: 'src/views/AgentPortalView.vue',
      constraints: '不引入后端'
    })
    expect(text).toContain('执行型工程 Agent')
    expect(text).toContain('任务：新增 agent 页面')
  })
})
