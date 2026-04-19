"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageSrc, setImageSrc] = useState(product.localImagePath ?? product.image_url ?? "/images/placeholder.jpg");
  const fallback = "/images/placeholder.jpg";

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Image
          src={imageSrc}
          alt={product.name}
          width={400}
          height={240}
          className="product-image"
          onError={() => {
            if (imageSrc !== fallback) {
              setImageSrc(fallback);
            }
          }}
        />
      </div>
      <p className="product-category">{product.category}</p>
      <h2>{product.name}</h2>
      <p>{product.detail ?? "High-quality custom product from Alibaba"}</p>
      <div className="product-card-actions">
        <a href={product.product_url} target="_blank" rel="noreferrer" className="btn btn-outline">
          View on Alibaba
        </a>
      </div>
    </article>
  );
}
