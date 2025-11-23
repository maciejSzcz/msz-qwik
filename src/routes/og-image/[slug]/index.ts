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
          style="background-image: radial-gradient(circle, rgb(42, 29, 51) 2px, transparent 2px); background-size: 20px 20px; background-color: #0f0e0e;"
        >
          <div tw="flex flex-col pt-12">
            <div tw="text-8xl font-bold text-white mb-4" style="font-family: 'Raleway bold'">
              ${post.title}
            </div>
            <div tw="text-2xl text-slate-300 leading-relaxed">${post.description}</div>
          </div>

          <div tw="flex justify-between items-end">
            <div tw="flex flex-col">
              <div tw="text-2xl text-slate-400 mb-2">Maciej Szczęsny</div>
              <div tw="text-xl text-slate-500">Blog</div>
            </div>
            <div tw="text-lg text-slate-400">${post.date}</div>
          </div>
        </div>
      `,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Raleway regular',
            data: await fetchFont(`${url.origin}/fonts/Raleway-Regular.ttf`),
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Raleway bold',
            data: await fetchFont(`${url.origin}/fonts/Raleway-Bold.ttf`),
            weight: 700,
            style: 'normal',
          },
        ],
      }
    )
  );
};
