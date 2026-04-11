# Repository Guidelines

## Project Structure & Module Organization
This repository is a VuePress 2 site powered by `vuepress-theme-plume`.

- Content lives under `docs/` as Markdown pages (for example `docs/collection/`, `docs/cheat-sheet/`, `docs/moment/`).
- Site configuration and theme wiring live in `docs/.vuepress/` (`config.ts`, `plume.config.ts`, `navbar.ts`, `client.ts`).
- Custom Vue components are in `docs/.vuepress/theme/components/`.
- Static assets belong in `docs/.vuepress/public/`.
- Utility scripts live in `scripts/`.

Do not commit build artifacts from `docs/.vuepress/.temp` or `docs/.vuepress/dist` (already ignored).

## Build, Test, and Development Commands
Use `pnpm` (lockfile is `pnpm-lock.yaml`).

- `pnpm install` installs dependencies.
- `pnpm docs:dev` starts local dev server.
- `pnpm docs:dev-clean` starts dev server with cleaned VuePress cache/temp.
- `pnpm docs:build` builds production output into `docs/.vuepress/dist`.
- `pnpm docs:preview` serves the built site locally for verification.
- `pnpm vp-update` updates VuePress/theme scaffolding helpers.

## Coding Style & Naming Conventions
- Use TypeScript/ESM style used in config files: 2-space indentation, single quotes, trailing commas where present.
- Keep config and client code concise; prefer clear object keys over heavy abstraction.
- Markdown file/folder names use meaningful slugs; existing content mixes English and Chinese names, so match surrounding convention in each section.
- For Vue components, keep PascalCase filenames (for example `JSXGraph.vue`).

## Testing Guidelines
There is no dedicated unit-test framework in this repo. Validation is build-based:

1. Run `pnpm docs:build` before opening a PR.
2. Run `pnpm docs:preview` and verify edited pages render correctly.
3. If changing navigation/config, verify links and route paths locally.

## Commit & Pull Request Guidelines
Current history favors short, focused commit subjects (often concise Chinese phrases like “修改导航图标”).

- Keep commits scoped to one concern (content update, config tweak, asset update).
- Use imperative, descriptive subjects; avoid mixing unrelated changes.
- PRs should include: purpose summary, key paths changed, local verification steps (`docs:build`/preview), and screenshots for visible UI/content changes.
- Link related issues when applicable and note any deployment-impacting changes (for example base path, CNAME, or workflow edits).
