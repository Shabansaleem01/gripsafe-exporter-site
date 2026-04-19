const fs = require('fs');
const path = require('path');
const csvPath = 'e:\\Backup\\GSI-Site Product list.csv';
const raw = fs.readFileSync(csvPath, 'utf8');
const lines = raw.split(/\r?\n/).map((line) => line.split(','));
let currentCategories = [];
let currentCategory = null;
const entries = [];
for (const line of lines) {
  if (!line.some((c) => c.trim())) continue;
  const hasUrl = line.some((c) => c.trim().startsWith('https://www.alibaba.com/'));
  for (let i = 0; i < line.length; i++) {
    const cell = line[i].trim();
    if (!cell) continue;
    if (!cell.startsWith('https://') && cell !== 'PRODUCT LIST') {
      if (!hasUrl) {
        currentCategories[i] = cell;
        currentCategory = cell;
      }
    }
  }
  for (let i = 0; i < line.length; i++) {
    const cell = line[i].trim();
    if (cell.startsWith('https://www.alibaba.com/')) {
      const category = currentCategories[i] || currentCategory || 'Unknown';
      entries.push({ category, url: cell });
    }
  }
}

function slugToName(url) {
  const slug = url.split('/').pop().split('?')[0];
  const parts = slug.split('_')[0].split('-').map((s) => s.replace(/\+/g, ' '));
  const value = parts.join(' ').replace(/\s+/g, ' ').trim();
  return value.replace(/\b(\w)/g, (match) => match.toUpperCase());
}

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      },
    });
    if (!res.ok) {
      console.log(`HTTP ${res.status} for ${url}`);
      return '';
    }
    const html = await res.text();
    return html;
  } catch (error) {
    console.log(`Fetch error for ${url}: ${error.message}`);
    return '';
  }
}

function extractMeta(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1].trim() : null;
}

(async () => {
  const results = [];
  let index = 0;
  for (const entry of entries) {
    index++;
    console.log(`Fetching ${index}/${entries.length}: ${entry.url}`);
    try {
      const html = await fetchPage(entry.url);
      if (!html) {
        console.log(`No HTML for ${entry.url}`);
        results.push({
          name: slugToName(entry.url),
          category: entry.category,
          detail: 'High-quality custom product from Alibaba',
          image: '/product-placeholder.svg',
          alibabaLink: entry.url,
        });
        continue;
      }
      const image = extractMeta(html, /<meta[\s\S]*?property=["']og:image["'][\s\S]*?content=["']([^"']+)["'][\s\S]*?>/i)
        || extractMeta(html, /<meta[\s\S]*?name=["']og:image["'][\s\S]*?content=["']([^"']+)["'][\s\S]*?>/i)
        || '/product-placeholder.svg';
      console.log(`Image for ${entry.url}: ${image}`);
      const title = extractMeta(html, /<meta[\s\S]*?property=["']og:title["'][\s\S]*?content=["']([^"']+)["'][\s\S]*?>/i)
        || extractMeta(html, /<meta[\s\S]*?name=["']title["'][\s\S]*?content=["']([^"']+)["'][\s\S]*?>/i)
        || extractMeta(html, /<title[\s\S]*?>([^<]+)<\/title>/i)
        || slugToName(entry.url);
      results.push({
        name: title,
        category: entry.category,
        detail: 'High-quality custom product from Alibaba',
        image,
        alibabaLink: entry.url,
      });
    } catch (error) {
      console.error('ERROR fetching', entry.url, error.message);
      results.push({
        name: slugToName(entry.url),
        category: entry.category,
        detail: 'High-quality custom product from Alibaba',
        image: '/product-placeholder.svg',
        alibabaLink: entry.url,
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 800));
  }
  const output = `export const products = [\n${results
    .map(
      (item) => `  {\n    name: ${JSON.stringify(item.name)},\n    category: ${JSON.stringify(item.category)},\n    detail: ${JSON.stringify(item.detail)},\n    image: ${JSON.stringify(item.image)},\n    alibabaLink: ${JSON.stringify(item.alibabaLink)}\n  }`
    )
    .join(',\n')}\n];\n`;
  fs.writeFileSync(path.join('src', 'data', 'products.ts'), `export type Product = {\n  name: string;\n  category: string;\n  detail: string;\n  image: string;\n  alibabaLink: string;\n};\n\n${output}`);
  console.log('Wrote src/data/products.ts with', results.length, 'products');
})();
