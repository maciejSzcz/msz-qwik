import type { RequestHandler } from '@builder.io/qwik-city';
import { fetchFont, html, ImageResponse } from 'og-img';
import { getBlogPost } from '~/utils/blog-posts';

export const onGet: RequestHandler = async ({ params, url, send }) => {
  const slug = params.slug;
  const post = getBlogPost(slug);

  if (!post) {
    throw new Error('Blog post not found');
  }

  send(
    new ImageResponse(
      html`
        <div
          tw="w-full h-full flex flex-col justify-between p-16"
          style="background-color: #faf9f6; color: #101614; font-family: 'Funnel Sans', 'Funnel Sans Ext'"
        >
          <div
            tw="flex justify-between text-xl"
            style="font-family: 'JetBrains Mono', 'JetBrains Mono Ext'; color: #6f736f"
          >
            <div>MACIEJ SZCZĘSNY</div>
            <div>BLOG · ${post.date}</div>
          </div>

          <div tw="flex flex-col">
            <div
              tw="text-8xl mb-6"
              style="font-family: 'Funnel Display', 'Funnel Display Ext'; letter-spacing: -0.03em; line-height: 1"
            >
              ${post.title}
            </div>
            <div tw="text-3xl" style="color: #4a504c">${post.description}</div>
          </div>
        </div>
      `,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Funnel Display',
            data: await fetchFont(`${url.origin}/fonts/funnel-display-latin-800-normal.woff`),
            weight: 800,
            style: 'normal',
          },
          {
            name: 'Funnel Display Ext',
            data: await fetchFont(`${url.origin}/fonts/funnel-display-latin-ext-800-normal.woff`),
            weight: 800,
            style: 'normal',
          },
          {
            name: 'Funnel Sans',
            data: await fetchFont(`${url.origin}/fonts/funnel-sans-latin-400-normal.woff`),
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Funnel Sans Ext',
            data: await fetchFont(`${url.origin}/fonts/funnel-sans-latin-ext-400-normal.woff`),
            weight: 400,
            style: 'normal',
          },
          {
            name: 'JetBrains Mono',
            data: await fetchFont(`${url.origin}/fonts/jetbrains-mono-latin-500-normal.woff`),
            weight: 500,
            style: 'normal',
          },
          {
            name: 'JetBrains Mono Ext',
            data: await fetchFont(`${url.origin}/fonts/jetbrains-mono-latin-ext-500-normal.woff`),
            weight: 500,
            style: 'normal',
          },
        ],
      }
    )
  );
};
