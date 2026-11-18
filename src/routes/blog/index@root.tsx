import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { MDXModule } from '~/model/MDXModule';

import type { BlogPost } from '~/utils/blog-posts';

export const useBlogPosts = routeLoader$(async () => {
  const posts: BlogPost[] = [];

  const blogModules = import.meta.glob<MDXModule>('/src/routes/blog/*/index.mdx', { eager: true });
  for (const [path, module] of Object.entries(blogModules)) {
    const slug = path.split('/')[4];
    const frontmatter = module.frontmatter || module;

    posts.push({
      slug,
      title: frontmatter.title || module.title || 'Untitled',
      description: frontmatter.description || module.description || '',
      date: frontmatter.date || module.date || new Date().toISOString(),
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export default component$(() => {
  const posts = useBlogPosts();

  return (
    <div class="frame">
      <h1 class="display pt-28 text-[clamp(3rem,8.5vw,7.5rem)] md:pt-44">Blog</h1>

      <ul class="col-text mt-24 space-y-14 md:mt-40">
        {posts.value.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`} class="group block">
              <time class="label" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h2 class="font-display mt-2 text-3xl font-extrabold tracking-tight underline-offset-4 group-hover:underline">
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

export const head: DocumentHead = {
  title: 'Blog | Maciej Szczęsny',
  meta: [
    {
      name: 'description',
      content: 'Posts by Maciej Szczęsny on programming, AI and whatever else I find interesting.',
    },
  ],
};
