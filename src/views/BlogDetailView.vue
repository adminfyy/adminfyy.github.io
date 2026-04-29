<script lang="ts">
import Vue from 'vue'

import { getAllBlogPosts, getBlogPostBySlug } from '@/utils/blogPosts'
import { renderMarkdown } from '@/utils/markdown'

export default Vue.extend({
  name: 'BlogDetailView',
  computed: {
    post() {
      return getBlogPostBySlug(this.$route.params.slug || '')
    },
    relatedPosts() {
      if (!this.post) return []
      return getAllBlogPosts()
        .filter((item) => item.id !== this.post?.id)
        .slice(0, 4)
    },
    renderedContent() {
      if (!this.post) return ''
      return renderMarkdown(this.post.content)
    }
  }
})
</script>

<template>
  <main class="detail-page">
    <section v-if="post" class="detail-card">
      <router-link class="back-link" to="/">← 返回首页</router-link>
      <p class="meta">{{ post.category }}</p>
      <h1>{{ post.title }}</h1>
      <p class="excerpt">{{ post.excerpt }}</p>
      <div class="markdown-body" v-html="renderedContent" />
    </section>

    <section v-else class="detail-card">
      <h1>文章不存在</h1>
      <p>该文章可能已被移动或删除。</p>
      <router-link class="back-link" to="/">返回博客列表</router-link>
    </section>

    <section v-if="relatedPosts.length" class="related">
      <h2>更多文章</h2>
      <div class="related-grid">
        <router-link
          v-for="item in relatedPosts"
          :key="item.id"
          class="related-card"
          :to="`/blog/${item.slug}`"
        >
          <p class="meta">{{ item.category }}</p>
          <h3>{{ item.title }}</h3>
          <p>{{ item.excerpt }}</p>
        </router-link>
      </div>
    </section>
  </main>
</template>

<style scoped>
.detail-page {
  display: grid;
  gap: 1rem;
}

.detail-card {
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 1rem;
  background: var(--surface-glass);
}

.back-link {
  display: inline-block;
  margin-bottom: 0.7rem;
}

.meta {
  font-size: 12px;
  color: #93acc0;
}

h1 {
  margin: 0.35rem 0 0.5rem;
  font-family: var(--font-display);
}

.excerpt {
  margin-bottom: 0.7rem;
}

.markdown-body {
  border: 1px dashed var(--color-border-hover);
  border-radius: 8px;
  padding: 0.8rem;
  background: rgba(3, 13, 30, 0.46);
  line-height: 1.7;
}

:deep(.markdown-body h1),
:deep(.markdown-body h2),
:deep(.markdown-body h3) {
  margin: 0.75rem 0 0.4rem;
}

:deep(.markdown-body p) {
  margin: 0.45rem 0;
}

:deep(.markdown-body ul),
:deep(.markdown-body ol) {
  padding-left: 1.2rem;
  margin: 0.4rem 0;
}

:deep(.markdown-body code) {
  background: rgba(22, 61, 88, 0.5);
  border-radius: 4px;
  padding: 0 0.25rem;
}

:deep(.markdown-body pre) {
  overflow: auto;
  margin: 0.55rem 0;
  padding: 0.65rem;
  border-radius: 6px;
  background: rgba(8, 22, 42, 0.72);
}

:deep(.markdown-body blockquote) {
  border-left: 3px solid rgba(141, 232, 255, 0.5);
  padding-left: 0.65rem;
  margin: 0.5rem 0;
  opacity: 0.92;
}

.related {
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 0.9rem;
  background: var(--surface-glass);
}

.related-grid {
  margin-top: 0.6rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;
}

.related-card {
  display: block;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 0.75rem;
  background: rgba(8, 22, 45, 0.45);
}

@media (min-width: 860px) {
  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
