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

## Infrastructure

Pushing to `main` triggers Cloudflare Workers Builds (`npm run build`, then `npx wrangler deploy`). The Worker name, custom domains (`mayurmankar.dev`, `www.mayurmankar.dev`) and disabled `workers.dev` URL are all in `wrangler.jsonc`.
Security headers (`nosniff`, `Referrer-Policy`, HSTS) are set for every response in `public/_headers`.

Settings that live outside the repo:

| Where | Setting |
|---|---|
| Spaceship (registrar) | Nameservers point to Cloudflare; DNSSEC DS record from Cloudflare (key tag 2371) |
| Cloudflare → DNS → Settings | DNSSEC enabled |
| Cloudflare → Rules → Redirect Rules | "Redirect www to root": `https://www.*` → `https://${1}`, 301, preserve query string |
| Cloudflare → SSL/TLS → Edge Certificates | Always Use HTTPS on; minimum TLS 1.2; Certificate Transparency monitoring on |
| Cloudflare → Web Analytics | Site `mayurmankar.dev`, JS snippet mode (token in `src/consts.ts`) |
| Google Analytics 4 | Account "Mayur Mankar", property `mayurmankar.dev`, stream ID in `src/consts.ts` |
| Google Search Console | Domain property `mayurmankar.dev`; sitemap `https://mayurmankar.dev/sitemap-index.xml` submitted |
