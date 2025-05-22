import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <article class="mx-auto max-w-3xl px-8 py-12 mt-24 shadow-2xl shadow-neutral-100/5 rounded-2xl bg-neutral-900/70">
      <div class="prose prose-lg prose-slate dark:prose-invert max-w-none">
        <Slot />
      </div>
    </article>
  );
});
