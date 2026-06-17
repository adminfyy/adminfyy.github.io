<script setup lang="ts">
import { getAllBlogPosts, getBlogStats } from '@/utils/blogPosts'
import type { BlogPost } from '@/utils/blogPosts'

const posts = getAllBlogPosts()
const stats = getBlogStats()
const featuredPosts: BlogPost[] = posts.slice(0, 3)
</script>

<template>
  <main class="blog-page">
    <section class="hero">
      <div class="hero-content">
        <p class="kicker">🌟 技术改变生活</p>
        <h1>用代码探索世界，以工程驱动创新</h1>
        <p class="description">
          记录前端工程实践、设计模式研究与 Agent 工具开发，展示技术如何赋能日常生活。
        </p>
        <div class="hero-actions">
          <router-link class="btn primary" to="/about">
            <span class="btn-icon">👨‍💻</span>
            关于我
          </router-link>
          <router-link class="btn ghost" to="/agent-portal">
            <span class="btn-icon">🚀</span>
            Agent Portal
          </router-link>
        </div>
      </div>
      <div class="hero-metrics">
        <div class="metric">
          <div class="metric-icon">💡</div>
          <p>技术理念</p>
          <strong>创新</strong>
        </div>
        <div class="metric">
          <div class="metric-icon">🔧</div>
          <p>工程实践</p>
          <strong>落地</strong>
        </div>
        <div class="metric">
          <div class="metric-icon">📝</div>
          <p>文章</p>
          <strong>{{ stats.total }}</strong>
        </div>
        <div class="metric">
          <div class="metric-icon">🌐</div>
          <p>开源</p>
          <strong>共享</strong>
        </div>
      </div>
    </section>

    <section class="featured">
      <h2>
        <span class="section-icon">📌</span>
        精选文章
      </h2>
      <div class="featured-grid">
        <article v-for="(post, index) in featuredPosts" :key="post.id" class="featured-card" :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="card-header">
            <p class="meta">{{ post.category }}</p>
            <span class="source-badge">{{ post.source }}</span>
          </div>
          <h3>{{ post.title }}</h3>
          <p class="excerpt">{{ post.excerpt }}</p>
          <router-link class="read-link" :to="`/blog/${post.slug}`">
            阅读全文
            <span class="arrow">→</span>
          </router-link>
        </article>
      </div>
    </section>

    <section class="blog-layout">
      <article class="post-list">
        <div v-for="(post, index) in posts" :key="post.id" class="post-card" :style="{ animationDelay: `${index * 0.05}s` }">
          <div class="card-top">
            <p class="meta">{{ post.category }}</p>
            <span class="source-badge small">{{ post.source }}</span>
          </div>
          <h2>{{ post.title }}</h2>
          <p class="excerpt">{{ post.excerpt }}</p>
          <router-link class="read-link" :to="`/blog/${post.slug}`">
            阅读全文
            <span class="arrow">→</span>
          </router-link>
          <details class="content-preview">
            <summary>
              <span class="expand-icon">▼</span>
              展开内容
            </summary>
            <pre>{{ post.content }}</pre>
          </details>
        </div>
      </article>

      <aside class="sidebar">
        <div class="panel highlight">
          <h3>
            <span class="panel-icon">🔧</span>
            内容来源
          </h3>
          <p>
            自动读取 <code>/vdocs/blog/*.md</code> 与 <code>/pattern/*.{md,js,html}</code> 并注入主站博客流。
          </p>
        </div>
        <div class="panel">
          <h3>
            <span class="panel-icon">🌐</span>
            工具门户
          </h3>
          <p>访问 <code>/agent-portal</code> 获取 Agent Prompt 工具门户。</p>
        </div>
        <div class="panel stats-panel">
          <h3>
            <span class="panel-icon">📊</span>
            快速统计
          </h3>
          <div class="stats-list">
            <div class="stat-item">
              <span class="stat-label">文章总数</span>
              <span class="stat-value">{{ stats.total }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">VDocs</span>
              <span class="stat-value">{{ stats.vdocsCount }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Patterns</span>
              <span class="stat-value">{{ stats.patternCount }}</span>
            </div>
          </div>
        </div>
      </aside>
    </section>
  </main>
</template>

<style scoped>
.blog-page {
  width: 100%;
  display: grid;
  gap: 1.5rem;
  animation: rise-in 0.5s var(--ease-out) both;
}

@keyframes rise-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── Hero ─── */
.hero {
  padding: 2rem;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, #312e81, #4f46e5 50%, #7c3aed);
  color: #fff;
  display: grid;
  gap: 1.5rem;
  box-shadow: var(--shadow-xl);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 74% 8%, rgba(255,255,255,0.12), transparent 35%),
    radial-gradient(circle at 22% 90%, rgba(167,139,250,0.18), transparent 40%);
  pointer-events: none;
}

.kicker {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  opacity: 0.75;
  font-weight: 600;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4.5vw, 2.8rem);
  line-height: 1.12;
  margin: 0.4rem 0 0.6rem;
  color: #fff;
  letter-spacing: -0.03em;
}

.description {
  max-width: 55ch;
  opacity: 0.88;
  line-height: 1.65;
  font-size: 0.95rem;
}

.hero-actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.btn {
  border-radius: var(--radius-pill);
  padding: 0.55rem 1.1rem;
  border: 1px solid rgba(255,255,255,0.25);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 0.92rem;
  transition: all var(--duration-normal) var(--ease-out);
}

