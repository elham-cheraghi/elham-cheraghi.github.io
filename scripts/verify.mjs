import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import config from '../astro.config.mjs';

// Run after building, with the same PUBLIC_SITE_URL and PUBLIC_BASE_PATH values.
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map(async (entry) => {
    const path = `${directory}/${entry.name}`;
    return entry.isDirectory() ? walk(path) : [path];
  }));
  return groups.flat();
}

const files = new Set((await walk('dist')).map((file) => file.slice(5)));
const htmlFiles = [...files].filter((file) => file.endsWith('.html'));
const documents = new Map(await Promise.all(htmlFiles.map(async (file) => [file, await readFile(`dist/${file}`, 'utf8')])));
const base = config.base;
const origin = new URL(config.site ?? 'https://local.invalid').origin;
const titles = new Set();
const descriptions = new Set();
let checkedLinks = 0;

function decode(value) {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/\s([\w:-]+)=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map((match) => [match[1], decode(match[2] ?? match[3] ?? match[4]) ]));
}

function pageURL(file) {
  return new URL(`${base}${file.replace(/index\.html$/, '')}`, origin);
}

function checkLink(reference, from) {
  if (!reference) return;
  const url = new URL(decode(reference), pageURL(from));
  if (url.origin !== origin) return;
  assert.ok(url.pathname.startsWith(base), `${from}: link escapes base ${base}: ${reference}`);
  const path = decodeURIComponent(url.pathname.slice(base.length));
  const candidates = [path, `${path}${path && !path.endsWith('/') ? '/' : ''}index.html`];
  const target = candidates.find((candidate) => files.has(candidate));
  assert.ok(target, `${from}: missing target ${reference}`);
  if (url.hash && documents.has(target)) {
    const ids = [...documents.get(target).matchAll(/\sid=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
      .map((match) => decode(match[1] ?? match[2] ?? match[3]));
    assert.ok(ids.includes(decodeURIComponent(url.hash.slice(1))), `${from}: missing fragment ${reference}`);
  }
  checkedLinks++;
}

for (const path of ['index.html', 'about/index.html', 'projects/index.html', 'blog/index.html', 'cv/index.html', 'contact/index.html', '404.html', 'robots.txt']) {
  assert.ok(files.has(path), `Missing required output: ${path}`);
}

for (const [file, html] of documents) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map((match) => attributes(match[0]));
  const description = tags.find((tag) => tag.name === 'description')?.content;
  assert.ok(title && !titles.has(title), `${file}: missing or repeated title`);
  assert.ok(description && !descriptions.has(description), `${file}: missing or repeated description`);
  titles.add(title);
  descriptions.add(description);
  const canonical = tags.find((tag) => tag.rel === 'canonical')?.href;
  assert.equal(canonical, config.site ? pageURL(file).href : undefined, `${file}: incorrect canonical URL`);
  if (config.site) {
    assert.equal(tags.find((tag) => tag.property === 'og:url')?.content, canonical, `${file}: incorrect social URL`);
    const socialImage = tags.find((tag) => tag.property === 'og:image')?.content;
    assert.ok(socialImage, `${file}: missing social image`);
    checkLink(socialImage, file);
  }
  for (const match of html.matchAll(/<[a-z][^>]*>/gi)) {
    const tag = attributes(match[0]);
    for (const reference of [tag.href, tag.src, tag.poster]) checkLink(reference, file);
  }
}

for (const file of [...files].filter((path) => path.endsWith('.css'))) {
  const css = await readFile(`dist/${file}`, 'utf8');
  for (const match of css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) checkLink(match[1], file);
}

const profile = await readFile('src/config/site.ts', 'utf8');
if (files.has('cv.pdf') && /cv:\s*\{\s*available:\s*true/.test(profile)) {
  const cvLinks = [...documents.get('cv/index.html').matchAll(/<a\b[^>]*>/g)].map((match) => attributes(match[0]));
  assert.ok(cvLinks.some((link) => link.href === `${base}cv.pdf`), 'Available CV must have a working view/download link');
}

for (const file of (await walk('src/content/blog')).filter((path) => path.endsWith('.md'))) {
  const markdown = await readFile(file, 'utf8');
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  if (!/^draft:\s*true\s*$/m.test(frontmatter)) continue;
  const id = file.replace('src/content/blog/', '').replace(/\.md$/, '');
  assert.ok(!files.has(`blog/${id}/index.html`), `Draft was published: ${id}`);
  const title = frontmatter.match(/^title:\s*(.+)$/m)?.[1].replace(/^['"]|['"]$/g, '');
  for (const [page, html] of documents) assert.ok(!title || !decode(html).includes(title), `${page}: contains draft title ${title}`);
}

const robots = await readFile('dist/robots.txt', 'utf8');
if (config.site) {
  assert.ok(files.has('sitemap-index.xml'), 'Missing sitemap index');
  assert.ok(robots.includes(new URL(`${base}sitemap-index.xml`, origin).href), 'robots.txt has no matching sitemap URL');
  for (const file of [...files].filter((path) => /^sitemap.*\.xml$/.test(path))) {
    const xml = await readFile(`dist/${file}`, 'utf8');
    for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
      assert.ok(!/\/404(?:\.html|\/)/.test(match[1]), '404 must be excluded from the sitemap');
      checkLink(match[1], file);
    }
  }
}

console.log(`Verified ${htmlFiles.length} pages and ${checkedLinks} local references at base ${base}; metadata, draft exclusion, and sitemap checks passed.`);
