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
.detail-page { display: grid; gap: 1.5rem; animation: rise-in 0.5s var(--ease-out) both; }

.detail-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  background: var(--surface-glass);
  box-shadow: var(--shadow-md);
  transition: all var(--duration-normal) var(--ease-out);
}

.detail-card:hover { border-color: var(--color-border-hover); }

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1rem;
  padding: 0.45rem 0.9rem;
  border-radius: var(--radius-pill);
  background: var(--accent-bg-subtle);
  border: 1px solid rgba(99,102,241,0.18);
  color: var(--accent-600);
  font-size: 0.92rem;
  transition: all var(--duration-fast) ease;
}

.back-link:hover { background: var(--accent-bg-medium); transform: translateX(-3px); }

.back-link.primary {
  background: var(--accent-600);
  color: #fff;
  font-weight: 600;
  border: none;
}

.arrow { font-size: 1.1em; transition: transform var(--duration-fast) ease; }
.back-link:hover .arrow { transform: translateX(-3px); }

.post-header { margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); }

.meta { font-size: 11px; color: var(--color-text-secondary); display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.65rem; }

.category { padding: 0.2rem 0.6rem; background: var(--accent-bg-light); border-radius: var(--radius-pill); font-weight: 500; font-size: 0.92rem; }
.separator { opacity: 0.5; }
.reading-time { opacity: 0.75; }

h1 {
  margin: 0.4rem 0 0.65rem;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: var(--color-heading);
}

.excerpt { margin-bottom: 0; font-size: 0.95rem; line-height: 1.6; color: var(--color-text-secondary); }

.markdown-body {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  background: var(--bg-2);
  line-height: 1.75;
  font-size: 15px;
}

/* Markdown deep styles */
:deep(.markdown-body h1), :deep(.markdown-body h2), :deep(.markdown-body h3), :deep(.markdown-body h4) {
  margin: 1.5rem 0 0.75rem; font-family: var(--font-display); color: var(--color-heading); letter-spacing: -0.02em;
}

:deep(.markdown-body h1) { font-size: 1.7rem; padding-bottom: 0.4rem; border-bottom: 2px solid var(--color-border); }
:deep(.markdown-body h2) { font-size: 1.35rem; }
:deep(.markdown-body h3) { font-size: 1.15rem; }

:deep(.markdown-body h1)::before, :deep(.markdown-body h2)::before, :deep(.markdown-body h3)::before {
  content: ''; position: absolute; left: -1rem; top: 0.5rem; width: 3px; height: 70%; background: var(--accent-500); border-radius: 2px;
}

:deep(.markdown-body p) { margin: 0.75rem 0; line-height: 1.75; }
:deep(.markdown-body ul), :deep(.markdown-body ol) { padding-left: 1.5rem; margin: 0.75rem 0; }
:deep(.markdown-body li) { margin: 0.35rem 0; line-height: 1.65; }

:deep(.markdown-body a) {
  color: var(--accent-600); text-decoration: none; border-bottom: 1px dashed var(--accent-500); transition: color var(--duration-fast) ease;
}
:deep(.markdown-body a:hover) { color: var(--accent-500); border-bottom-style: solid; }

:deep(.markdown-body code) {
  background: var(--accent-bg-subtle); border: 1px solid rgba(99,102,241,0.12); border-radius: 4px;
  padding: 0.12rem 0.35rem; font-family: var(--font-mono); font-size: 0.88em; color: var(--accent-600);
}

:deep(.markdown-body pre) {
  overflow: auto; margin: 1rem 0; padding: 1rem; border-radius: var(--radius-sm);
  background: var(--bg-3); border: 1px solid var(--color-border);
}

:deep(.markdown-body pre code) { background: none; border: none; padding: 0; color: inherit; font-size: 0.88rem; line-height: 1.55; }

:deep(.markdown-body blockquote) {
  border-left: 4px solid var(--accent-500); padding: 0.65rem 0.9rem; margin: 1rem 0;
  background: var(--accent-bg-subtle); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-style: italic;
}
:deep(.markdown-body blockquote p) { margin: 0; }

:deep(.markdown-body table) { width: 100%; border-collapse: collapse; margin: 1rem 0; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--color-border); }
:deep(.markdown-body th), :deep(.markdown-body td) { padding: 0.6rem 0.8rem; text-align: left; border-bottom: 1px solid var(--color-border); }
:deep(.markdown-body th) { background: var(--accent-bg-subtle); font-weight: 600; color: var(--color-heading); }
:deep(.markdown-body tr:hover) { background: var(--accent-bg-subtle); }
:deep(.markdown-body hr) { border: none; height: 2px; background: linear-gradient(90deg, transparent, var(--color-border), transparent); margin: 2rem 0; }
:deep(.markdown-body img) { max-width: 100%; height: auto; border-radius: var(--radius-sm); margin: 1rem 0; box-shadow: var(--shadow-md); }
:deep(.markdown-body strong) { color: var(--color-heading); font-weight: 600; }

:deep(.task-list) { list-style: none; padding-left: 0; }
:deep(.task-list li) { display: flex; align-items: flex-start; gap: 0.5rem; padding: 0.35rem 0; }
:deep(.task-list input[type="checkbox"]) { accent-color: var(--accent-500); }

.post-footer { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border); }
.tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.tag {
  padding: 0.3rem 0.7rem; background: var(--accent-bg-subtle); border: 1px solid rgba(99,102,241,0.18);
  border-radius: var(--radius-pill); font-size: 0.92rem; color: var(--accent-600); transition: all var(--duration-fast) ease;
}
.tag:hover { background: var(--accent-bg-medium); transform: translateY(-2px); }

.empty-state { text-align: center; padding: 3rem 1.5rem; }
.empty-icon { font-size: 3.5rem; margin-bottom: 1rem; opacity: 0.5; }

.related {
  border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; background: var(--surface-glass);
}
.related h2 { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; font-family: var(--font-display); font-size: 1.1rem; }
.icon { font-size: 1.2em; }
.related-grid { margin-top: 0.75rem; display: grid; grid-template-columns: 1fr; gap: 0.75rem; }

.related-card {
  display: block; border: 1px solid var(--color-border); border-radius: var(--radius-md);
  padding: 1rem; background: var(--bg-0); transition: all var(--duration-normal) var(--ease-out);
  position: relative; overflow: hidden;
}
.related-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--accent-500); transform: scaleX(0); transition: transform var(--duration-slow) var(--ease-out); }
.related-card:hover { border-color: var(--color-border-hover); transform: translateY(-3px); box-shadow: var(--shadow-md); }
.related-card:hover::before { transform: scaleX(1); }
.related-card .meta { margin-bottom: 0.4rem; }
.related-card h3 { margin: 0.4rem 0; font-size: 1rem; color: var(--color-heading); }
.related-card .excerpt { font-size: 0.88rem; color: var(--color-text-secondary); margin-bottom: 0.65rem; }
.read-more { display: inline-block; font-size: 0.88rem; color: var(--accent-600); font-weight: 500; transition: color var(--duration-fast) ease; }
.related-card:hover .read-more { transform: translateX(4px); }

@media (min-width: 860px) { .related-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) { .detail-card { padding: 1rem; } .markdown-body { padding: 1rem; } h1 { font-size: 1.5rem; } }
</style>
