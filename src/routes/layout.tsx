import { component$, Slot } from '@builder.io/qwik';
import { type DocumentHead, routeAction$, useLocation, z, zod$ } from '@builder.io/qwik-city';
import { Resend } from 'resend';
import { Newsletter } from '../components/newsletter/newsletter';

export const useNewsletterSignup = routeAction$(
  async (data, { env, fail }) => {
    const apiKey = env.get('RESEND_API_KEY');
    if (!apiKey) {
      return fail(500, {
        message: 'Newsletter service is not configured properly.',
      });
    }

    const resend = new Resend(apiKey);
    const audienceId = env.get('RESEND_AUDIENCE_ID');

    try {
      // 1. Add to Audience (if ID is provided)
      if (audienceId) {
        await resend.contacts.create({
          email: data.email,
          audienceId: audienceId,
        });
      }

      // 2. Send Welcome Email
      await resend.emails.send({
        from: 'Maciej Szczęsny <newsletter@maciejszczesny.com>', // Update this with your verified domain
        to: data.email,
        subject: 'Welcome to the newsletter!',
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h1>Welcome!</h1>
            <p>Thanks for subscribing to my newsletter. I'm excited to share my latest updates with you.</p>
            <p>Best,<br/>Maciej</p>
          </div>
        `,
      });

      return {
        success: true,
        message: 'Successfully subscribed!',
      };
    } catch (error) {
      console.error('Newsletter error:', error);
      return fail(500, {
        message: 'Failed to subscribe. Please try again later.',
      });
    }
  },
  zod$({
    email: z.string().email(),
  })
);

// Hidden until Resend is configured (API key, audience, verified sender domain)
const SHOW_NEWSLETTER = false;

export default component$(() => {
  const newsletterAction = useNewsletterSignup();
  const { url } = useLocation();

  // Blog pages get a back link instead of nav: post -> blog, blog -> home
  const path = url.pathname.replace(/\/$/, '');
  const back =
    path === '/blog'
      ? { href: '/', label: 'Home' }
      : path.startsWith('/blog/')
        ? { href: '/blog', label: 'Blog' }
        : null;

  return (
    <div class="flex min-h-screen flex-col">
      <header class="frame flex items-baseline justify-between pt-8 md:pt-10">
        {back ? (
          <a href={back.href} class="text-ink-soft hover:text-ink transition-colors">
            ← {back.label}
          </a>
        ) : (
          <>
            <span />
            <a href="/blog" class="text-ink-soft hover:text-ink transition-colors">
              Blog
            </a>
          </>
        )}
      </header>

      <main class="flex-1">
        <Slot />
      </main>

      <footer class="frame pt-40 pb-12 md:pt-56">
        <div class="col-text">
          {SHOW_NEWSLETTER && (
            <div class="mb-24">
              <Newsletter action={newsletterAction} />
            </div>
          )}
          <p class="label">© {new Date().getFullYear()} Maciej Szczęsny</p>
        </div>
      </footer>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Maciej Szczęsny - Software Developer',
  meta: [
    {
      name: 'description',
      content: 'Maciej Szczęsny, senior frontend developer in Warsaw.',
    },
  ],
};
