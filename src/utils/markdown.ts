const escapeHtml = (input: string) =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const inline = (line: string) =>
  line
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')

export function renderMarkdown(markdown: string): string {
  const normalized = markdown.replace(/\r\n/g, '\n')
  const codeBlocks: string[] = []

  const withoutCode = normalized.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang = '', code = '') => {
    const safeCode = escapeHtml(code.trimEnd())
    const block = `<pre><code class="lang-${lang}">${safeCode}</code></pre>`
    codeBlocks.push(block)
    return `@@CODE_BLOCK_${codeBlocks.length - 1}@@`
  })

  const lines = withoutCode.split('\n')
  const html: string[] = []
  let paragraph: string[] = []
  let listType: 'ul' | 'ol' | '' = ''

  const flushParagraph = () => {
    if (!paragraph.length) return
    html.push(`<p>${inline(paragraph.join(' '))}</p>`)
    paragraph = []
  }

  const flushList = () => {
    if (!listType) return
    html.push(`</${listType}>`)
    listType = ''
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim()
    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    const ul = line.match(/^[-*+]\s+(.+)$/)
    const ol = line.match(/^\d+\.\s+(.+)$/)
    const quote = line.match(/^>\s?(.+)$/)

    if (!line) {
      flushParagraph()
      flushList()
      return
    }

    if (line.startsWith('@@CODE_BLOCK_')) {
      flushParagraph()
      flushList()
      html.push(line)
      return
    }

    if (heading) {
      flushParagraph()
      flushList()
      const level = heading[1].length
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`)
      return
    }

    if (quote) {
      flushParagraph()
      flushList()
      html.push(`<blockquote>${inline(quote[1])}</blockquote>`)
      return
    }

    if (ul) {
      flushParagraph()
      if (listType !== 'ul') {
        flushList()
        html.push('<ul>')
        listType = 'ul'
      }
      html.push(`<li>${inline(ul[1])}</li>`)
      return
    }

    if (ol) {
      flushParagraph()
      if (listType !== 'ol') {
        flushList()
        html.push('<ol>')
        listType = 'ol'
      }
      html.push(`<li>${inline(ol[1])}</li>`)
      return
    }

    paragraph.push(inline(line))
  })

  flushParagraph()
  flushList()

  return html
    .join('\n')
    .replace(/@@CODE_BLOCK_(\d+)@@/g, (_, i) => codeBlocks[Number(i)] || '')
}