.btn-icon { font-size: 1.1em; }

.btn.primary {
  color: var(--accent-700);
  background: #fff;
  border: none;
  box-shadow: var(--shadow-md);
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn.ghost {
  color: #fff;
  background: rgba(255,255,255,0.12);
}

.btn.ghost:hover {
  background: rgba(255,255,255,0.22);
  transform: translateY(-2px);
}

/* ─── Metrics ─── */
.hero-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.65rem;
}

.metric {
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.08);
  border-radius: var(--radius-md);
  padding: 0.75rem;
  text-align: center;
  transition: all var(--duration-normal) var(--ease-out);
}

.metric:hover {
  transform: translateY(-3px);
  border-color: rgba(255,255,255,0.32);
}

.metric-icon { font-size: 1.6rem; margin-bottom: 0.3rem; }

.metric p {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.75;
  margin-bottom: 0.2rem;
}

.metric strong {
  font-size: 1.35rem;
  line-height: 1;
  color: #e0e7ff;
  font-weight: 700;
}

/* ─── Featured ─── */
.featured {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  background: var(--surface-glass);
}

.featured h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-family: var(--font-display);
  font-size: 1.1rem;
}

.section-icon { font-size: 1.2em; }

.featured-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.featured-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem;
  background: var(--bg-0);
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  overflow: hidden;
}

.featured-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent-500);
  transform: scaleX(0);
  transition: transform var(--duration-slow) var(--ease-out);
}

.featured-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.featured-card:hover::before { transform: scaleX(1); }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.meta {
  font-size: 11px;
  color: var(--color-text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.source-badge {
  padding: 0.15rem 0.5rem;
  background: var(--accent-bg-subtle);
  border: 1px solid rgba(99,102,241,0.18);
  border-radius: var(--radius-pill);
  font-size: 10px;
  color: var(--accent-600);
  font-weight: 500;
}

.source-badge.small {
  padding: 0.12rem 0.4rem;
  font-size: 9px;
}

.featured-card h3 {
  margin: 0.35rem 0 0.5rem;
  font-size: 1.05rem;
  color: var(--color-heading);
  line-height: 1.35;
}

.excerpt {
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--color-text-secondary);
  margin-bottom: 0.65rem;
}

.read-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--accent-600);
  font-weight: 500;
  font-size: 0.88rem;
  transition: color var(--duration-fast) ease;
}

.read-link:hover { color: var(--accent-500); }

.arrow { transition: transform var(--duration-fast) ease; }
.read-link:hover .arrow { transform: translateX(4px); }

/* ─── Blog layout ─── */
.blog-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.post-list { display: grid; gap: 0.75rem; }

.post-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem;
  background: var(--surface-glass);
  transition: all var(--duration-normal) var(--ease-out);
}

.post-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

h2 {
  margin: 0.3rem 0 0.5rem;
  font-size: 1.1rem;
  color: var(--color-heading);
  line-height: 1.35;
}

.content-preview {
  margin-top: 0.65rem;
  border-top: 1px dashed var(--color-border);
  padding-top: 0.65rem;
}

.content-preview summary {
  cursor: pointer;
  color: var(--accent-600);
  font-weight: 500;
  font-size: 0.88rem;
}

.content-preview summary:hover { color: var(--accent-500); }

.expand-icon { font-size: 0.75em; transition: transform var(--duration-normal) ease; }
.content-preview[open] .expand-icon { transform: rotate(180deg); }

pre {
  margin-top: 0.5rem;
  white-space: pre-wrap;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.7rem;
  background: var(--bg-2);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.55;
  overflow-x: auto;
}

/* ─── Sidebar ─── */
.sidebar { display: grid; gap: 0.75rem; }

.panel {
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--surface-glass);
  transition: border-color var(--duration-fast) ease;
}

.panel:hover { border-color: var(--color-border-hover); }

.panel.highlight {
  background: linear-gradient(135deg, var(--accent-bg-subtle), var(--bg-0));
  border-color: rgba(99,102,241,0.2);
}

.panel h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
  font-size: 0.95rem;
  color: var(--color-heading);
}

.panel-icon { font-size: 1.1em; }
.panel p { line-height: 1.6; opacity: 0.88; font-size: 0.92rem; }

.panel code {
  background: var(--accent-bg-subtle);
  border: 1px solid rgba(99,102,241,0.12);
  border-radius: 4px;
  padding: 0.12rem 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.85em;
  color: var(--accent-600);
}

.stats-panel { background: var(--bg-0); }
.stats-list { display: grid; gap: 0.5rem; margin-top: 0.4rem; }

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.65rem;
  background: var(--accent-bg-subtle);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(99,102,241,0.08);
}

.stat-label { font-size: 0.85rem; color: var(--color-text-secondary); }
.stat-value { font-size: 1rem; font-weight: 600; color: var(--accent-500); }

/* ─── Responsive ─── */
@media (min-width: 960px) {
  .hero { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); }
  .featured-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .blog-layout { grid-template-columns: minmax(0, 2fr) minmax(0, 0.9fr); }
}

@media (max-width: 640px) {
  .hero { padding: 1.5rem; }
  .hero-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hero h1 { font-size: 1.6rem; }
  .btn { width: 100%; justify-content: center; }
}
</style>
