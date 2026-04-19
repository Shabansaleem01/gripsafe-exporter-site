"use client";

import { useEffect, useMemo } from "react";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

const categoryOrder = [
  "BOXING",
  "SPORTSWEAR",
  "LEATHER",
  "STREETWEAR",
  "MOTORBIKE",
  "Labels and Packaging",
];

interface ProductCatalogProps {
  products: Product[];
  expectedCounts: Record<string, number>;
  expectedTotal: number;
}

export default function ProductCatalog({ products, expectedCounts, expectedTotal }: ProductCatalogProps) {
  const categoryCounts = useMemo(() => {
    return products.reduce<Record<string, number>>((acc, product) => {
      const key = product.category || "Unknown";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
  }, [products]);

  const categories = useMemo(() => {
    const ordered = categoryOrder.filter((category) => categoryCounts[category] !== undefined);
    const extra = Object.keys(categoryCounts).filter((category) => !categoryOrder.includes(category));
    return ordered.concat(extra);
  }, [categoryCounts]);

  useEffect(() => {
    if (products.length !== expectedTotal) {
      console.warn(`Products JSON loaded ${products.length} products but expected ${expectedTotal}.`);
    }

    const mismatched = Object.entries(expectedCounts).filter(
      ([category, expectedCount]) => categoryCounts[category] !== expectedCount,
    );

    if (mismatched.length > 0) {
      console.warn(
        "Category count mismatch detected:",
        mismatched.map(([category, expectedCount]) => ({
          category,
          expected: expectedCount,
          actual: categoryCounts[category] ?? 0,
        })),
      );
    }
  }, [products.length, expectedTotal, expectedCounts, categoryCounts]);

  return (
    <section className="site-shell products-section">
      {categories.map((category) => {
        const categoryProducts = products.filter((product) => product.category === category);

        return (
          <section key={category} className="category-group">
            <div className="category-header">
              <h2>{category}</h2>
            </div>
            <div className="products-grid">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}
    </section>
  );
}
