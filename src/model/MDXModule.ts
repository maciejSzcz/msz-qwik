import { JSX } from '@builder.io/qwik/jsx-runtime';

export interface MDXModule {
  frontmatter?: {
    title: string;
    description: string;
    date: string;
  };
  title?: string;
  description?: string;
  date?: string;
  default: () => JSX.Element;
}
