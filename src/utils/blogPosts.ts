import blogSeed from '@/mock/blog.json'

export interface BlogPost {
  id: string
  slug: string
  title: string
  category: string
  excerpt: string
  content: string
  source: 'vdocs' | 'pattern' | 'seed'
}

const patternFiles = import.meta.glob('/pattern/*.{md,js,html}', {
  as: 'raw',
  eager: true
}) as Record<string, string>

const vdocBlogFiles = import.meta.glob('/vdocs/blog/*.md', {
  as: 'raw',
  eager: true
}) as Record<string, string>

const normalizeTitle = (path: string) => {
  const fileName = path.split('/').pop() || 'Untitled'
  return fileName.replace(/\.[^.]+$/, '')
}

const stripMarkdown = (value: string) =>
  value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_>~-]/g, ' ')
    .replace(/\|/g, ' ')

const toExcerpt = (value: string, limit = 180) => {
  const cleaned = stripMarkdown(value).replace(/\s+/g, ' ').trim()
  return cleaned.length > limit ? `${cleaned.slice(0, limit)}...` : cleaned
}

const getMarkdownTitle = (value: string, fallback: string) => {
  const match = value.match(/^#\s+(.+)$/m)
  if (!match) return fallback
  return match[1].trim()
}

const slugify = (raw: string) =>
  raw
    .toLowerCase()
    .replace(/^\//, '')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')

const patternPosts: BlogPost[] = Object.entries(patternFiles).map(([path, content]) => {
  const fileType = path.split('.').pop() || 'txt'
  return {
    id: `pattern-${path}`,
    slug: slugify(`pattern-${path}`),
    title: normalizeTitle(path),
    category: `pattern/${fileType}`,
    excerpt: toExcerpt(content),
    content,
    source: 'pattern'
  }
})

const vdocPosts: BlogPost[] = Object.entries(vdocBlogFiles)
  .filter(([path]) => !path.endsWith('/README.md'))
  .map(([path, content]) => ({
    id: `vdocs-${path}`,
    slug: slugify(`vdocs-${path}`),
    title: getMarkdownTitle(content, normalizeTitle(path)),
    category: 'vdocs/blog',
    excerpt: toExcerpt(content),
    content,
    source: 'vdocs' as const
  }))

const seedPosts: BlogPost[] = (blogSeed as Array<{ title: string; content: string }>).map(
  (item, index) => ({
    id: `seed-${index}`,
    slug: slugify(`seed-${item.title}-${index}`),
    title: item.title,
    category: 'notes',
    excerpt: toExcerpt(item.content),
    content: item.content,
    source: 'seed' as const
  })
)

const allPosts: BlogPost[] = [...vdocPosts, ...patternPosts, ...seedPosts]

export function getAllBlogPosts() {
  return allPosts
}

export function getBlogPostBySlug(slug: string) {
  return allPosts.find((item) => item.slug === slug)
}

export function getBlogStats() {
  return {
    total: allPosts.length,
    vdocsCount: vdocPosts.length,
    patternCount: patternPosts.length,
    seedCount: seedPosts.length
  }
}
