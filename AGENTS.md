# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vue + Vite project with docs and examples.
- `src/`: application source code (entry points, router, views, components, stores, styles, and mock data).
- `src/components/__tests__/`: unit tests (Vitest).
- `cypress/`: end-to-end tests, fixtures, and support commands.
- `public/`: static assets served as-is.
- `vdocs/`: VuePress source content.
- `docs/`: generated static docs/site artifacts (treat as build output unless intentionally updating published assets).
- `pattern/`: standalone JavaScript/design-pattern demos.

## Build, Test, and Development Commands
Use `npm` scripts from `package.json`:
- `npm run dev`: start Vite dev server.
- `npm run build`: type-check then production build.
- `npm run build-only`: Vite build without type-check.
- `npm run preview`: preview production build on `:4173`.
- `npm run test:unit`: run Vitest in `jsdom` environment.
- `npm run test:e2e`: run Cypress E2E with preview server (interactive).
- `npm run test:e2e:ci`: run Cypress E2E headlessly.
- `npm run lint`: run ESLint with autofix.
- `npm run doc:dev` / `npm run doc:build`: develop/build VuePress docs from `vdocs/`.

## Coding Style & Naming Conventions
- Follow ESLint config: `plugin:vue/essential`, `eslint:recommended`, TypeScript + Prettier integration.
- Use 2-space indentation in `.ts`, `.js`, and `.vue` files.
- Vue SFC/component files: `PascalCase` (for example, `HelloWorld.vue`).
- Views and route-level pages: keep existing naming style in `src/views/` and `src/module/`.
- Test files: `*.spec.ts` (unit) and `*.cy.ts` (Cypress).

## Testing Guidelines
- Add/adjust unit tests for component or logic changes under `src/components/__tests__/`.
- Add/adjust E2E coverage in `cypress/e2e/` for user-flow changes.
- Before opening a PR, run at least: `npm run lint`, `npm run test:unit`, and relevant E2E (`test:e2e:ci` for CI-like runs).

## Commit & Pull Request Guidelines
Recent history uses short conventional prefixes (`feat:`, `chore:`) plus occasional maintenance commits.
- Prefer Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`.
- Keep messages imperative and specific (example: `feat: add blog route guard`).
- PRs should include: purpose, key changes, test evidence (command list/output summary), and screenshots/GIFs for UI changes.
- Link related issues when applicable and call out any docs/deployment impact (`vdocs/` or `docs/`).
