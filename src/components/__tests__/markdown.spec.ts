import { describe, expect, it } from "vitest";

import { renderMarkdown } from "@/utils/markdown";

describe("markdown renderer", () => {
  it("renders headings, lists and paragraphs", () => {
    const html = renderMarkdown("## 标题\n\n- 一\n- 二\n\n1. a\n2. b");
    expect(html).toContain("<h2>标题</h2>");
    expect(html).toContain("<ul><li>一</li><li>二</li></ul>");
    expect(html).toContain("<ol><li>a</li><li>b</li></ol>");
  });

  it("renders fenced code with escaped content", () => {
    const html = renderMarkdown("```js\nconst a = 1 < 2;\n```");
    expect(html).toBe(
      '<pre><code class="language-js">const a = 1 &lt; 2;</code></pre>'
    );
  });

  it("escapes raw html and keeps inline code literal", () => {
    const html = renderMarkdown('<script>alert("x")</script>\n\n`<b>`');
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
    expect(html).toContain("<code>&lt;b&gt;</code>");
  });

  it("renders links with safe attributes", () => {
    const html = renderMarkdown("[站点](https://2yjs.top)");
    expect(html).toContain('href="https://2yjs.top"');
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
