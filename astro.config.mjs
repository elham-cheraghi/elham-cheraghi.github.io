import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), 'PUBLIC_');
const [owner, repository] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const configuredSite = env.PUBLIC_SITE_URL?.trim();
const site = configuredSite || (owner && repository ? `https://${owner.toLowerCase()}.github.io` : undefined);

if (site) {
  const url = new URL(site);
  if (!['https:', 'http:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('PUBLIC_SITE_URL must be an origin such as https://yourname.github.io. Set a subpath separately with PUBLIC_BASE_PATH.');
  }
}

const githubBase = owner && repository && repository.toLowerCase() !== `${owner.toLowerCase()}.github.io`
  ? `/${repository}/`
  : '/';
const requestedBase = env.PUBLIC_BASE_PATH?.trim() || (configuredSite ? '/' : githubBase);
const baseSegments = requestedBase.replace(/^\/+|\/+$/g, '');
const base = baseSegments ? `/${baseSegments}/` : '/';

if (/[?#\\]/.test(base) || base.includes('//') || base.split('/').some((segment) => segment === '.' || segment === '..')) {
  throw new Error('PUBLIC_BASE_PATH must be a URL path such as / or /portfolio/.');
}

export default defineConfig({
  output: 'static',
  site,
  base,
  trailingSlash: 'always',
  compressHTML: true,
  integrations: site ? [sitemap()] : [],
  vite: { plugins: [tailwindcss()] },
});
