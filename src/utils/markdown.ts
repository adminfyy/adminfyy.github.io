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
    .replace(/~~([^~]+)~~/g, '<del>$1</del>')

export function renderMarkdown(markdown: string): string {
  const normalized = markdown.replace(/\r\n/g, '\n')
  const codeBlocks: string[] = []

  // 处理代码块，保留语言标识
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
  let inTable = false
  let tableRows: string[] = []

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

  const flushTable = () => {
    if (!inTable || !tableRows.length) return
    html.push('<table>')
    tableRows.forEach((row, index) => {
      const tag = index === 0 ? 'th' : 'td'
      html.push(`<tr>${row}</tr>`)
    })
    html.push('</table>')
    inTable = false
    tableRows = []
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim()
    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    const ul = line.match(/^[-*+]\s+\[([ xX])\]\s+(.+)$/) // 任务列表
    const ulNormal = line.match(/^[-*+]\s+(.+)$/)
    const ol = line.match(/^\d+\.\s+(.+)$/)
    const quote = line.match(/^>\s?(.+)$/)
    const tableRow = line.match(/^\|(.+)\|$/)
    const tableSeparator = line.match(/^\|[\s\-:|]+\|$/)
    const hr = line.match(/^---+$/i)
    const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)

    if (!line) {
      flushParagraph()
      flushList()
      flushTable()
      return
    }

    if (line.startsWith('@@CODE_BLOCK_')) {
      flushParagraph()
      flushList()
      flushTable()
      html.push(line)
      return
    }

    if (heading) {
      flushParagraph()
      flushList()
      flushTable()
      const level = heading[1].length
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`)
      return
    }

    if (img) {
      flushParagraph()
      flushList()
      flushTable()
      html.push(`<img src="${img[2]}" alt="${img[1]}" />`)
      return
    }

    if (hr) {
      flushParagraph()
      flushList()
      flushTable()
      html.push('<hr />')
      return
    }

    if (quote) {
      flushParagraph()
      flushList()
      flushTable()
      html.push(`<blockquote>${inline(quote[1])}</blockquote>`)
      return
    }

    // 处理表格
    if (tableRow) {
      flushParagraph()
      flushList()
      if (!inTable) {
        inTable = true
        tableRows = []
      }
      const cells = tableRow[1].split('|').map(cell => cell.trim())
      const rowHtml = cells.map(cell => `<td>${inline(cell)}</td>`).join('')
      tableRows.push(rowHtml)
      return
    }

    if (tableSeparator) {
      // 跳过表格分隔线
      if (tableRows.length > 0) {
        tableRows[0] = tableRows[0].replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>')
      }
      return
    }

    if (ul) {
      // 任务列表
      flushParagraph()
      flushList()
      flushTable()
      const checked = ul[1] !== ' ' && ul[1] !== ''
      const checkbox = `<input type="checkbox" ${checked ? 'checked' : ''} disabled />`
      html.push(`<ul class="task-list"><li>${checkbox} ${inline(ul[2])}</li></ul>`)
      return
    }

    if (ulNormal) {
      flushParagraph()
      flushTable()
      if (listType !== 'ul') {
        flushList()
        html.push('<ul>')
        listType = 'ul'
      }
      html.push(`<li>${inline(ulNormal[1])}</li>`)
      return
    }

    if (ol) {
      flushParagraph()
      flushTable()
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
  flushTable()

  return html
    .join('\n')
    .replace(/@@CODE_BLOCK_(\d+)@@/g, (_, i) => codeBlocks[Number(i)] || '')
}
