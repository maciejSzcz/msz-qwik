export function generateOgImageUrl(slug: string, origin?: string): string {
  if (origin) {
    return `${origin}/og-image/${slug}`;
  }
  return `/og-image/${slug}`;
}
