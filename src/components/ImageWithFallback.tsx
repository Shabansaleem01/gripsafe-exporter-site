"use client";

import { useEffect, useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  loading = "lazy",
  fallbackSrc = "/product-placeholder.svg",
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setTriedFallback(false);
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      onError={() => {
        if (!triedFallback) {
          setCurrentSrc(fallbackSrc);
          setTriedFallback(true);
          return;
        }

        if (currentSrc !== "/product-placeholder.svg") {
          setCurrentSrc("/product-placeholder.svg");
        }
      }}
    />
  );
}
