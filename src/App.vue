<template>
  <div id="app">
    <header class="site-header">
      <div class="brand">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="36"
          height="36"
        />
        <div>
          <p class="site-name">技术改变生活</p>
          <p class="site-subtitle">Technology Changes Life</p>
        </div>
      </div>
      <nav>
        <router-link
          v-for="route in menuRoutes"
          :key="route.path"
          :to="route.path"
        >
          {{ route.meta.title }}
        </router-link>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script>
import router from "./router";

export default {
  computed: {
    menuRoutes() {
      return router.options.routes.filter(
        (route) => route.meta && route.meta.title,
      );
    },
  },
};
</script>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding: 0.8rem 1.2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--surface-glass);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-sm);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.logo {
  border-radius: 8px;
}

nav {
  font-size: 13px;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

nav a {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-text-secondary);
  transition: all var(--duration-fast) ease;
}

nav a:hover {
  color: var(--accent-600);
  border-color: var(--color-border-hover);
  background: var(--accent-bg-subtle);
}

nav a.router-link-exact-active {
  color: var(--accent-600);
  font-weight: 600;
  background: var(--accent-bg-light);
  border-color: var(--accent-500);
}

nav a.router-link-exact-active:hover {
  background: var(--accent-bg-medium);
}

.site-name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.site-subtitle {
  font-size: 0.7rem;
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
}

@media (max-width: 768px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
