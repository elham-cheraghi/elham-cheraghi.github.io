# Elham Cheraghi’s portfolio

A static Astro, TypeScript, and Tailwind CSS portfolio with Home, About, Projects, Blog, CV, Contact, and 404 pages. Content stays in plain files; no server or database is needed. Nothing has been published or configured in DNS.

The original visual design takes inspiration from [Maryam Rezaee’s portfolio](https://maryamrezaee.me/), with locally hosted fonts and original project illustrations.

## 1. Install and preview

Install **Node.js 24 LTS** (minimum supported version: 22.12), which includes npm. Open a terminal in this folder:

```sh
npm ci
npm run dev
```

Open the local address shown in the terminal, usually `http://localhost:4321`. Edits update the preview automatically. Press `Ctrl+C` to stop it.

Before publishing:

```sh
npm run check
npm run build
npm run verify
npm run preview
```

`check` validates Astro and TypeScript; `build` creates the website in `dist/`; `verify` checks the generated pages, local links, metadata, and draft exclusion; `preview` serves that production build locally. Run `build` and `verify` with the same site/base settings. Use npm consistently and keep `package-lock.json` in the repository.

## 2. Edit your content

| What to change | File |
| --- | --- |
| Name, biography, email, social links, education, interests, skills, navigation, photo/CV settings | `src/config/site.ts` |
| Experience and teaching roles | `src/data/experience.ts` |
| Project descriptions and details | `src/content/projects/*.md` |
| Blog posts | `src/content/blog/*.md` |
| Main colors, fonts, spacing, and motion styles | `src/styles/global.css` |
| Metadata rules for projects and posts | `src/content.config.ts` |

Keep the existing TypeScript punctuation when editing the configuration. Shared information updates wherever the website uses it. Only add claims and links you can support.

The website uses **Elham Cheraghi**, as confirmed. The supplied CV PDF still uses **Zahra Cheraghi**; replace it with your preferred public version before publishing. No photo was supplied, so the About page uses an original monogram illustration. The blog has no invented published articles; its example is a draft.

## 3. Replace your photo or CV

**Photo:** save an optimized square image as `public/photo.webp` (600 × 600 pixels is a good size), then change `photo: null` to `photo: '/photo.webp'` in `src/config/site.ts`. The filename can differ if you update that setting. The About page reserves image space to prevent layout shifts.

**CV:** replace `public/cv.pdf` with your new PDF, using the same filename. No page edits are needed. If you remove it, set `cv.available` to `false` in `src/config/site.ts` so the CV page shows an honest placeholder.

Files inside `public/` are included in the deployed website. Review the PDF itself for home addresses, birth dates, identification details, and any other information you do not want public. The original local CV sources are ignored by Git.

## 4. Add a project or blog post

Create a file with a short, lowercase filename; the filename becomes its URL. Markdown is ordinary text with headings and links. Copy an existing file if that is easier.

For example, add `src/content/projects/my-project.md`:

```md
---
title: My project
description: A short, accurate summary of what I built.
technologies: [Python, NumPy]
category: Machine Learning
featured: true
visual: search
order: 5
---

## What I built

Describe the problem, your contribution, and what you learned.
```

Required project metadata: `title`, `description`, `technologies`, and `category`. Optional: `year` (a number), `featured` (show on Home), `repository` and `demo` (full URLs), `visual` (`pathways`, `search`, `sensors`, or `logic`), and `order` (lower numbers appear first). Leave unavailable links out. The card and individual project page are created automatically.

For a post, add `src/content/blog/my-first-post.md`:

```md
---
title: My first post
description: A short summary for readers and search results.
pubDate: 2026-10-15
tags: [Machine Learning]
draft: true
---

Write your article here.
```

Required post metadata: `title`, `description`, and `pubDate` (`YYYY-MM-DD`). `tags` and `draft` are optional. Drafts appear during `npm run dev`, clearly labeled, and are excluded from production listings, article routes, and sitemap. Review your post and change `draft` to `false` to publish it. The production preview intentionally hides drafts. Keep or delete `example-draft.md` as you prefer.

## 5. Publish with GitHub Pages when ready

These are instructions for a later deployment; no repository has been published for you.

1. Create a **public** GitHub repository for free GitHub Pages hosting and upload this project, including the lockfile and `.github/workflows/deploy.yml`. Keep the source on a branch named `main`; do not upload `node_modules/` or `dist/`.
2. In the repository, open **Settings → Pages → Build and deployment**, then choose **GitHub Actions** as the source.
3. Commit and push to `main`, or open **Actions → Deploy to GitHub Pages → Run workflow**. The workflow installs dependencies, runs the checks, builds, and deploys. Its Pages link appears when it succeeds.

The workflow automatically detects both supported GitHub URL formats when repository variables are blank:

| Repository | Website URL | Astro base |
| --- | --- | --- |
| `elham-cheraghi.github.io` | `https://elham-cheraghi.github.io/` | `/` |
| `portfolio` | `https://elham-cheraghi.github.io/portfolio/` | `/portfolio/` |

To override the defaults, use **Settings → Secrets and variables → Actions → Variables → New repository variable**:

- `PUBLIC_SITE_URL`: the origin only, such as `https://elham-cheraghi.github.io` or `https://www.example.com`; no repository path.
- `PUBLIC_BASE_PATH`: `/` for a username site/custom domain, or `/portfolio/` for that repository’s subpath.

Set both when overriding a repository subpath; a configured site URL defaults to the root base. These are public settings, not secrets. Production URLs enable canonical links, sharing-image URLs, the sitemap, and the sitemap location in `robots.txt`.

To test the same settings locally, copy `.env.example` to `.env`, uncomment and edit the two settings, then restart the dev server or rebuild. `.env` is ignored by Git; GitHub Actions uses the repository variables above. With no production URL, local previews omit production canonical URLs and sitemap rather than assuming a domain. When testing a subpath, open the matching local URL, such as `http://localhost:4321/portfolio/`.

## 6. Connect a custom domain later

Once you own a domain and are ready to use it:

1. Add the domain under **Settings → Pages → Custom domain**, and save it before changing DNS.
2. At your domain provider, point a `www` or other subdomain’s **CNAME** to `elham-cheraghi.github.io` (without `https://` or a repository path). For an apex domain such as `example.com`, follow GitHub’s current [DNS instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for `ALIAS`/`ANAME` or `A` records.
3. Set repository variables `PUBLIC_SITE_URL=https://www.example.com` (your actual chosen domain) and `PUBLIC_BASE_PATH=/`, then run the workflow again.
4. Wait for DNS and GitHub’s certificate, then select **Enforce HTTPS** in Pages settings. See [GitHub’s HTTPS guide](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

This project deploys through a custom Actions workflow, so a `CNAME` file is not required. Keep the configured domain, DNS, and `PUBLIC_SITE_URL` consistent. Domain registration is optional; the default `github.io` address works without purchasing a domain.

## 7. Make future updates

Edit the relevant content files, preview locally, and run `npm run check`, `npm run build`, and `npm run verify`. Commit and push the changes to `main`. GitHub Actions rebuilds and replaces the live site automatically; check the **Actions** tab if an update fails. Editing a file on GitHub and committing to `main` triggers the same workflow.

Before the first publication, review the public CV, email/social links, and project content. A personal photo is optional. Live deployment and domain/HTTPS behavior can only be verified after you choose to publish.

## Verification of this first version

Astro checks passed with zero errors, warnings, or hints. Production builds and the output audit passed for local preview, a GitHub Pages username site, and a repository subpath. The audit checked all 11 generated pages, links/assets, metadata, CV links, draft exclusion, robots, and sitemap files. Chrome checks covered desktop (1440px), mobile (390px and 320px), keyboard menu activation and Escape, project pages, the PDF links, contact links, the local draft article, and the production 404. Reduced-motion handling and the static content fallback were reviewed in source; operating-system motion settings and a screen reader were not exercised. No live deployment or DNS changes were made.
