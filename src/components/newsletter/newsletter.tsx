import { component$ } from '@builder.io/qwik';
import { Form, type ActionStore } from '@builder.io/qwik-city';

interface NewsletterProps {
  action: ActionStore<
    { success?: boolean; message?: string; failed?: boolean },
    { email: string },
    false
  >;
}

export const Newsletter = component$<NewsletterProps>(({ action }) => {
  return (
    <Form action={action}>
      <label for="newsletter-email" class="text-ink-soft block">
        Get new posts by email.
      </label>
      <div class="mt-3 flex items-end gap-4">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          class="border-ink/25 placeholder:text-meta focus:border-ink min-w-0 flex-1 border-b bg-transparent py-2 text-base outline-none"
        />
        <button
          type="submit"
          class="hover:border-ink border-b border-transparent py-2 text-base font-medium transition-[transform,border-color] duration-150 ease-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={action.isRunning}
        >
          {action.isRunning ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      <p aria-live="polite" class="mt-3 min-h-6 text-sm">
        {action.value?.success && <span class="message-in">{action.value.message}</span>}
        {action.value?.failed && (
          <span class="message-in text-red-700">
            {action.value.message || 'Something went wrong. Please try again.'}
          </span>
        )}
      </p>
    </Form>
  );
});
