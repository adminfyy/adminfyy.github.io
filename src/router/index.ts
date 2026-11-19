import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import { applySeo } from "@/utils/seo";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      alias: "/ai-chat",
      component: () => import("../views/AiChatView.vue"),
      meta: {
        title: "AI Chat",
        description:
          "与本站 AI 助手对话，了解前端工程师 adminfoo 的经历、技术栈与项目经验。",
      },
    },
    {
      path: "/blog",
      name: "blog",
      component: HomeView,
      meta: {
        title: "博客",
        description:
          "前端工程化与跨端实践笔记：Vue、React、TypeScript、Electron、HarmonyOS。",
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
      meta: {
        title: "About",
        description:
          "adminfoo 的简历：9 年以上前端经验，Vue2/3、React、Electron、HarmonyOS，base 厦门，正在寻找前端岗位机会。",
      },
    },
    {
      path: "/blog/:slug",
      name: "blog-detail",
      component: () => import("../views/BlogDetailView.vue"),
    },
    {
      path: "/tic-tac-toe",
      name: "tic-tac-toe",
      component: () => import("../views/TicTacToeView.vue"),
      meta: {
        title: "Game",
        description: "井字棋小游戏：前端状态管理与交互逻辑示例。",
      },
    },
    {
      path: "/wasm",
      name: "wasm",
      component: () => import("../views/WasmView.vue"),
      meta: {
        title: "WASM 教学",
        description:
          "WebAssembly 入门教程：二进制结构、WAT 语法、JS 调用、线性内存与性能实验。",
      },
    },
    {
      path: "/canvas",
      name: "canvas",
      component: () => import("../views/CanvasView.vue"),
      meta: {
        title: "Canvas",
        description: "Canvas 图形与动画实验：绘制、粒子与交互效果。",
      },
    },
    {
      path: "/three",
      name: "three",
      component: () => import("../views/ThreeView.vue"),
      meta: {
        title: "3D",
        description: "Three.js 三维场景实验：模型、材质与光照效果。",
      },
    },
    {
      path: "/pretext",
      name: "pretext",
      component: () => import("../views/PretextView.vue"),
      meta: {
        title: "Pretext",
        description: "文本排版实验：基于 pretext 的排版与渲染效果展示。",
      },
    },
  ],
});

router.afterEach((to) => {
  const meta = (to.meta || {}) as { title?: string; description?: string };
  applySeo({
    title: meta.title,
    description: meta.description,
    path: to.path,
  });
});

export default router;
