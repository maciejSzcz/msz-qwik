import type { MDXModule } from '~/model/MDXModule';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
}

let cachedPosts: BlogPost[] | null = null;

function loadBlogPosts(): BlogPost[] {
  if (cachedPosts) return cachedPosts;

  const posts: BlogPost[] = [];
  const blogModules = import.meta.glob<MDXModule>('/src/routes/blog/*/index.mdx', { eager: true });

  for (const [path, module] of Object.entries(blogModules)) {
    const pathSegments = path.split('/');
    const slug = pathSegments[pathSegments.length - 2];

    if (!slug) {
      console.warn(`Could not extract slug from path: ${path}`);
      continue;
    }
    const frontmatter = module.frontmatter || module;

    posts.push({
      slug,
      title: frontmatter.title || module.title || 'Untitled',
      description: frontmatter.description || module.description || '',
      date: frontmatter.date || module.date || new Date().toISOString(),
    });
  }

  cachedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return cachedPosts;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = loadBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return loadBlogPosts();
}
