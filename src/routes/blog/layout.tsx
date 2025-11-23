import { component$, Slot } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Section } from '~/components/section';
import { getBlogPost } from '~/utils/blog-posts';
import { generateOgImageUrl } from '~/utils/og-image';

export default component$(() => {
  return (
    <Section class="pt-24">
      <article class="prose prose-invert max-w-none rounded-lg bg-neutral-900/50 p-6">
        <Slot />
      </article>
    </Section>
  );
});

export const head: DocumentHead = ({ head, url }) => {
  const pathname = url.pathname;

  const match = pathname.match(/^\/blog\/([^/]+)\/?$/);
  const slug = match?.[1];

  if (!slug) {
    return head;
  }

  const post = getBlogPost(slug);

  if (!post) {
    return head;
  }

  const ogImageUrl = generateOgImageUrl(slug, url.origin);

  return {
    title: `${post.title} | Maciej Szczęsny`,
    meta: [
      {
        name: 'description',
        content: post.description,
      },
      {
        property: 'og:title',
        content: post.title,
      },
      {
        property: 'og:description',
        content: post.description,
      },
      {
        property: 'og:image',
        content: ogImageUrl,
      },
      {
        property: 'og:type',
        content: 'article',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: post.title,
      },
      {
        name: 'twitter:description',
        content: post.description,
      },
      {
        name: 'twitter:image',
        content: ogImageUrl,
      },
    ],
  };
};
