# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Vue 2.7 + Vite personal site/blog deployed as a GitHub Pages static site via the `docs/` directory. Uses Vue 2 syntax with the Composition API options syntax (not Vue 3). IE11 compatibility is required via `@vitejs/plugin-legacy`.

## Essential Commands

```sh
npm run dev          # Vite dev server (hot reload)
npm run build        # Type-check + production build (outputs to docs/)
npm run build-only   # Vite build without type-check
npm run test:unit    # Vitest unit tests (jsdom env)
npm run test:e2e:ci  # Cypress E2E headless (requires build first)
npm run lint         # ESLint with autofix
```

Production builds output to `docs/`, which is the GitHub Pages publish directory.

## Architecture

### Entry & App Shell
- `src/main.ts` — bootstraps Vue 2 with Pinia store and Vue Router, mounts `src/App.vue`
- `src/App.vue` — top-level shell with header/nav; dynamically renders nav links from router routes that have `meta.title`

### Routing
- `src/router/index.ts` — Vue Router config with history mode; routes are lazy-loaded via dynamic `import()`
- Key routes: `/` (home/blog list), `/about`, `/codex`, `/agent-portal`, `/blog/:slug`, `/tic-tac-toe`, `/overseas-export`

### State Management
- `src/stores/` — Pinia stores (Vue 2 compatible via `PiniaVuePlugin`)

### Views & Components
- `src/views/` — route-level page components
- `src/components/` — reusable Vue SFCs
- `src/utils/` — pure utility functions (agent, codex, blog posts, game logic, export)
- `src/mock/` — mock data (agent tools, blog JSON)

### Legacy Code
- `src/apps/legacy/` — older Vue app entry with separate routing (`routes.js`) and module-based views. This is legacy and should not be modified unless explicitly working on migration.

### Tests
- `src/components/__tests__/` — Vitest unit tests (`*.spec.ts`)
- `cypress/e2e/` — Cypress E2E tests (`*.cy.ts`)

### Docs
- `vdocs/` — VuePress documentation source
- `docs/` — built static site artifacts (GitHub Pages output)

### Pattern Demos
- `pattern/` — standalone JS design pattern demos (Observer, Mediator, Module, Singleton) — not imported by the app

## Key Dependencies
- **vue 2.7.7** — Vue 2 (not Vue 3); use Vue 2 SFC syntax and APIs
- **vue-router 3.x** — Vue Router for Vue 2
- **pinia 2.x** — State management (Vue 2 compatible mode)
- **vite 3.x** — Build tool with `@vitejs/plugin-vue2` and legacy plugin for IE11
- **vitest 0.18.x** — Unit test runner
- **cypress 10.x** — E2E test runner
- **eslint** — `plugin:vue/essential` + TypeScript + Prettier

## Important Notes
- All Vue code uses Vue 2 APIs (`Vue.use`, `new Vue({})`, options API). Do not use Vue 3 Composition API (`setup()`, `ref()`, `reactive()`).
- The `docs/` directory contains build output — treat it as generated unless intentionally updating published assets.
- `webpack.config.js` is a legacy configuration and is not used by the current Vite-based build.
