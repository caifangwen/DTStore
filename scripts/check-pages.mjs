import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = path => JSON.parse(fs.readFileSync(path, 'utf8').replace(/^\s*\/\*[\s\S]*?\*\/\s*/, ''));
const handles = ['about','contact','faq','shipping','returns','brand-story','buying-guide','care-guide','order-help','article-categories','help-center','site-map','policies'];
for (const file of fs.readdirSync('templates', { recursive: true }).filter(name => name.endsWith('.json'))) {
  const template = read('templates/' + file);
  for (const section of Object.values(template.sections)) assert(fs.existsSync('sections/' + section.type + '.liquid'), file + ': missing section ' + section.type);
  for (const id of template.order) assert(template.sections[id], file + ': invalid section order ' + id);
}
const footer = JSON.stringify(read('sections/footer-group.json'));
for (const handle of handles) {
  assert(fs.existsSync('templates/page.' + handle + '.json'), 'Missing template: ' + handle);
  assert(footer.includes('/pages/' + handle), 'Missing footer link: ' + handle);
}
console.log('PASS local: template section references and 13 page/footer entries');
if (!process.argv.includes('--live')) process.exit(0);
const origin = new URL((await fetch('https://friwind.myshopify.com/', { signal: AbortSignal.timeout(30000) })).url).origin;
const cookies = new Map();
async function request(path, options = {}) {
  const response = await fetch(origin + path, { ...options, signal: AbortSignal.timeout(30000), headers: { Cookie: [...cookies].map(([k,v]) => k + '=' + v).join('; '), ...options.headers } });
  for (const value of response.headers.getSetCookie()) {
    const pair = value.split(';')[0], split = pair.indexOf('=');
    cookies.set(pair.slice(0,split),pair.slice(split+1));
  }
  return response;
}
if (process.env.FRIWIND_STOREFRONT_PASSWORD) {
  await request('/password', {method:'POST',redirect:'manual',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({form_type:'storefront_password',utf8:'✓',password:process.env.FRIWIND_STOREFRONT_PASSWORD})});
}
async function page(path, status=200) {
  const response = await request(path);
  assert.equal(response.status,status,path);
  assert(!new URL(response.url).pathname.startsWith('/password'),'Storefront password required or rejected');
  const html = await response.text();
  assert(!html.includes('Liquid error'),path + ': Liquid error');
  return html;
}
const home = await page('/');
assert(home.includes('friwind-wordmark'),'Homepage hero missing');
for (const handle of handles) {
  const html = await page('/pages/' + handle);
  assert(/<h1[\s>]/.test(html),handle + ': title missing');
  if(handle==='help-center') assert(html.includes('Before you buy'),'Help center content missing');
  if(handle==='site-map') assert(html.includes('Customer support'),'Site map content missing');
  if(handle==='policies') assert(html.includes('Browse the published policies'),'Policy directory missing');
}
console.log('PASS live: home and 13 published pages render without Liquid errors');
const contact=await page('/pages/contact');
assert(contact.includes('contact[email]') && /<textarea[\s\S]*?name="contact\[[^\]]+\]"/.test(contact),'Contact form fields missing');
const catalog=await page('/collections/all');
assert(catalog.includes('FacetFiltersFormMobile') && catalog.includes('facets-vertical'),'Native filters missing');
const search=await page('/search?q=friwind-no-match-927406&type=product');
assert(search.includes('Search'),'Search page missing');
await page('/cart');
await page('/friwind-page-that-does-not-exist-927406',404);
console.log('PASS live: contact fields, filters, search, cart and real 404');
const journal=await page('/blogs/news');
assert(journal.includes('blog-category-nav'),'Journal category navigation missing');
for(const tag of ['buying-guides','care-use','brand-stories']) {
  const html=await page('/blogs/news/tagged/'+tag);
  assert(html.includes('blog-articles__article article'),'Empty published category: '+tag);
  const nav=html.match(/<nav\b[^>]*class="blog-category-nav"[\s\S]*?<\/nav>/)?.[0]||'';
  assert(new RegExp('tagged/'+tag+'"[^>]*aria-current="page"').test(nav),'Category active state missing: '+tag);
}
console.log('PASS live: journal category pages and active states');
const response = await request('/products.json?limit=10');
assert.equal(response.status,200,'Product feed');
const {products}=await response.json();
assert(products.length,'No products to inspect');
const product=products[0];
const html=await page('/products/'+product.handle);
assert(html.includes('product-form'),'Product form missing');
console.log('PASS live: actual product detail and native purchase form');
console.log('NOT TESTED: payment, order creation/refund, authenticated customer data, submitted contact email, and visual/mobile interaction.');
