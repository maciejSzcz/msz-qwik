# macez.dev

Personal site and blog of Maciej Szczęsny. Built with Qwik City, styled with Tailwind CSS v4, deployed to Cloudflare Pages.

## Commands

```sh
pnpm install
pnpm dev            # dev server with SSR, http://localhost:5173
pnpm build          # pre-rendered build into dist/; build.client renders share images first (also typecheck and lint)
pnpm preview        # build, then serve dist/ with wrangler locally
pnpm deploy         # build, then upload dist/ with wrangler pages deploy
pnpm og             # regenerate the share images in public/og/ only
pnpm lint
pnpm fmt
```

Requires Node 22.14+ (`.nvmrc`). pnpm is pinned to 10.11.1 via `packageManager` to match the Cloudflare Pages build image; a newer global pnpm switches to it automatically. Build-script approvals are under `pnpm` in `package.json`.

## Layout

```
src/
  routes/
    index.tsx                 home
    layout.tsx                header, footer, newsletter action
    blog/index@root.tsx       post list
    blog/layout.tsx           post page wrapper, per-post meta tags and BlogPosting JSON-LD
    blog/<slug>/index.mdx     posts
    blog/rss.xml/index.ts     RSS feed
  components/newsletter/      signup form (currently hidden)
  utils/blog-posts.ts         reads post frontmatter
  utils/site.ts               site URL, name, share image URLs, JSON-LD helper
  global.css                  design tokens, utilities, intro animation
scripts/og.mjs                renders share images into public/og/ (gitignored) at build time
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

It appears on the home page, `/blog`, the RSS feed and the sitemap automatically, and gets a share image at `/og/<slug>.png` on the next build. Code blocks are highlighted by Shiki (theme set in `vite.config.ts`).

## Design

Defined in `src/global.css`; reuse these instead of hardcoding values.

- **Colours:** `paper` (#faf9f6) background, `ink` (#101614) text, `ink-soft` and `meta` for secondary text, `line` for the rare hairline.
- **Type:** Funnel Display 800 for headings (`display` utility), Funnel Sans for body, JetBrains Mono for small labels (`label` utility). Fonts are self-hosted via `@fontsource`, and the two above-the-fold files are preloaded in `src/root.tsx`.
- **Layout:** `frame` sets the page width and gutters; `col-text` is the 36rem reading column, centred on wide screens. Spacing separates sections; avoid adding borders.
- **Motion:** the home headline rises letter by letter once per session (`.rise-letter`), and is skipped under `prefers-reduced-motion`.

## SEO

- Every page is pre-rendered at build time (`ssg` in `adapters/cloudflare-pages/vite.config.ts`), which also writes `sitemap.xml`. Change the `origin` there if the domain changes, along with `SITE_URL` in `src/utils/site.ts`.
- Each page sets its own `title` and description in its `head`. The root layout's `head` only fills a missing title and adds the RSS link; keep it that way, or it overrides every page.
- Share images are rendered in Node by `scripts/og.mjs`, not in the Worker: the renderer compiles WebAssembly at runtime, which Cloudflare Workers don't allow.
- Structured data: `WebSite`, `ProfilePage` and `Person` on the home page, `Blog` on `/blog/`, and `BlogPosting` on posts.

## Newsletter

The signup form and its server action exist but are hidden with `SHOW_NEWSLETTER = false` in `src/routes/layout.tsx`. Before turning it on:

- pages are pre-rendered, so form posts to them won't reach the action; move the signup to a non-pre-rendered endpoint or exclude that page from `ssg`
- set `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` as secrets on the Pages project (locally: `.env` for `pnpm dev`, `.dev.vars` for `pnpm preview`)
- make sure the sender domain in the action is verified in Resend

## Deploying

`wrangler.jsonc` configures the Pages project (output: `dist/`, `nodejs_compat`). Its `vars` are runtime variables only; build settings are set in the Cloudflare dashboard. If you change the pnpm version, update `packageManager` and make sure the Pages build uses the same one. Keep secrets out of `wrangler.jsonc`.
