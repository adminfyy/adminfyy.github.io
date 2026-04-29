<script setup lang="ts">
import { computed, ref } from 'vue'

import { buildCodexPrompt, buildCommitMessage } from '@/utils/codex'

const objective = ref('为当前项目新增一个可访问的 Codex 工具页')
const stack = ref('Vue2 + Vite + Vue Router + Vitest')
const constraints = ref('尽量少改现有结构；兼容现有样式；保持可测试')
const acceptance = ref('路由可访问；可生成提示词；可生成提交信息；单测通过')
const codeContext = ref('src/router/index.ts, src/views, src/components/__tests__')

const commitType = ref('feat')
const commitScope = ref('codex')
const commitSummary = ref('add codex prompt and commit helper page')

const generatedPrompt = computed(() =>
  buildCodexPrompt({
    objective: objective.value,
    stack: stack.value,
    constraints: constraints.value,
    acceptance: acceptance.value,
    codeContext: codeContext.value
  })
)

const generatedCommitMessage = computed(() =>
  buildCommitMessage(commitType.value, commitScope.value, commitSummary.value)
)

const copiedTip = ref('')

const copyText = async (text: string, label: string) => {
  if (!navigator?.clipboard) {
    copiedTip.value = `当前浏览器不支持复制：${label}`
    return
  }
  await navigator.clipboard.writeText(text)
  copiedTip.value = `已复制：${label}`
  setTimeout(() => {
    copiedTip.value = ''
  }, 1200)
}
</script>

<template>
  <main class="codex">
    <section class="hero">
      <p class="eyebrow">Codex Workbench</p>
      <h1>Prompt and Commit Toolkit</h1>
      <p class="intro">把需求快速整理成可直接给 Codex 的输入，并同步生成规范提交信息。</p>
    </section>

    <section class="card">
      <h2>提示词生成器</h2>
      <div class="grid">
        <label>
          任务目标
          <textarea v-model="objective" rows="2" />
        </label>
        <label>
          技术栈
          <input v-model="stack" type="text" />
        </label>
        <label>
          约束条件
          <textarea v-model="constraints" rows="2" />
        </label>
        <label>
          验收标准
          <textarea v-model="acceptance" rows="2" />
        </label>
        <label>
          代码上下文
          <input v-model="codeContext" type="text" />
        </label>
      </div>
      <pre>{{ generatedPrompt }}</pre>
      <button @click="copyText(generatedPrompt, 'Codex 提示词')">复制提示词</button>
    </section>

    <section class="card">
      <h2>提交信息生成器</h2>
      <div class="grid commit-grid">
        <label>
          Type
          <select v-model="commitType">
            <option value="feat">feat</option>
            <option value="fix">fix</option>
            <option value="chore">chore</option>
            <option value="docs">docs</option>
            <option value="refactor">refactor</option>
            <option value="test">test</option>
          </select>
        </label>
        <label>
          Scope
          <input v-model="commitScope" type="text" placeholder="如: router" />
        </label>
        <label class="full">
          Summary
          <input v-model="commitSummary" type="text" placeholder="一句话描述变更" />
        </label>
      </div>
      <pre>{{ generatedCommitMessage }}</pre>
      <button @click="copyText(generatedCommitMessage, 'Commit Message')">复制提交信息</button>
    </section>

    <p v-if="copiedTip" class="tip">{{ copiedTip }}</p>
  </main>
</template>

<style scoped>
.codex {
  width: 100%;
  display: grid;
  gap: 1rem;
  animation: rise-in 0.55s ease both;
}

.hero {
  border-radius: 18px;
  border: 1px solid rgba(168, 230, 255, 0.26);
  padding: 1.2rem;
  color: #edf9ff;
  background:
    radial-gradient(circle at 84% 10%, rgba(97, 218, 251, 0.31), transparent 30%),
    linear-gradient(135deg, #081631, #123e4f);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  opacity: 0.84;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.3rem);
  margin: 0.3rem 0;
}

.intro {
  opacity: 0.94;
}

.card {
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 1rem;
  background: var(--surface-glass);
  backdrop-filter: blur(8px);
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin: 0.75rem 0;
}

label {
  display: grid;
  gap: 0.35rem;
  font-size: 14px;
}

textarea,
input,
select {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.5rem;
  color: var(--color-text);
  background: rgba(4, 17, 34, 0.46);
}

pre {
  white-space: pre-wrap;
  border: 1px dashed var(--color-border-hover);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

button {
  border: 1px solid rgba(97, 218, 251, 0.4);
  border-radius: 999px;
  padding: 0.4rem 0.75rem;
  background: rgba(8, 42, 70, 0.53);
  color: #e4f8ff;
  cursor: pointer;
}

.tip {
  color: #2b8a3e;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .commit-grid .full {
    grid-column: span 2;
  }
}
</style>
