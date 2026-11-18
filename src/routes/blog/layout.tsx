import { component$, Slot } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { getBlogPost } from '~/utils/blog-posts';
import { jsonLd, ogImageUrl, SITE_NAME, SITE_URL } from '~/utils/site';

export default component$(() => {
  return (
    <div class="frame pt-28 md:pt-44">
      <article class="prose prose-lg col-text prose-headings:font-display prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-balance prose-h1:text-5xl prose-a:underline-offset-4 prose-pre:rounded-md">
        <Slot />
      </article>
    </div>
  );
});

export const head: DocumentHead = ({ head, url }) => {
  const slug = url.pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1];
  const post = slug ? getBlogPost(slug) : undefined;

  // Returning `head` itself would merge it into itself; return nothing to add.
  if (!slug || !post) {
    return {};
  }

  const title = `${post.title} | ${SITE_NAME}`;
  const postUrl = `${SITE_URL}/blog/${slug}/`;
  const image = ogImageUrl(slug);
  const published = new Date(post.date).toISOString();
  // The MDX frontmatter already adds the description tag; don't add a second one.
  const hasDescription = head.meta.some((m) => m.name === 'description');

  return {
    title,
    meta: [
      ...(hasDescription ? [] : [{ name: 'description', content: post.description }]),
      { name: 'author', content: SITE_NAME },
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: post.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: postUrl },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'article:published_time', content: published },
      { property: 'article:author', content: `${SITE_URL}/` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: post.title },
      { name: 'twitter:description', content: post.description },
      { name: 'twitter:image', content: image },
    ],
    scripts: [
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${postUrl}#post`,
        mainEntityOfPage: postUrl,
        url: postUrl,
        headline: post.title,
        description: post.description,
        image,
        datePublished: published,
        inLanguage: 'en',
        author: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
        },
        isPartOf: { '@id': `${SITE_URL}/blog/#blog` },
      }),
    ],
  };
};
