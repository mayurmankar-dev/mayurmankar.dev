---
title: How to Build a Portfolio Website That Google Can Find
description: What I learned rebuilding mayurmankar.dev, from choosing a domain and hosting to SEO, analytics and security, with a checklist you can follow for your own site.
date: 2026-10-27
tags: [web development, seo, career]
---

My portfolio website hadn't been touched in two years. It still said I was a 4th-year student, it linked to a CV that was two jobs out of date, and it was built on a template whose original author's name was still in the source code. Since then I've graduated from IISER Bhopal and joined Spindle Quantum as a software engineer, so I rebuilt it properly.

This post is everything I learned doing that: why a portfolio site is worth having, what to put on it, how to set it up, and the SEO and security basics that decide whether anyone ever finds it. At the end there's a checklist you can follow for your own site.

## Why have a portfolio website at all?

LinkedIn and GitHub already exist, so why bother? A few reasons:

- **You own it.** Your LinkedIn profile lives inside LinkedIn's layout, rules and algorithm. Your own site shows exactly what you want, in the order you want.
- **It's what comes up when people search your name.** Recruiters and collaborators do search for you. A site at your own domain is the result you control.
- **There's room for depth.** A resume line like "built a vehicle routing engine" becomes a full project write-up with context, decisions and results.
- **It's proof of skill in itself.** For anyone in tech, a fast, well-built site says something about how you work.
- **It ties everything together.** One link that leads to your resume, GitHub, LinkedIn, publications and writing.
- **It gives your writing a home.** A blog on your own domain builds up search visibility over time, which a post on someone else's platform doesn't.

## What to put on it

Keep it simple and current:

- **About:** who you are and what you work on now, in two or three short paragraphs.
- **Work experience and projects:** what you did and why it mattered, not just job titles.
- **Research or publications**, if you have them.
- **Skills:** grouped, so a reader can scan them in seconds.
- **Resume:** a current PDF.
- **Contact:** an email address and your profiles.
- **Blog:** optional, but it's the part that keeps a site alive.

The single biggest mistake is letting it go stale. An out-of-date portfolio is worse than none, because it's the first thing people see. Mine was the proof.

## Choosing how to build and host it

You don't need a framework for a one-page site. Plain HTML and CSS work fine, and that's what my site was for years. Once I wanted a blog, though, hand-editing HTML for every post wasn't going to last.

