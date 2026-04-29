import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/codex',
      name: 'codex',
      component: () => import('../views/CodexView.vue')
    },
    {
      path: '/agent-portal',
      name: 'agent-portal',
      component: () => import('../views/AgentPortalView.vue')
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: () => import('../views/BlogDetailView.vue')
    }
  ]
})

export default router
