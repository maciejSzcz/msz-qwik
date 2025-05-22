import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import matter from 'gray-matter';
import { readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { Section } from '~/components/section';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export const useBlogPosts = routeLoader$(async () => {
  const blogDir = join(process.cwd(), 'src/routes/blog');
  const entries = await readdir(blogDir, { withFileTypes: true });
  
  const posts: BlogPost[] = [];
  
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== 'index') {
      const postPath = join(blogDir, entry.name, 'index.mdx');
      try {
        const content = readFileSync(postPath, 'utf-8');
        const { data } = matter(content);
        posts.push({
          slug: entry.name,
          title: data.title,
          description: data.description,
          date: data.date,
        });
      } catch (error) {
        console.error(`Error reading post ${entry.name}:`, error);
      }
    }
  }
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export default component$(() => {
  const posts = useBlogPosts();
  
  return (
    <Section>
      <h1 class="mb-8 text-4xl font-bold">Blog</h1>
      <div class="space-y-8">
        {posts.value.map((post) => (
          <article key={post.slug} class="rounded-lg bg-neutral-900/70 p-6">
            <h2 class="mb-2 text-2xl font-bold">
              <a href={`/blog/${post.slug}`} class="transition-colors hover:text-purple-400">
                {post.title}
              </a>
            </h2>
            <p class="mb-4 text-neutral-400">{post.description}</p>
            <time class="text-sm text-neutral-500">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </article>
        ))}
      </div>
    </Section>
  );
});

export const head: DocumentHead = {
  title: 'Blog | Maciej Szczęsny',
  meta: [
    {
      name: 'description',
      content:
        'Read my thoughts on software development, programming tips, and my journey as a developer.',
    },
  ],
};
