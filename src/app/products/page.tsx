import fs from "fs";
import path from "path";
import type { Product } from "@/types/product";
import ProductCatalog from "@/components/ProductCatalog";
import productsJson from "@/data/products.json";

const expectedCategoryCounts: Record<string, number> = {
  BOXING: 16,
  SPORTSWEAR: 18,
  LEATHER: 14,
  STREETWEAR: 13,
  MOTORBIKE: 7,
  "Labels and Packaging": 5,
};

const expectedTotal = 82;

const downloadImageDir = path.join(process.cwd(), "public", "images", "downloaded");
const downloadedFiles = new Set(fs.existsSync(downloadImageDir) ? fs.readdirSync(downloadImageDir) : []);

const localImageMap: Record<string, string> = Array.from(downloadedFiles).reduce((map, fileName) => {
  const idMatch = fileName.match(/_(\d+)(?:\.html.*)?\.(?:png|jpe?g)$/i);
  if (idMatch) {
    map[idMatch[1]] = `/images/downloaded/${encodeURI(fileName)}`;
  }
  return map;
}, {} as Record<string, string>);

const fileNameLookup = Array.from(downloadedFiles).reduce((lookup, fileName) => {
  const normalized = fileName.replace(/\.(png|jpe?g)$/i, "").replace(/[^a-z0-9]/gi, "").toLowerCase();
  lookup[normalized] = `/images/downloaded/${encodeURI(fileName)}`;
  return lookup;
}, {} as Record<string, string>);

function resolveLocalImagePath(product: Product): string | undefined {
  if (product.product_id && localImageMap[product.product_id]) {
    return localImageMap[product.product_id];
  }

  const normalizedName = product.name.replace(/[^a-z0-9]/gi, "").toLowerCase();
  return fileNameLookup[normalizedName];
}

export const dynamic = "force-static";

export default function ProductsPage() {
  const products = (productsJson.products as Product[]).map((product) => ({
    ...product,
    localImagePath: resolveLocalImagePath(product),
  }));

  return (
    <main className="flex flex-1 flex-col">
      <section className="products-hero">
        <div className="site-shell">
          <p className="eyebrow">Product Catalog</p>
          <h1>Export Products by Grip Safe Industries</h1>
          <p>
            Discover high-demand categories built for international wholesalers, resellers, and private label brands.
            Every product can be reviewed from the catalog below and sourced directly via Alibaba.
          </p>
        </div>
      </section>

      <ProductCatalog products={products} expectedCounts={expectedCategoryCounts} expectedTotal={expectedTotal} />
    </main>
  );
}
