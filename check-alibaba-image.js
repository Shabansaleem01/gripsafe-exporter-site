const https = require('https');
const url = 'https://www.alibaba.com/product-detail/High-Quality-Topwin-MZP-165-Zip_11000032020287.html';
https.get(url, (res) => {
  let html = '';
  res.on('data', (chunk) => html += chunk);
  res.on('end', () => {
    const og = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    const twitter = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
    console.log('og:image', og && og[1]);
    console.log('twitter:image', twitter && twitter[1]);
  });
}).on('error', (err) => {
  console.error('ERROR', err.message);
});
