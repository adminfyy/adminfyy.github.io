export interface AgentTool {
  id: string
  name: string
  tag: string
  description: string
  defaultGoal: string
  defaultContext: string
  defaultConstraints: string
}

export const agentTools: AgentTool[] = [
  {
    id: 'execute',
    name: '执行助手',
    tag: 'Delivery',
    description: '将需求转成可直接执行的变更任务，适合推进落地。',
    defaultGoal: '为项目新增一个可访问的 Agent 工具页并保持可测试',
    defaultContext: 'src/views, src/router/index.ts, src/components/__tests__',
    defaultConstraints: '不破坏现有路由；保持构建通过；输出 commit 建议'
  },
  {
    id: 'breakdown',
    name: '任务拆解器',
    tag: 'Planning',
    description: '把复杂需求拆分成阶段、风险和验证命令。',
    defaultGoal: '将 Hero 全站改造拆分为可并行执行的子任务',
    defaultContext: 'src/assets, src/views/HomeView.vue, src/App.vue',
    defaultConstraints: '先易后难；每一步可独立验收；保持移动端可读'
  },
  {
    id: 'review',
    name: '评审角色卡',
    tag: 'Review',
    description: '生成高标准代码评审提示词，强调风险和回归检查。',
    defaultGoal: '评审本次 Agent Portal 改动是否引入回归',
    defaultContext: 'router, views, styles, tests',
    defaultConstraints: '按严重度排序；给出精确文件定位；避免泛泛建议'
  }
]
