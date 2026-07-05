import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sucasamexicanrestaurant.com',
  // Keep URLs canonical and consistent: every page is served at a single
  // trailing-slash URL. This matches the sitemap + canonical tags Astro emits
  // in directory build mode and stops GitHub Pages from 301-redirecting
  // internal links (which Search Console reports as "Page with redirect").
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('midvale-su-casa-') && !page.includes('accessibility-page-'),
    }),
  ],
  redirects: {
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
  },
});
