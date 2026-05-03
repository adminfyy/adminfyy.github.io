<script lang="ts">
import Vue from 'vue'
import type { BlogPost } from '@/utils/blogPosts'
import { getAllBlogPosts, getBlogPostBySlug } from '@/utils/blogPosts'
import { renderMarkdown } from '@/utils/markdown'

export default Vue.extend({
  name: 'BlogDetailView',
  computed: {
    post(): BlogPost | undefined {
      return getBlogPostBySlug(this.$route.params.slug || '')
    },
    relatedPosts(): BlogPost[] {
      const currentPost = this.post
      if (!currentPost) return []
      return getAllBlogPosts()
        .filter((item) => item.id !== currentPost.id)
        .slice(0, 4)
    },
    renderedContent(): string {
      const currentPost = this.post
      if (!currentPost) return ''
      return renderMarkdown(currentPost.content)
    },
    readingTime(): number {
      const currentPost = this.post
      if (!currentPost) return 0
      const words = currentPost.content.split(/\s+/).length
      return Math.ceil(words / 200) // 假设每分钟阅读 200 字
    }
  }
})
</script>

<template>
  <main class="detail-page">
    <section v-if="post" class="detail-card">
      <router-link class="back-link" to="/">
        <span class="arrow">←</span> 返回首页
      </router-link>
      
      <div class="post-header">
        <p class="meta">
          <span class="category">{{ post.category }}</span>
          <span class="separator">•</span>
          <span class="reading-time">{{ readingTime }} min read</span>
        </p>
        <h1>{{ post.title }}</h1>
        <p class="excerpt">{{ post.excerpt }}</p>
      </div>

      <div class="markdown-body" v-html="renderedContent" />

      <div class="post-footer">
        <div class="tags">
          <span class="tag">#{{ post.source }}</span>
        </div>
      </div>
    </section>

    <section v-else class="detail-card empty-state">
      <div class="empty-icon">📄</div>
      <h1>文章不存在</h1>
      <p>该文章可能已被移动或删除。</p>
      <router-link class="back-link primary" to="/">返回博客列表</router-link>
    </section>

    <section v-if="relatedPosts.length" class="related">
      <h2>
        <span class="icon">📚</span>
        更多文章
      </h2>
      <div class="related-grid">
        <router-link
          v-for="item in relatedPosts"
          :key="item.id"
          class="related-card"
          :to="`/blog/${item.slug}`"
        >
          <p class="meta">{{ item.category }}</p>
          <h3>{{ item.title }}</h3>
          <p class="excerpt">{{ item.excerpt }}</p>
          <span class="read-more">阅读更多 →</span>
        </router-link>
      </div>
    </section>
  </main>
</template>

