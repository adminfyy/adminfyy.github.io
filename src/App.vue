<template>
  <div id="app">
    <header class="site-header">
      <div class="brand">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="36" height="36" />
        <div>
          <p class="site-name">adminfoo Labs</p>
          <p class="site-subtitle">Cinematic Agent Playground</p>
        </div>
      </div>
      <nav>
        <router-link to="/">Blog</router-link>
        <router-link to="/tic-tac-toe">Game</router-link>
        <router-link to="/agent-portal">Agent Portal</router-link>
        <router-link to="/codex">Codex</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<style scoped>
.site-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  background: var(--surface-glass);
  backdrop-filter: blur(8px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

nav {
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}

nav a.router-link-exact-active {
  color: #e6f4ff;
  font-weight: 600;
  background: rgba(97, 218, 251, 0.18);
  border-color: rgba(97, 218, 251, 0.35);
}

nav a.router-link-exact-active:hover {
  background: rgba(97, 218, 251, 0.18);
}

nav a {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-text);
}

.site-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  line-height: 1;
  letter-spacing: 0.04em;
}

.site-subtitle {
  font-size: 0.75rem;
  opacity: 0.82;
}

@media (max-width: 768px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
