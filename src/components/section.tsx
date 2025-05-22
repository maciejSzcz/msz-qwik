import { Slot, component$ } from '@builder.io/qwik';

interface SectionProps {
  id?: string;
  class?: string;
}

export const Section = component$<SectionProps>(({ id, class: className }) => {
  return (
    <section id={id} class={`flex min-h-screen w-full items-center px-6 ${className || ''}`}>
      <div class="mx-auto w-full max-w-5xl px-4">
        <Slot />
      </div>
    </section>
  );
});
