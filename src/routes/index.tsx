import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { getAllBlogPosts } from '~/utils/blog-posts';
import { DEFAULT_OG_IMAGE, jsonLd, SITE_NAME, SITE_URL } from '~/utils/site';

export const useRecentPosts = routeLoader$(() => getAllBlogPosts().slice(0, 5));

// "I write" stays together so "I" never ends a line on its own
const headline = ["I’m", 'Maciej.', 'I\u00A0write', 'software,', 'mostly', 'for', 'the', 'web.'];

// index of each word's first letter, so letters stagger across the whole headline
const letterIndex = headline.map((_, i) =>
  headline.slice(0, i).reduce((sum, word) => sum + word.length, 0)
);

const link =
  'decoration-ink/30 hover:decoration-ink underline underline-offset-4 transition-colors';

export default component$(() => {
  const posts = useRecentPosts();

  // Mark the intro as played once it has finished, so client-side navigation
  // back home (or a reload) doesn't replay it this session.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    try {
      if (sessionStorage.getItem('intro')) return;
      sessionStorage.setItem('intro', '1');
    } catch {
      return;
    }
    const timer = setTimeout(() => document.documentElement.classList.add('intro-done'), 3000);
    return () => clearTimeout(timer);
  });

  return (
    <div class="frame">
      <h1
        aria-label={headline.join(' ')}
        class="display max-w-[15ch] pt-28 text-[clamp(3rem,8.5vw,7.5rem)] text-balance md:pt-44"
      >
        {headline.map((word, wi) => (
          <span key={wi} aria-hidden="true">
            <span class="rise-word">
              {[...word].map((ch, ci) => (
                <span key={ci} class="rise-letter" style={{ '--n': letterIndex[wi] + ci }}>
                  {ch}
                </span>
              ))}
            </span>
            {wi < headline.length - 1 && ' '}
          </span>
        ))}
      </h1>

      <div class="col-text intro-fade mt-24 space-y-6 text-xl leading-relaxed md:mt-40">
        <p id="about" class="scroll-mt-12">
          I work as a software developer in Warsaw. I’ve been doing it since 2021, mostly frontend,
          though lately more and more backend too. And I write a lot of my code with AI agents now.
        </p>
        <p class="text-ink-soft">
          Outside of work I like cars, motorbikes, jetskis and anything else fast with an engine.
        </p>
        <p id="contact" class="scroll-mt-12">
          The best way to reach me is{' '}
          <a href="mailto:mszczesny@macez.dev" class={link}>
            email
          </a>
          . I’m also on{' '}
          <a
            href="https://github.com/maciejSzcz"
            target="_blank"
            rel="noopener noreferrer"
            class={link}
          >
            GitHub
          </a>{' '}
          and{' '}
          <a
            href="https://www.linkedin.com/in/maciej-szcz%C4%99sny-a14b55134/"
            target="_blank"
            rel="noopener noreferrer"
            class={link}
          >
            LinkedIn
          </a>
          .
        </p>
      </div>

      {posts.value.length > 0 && (
        <section class="col-text mt-32 md:mt-48">
          <h2 class="label mb-8">Writing</h2>
          <ul class="space-y-6">
            {posts.value.map((post) => (
              <li key={post.slug}>
                <a href={`/blog/${post.slug}/`} class="group block">
                  <span class="text-xl font-medium underline-offset-4 group-hover:underline">
                    {post.title}
                  </span>
                  <time class="text-meta ml-3 tabular-nums" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      timeZone: 'UTC',
                    })}
                  </time>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
});

const title = 'Maciej Szczęsny, Senior Frontend Developer';
const description =
  'Maciej Szczęsny, senior frontend developer in Warsaw. Frontend, some backend, and a lot of work with AI agents.';

export const head: DocumentHead = {
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'author', content: SITE_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'profile' },
    { property: 'og:url', content: `${SITE_URL}/` },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:image', content: DEFAULT_OG_IMAGE },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: "I’m Maciej. I write software, mostly for the web." },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
  ],
  scripts: [
    jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: SITE_NAME,
          inLanguage: 'en',
          publisher: { '@id': `${SITE_URL}/#person` },
        },
        {
          '@type': 'ProfilePage',
          '@id': `${SITE_URL}/#profile`,
          url: `${SITE_URL}/`,
          name: title,
          isPartOf: { '@id': `${SITE_URL}/#website` },
          mainEntity: { '@id': `${SITE_URL}/#person` },
        },
        {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          jobTitle: 'Senior Frontend Developer',
          knowsAbout: ['Frontend development', 'Backend development', 'AI agents'],
          address: { '@type': 'PostalAddress', addressLocality: 'Warsaw', addressCountry: 'PL' },
          sameAs: [
            'https://github.com/maciejSzcz',
            'https://www.linkedin.com/in/maciej-szcz%C4%99sny-a14b55134/',
          ],
        },
      ],
    }),
  ],
};
