import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getAllBlogPosts } from '~/utils/blog-posts';
import { DEFAULT_OG_IMAGE, jsonLd, SITE_NAME, SITE_URL } from '~/utils/site';

export const useBlogPosts = routeLoader$(() => getAllBlogPosts());

export default component$(() => {
  const posts = useBlogPosts();

  return (
    <div class="frame">
      <h1 class="display pt-28 text-[clamp(3rem,8.5vw,7.5rem)] md:pt-44">Blog</h1>

      <ul class="col-text mt-24 space-y-14 md:mt-40">
        {posts.value.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}/`} class="group block">
              <time class="label" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'UTC',
                })}
              </time>
              <h2 class="font-display mt-2 text-3xl font-extrabold tracking-tight text-balance underline-offset-4 group-hover:underline">
                {post.title}
              </h2>
              {post.description && <p class="text-ink-soft mt-2 text-lg">{post.description}</p>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});

const title = 'Blog | Maciej Szczęsny';
const description =
  'Posts by Maciej Szczęsny on programming, AI and whatever else I find interesting.';

export const head: DocumentHead = {
  title,
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${SITE_URL}/blog/` },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:image', content: DEFAULT_OG_IMAGE },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
  ],
  scripts: [
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog/#blog`,
      url: `${SITE_URL}/blog/`,
      name: title,
      description,
      inLanguage: 'en',
      author: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
      },
      isPartOf: { '@id': `${SITE_URL}/#website` },
    }),
  ],
};
