<script setup lang="ts">
const skillGroups = [
  {
    title: 'Frontend',
    items: ['Vue 2/3', 'React', 'TypeScript', 'JavaScript', 'HTML/CSS']
  },
  {
    title: 'Engineering',
    items: ['Vite', 'Vitest', 'Cypress', 'Git', 'Docs Pipeline']
  },
  {
    title: 'Cross-platform',
    items: ['Electron', 'uni-app', 'RN', 'MobX', 'Backbone']
  }
]

const workContents = [
  '负责 H5/前端业务需求拆解、方案设计与模块开发落地。',
  '参与桌面端通信能力建设，处理进程通信、窗口管理与页面联动。',
  '推进跨端页面迭代（Web/小程序/混合端），提升可维护性与交付效率。',
  '进行前后端联调、线上问题排查与性能优化，保障稳定发布。'
]
</script>

<template>
  <div class="about">
    <p class="eyebrow">About</p>
    <h1>Resume</h1>
    <p class="intro">adminfoo · Frontend Engineer · 6Y+ Experience · 技术改变生活</p>

    <section class="block">
      <h2>Profile</h2>
      <p>专注前端工程效率与交付质量，具备 Web、桌面端与跨端项目研发经验。</p>
    </section>

    <section class="block">
      <h2>Core Skills</h2>
      <div v-for="group in skillGroups" :key="group.title" class="skill-group">
        <p class="group-title">{{ group.title }}</p>
        <div class="chip-list">
          <span v-for="item in group.items" :key="item" class="chip">{{ item }}</span>
        </div>
      </div>
    </section>

    <section class="block">
      <h2>Engineering Focus</h2>
      <ul>
        <li>熟悉组件化、路由与状态管理，能快速完成业务模块落地。</li>
        <li>重视工程规范与自动化测试，长期维护 GitHub 项目迭代记录。</li>
        <li>有跨团队需求评审与前后端协作经验。</li>
      </ul>
    </section>

    <section class="block">
      <h2>Work Content</h2>
      <ul>
        <li v-for="item in workContents" :key="item">{{ item }}</li>
      </ul>
    </section>

    <section class="block">
      <h2>Education</h2>
      <p>福大</p>
    </section>

    <section class="block">
      <h2>Contact</h2>
      <p>Phone: 156****0033</p>
      <p>Email: 2877****@qq.com</p>
      <p>Location: 福建 · 厦门（模糊展示）</p>
    </section>
  </div>
</template>

<style scoped>
.about {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--surface-glass);
  padding: 1.5rem;
  animation: rise-in 0.5s var(--ease-out) both;
  box-shadow: var(--shadow-sm);
}

.eyebrow { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-text-secondary); font-weight: 600; }

h1 { margin: 0.3rem 0 0.6rem; font-family: var(--font-display); letter-spacing: -0.02em; }

.intro { margin-bottom: 0.9rem; color: var(--color-text-secondary); font-size: 0.92rem; }

.block { margin-top: 0.95rem; border-top: 1px solid var(--color-border); padding-top: 0.8rem; }

h2 { font-size: 1rem; margin-bottom: 0.45rem; letter-spacing: -0.01em; }

.chip-list { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.skill-group + .skill-group { margin-top: 0.5rem; }

.group-title { font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-secondary); margin-bottom: 0.3rem; font-weight: 600; }

.chip { border: 1px solid var(--color-border); border-radius: var(--radius-pill); padding: 0.2rem 0.6rem; background: var(--accent-bg-subtle); color: var(--accent-600); font-size: 0.92rem; }

ul { padding-left: 1.1rem; color: var(--color-text-secondary); font-size: 0.92rem; }
</style>
