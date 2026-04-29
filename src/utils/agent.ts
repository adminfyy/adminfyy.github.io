export interface AgentPromptInput {
  goal: string
  context: string
  constraints: string
}

const line = (value: string) => value.trim() || '未提供'

export function buildTaskBreakdownPrompt(input: AgentPromptInput): string {
  return [
    '你是资深工程经理，请将任务拆解为可执行清单：',
    `- 目标：${line(input.goal)}`,
    `- 上下文：${line(input.context)}`,
    `- 约束：${line(input.constraints)}`,
    '',
    '输出要求：',
    '1. 里程碑（按先后）',
    '2. 每个里程碑的风险和回滚策略',
    '3. 验收标准和验证命令'
  ].join('\n')
}

export function buildRolePrompt(input: AgentPromptInput): string {
  return [
    '你现在扮演 AI Agent Reviewer。',
    `- 评审目标：${line(input.goal)}`,
    `- 仓库上下文：${line(input.context)}`,
    `- 必须遵守：${line(input.constraints)}`,
    '',
    '请输出：',
    '1. 高风险问题（按严重度）',
    '2. 可执行修复建议',
    '3. 最小验证步骤'
  ].join('\n')
}

export function buildExecutionPrompt(input: AgentPromptInput): string {
  return [
    '你是执行型工程 Agent，请直接落地需求。',
    `- 任务：${line(input.goal)}`,
    `- 代码位置：${line(input.context)}`,
    `- 限制：${line(input.constraints)}`,
    '',
    '请先给变更计划，再执行修改，最后输出测试结果摘要。'
  ].join('\n')
}
