import { products } from "@/data/products";

export default function ProductsPage() {
  const catalogProducts = products.slice(0, 42);

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: catalogProducts.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.alibabaLink,
    })),
  };

  return (
    <main className="flex flex-1 flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }} />
      <section className="products-hero">
        <div className="site-shell">
          <p className="eyebrow">Product Catalog</p>
          <h1>Export Products by Grip Safe Industries</h1>
          <p>
            Discover high-demand categories built for international wholesalers, resellers, and private label brands.
            Every product can be discussed directly on WhatsApp for fast sourcing.
          </p>
        </div>
      </section>

      <section className="site-shell products-grid-wrap">
        <div className="products-grid">
          {catalogProducts.map((item, index) => (
            <article key={`${item.name}-${index}`} className="product-card">
              <img src={item.image} alt={item.name} loading="lazy" className="product-image" />
              <p className="product-category">{item.category}</p>
              <h2>{item.name}</h2>
              <p>{item.detail}</p>
              <div className="product-card-actions">
                <a href={item.alibabaLink} target="_blank" rel="noreferrer" className="btn btn-outline">
                  View on Alibaba
                </a>
                <a
                  href="https://wa.me/message/UBP7SOCOZDFFH1"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-small"
                >
                  Inquire Now
                </a>
              </div>
              <span className="image-order-tag">#{index + 1}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
