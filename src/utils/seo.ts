export const SITE_NAME = "技术改变生活";
export const SITE_URL = "https://2yjs.top";
export const DEFAULT_DESCRIPTION =
  "技术改变生活：前端工程师 adminfoo 的技术自留地，9 年以上经验，覆盖 Vue2/3、React、Electron、HarmonyOS，包含 AI 对话、博客与浏览器实验。";

function upsertMeta(
  selector: string,
  attribute: "name" | "property",
  key: string,
  content: string
): void {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertCanonical(href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

interface SeoOptions {
  title?: string;
  description?: string;
  path?: string;
}

/** 更新标题、描述、canonical 与 Open Graph，供路由切换和文章详情复用。 */
export function applySeo(options: SeoOptions = {}): void {
  const title = options.title ? `${options.title} · ${SITE_NAME}` : SITE_NAME;
  const description = options.description || DEFAULT_DESCRIPTION;
  const url = encodeURI(`${SITE_URL}${options.path || "/"}`);

  document.title = title;

  upsertMeta('meta[name="description"]', "name", "description", description);
  upsertMeta('meta[property="og:title"]', "property", "og:title", title);
  upsertMeta(
    'meta[property="og:description"]',
    "property",
    "og:description",
    description
  );
  upsertMeta('meta[property="og:url"]', "property", "og:url", url);
  upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
  upsertMeta(
    'meta[name="twitter:description"]',
    "name",
    "twitter:description",
    description
  );
  upsertCanonical(url);
}
