<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { agentTools } from '@/mock/agent-tools'
import { buildExecutionPrompt, buildRolePrompt, buildTaskBreakdownPrompt } from '@/utils/agent'

const activeToolId = ref(agentTools[0].id)
const goal = ref(agentTools[0].defaultGoal)
const context = ref(agentTools[0].defaultContext)
const constraints = ref(agentTools[0].defaultConstraints)
const copiedTip = ref('')

const activeTool = computed(() => agentTools.find((tool) => tool.id === activeToolId.value) || agentTools[0])

watch(activeToolId, (nextId) => {
  const selected = agentTools.find((tool) => tool.id === nextId)
  if (!selected) return
  goal.value = selected.defaultGoal
  context.value = selected.defaultContext
  constraints.value = selected.defaultConstraints
})

const promptText = computed(() => {
  if (activeToolId.value === 'breakdown') {
    return buildTaskBreakdownPrompt({
      goal: goal.value,
      context: context.value,
      constraints: constraints.value
    })
  }

  if (activeToolId.value === 'review') {
    return buildRolePrompt({
      goal: goal.value,
      context: context.value,
      constraints: constraints.value
    })
  }

  return buildExecutionPrompt({
    goal: goal.value,
    context: context.value,
    constraints: constraints.value
  })
})

const copyPrompt = async () => {
  if (!navigator?.clipboard) {
    copiedTip.value = '当前浏览器不支持复制'
    return
  }

  await navigator.clipboard.writeText(promptText.value)
  copiedTip.value = '已复制 Agent Prompt'
  setTimeout(() => {
    copiedTip.value = ''
  }, 1200)
}
</script>

<template>
  <main class="portal">
    <section class="hero">
      <p class="eyebrow">Agent Tools Portal</p>
      <h1>Build Prompts Like a Product Demo</h1>
      <p>
        这是一个面向演示的 Agent 工具门户：选择工具卡，编辑输入，即可得到可直接投喂的高质量
        Prompt。
      </p>
    </section>

    <section class="tool-grid">
      <button
        v-for="tool in agentTools"
        :key="tool.id"
        class="tool-card"
        :class="{ active: tool.id === activeToolId }"
        @click="activeToolId = tool.id"
      >
        <p class="tag">{{ tool.tag }}</p>
        <h2>{{ tool.name }}</h2>
        <p>{{ tool.description }}</p>
      </button>
    </section>

    <section class="workspace">
      <div class="editor glass">
        <h3>输入参数</h3>
        <p class="tool-title">当前工具：{{ activeTool.name }}</p>
        <label>
          Goal
          <textarea v-model="goal" rows="3" />
        </label>
        <label>
          Context
          <textarea v-model="context" rows="2" />
        </label>
        <label>
          Constraints
          <textarea v-model="constraints" rows="2" />
        </label>
      </div>

      <div class="result glass">
        <h3>Prompt Output</h3>
        <pre>{{ promptText }}</pre>
        <button class="copy-btn" @click="copyPrompt">复制 Prompt</button>
        <p v-if="copiedTip" class="tip">{{ copiedTip }}</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.portal { width: 100%; animation: rise-in 0.5s var(--ease-out) both; }

.hero {
  padding: 1.5rem;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, #312e81, #4f46e5 50%, #7c3aed);
  color: #fff;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 85% 10%, rgba(255,255,255,0.1), transparent 35%);
  pointer-events: none;
}

.eyebrow { text-transform: uppercase; letter-spacing: 0.12em; font-size: 11px; opacity: 0.7; font-weight: 600; }

.tool-grid { margin-top: 1rem; display: grid; grid-template-columns: 1fr; gap: 0.65rem; }

.tool-card {
  text-align: left; padding: 1rem; border-radius: var(--radius-md);
  border: 1px solid var(--color-border); background: var(--surface-glass);
  color: var(--color-text); cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
}
.tool-card:hover { transform: translateY(-2px); border-color: var(--color-border-hover); }
.tool-card.active { border-color: var(--accent-500); background: var(--accent-bg-light); }

.tag { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-secondary); }

.workspace {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.glass {
  border-radius: var(--radius-lg); padding: 1rem;
  border: 1px solid var(--color-border); background: var(--surface-glass);
}

.tool-title { margin: 0.3rem 0 0.8rem; color: var(--color-text-secondary); font-size: 0.92rem; }

label {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 0.65rem;
}

textarea { border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 0.55rem; color: var(--color-text); background: var(--bg-0); font-size: 0.92rem; }

pre { white-space: pre-wrap; border: 1px dashed var(--color-border-hover); border-radius: var(--radius-md); padding: 0.75rem; margin: 0.65rem 0; background: var(--bg-2); font-family: var(--font-mono); font-size: 0.88rem; }

.copy-btn {
  border: 1px solid var(--accent-500); border-radius: var(--radius-pill);
  background: var(--bg-0); color: var(--accent-600); padding: 0.4rem 0.9rem;
  cursor: pointer; font-size: 0.92rem; transition: all var(--duration-fast) ease;
}
.copy-btn:hover { background: var(--accent-bg-light); }

.tip { color: #10b981; margin-top: 0.5rem; font-size: 0.92rem; }

@media (min-width: 880px) {
  .tool-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .workspace {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
