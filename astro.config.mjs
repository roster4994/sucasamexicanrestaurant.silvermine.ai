import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sucasamexicanrestaurant.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('midvale-su-casa-') && !page.includes('accessibility-page-'),
    }),
  ],
  redirects: {
    '/midvale-su-casa-food-menu': '/menu',
    '/midvale-su-casa-food-menu/': '/menu',
    '/midvale-su-casa-drink-menu': '/menu',
    '/midvale-su-casa-drink-menu/': '/menu',
    '/midvale-su-casa-catering': '/catering',
    '/midvale-su-casa-catering/': '/catering',
    '/midvale-su-casa-about': '/about',
    '/midvale-su-casa-about/': '/about',
    '/midvale-su-casa-events': '/',
    '/midvale-su-casa-events/': '/',
    '/midvale-su-casa-party': '/catering',
    '/midvale-su-casa-party/': '/catering',
    '/midvale-su-casa-happy-hours-specials': '/menu',
    '/midvale-su-casa-happy-hours-specials/': '/menu',
    '/accessibility-page-01': '/accessibility',
    '/accessibility-page-01/': '/accessibility',
  },
});
