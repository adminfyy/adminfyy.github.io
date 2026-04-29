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
.portal {
  width: 100%;
  animation: rise-in 0.6s ease-out both;
}

.hero {
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  background:
    radial-gradient(circle at 85% 10%, rgba(97, 218, 251, 0.35), transparent 35%),
    linear-gradient(130deg, rgba(6, 17, 46, 0.9), rgba(12, 64, 77, 0.78));
  color: #effbff;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 12px;
  opacity: 0.88;
}

.tool-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
}

.tool-card {
  text-align: left;
  padding: 1rem;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  background: var(--surface-glass);
  color: var(--color-text);
  cursor: pointer;
  transition: transform 0.24s ease, border-color 0.24s ease, background 0.24s ease;
}

.tool-card:hover {
  transform: translateY(-2px);
  border-color: rgba(97, 218, 251, 0.5);
}

.tool-card.active {
  border-color: rgba(97, 218, 251, 0.55);
  background: rgba(23, 56, 89, 0.45);
}

.tag {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.8;
}

.workspace {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.glass {
  border-radius: 16px;
  padding: 1rem;
  border: 1px solid var(--color-border);
  background: var(--surface-glass);
  backdrop-filter: blur(8px);
}

.tool-title {
  margin: 0.3rem 0 0.8rem;
  opacity: 0.9;
}

label {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 0.65rem;
}

textarea {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 0.6rem;
  color: var(--color-text);
  background: rgba(5, 18, 36, 0.5);
}

pre {
  white-space: pre-wrap;
  border: 1px dashed var(--color-border-hover);
  border-radius: 12px;
  padding: 0.8rem;
  margin: 0.7rem 0;
  background: rgba(3, 13, 30, 0.46);
}

.copy-btn {
  border: 1px solid rgba(97, 218, 251, 0.5);
  border-radius: 999px;
  background: rgba(13, 54, 84, 0.6);
  color: #e8fbff;
  padding: 0.4rem 0.95rem;
  cursor: pointer;
}

.tip {
  color: #a2f2c3;
  margin-top: 0.5rem;
}

@media (min-width: 880px) {
  .tool-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .workspace {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
