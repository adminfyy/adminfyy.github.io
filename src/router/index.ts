import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: "Blog" },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
      meta: { title: "About" },
    },
    {
      path: "/codex",
      name: "codex",
      component: () => import("../views/CodexView.vue"),
      meta: { title: "Codex" },
    },
    {
      path: "/agent-portal",
      name: "agent-portal",
      component: () => import("../views/AgentPortalView.vue"),
      meta: { title: "Agent Portal" },
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
      meta: { title: "Game" },
    },
    {
      path: "/overseas-export",
      name: "overseas-export",
      component: () => import("../views/OverseasExportView.vue"),
      meta: { title: "Export" },
    },
  ],
});

export default router;
