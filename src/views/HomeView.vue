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
        <p class="kicker">Cinematic Blog System</p>
        <h1>Patterns, Agents, and Execution Stories</h1>
        <p class="description">
          主站自动聚合 `vdocs/blog` 与 `pattern/` 内容，结合 Agent 工具门户，形成可演示的工程博客首页。
        </p>
        <div class="hero-actions">
          <router-link class="btn primary" to="/agent-portal">进入 Agent Portal</router-link>
          <router-link class="btn ghost" to="/codex">打开 Codex 工具台</router-link>
        </div>
      </div>
      <div class="hero-metrics">
        <div class="metric">
          <p>Posts</p>
          <strong>{{ stats.total }}</strong>
        </div>
        <div class="metric">
          <p>Pattern Files</p>
          <strong>{{ stats.patternCount }}</strong>
        </div>
        <div class="metric">
          <p>VDocs Blogs</p>
          <strong>{{ stats.vdocsCount }}</strong>
        </div>
        <div class="metric">
          <p>Notes</p>
          <strong>{{ stats.seedCount }}</strong>
        </div>
      </div>
    </section>

    <section class="featured">
      <h2>Featured</h2>
      <div class="featured-grid">
        <article v-for="post in featuredPosts" :key="post.id" class="featured-card">
          <p class="meta">{{ post.category }}</p>
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt }}</p>
          <router-link class="read-link" :to="`/blog/${post.slug}`">查看详情</router-link>
        </article>
      </div>
    </section>

    <section class="blog-layout">
      <article class="post-list">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <p class="meta">{{ post.category }}</p>
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt }}</p>
          <router-link class="read-link" :to="`/blog/${post.slug}`">查看详情</router-link>
          <details>
            <summary>展开全文</summary>
            <pre>{{ post.content }}</pre>
          </details>
        </div>
      </article>

      <aside class="sidebar">
        <div class="panel">
          <h3>Source Pipeline</h3>
          <p>
            自动读取 <code>/vdocs/blog/*.md</code> 与 <code>/pattern/*.{md,js,html}</code> 并注入主站博客流。
          </p>
        </div>
        <div class="panel">
          <h3>Portal Entry</h3>
          <p>访问 <code>/agent-portal</code> 获取 Agent Prompt 工具门户。</p>
        </div>
      </aside>
    </section>
  </main>
</template>

<style scoped>
.blog-page {
  width: 100%;
  display: grid;
  gap: 1rem;
  animation: rise-in 0.55s ease both;
}

.hero {
  padding: 1.4rem;
  border: 1px solid rgba(168, 230, 255, 0.28);
  border-radius: 22px;
  background:
    radial-gradient(circle at 74% 12%, rgba(122, 226, 255, 0.3), transparent 34%),
    radial-gradient(circle at 22% 88%, rgba(255, 172, 98, 0.26), transparent 36%),
    linear-gradient(126deg, #07132c, #0f3a4f 55%, #141a37);
  color: #edf9ff;
  display: grid;
  gap: 1rem;
}

.kicker {
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-size: 12px;
  opacity: 0.85;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 5vw, 2.8rem);
  line-height: 1.08;
  margin: 0.4rem 0 0.6rem;
}

.description {
  max-width: 56ch;
  opacity: 0.95;
}

.hero-actions {
  margin-top: 0.95rem;
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.btn {
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  border: 1px solid rgba(173, 237, 255, 0.35);
}

.btn.primary {
  color: #041323;
  background: #81e7ff;
}

.btn.ghost {
  color: #e7f7ff;
  background: rgba(14, 65, 102, 0.45);
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.6rem;
}

.metric {
  border: 1px solid rgba(168, 230, 255, 0.28);
  background: rgba(8, 25, 49, 0.43);
  border-radius: 12px;
  padding: 0.65rem;
}

.metric p {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.82;
}

.metric strong {
  font-size: 1.3rem;
  line-height: 1.1;
}

.featured {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1rem;
  background: var(--surface-glass);
}

.featured h2 {
  margin-bottom: 0.75rem;
}

.featured-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.7rem;
}

.featured-card {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 0.85rem;
  background: rgba(8, 22, 45, 0.45);
}

.blog-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.post-list {
  display: grid;
  gap: 0.8rem;
}

.post-card {
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 1rem;
  background: var(--surface-glass);
  backdrop-filter: blur(8px);
}

.meta {
  font-size: 12px;
  color: #93acc0;
}

h2 {
  margin: 0.25rem 0 0.5rem;
}

details {
  margin-top: 0.6rem;
}

pre {
  margin-top: 0.5rem;
  white-space: pre-wrap;
  border: 1px dashed var(--color-border-hover);
  border-radius: 8px;
  padding: 0.7rem;
  background: rgba(3, 13, 30, 0.46);
}

.sidebar {
  display: grid;
  gap: 0.8rem;
}

.panel {
  padding: 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--surface-glass);
}

.read-link {
  display: inline-block;
  margin-top: 0.4rem;
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
  .hero-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
