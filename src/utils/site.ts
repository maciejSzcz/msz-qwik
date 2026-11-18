export const SITE_URL = 'https://macez.dev';
export const SITE_NAME = 'Maciej Szczęsny';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.png`;

export const ogImageUrl = (slug: string) => `${SITE_URL}/og/${slug}.png`;

// Serialized into <script type="application/ld+json"> via DocumentHead.scripts.
// `<` is escaped so a "</script>" in a title can't close the tag early.
export const jsonLd = (data: object) => ({
  script: JSON.stringify(data).replace(/</g, '\\u003c'),
  props: { type: 'application/ld+json' },
});