I moved to **[Astro](https://astro.build)**, a static site generator. I write each post as a Markdown file, and Astro builds the pages, the blog index, an RSS feed and a sitemap automatically. The output is plain HTML, so it's fast and can be hosted almost anywhere for free.

For hosting there are two common free options:

- **GitHub Pages:** the simplest place to start, and where my site lived for years.
- **Cloudflare (Workers or Pages):** also free, and adds redirects, custom headers, analytics and a preview link for every branch. That's what I use now.

Both rebuild and deploy your site automatically whenever you push to GitHub, so you never upload files by hand.

## Get your own domain

A domain with your name in it, like `yourname.dev` or `yourname.com`, costs roughly the price of a few coffees a year, and it's the address you'll keep for life whichever host you use.

Two things I learned while setting up mine:

- **`.dev` domains are HTTPS-only.** Every `.dev` domain is on a list built into browsers that refuses plain HTTP connections. That's great for security, but your site must serve HTTPS from day one. Any modern host does this for free.
- **If your registrar enabled DNSSEC, turn it off before moving your DNS elsewhere.** DNSSEC cryptographically signs your domain's DNS records. If you move to a new DNS provider while the old signature is still registered, many networks will treat your domain as broken. The safe order is: turn DNSSEC off at the registrar, wait an hour, switch nameservers, then turn DNSSEC back on with the new provider.

## One site, one address

Your site is reachable at several addresses: `http://`, `https://`, with and without `www`. To search engines, those can look like four copies of the same site, which splits your ranking between them.

The fix is to pick one main address (I use `https://mayurmankar.dev`) and **permanently redirect (301)** every other version to it:

- `http://` → `https://`
- `www.yourname.dev` → `yourname.dev`, keeping the path, so `www.yourname.dev/blog/` lands on `yourname.dev/blog/`

Then add a canonical tag to every page, so search engines know which address is the original:

```html
<link rel="canonical" href="https://mayurmankar.dev/blog/">
```

## SEO basics that actually matter

You don't need tricks. You need the basics done right on every page:

- **A unique title and description.** These are what Google shows in search results. Keep titles under about 60 characters and descriptions under about 160.
- **A sitemap and a `robots.txt`**, so search engines can find every page:

  ```text
  User-agent: *
  Allow: /

  Sitemap: https://mayurmankar.dev/sitemap-index.xml
  ```

- **Structured data.** A small block of JSON that tells Google who the page is about and links your profiles together:

  ```json
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mayur Mankar",
    "url": "https://mayurmankar.dev",
    "jobTitle": "Software Engineer",
    "sameAs": ["https://github.com/mayurmankar-dev", "https://www.linkedin.com/in/mayurmankar"]
  }
  ```

- **Link previews (Open Graph tags)**, so your link shows a proper title, description and image when shared on LinkedIn or X.
- **Mobile-friendly layout.** My old site was built from fixed-width HTML tables and was barely usable on a phone. Most visitors are on phones, and Google judges your site by its mobile version.
- **Speed.** Google's Core Web Vitals measure how quickly the main content appears, how quickly the page responds to clicks, and how much the layout jumps around while loading. Small images and minimal JavaScript get a portfolio site most of the way there. Resizing my profile photo alone took it from 1.1 MB to 27 KB.
- **Alt text on images**, describing what each image shows.

## Tell search engines your site exists

A new site can sit unnoticed for weeks unless you tell search engines about it:

1. **[Google Search Console](https://search.google.com/search-console).** Add your site as a *Domain* property, which covers every version of it, and verify ownership with a DNS record. Then submit your sitemap.
2. **URL Inspection.** Paste a page's address into Search Console to see whether it's indexed, and click *Request indexing* for important new pages.
3. **[Bing Webmaster Tools](https://www.bing.com/webmasters).** Use the *Import from Search Console* option. It takes one click, and Bing's index also feeds other search engines and AI search tools.

One lesson from this: when I first checked my blog page, Google refused to index it and reported a **"Soft 404"**. The page loaded fine, but it only said "No posts yet", and Google treats near-empty pages as if they don't exist. Publishing real content fixed it. You're reading that fix.

## Know who visits

Analytics tells you which pages people read and how they found you:

- **Cloudflare Web Analytics** (free) counts visits without cookies, so it needs no consent banner.
- **Google Analytics 4** (free) adds detail like engagement and traffic sources, but uses cookies. Google's terms require a privacy policy that says so. Mine is at [/privacy/](/privacy/).

Two tips: load analytics only on your live site, so your own testing doesn't count as visits, and use Google's opt-out browser extension so your own browsing doesn't inflate the numbers.

## Basic security, even for a static site

A portfolio has no logins or databases, but a few settings are still worth the five minutes:

- **HTTPS everywhere**, with HTTP redirected to HTTPS.
- **A minimum of TLS 1.2.** TLS is the encryption behind HTTPS, and versions 1.0 and 1.1 are outdated.
- **Security headers** on every response:

  ```text
  Strict-Transport-Security: max-age=31536000
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  ```

  These tell browsers to only ever use HTTPS for your site, not to guess file types, and not to leak your full page addresses to other sites.

## A workflow you can trust

The habits that made the biggest difference for me were the ones software teams use:

- **Keep the site in git.** Every change is recorded and can be undone.
- **Put settings in code where you can.** My domains, redirects and headers live in config files in the repo, not only in a dashboard. When a setting does live in a dashboard, I write it down in the README.
- **Branch, preview, then merge.** Every change, including this post, goes on a separate branch. Cloudflare builds a private preview link for it, I check it there, and only then merge it to go live.

## Checklist

- [ ] Content: about, experience, projects, skills, current resume, contact
- [ ] Your own domain, served over HTTPS
- [ ] One main address: HTTP and `www` redirect (301) to it, plus a canonical tag on every page
- [ ] Unique title and description on every page
- [ ] Sitemap and `robots.txt`
- [ ] Structured data (`Person`) linking your profiles
- [ ] Link previews (Open Graph tags)
- [ ] Mobile-friendly and fast; optimized images with alt text
- [ ] Google Search Console (Domain property) with the sitemap submitted
- [ ] Bing Webmaster Tools, imported from Search Console
- [ ] Analytics, plus a privacy page if you use cookies
- [ ] Security: TLS 1.2 or higher, and the security headers
- [ ] The site in git, with changes previewed before they go live
- [ ] Keep it updated

None of this is complicated on its own. Doing all of it is what turns a page that exists into a site people actually find.
