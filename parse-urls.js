const fs = require('fs');
const path = 'e:\\Backup\\GSI-Site Product list.csv';
const raw = fs.readFileSync(path, 'utf8');
const lines = raw.split(/\r?\n/).map(l => l.split(','));
let currentCategories = [];
let currentCategory = null;
const urls = [];
for (const line of lines) {
  if (!line.some(c => c.trim())) continue;
  const hasUrl = line.some(c => c.trim().startsWith('https://www.alibaba.com/'));
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
      urls.push({ category, url: cell });
    }
  }
}
const categories = [...new Set(urls.map(item => item.category))];
console.log('categories', categories.length, categories);
console.log('total urls', urls.length);
console.log('sample', urls.slice(0,20));
fs.writeFileSync('parsed-urls.json', JSON.stringify(urls, null, 2));
console.log('wrote parsed-urls.json');
