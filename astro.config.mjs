import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import sitemap from '@astrojs/sitemap';

// True when at least one published post exists (not a _file, not draft: true).
// While the blog is empty, /blog/ is noindex and left out of the sitemap, so Google
// doesn't report it as a soft 404. Publishing the first post switches both back on.
const blogDir = './src/content/blog';
const hasPosts = fs
  .readdirSync(blogDir)
  .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  .some((f) => !/^draft:\s*true/m.test(fs.readFileSync(`${blogDir}/${f}`, 'utf8')));

export default defineConfig({
  site: 'https://mayurmankar.dev',
  // Keep source whitespace so spaces around links aren't dropped.
  compressHTML: false,
  integrations: [sitemap({ filter: (page) => hasPosts || !page.endsWith('/blog/') })],
});
