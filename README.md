# macez.dev

Personal site and blog of Maciej Szczęsny. Built with Qwik City, styled with Tailwind CSS v4, deployed to Cloudflare Pages.

## Commands

```sh
pnpm install
pnpm dev            # dev server with SSR, http://localhost:5173
pnpm build          # production build into dist/ (also runs typecheck and lint)
pnpm preview        # build, then serve dist/ with wrangler locally
pnpm deploy         # build, then upload dist/ with wrangler pages deploy
pnpm lint
pnpm fmt
```

Requires Node 22.14+ and pnpm 12.21.0, pinned in `package.json` `engines` (build-script approvals live in `pnpm-workspace.yaml` under `allowBuilds`).

## Layout

```
src/
  routes/
    index.tsx                 home
    layout.tsx                header, footer, newsletter action
    blog/index@root.tsx       post list
    blog/layout.tsx           post page wrapper and per-post meta/OG tags
    blog/<slug>/index.mdx     posts
    og-image/[slug]/index.ts  generated social image per post
  components/newsletter/      signup form (currently hidden)
  utils/blog-posts.ts         reads post frontmatter
  global.css                  design tokens, utilities, intro animation
public/fonts/                 .woff copies used only by the OG image renderer
```

## Writing a post

Create `src/routes/blog/<slug>/index.mdx`:

```mdx
---
title: Post title
description: One line shown in lists and social previews
date: 2026-01-31
---

# Post title

Body in Markdown/MDX.
```

It appears on the home page and `/blog` automatically, and gets an OG image at `/og-image/<slug>`. Code blocks are highlighted by Shiki (theme set in `vite.config.ts`).

## Design

Defined in `src/global.css`; reuse these instead of hardcoding values.

- **Colours:** `paper` (#faf9f6) background, `ink` (#101614) text, `ink-soft` and `meta` for secondary text, `line` for the rare hairline.
- **Type:** Funnel Display 800 for headings (`display` utility), Funnel Sans for body, JetBrains Mono for small labels (`label` utility). Fonts are self-hosted via `@fontsource`, and the two above-the-fold files are preloaded in `src/root.tsx`.
- **Layout:** `frame` sets the page width and gutters; `col-text` is the 36rem reading column, centred on wide screens. Spacing separates sections; avoid adding borders.
- **Motion:** the home headline rises letter by letter once per session (`.rise-letter`), and is skipped under `prefers-reduced-motion`.

## Newsletter

The signup form and its server action exist but are hidden with `SHOW_NEWSLETTER = false` in `src/routes/layout.tsx`. Before turning it on:

- set `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` as secrets on the Pages project (locally: `.env` for `pnpm dev`, `.dev.vars` for `pnpm preview`)
- make sure the sender domain in the action is verified in Resend

## Deploying

`wrangler.jsonc` configures the Pages project (output: `dist/`, `nodejs_compat`). Its `vars` are runtime variables only; build settings such as `PNPM_VERSION` and `NODE_VERSION` are set in the Cloudflare dashboard. Keep secrets out of `wrangler.jsonc`.
