const url = 'https://www.alibaba.com/product-detail/High-Quality-Topwin-MZP-165-Zip_11000032020287.html?spm=a2700.shop_plgr.41413.16.78a664daH5Bqe4';
(async () => {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    },
  });
  const html = await res.text();
  const og = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  const twitter = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
  const title = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) || html.match(/<title>([^<]+)<\/title>/i);
  console.log('status', res.status);
  console.log('og:image', og && og[1]);
  console.log('twitter:image', twitter && twitter[1]);
  console.log('title', title && title[1]);
})();