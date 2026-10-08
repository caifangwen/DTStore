import assert from 'node:assert/strict';

const origin = 'https://friwind.myshopify.com';
let cookie = '';
const password = process.env.FRIWIND_STOREFRONT_PASSWORD;
if (password) {
  const response = await fetch(origin + '/password', {
    method: 'POST',
    redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ form_type: 'storefront_password', utf8: '✓', password }),
  });
  cookie = response.headers.getSetCookie().map(value => value.split(';')[0]).join('; ');
  assert(response.status >= 200 && response.status < 400 && cookie, 'Storefront login failed');
}

async function page(path) {
  const response = await fetch(origin + path, { headers: { Cookie: cookie } });
  assert.equal(response.status, 200, path);
  assert(!new URL(response.url).pathname.startsWith('/password'), password ? 'Shopify rejected the storefront password' : 'Set FRIWIND_STOREFRONT_PASSWORD to check this store');
  const html = await response.text();
  assert(!html.includes('Liquid error'), 'Liquid render error on ' + path);
  return html;
}

const catalog = await page('/collections');
assert(catalog.includes('Find your everyday favourites'), 'Catalog banner is missing');
const collection = await page('/collections/all');
assert(collection.includes('Explore the collection'), 'Collection banner is missing');
assert(collection.includes('facets-vertical'), 'Desktop filter sidebar is missing');
assert(collection.includes('FacetFiltersFormMobile'), 'Mobile filter drawer is missing');
const filterNames = [...new Set([...collection.matchAll(/name="(filter\.[^"]+)"/g)].map(match => match[1]))];
assert(filterNames.length > 0, 'Enable filter fields in Shopify Search & Discovery');
if (filterNames.includes('filter.v.price.gte')) {
  const filtered = await page('/collections/all?filter.v.price.gte=99999999');
  assert(!/<div[^>]*class="[^"]*\bproduct-card-wrapper\b/.test(filtered), 'Price filter did not remove products');
}

const titles = {
  "about": "About Us",
  "contact": "Contact Us",
  "faq": "Frequently Asked Questions",
  "shipping": "Shipping Information",
  "returns": "Returns & Exchanges",
  "brand-story": "Our Story",
  "buying-guide": "Buying Guide",
  "care-guide": "Care & Use",
  "order-help": "Order Help",
  "article-categories": "Article Categories"
};
for (const [handle, title] of Object.entries(titles)) {
  const html = await page('/pages/' + handle);
  const escaped = title.replaceAll('&', '&amp;');
  assert(html.includes(title) || html.includes(escaped), 'English title missing: ' + handle);
  assert(html.includes('/pages/article-categories'), 'Category footer link is missing');
}
const articles = JSON.parse(await (await import('node:fs/promises')).readFile(new URL('../content/journal.json', import.meta.url), 'utf8'));
const allArticles = await page('/blogs/news');
assert((allArticles.match(/blog-articles__article article/g) || []).length >= 3, 'Expected at least three journal articles');
for (const [handle, title] of [["buying-guides","Buying Guides"],["care-use","Care & Use"],["brand-stories","Brand Stories"]]) {
  const html = await page('/blogs/news/tagged/' + handle);
  assert((html.match(/blog-articles__article article/g) || []).length > 0, title + ' should show matching articles');
  for (const article of articles) {
    const matches = article.tag === title;
    assert.equal(html.includes('/blogs/news/' + article.handle), matches, 'Incorrect category result: ' + article.handle);
  }
  const nav = html.match(/<nav class="blog-category-nav"[\s\S]*?<\/nav>/)?.[0] || '';
  assert(nav.includes('tagged/' + handle + '" class="button button--secondary" aria-current="page"'), 'Active category is missing: ' + handle);
}
const empty = await page('/blogs/news/tagged/no-matching-category');
assert(empty.includes('No articles in this category yet.'), 'Empty category message is missing');
console.log('Passed: catalog banners, native filters, English pages, footer links, article categories, and empty state.');
console.log('Available filters: ' + filterNames.join(', '));