<style scoped>
.detail-page {
  display: grid;
  gap: 1.5rem;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-card {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.5rem;
  background: var(--surface-glass);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.detail-card:hover {
  border-color: var(--color-border-hover);
  box-shadow: 0 12px 48px rgba(97, 218, 251, 0.15);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(141, 232, 255, 0.1);
  border: 1px solid rgba(141, 232, 255, 0.3);
  transition: all 0.2s ease;
}

.back-link:hover {
  background: rgba(141, 232, 255, 0.2);
  transform: translateX(-4px);
}

.back-link.primary {
  background: linear-gradient(135deg, #8de8ff, #61daff);
  color: #041323;
  font-weight: 600;
}

.arrow {
  font-size: 1.2em;
  transition: transform 0.2s ease;
}

.back-link:hover .arrow {
  transform: translateX(-4px);
}

.post-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.meta {
  font-size: 13px;
  color: #93acc0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.category {
  padding: 0.25rem 0.75rem;
  background: rgba(141, 232, 255, 0.15);
  border-radius: 999px;
  font-weight: 500;
}

.separator {
  opacity: 0.5;
}

.reading-time {
  opacity: 0.8;
}

h1 {
  margin: 0.5rem 0 0.75rem;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  line-height: 1.2;
  background: linear-gradient(135deg, #e8f7ff, #8de8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.excerpt {
  margin-bottom: 0;
  font-size: 1.05rem;
  line-height: 1.7;
  opacity: 0.9;
}

.markdown-body {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
  background: rgba(3, 13, 30, 0.5);
  line-height: 1.8;
  font-size: 15px;
}

/* Markdown 内容样式优化 */
:deep(.markdown-body h1),
:deep(.markdown-body h2),
:deep(.markdown-body h3),
:deep(.markdown-body h4) {
  margin: 1.5rem 0 0.75rem;
  font-family: var(--font-display);
  color: var(--color-heading);
  position: relative;
}

:deep(.markdown-body h1) {
  font-size: 1.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-border);
}

:deep(.markdown-body h2) {
  font-size: 1.5rem;
}

:deep(.markdown-body h3) {
  font-size: 1.25rem;
}

:deep(.markdown-body h1)::before,
:deep(.markdown-body h2)::before,
:deep(.markdown-body h3)::before {
  content: '';
  position: absolute;
  left: -1rem;
  top: 0.5rem;
  width: 3px;
  height: 70%;
  background: linear-gradient(180deg, #8de8ff, transparent);
  border-radius: 2px;
}

:deep(.markdown-body p) {
  margin: 0.75rem 0;
  line-height: 1.8;
}

:deep(.markdown-body ul),
:deep(.markdown-body ol) {
  padding-left: 1.5rem;
  margin: 0.75rem 0;
}

:deep(.markdown-body li) {
  margin: 0.4rem 0;
  line-height: 1.7;
}

:deep(.markdown-body a) {
  color: #8de8ff;
  text-decoration: none;
  border-bottom: 1px dashed rgba(141, 232, 255, 0.4);
  transition: all 0.2s ease;
}

:deep(.markdown-body a:hover) {
  color: #61daff;
  border-bottom-style: solid;
}

:deep(.markdown-body code) {
  background: rgba(22, 61, 88, 0.6);
  border: 1px solid rgba(141, 232, 255, 0.2);
  border-radius: 4px;
  padding: 0.15rem 0.4rem;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9em;
  color: #8de8ff;
}

:deep(.markdown-body pre) {
  overflow: auto;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(8, 22, 42, 0.8);
  border: 1px solid var(--color-border);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
}

:deep(.markdown-body pre code) {
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  font-size: 0.9rem;
  line-height: 1.6;
}

:deep(.markdown-body blockquote) {
  border-left: 4px solid rgba(141, 232, 255, 0.6);
  padding: 0.75rem 1rem;
  margin: 1rem 0;
  background: rgba(141, 232, 255, 0.08);
  border-radius: 0 8px 8px 0;
  font-style: italic;
  opacity: 0.95;
}

:deep(.markdown-body blockquote p) {
  margin: 0;
}

:deep(.markdown-body table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

:deep(.markdown-body th),
:deep(.markdown-body td) {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

:deep(.markdown-body th) {
  background: rgba(141, 232, 255, 0.15);
  font-weight: 600;
  color: var(--color-heading);
}

:deep(.markdown-body tr:hover) {
  background: rgba(141, 232, 255, 0.05);
}

:deep(.markdown-body hr) {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-border), transparent);
  margin: 2rem 0;
}

:deep(.markdown-body img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

:deep(.markdown-body strong) {
  color: var(--color-heading);
  font-weight: 600;
}

:deep(.task-list) {
  list-style: none;
  padding-left: 0;
}

:deep(.task-list li) {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.4rem 0;
}

:deep(.task-list input[type="checkbox"]) {
  margin-top: 0.2rem;
  accent-color: #8de8ff;
}

.post-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.35rem 0.85rem;
  background: rgba(141, 232, 255, 0.12);
  border: 1px solid rgba(141, 232, 255, 0.3);
  border-radius: 999px;
  font-size: 13px;
  color: #8de8ff;
  transition: all 0.2s ease;
}

.tag:hover {
  background: rgba(141, 232, 255, 0.2);
  transform: translateY(-2px);
}

.empty-state {
  text-align: center;
  padding: 3rem 1.5rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.related {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.25rem;
  background: var(--surface-glass);
  backdrop-filter: blur(12px);
}

.related h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-family: var(--font-display);
}

.icon {
  font-size: 1.3em;
}

.related-grid {
  margin-top: 0.75rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.related-card {
  display: block;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1rem;
  background: rgba(8, 22, 45, 0.5);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.related-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #8de8ff, #61daff);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.related-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(97, 218, 251, 0.2);
}

.related-card:hover::before {
  transform: scaleX(1);
}

.related-card .meta {
  margin-bottom: 0.5rem;
}

.related-card h3 {
  margin: 0.5rem 0;
  font-size: 1.1rem;
  color: var(--color-heading);
}

.related-card .excerpt {
  font-size: 0.9rem;
  opacity: 0.85;
  margin-bottom: 0.75rem;
}

.read-more {
  display: inline-block;
  font-size: 0.9rem;
  color: #8de8ff;
  font-weight: 500;
  transition: all 0.2s ease;
}

.related-card:hover .read-more {
  transform: translateX(4px);
}

@media (min-width: 860px) {
  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .detail-card {
    padding: 1rem;
  }

  .markdown-body {
    padding: 1rem;
  }

  h1 {
    font-size: 1.6rem;
  }
}
</style>
