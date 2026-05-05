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
  animation: rise-in 0.6s ease both;
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero {
  padding: 2rem;
  border: 1px solid rgba(168, 230, 255, 0.3);
  border-radius: 24px;
  background:
    radial-gradient(circle at 74% 12%, rgba(122, 226, 255, 0.35), transparent 34%),
    radial-gradient(circle at 22% 88%, rgba(96, 218, 250, 0.3), transparent 36%),
    linear-gradient(126deg, #07132c, #0f3a4f 55%, #141a37);
  color: #edf9ff;
  display: grid;
  gap: 1.5rem;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(141, 232, 255, 0.15), transparent 70%);
  pointer-events: none;
}

.kicker {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 13px;
  opacity: 0.9;
  font-weight: 600;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.1;
  margin: 0.5rem 0 0.75rem;
  background: linear-gradient(135deg, #ffffff, #8de8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  max-width: 60ch;
  opacity: 0.95;
  line-height: 1.7;
  font-size: 1.05rem;
}

.hero-actions {
  margin-top: 1.2rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  border-radius: 999px;
  padding: 0.6rem 1.2rem;
  border: 1px solid rgba(173, 237, 255, 0.4);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn:hover::before {
  width: 300px;
  height: 300px;
}

.btn-icon {
  font-size: 1.1em;
}

.btn.primary {
  color: #041323;
  background: linear-gradient(135deg, #81e7ff, #61daff);
  border: none;
  box-shadow: 0 4px 16px rgba(129, 231, 255, 0.4);
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(129, 231, 255, 0.6);
}

.btn.ghost {
  color: #e7f7ff;
  background: rgba(14, 65, 102, 0.5);
  backdrop-filter: blur(8px);
}

.btn.ghost:hover {
  background: rgba(14, 65, 102, 0.7);
  border-color: rgba(173, 237, 255, 0.6);
  transform: translateY(-2px);
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
}

.metric {
  border: 1px solid rgba(168, 230, 255, 0.3);
  background: rgba(8, 25, 49, 0.5);
  border-radius: 14px;
  padding: 0.85rem;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}

.metric:hover {
  transform: translateY(-4px);
  border-color: rgba(168, 230, 255, 0.5);
  box-shadow: 0 8px 24px rgba(97, 218, 251, 0.2);
}

.metric-icon {
  font-size: 1.8rem;
  margin-bottom: 0.4rem;
}

.metric p {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.85;
  margin-bottom: 0.3rem;
}

.metric strong {
  font-size: 1.5rem;
  line-height: 1;
  color: #8de8ff;
}

.featured {
  border: 1px solid var(--color-border);
  border-radius: 18px;
  padding: 1.25rem;
  background: var(--surface-glass);
  backdrop-filter: blur(12px);
}

.featured h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-family: var(--font-display);
}

.section-icon {
  font-size: 1.3em;
}

.featured-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
}

.featured-card {
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 1.1rem;
  background: rgba(8, 22, 45, 0.5);
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease both;
  position: relative;
  overflow: hidden;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.featured-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #8de8ff, #61daff, #8de8ff);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.featured-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(97, 218, 251, 0.2);
}

.featured-card:hover::before {
  transform: scaleX(1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}

.meta {
  font-size: 12px;
  color: #93acc0;
  font-weight: 500;
}

.source-badge {
  padding: 0.2rem 0.6rem;
  background: rgba(141, 232, 255, 0.15);
  border: 1px solid rgba(141, 232, 255, 0.3);
  border-radius: 999px;
  font-size: 11px;
  color: #8de8ff;
  font-weight: 500;
}

.source-badge.small {
  padding: 0.15rem 0.5rem;
  font-size: 10px;
}

.featured-card h3 {
  margin: 0.5rem 0 0.6rem;
  font-size: 1.15rem;
  color: var(--color-heading);
  line-height: 1.4;
}

.excerpt {
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 0.75rem;
}

.read-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #8de8ff;
  font-weight: 500;
  transition: all 0.2s ease;
}

.read-link:hover {
  gap: 0.6rem;
}

.arrow {
  transition: transform 0.2s ease;
}

.read-link:hover .arrow {
  transform: translateX(4px);
}

.blog-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.post-list {
  display: grid;
  gap: 0.9rem;
}

.post-card {
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 1.1rem;
  background: var(--surface-glass);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease both;
}

.post-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(97, 218, 251, 0.15);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

h2 {
  margin: 0.4rem 0 0.6rem;
  font-size: 1.25rem;
  color: var(--color-heading);
  line-height: 1.4;
}

.content-preview {
  margin-top: 0.75rem;
  border-top: 1px dashed var(--color-border);
  padding-top: 0.75rem;
}

.content-preview summary {
  cursor: pointer;
  color: #8de8ff;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;
}

.content-preview summary:hover {
  color: #61daff;
}

.expand-icon {
  font-size: 0.8em;
  transition: transform 0.3s ease;
}

.content-preview[open] .expand-icon {
  transform: rotate(180deg);
}

pre {
  margin-top: 0.6rem;
  white-space: pre-wrap;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.85rem;
  background: rgba(3, 13, 30, 0.5);
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
}

.sidebar {
  display: grid;
  gap: 0.9rem;
}

.panel {
  padding: 1.1rem;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--surface-glass);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.panel:hover {
  border-color: var(--color-border-hover);
}

.panel.highlight {
  background: linear-gradient(135deg, rgba(141, 232, 255, 0.1), rgba(8, 22, 45, 0.5));
  border-color: rgba(141, 232, 255, 0.4);
}

.panel h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
  color: var(--color-heading);
}

.panel-icon {
  font-size: 1.2em;
}

.panel p {
  line-height: 1.7;
  opacity: 0.95;
}

.panel code {
  background: rgba(22, 61, 88, 0.6);
  border: 1px solid rgba(141, 232, 255, 0.2);
  border-radius: 4px;
  padding: 0.15rem 0.4rem;
  font-size: 0.9em;
  color: #8de8ff;
}

.stats-panel {
  background: rgba(8, 22, 45, 0.6);
}

.stats-list {
  display: grid;
  gap: 0.6rem;
  margin-top: 0.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0.75rem;
  background: rgba(141, 232, 255, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(141, 232, 255, 0.15);
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #8de8ff;
}

@media (min-width: 960px) {
  .hero {
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  }

  .featured-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .blog-layout {
    grid-template-columns: minmax(0, 2fr) minmax(0, 0.9fr);
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 1.5rem;
  }

  .hero-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero h1 {
    font-size: 1.8rem;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
