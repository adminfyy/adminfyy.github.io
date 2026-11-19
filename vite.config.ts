import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import type { Plugin } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue2 from "@vitejs/plugin-vue2";
import vue2Jsx from "@vitejs/plugin-vue2-jsx";

const SITE_URL = "https://2yjs.top";

const STATIC_ROUTES = [
  "/",
  "/blog",
  "/about",
  "/tic-tac-toe",
  "/wasm",
  "/canvas",
  "/three",
  "/pretext",
];

// 与 src/utils/blogPosts.ts 中的 slug 规则保持一致
const slugify = (raw: string) =>
  raw
    .toLowerCase()
    .replace(/^\//, "")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");

function collectBlogSlugs(root: string): string[] {
  const slugs: string[] = [];

  const walk = (
    dir: string,
    prefix: string,
    exts: string[],
    exclude: string[] = []
  ) => {
    const abs = path.resolve(root, dir);
    if (!existsSync(abs)) return;
    for (const file of readdirSync(abs)) {
      if (exclude.includes(file)) continue;
      if (exts.some((ext) => file.endsWith(ext))) {
        slugs.push(slugify(`${prefix}-/${dir}/${file}`));
      }
    }
  };

  walk("vdocs/blog", "vdocs", [".md"], ["README.md"]);
  walk("pattern", "pattern", [".md", ".js", ".html"]);

  const seedPath = path.resolve(root, "src/mock/blog.json");
  if (existsSync(seedPath)) {
    const seeds = JSON.parse(readFileSync(seedPath, "utf-8")) as Array<{
      title: string;
    }>;
    seeds.forEach((item, index) => {
      slugs.push(slugify(`seed-${item.title}-${index}`));
    });
  }

  return slugs;
}

function sitemapPlugin(): Plugin {
  return {
    name: "generate-sitemap",
    apply: "build",
    closeBundle() {
      const root = process.cwd();
      const routes = [
        ...STATIC_ROUTES,
        ...collectBlogSlugs(root).map((slug) => `/blog/${slug}`),
      ];
      const lastmod = new Date().toISOString().slice(0, 10);
      const urls = routes
        .map((route) => {
          const loc = encodeURI(`${SITE_URL}${route}`).replace(/&/g, "&amp;");
          return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
        })
        .join("\n");
      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        urls,
        "</urlset>",
        "",
      ].join("\n");

      writeFileSync(path.resolve(root, "docs/sitemap.xml"), xml, "utf-8");
      console.log(`[sitemap] ${routes.length} routes -> docs/sitemap.xml`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    vue2Jsx(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    sitemapPlugin(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "docs",
  },
});
