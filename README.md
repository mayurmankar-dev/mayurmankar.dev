# mayurmankar.dev

Personal website and blog, built with [Astro](https://astro.build) and deployed to Cloudflare Workers on every push to `main`.

## Write a blog post

1. Copy `src/content/blog/_template.md` to a new file, e.g. `src/content/blog/my-first-post.md`.
   The file name becomes the URL: `https://mayurmankar.dev/blog/my-first-post/`.
2. Fill in `title`, `description` and `date`, write the post in Markdown, and remove `draft: true` when it's ready.
3. Put images in `public/images/blog/` and reference them as `/images/blog/name.png`.
4. Commit and push. Cloudflare rebuilds the site; the post appears on `/blog/`, the homepage, the RSS feed and the sitemap.

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321, shows drafts too
npm run build    # production build into dist/
```

## Layout

- `src/pages/index.astro`: homepage
- `src/pages/blog/`: blog list and post pages
- `src/layouts/Base.astro`: shared `<head>` (SEO tags, Google Analytics)
- `src/consts.ts`: site title, description, Google Analytics ID
- `public/`: static files (images, resume, stylesheet)
- `wrangler.jsonc`: Cloudflare deploy config
