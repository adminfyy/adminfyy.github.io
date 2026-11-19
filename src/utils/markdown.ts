/**
 * 极简 Markdown 渲染器：只覆盖聊天回复常见语法，
 * 全部内容先做 HTML 转义，避免模型输出注入脚本。
 */

const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => ESCAPE_MAP[char] || char);
}

function renderInline(raw: string): string {
  const codes: string[] = [];

  // 先抽出行内代码，避免内部星号、链接语法被二次解析
  let text = raw.replace(/`([^`\n]+)`/g, (_, code: string) => {
    codes.push(code);
    return `\uE000${codes.length - 1}\uE001`;
  });

  text = escapeHtml(text);

  text = text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  text = text.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");

  return text.replace(
    /\uE000(\d+)\uE001/g,
    (_, index: string) => `<code>${escapeHtml(codes[Number(index)])}</code>`
  );
}

const FENCE = /^\s*```([\w-]*)\s*$/;
const LIST_ITEM = /^\s*[-*]\s+(.*)$/;
const ORDERED_ITEM = /^\s*\d+\.\s+(.*)$/;
const HEADING = /^(#{1,4})\s+(.*)$/;

export function renderMarkdown(source: string): string {
  if (!source) return "";

  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let paragraph: string[] = [];
  let index = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${paragraph.map(renderInline).join("<br>")}</p>`);
    paragraph = [];
  };

  while (index < lines.length) {
    const line = lines[index];

    const fence = line.match(FENCE);
    if (fence) {
      flushParagraph();
      const language = fence[1];
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !FENCE.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      const className = language ? ` class="language-${language}"` : "";
      html.push(
        `<pre><code${className}>${escapeHtml(code.join("\n"))}</code></pre>`
      );
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      index += 1;
      continue;
    }

    const heading = line.match(HEADING);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (LIST_ITEM.test(line)) {
      flushParagraph();
      const items: string[] = [];
      while (index < lines.length && LIST_ITEM.test(lines[index])) {
        items.push((lines[index].match(LIST_ITEM) as RegExpMatchArray)[1]);
        index += 1;
      }
      html.push(
        `<ul>${items
          .map((item) => `<li>${renderInline(item)}</li>`)
          .join("")}</ul>`
      );
      continue;
    }

    if (ORDERED_ITEM.test(line)) {
      flushParagraph();
      const items: string[] = [];
      while (index < lines.length && ORDERED_ITEM.test(lines[index])) {
        items.push((lines[index].match(ORDERED_ITEM) as RegExpMatchArray)[1]);
        index += 1;
      }
      html.push(
        `<ol>${items
          .map((item) => `<li>${renderInline(item)}</li>`)
          .join("")}</ol>`
      );
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      flushParagraph();
      const quotes: string[] = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quotes.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      html.push(
        `<blockquote>${quotes.map(renderInline).join("<br>")}</blockquote>`
      );
      continue;
    }

    if (/^\s*([-*_])\1{2,}\s*$/.test(line)) {
      flushParagraph();
      html.push("<hr>");
      index += 1;
      continue;
    }

    paragraph.push(line);
    index += 1;
  }

  flushParagraph();
  return html.join("");
}
