const url = 'https://www.alibaba.com/product-detail/High-Quality-Customizable-Pro-Boxing-Sparring_10000036974849.html?spm=a2700.shop_plgr.41413.19.1f4864danouYnd';
(async () => {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    },
  });
  const html = await res.text();
  const og = html.match(/<meta[\s\S]*?property=["']og:image["'][\s\S]*?content=["']([^"']+)["'][\s\S]*?>/i);
  const title = html.match(/<meta[\s\S]*?property=["']og:title["'][\s\S]*?content=["']([^"']+)["'][\s\S]*?>/i)
    || html.match(/<title>([^<]+)<\/title>/i);
  console.log('status', res.status);
  console.log('og:image', og && og[1]);
  console.log('title', title && title[1]);
})();