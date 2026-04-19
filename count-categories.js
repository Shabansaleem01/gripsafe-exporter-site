const { products } = require('./src/data/products.ts');
const counts = products.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] || 0) + 1;
  return acc;
}, {});
console.log(JSON.stringify(counts, null, 2));
