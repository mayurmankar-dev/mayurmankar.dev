import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mayurmankar.dev',
  // Keep source whitespace so spaces around links aren't dropped.
  compressHTML: false,
  integrations: [sitemap()],
});
