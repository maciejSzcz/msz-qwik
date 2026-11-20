import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { SITE_NAME } from '~/utils/site';

export default component$(() => {
  return (
    <div class="frame">
      <h1 class="display pt-28 text-[clamp(3rem,8.5vw,7.5rem)] md:pt-44">Not found</h1>

      <p class="col-text mt-24 text-xl leading-relaxed md:mt-40">
        There’s nothing at this address. Try the{' '}
        <a
          href="/"
          class="decoration-ink/30 hover:decoration-ink underline underline-offset-4 transition-colors"
        >
          home page
        </a>{' '}
        or the{' '}
        <a
          href="/blog/"
          class="decoration-ink/30 hover:decoration-ink underline underline-offset-4 transition-colors"
        >
          blog
        </a>
        .
      </p>
    </div>
  );
});

export const head: DocumentHead = {
  title: `Not found | ${SITE_NAME}`,
  meta: [{ name: 'robots', content: 'noindex' }],
};
