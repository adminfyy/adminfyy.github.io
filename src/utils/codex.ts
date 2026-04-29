export interface CodexPromptInput {
  objective: string
  stack: string
  constraints: string
  acceptance: string
  codeContext: string
}

const normalizeLine = (value: string) => value.trim() || '未提供'

export function buildCodexPrompt(input: CodexPromptInput): string {
  return [
    '你是一个资深工程师，请在当前仓库内完成以下任务：',
    `- 任务目标：${normalizeLine(input.objective)}`,
    `- 技术栈：${normalizeLine(input.stack)}`,
    `- 约束条件：${normalizeLine(input.constraints)}`,
    `- 验收标准：${normalizeLine(input.acceptance)}`,
    `- 相关代码上下文：${normalizeLine(input.codeContext)}`,
    '',
    '请按以下流程输出：',
    '1. 先给最小可行实现方案',
    '2. 再给代码改动点（文件路径 + 关键逻辑）',
    '3. 最后给验证步骤与风险'
  ].join('\n')
}

export function buildCommitMessage(type: string, scope: string, summary: string): string {
  const safeType = type.trim() || 'chore'
  const safeScope = scope.trim()
  const safeSummary = summary.trim() || 'update codex workflow'

  return safeScope ? `${safeType}(${safeScope}): ${safeSummary}` : `${safeType}: ${safeSummary}`
}
