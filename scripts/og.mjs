// Renders the social preview images into public/og/ before the Vite build.
// Done at build time because the renderer compiles WebAssembly at runtime,
// which Cloudflare Workers don't allow.
//
//   public/og/default.png   home page and blog list
//   public/og/<slug>.png    one per post in src/routes/blog/<slug>/index.mdx

import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { html, ImageResponse } from 'og-img';

const OUT = 'public/og';

async function font(pkg, file) {
  const buf = await readFile(`node_modules/@fontsource/${pkg}/files/${file}.woff`);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

// latin-ext files get their own family names so satori falls back to them for ę, ł, etc.
const fonts = [
  ['Funnel Display', 'funnel-display', 'funnel-display-latin-800-normal', 800],
  ['Funnel Display Ext', 'funnel-display', 'funnel-display-latin-ext-800-normal', 800],
  ['Funnel Sans', 'funnel-sans', 'funnel-sans-latin-400-normal', 400],
  ['Funnel Sans Ext', 'funnel-sans', 'funnel-sans-latin-ext-400-normal', 400],
  ['JetBrains Mono', 'jetbrains-mono', 'jetbrains-mono-latin-500-normal', 500],
  ['JetBrains Mono Ext', 'jetbrains-mono', 'jetbrains-mono-latin-ext-500-normal', 500],
];

const fontData = await Promise.all(
  fonts.map(async ([name, pkg, file, weight]) => ({
    name,
    data: await font(pkg, file),
    weight,
    style: 'normal',
  }))
);

// og-img's html`` can't nest templates or take an empty child, so the card is
// written out twice: with and without a description line.
const ROOT = `background-color: #faf9f6; color: #101614; font-family: 'Funnel Sans', 'Funnel Sans Ext'`;
const MONO = `font-family: 'JetBrains Mono', 'JetBrains Mono Ext'; color: #6f736f`;
const DISPLAY = `font-family: 'Funnel Display', 'Funnel Display Ext'; letter-spacing: -0.03em; line-height: 1`;

function card({ left, right, title, description }) {
  if (description) {
    return html`
      <div tw="w-full h-full flex flex-col justify-between p-16" style="${ROOT}">
        <div tw="flex justify-between text-xl" style="${MONO}">
          <div>${left}</div>
          <div>${right}</div>
        </div>
        <div tw="flex flex-col">
          <div tw="text-8xl mb-6" style="${DISPLAY}">${title}</div>
          <div tw="text-3xl" style="color: #4a504c">${description}</div>
        </div>
      </div>
    `;
  }
  return html`
    <div tw="w-full h-full flex flex-col justify-between p-16" style="${ROOT}">
      <div tw="flex justify-between text-xl" style="${MONO}">
        <div>${left}</div>
        <div>${right}</div>
      </div>
      <div tw="flex text-8xl" style="${DISPLAY}">${title}</div>
    </div>
  `;
}

async function render(name, element) {
  const res = new ImageResponse(element, { width: 1200, height: 630, fonts: fontData });
  const png = Buffer.from(await res.arrayBuffer());
  if (!png.length) throw new Error(`OG image ${name} rendered empty`);
  await writeFile(`${OUT}/${name}.png`, png);
  console.log(`og: ${OUT}/${name}.png (${Math.round(png.length / 1024)} kB)`);
}

// Only flat `key: value` frontmatter is needed here.
function frontmatter(src) {
  const block = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  for (const line of block?.[1].split(/\r?\n/) ?? []) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const v = m[2].trim();
    if (v.length > 1 && v[0] === "'" && v.endsWith("'"))
      data[m[1]] = v.slice(1, -1).replace(/''/g, "'");
    else if (v.length > 1 && v[0] === '"' && v.endsWith('"')) data[m[1]] = v.slice(1, -1);
    else data[m[1]] = v;
  }
  return data;
}

await mkdir(OUT, { recursive: true });

await render(
  'default',
  card({
    left: 'MACIEJ SZCZĘSNY',
    right: 'MACEZ.DEV',
    title: "I'm Maciej. I write software, mostly for the web.",
  })
);

const blogDir = 'src/routes/blog';
for (const entry of await readdir(blogDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  let src;
  try {
    src = await readFile(`${blogDir}/${entry.name}/index.mdx`, 'utf8');
  } catch {
    continue;
  }
  const post = frontmatter(src);
  await render(
    entry.name,
    card({
      left: 'MACIEJ SZCZĘSNY',
      right: `BLOG · ${post.date ?? ''}`,
      title: post.title ?? entry.name,
      description: post.description,
    })
  );
}
