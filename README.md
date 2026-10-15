# Portfolio Website

A responsive, static portfolio website built with Astro, TypeScript, and Tailwind CSS. It includes Home, About, Projects, Blog, CV, Contact, and 404 pages, with content managed through configuration files and Markdown.

## Requirements

- Node.js 22.12.0 or later
- npm 9.6.5 or later

## Getting Started

From the project folder, install dependencies and start the development server:

```sh
npm ci
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:4321`. Changes update automatically while the server is running.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run check` | Validate Astro and TypeScript files. |
| `npm run build` | Generate the production website in `dist/`. |
| `npm run verify` | Check generated pages, local links, metadata, and draft exclusion after building. |
| `npm run preview` | Preview the production build locally. |

Before deploying, run:

```sh
npm run check
npm run build
npm run verify
npm run preview
```

## Customization

| Content | Location |
| --- | --- |
| Profile, navigation, contact links, and photo/CV settings | `src/config/site.ts` |
| Experience and teaching roles | `src/data/experience.ts` |
| Project entries | `src/content/projects/` |
| Blog posts | `src/content/blog/` |
| Content metadata rules | `src/content.config.ts` |
| Page templates | `src/pages/` |
| Shared components and layouts | `src/components/` and `src/layouts/` |
| Colors, typography, spacing, and motion | `src/styles/global.css` |
| Images, fonts, and downloadable files | `public/` |

To add a project or blog post, copy an existing Markdown file in the appropriate content folder and update its metadata and body. Keep blog posts marked `draft: true` until ready to publish; drafts appear in development and are excluded from production.

To use a profile photo, add an image to `public/` and set its path in `src/config/site.ts`. Replace `public/cv.pdf` to update the downloadable CV, or set `cv.available` to `false` to disable it. Files in `public/` are included in the production build.

## Deployment

The production build in `dist/` can be hosted by a static hosting provider.

A GitHub Pages workflow is included at `.github/workflows/deploy.yml`. Choose **GitHub Actions** as the deployment source in the repository's Pages settings. The workflow checks, builds, verifies, and deploys the website when changes are pushed to `main` or the workflow is started manually.

Optional settings:

| Variable | Purpose | Example |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | Production origin, without a repository path. | `https://example.com` |
| `PUBLIC_BASE_PATH` | Path where the website is hosted. | `/` or `/portfolio/` |

Local development needs no environment variables. To test deployment settings locally, copy `.env.example` to `.env`, uncomment the relevant values, and restart or rebuild. Use the same settings for `build` and `verify`. For a subpath, open the matching local URL, such as `http://localhost:4321/portfolio/`.

GitHub Actions derives the default Pages URL and base path from the repository. For overrides or a custom domain, set both variables in the repository's Actions variables. A production origin enables canonical URLs and sitemap generation.

## Credits

The visual design takes inspiration from [Maryam Rezaee's portfolio](https://maryamrezaee.me/). The project includes locally hosted fonts and original project illustrations.
