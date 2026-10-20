import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages can't send server-side 301s, so Astro emits each of these as a
// static page with an instant meta refresh, noindex, and a canonical to the
// target. Targets end in a slash to match the canonical URLs and avoid a
// second hop through GitHub's trailing-slash redirect.
const redirects = {
  '/midvale-su-casa-food-menu': '/menu/',
  '/midvale-su-casa-food-menu/': '/menu/',
  '/midvale-su-casa-drink-menu': '/menu/',
  '/midvale-su-casa-drink-menu/': '/menu/',
  '/midvale-su-casa-catering': '/catering/',
  '/midvale-su-casa-catering/': '/catering/',
  '/midvale-su-casa-about': '/about/',
  '/midvale-su-casa-about/': '/about/',
  '/midvale-su-casa-events': '/',
  '/midvale-su-casa-events/': '/',
  '/midvale-su-casa-party': '/catering/',
  '/midvale-su-casa-party/': '/catering/',
  '/midvale-su-casa-happy-hours-specials': '/menu/',
  '/midvale-su-casa-happy-hours-specials/': '/menu/',
  '/accessibility-page-01': '/accessibility/',
  '/accessibility-page-01/': '/accessibility/',
  // Oct 2026: removed pages (no alcohol, no happy hour, no current specials)
  '/drinks': '/menu/',
  '/drinks/': '/menu/',
  '/specials': '/menu/',
  '/specials/': '/menu/',
};

const redirectPaths = new Set(Object.keys(redirects).map((path) => path.replace(/\/$/, '')));

export default defineConfig({
  site: 'https://sucasamexicanrestaurant.com',
  integrations: [
    sitemap({
      filter: (page) => !redirectPaths.has(new URL(page).pathname.replace(/\/$/, '')),
    }),
  ],
  redirects,
});
