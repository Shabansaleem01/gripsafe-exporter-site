export const categoryImageMap: Record<string, string> = {
  BOXING: "/boxing-placeholder.svg",
  "Labels and Packaging": "/labels-packaging-placeholder.svg",
  STREETWEAR: "/streetwear-placeholder.svg",
  MOTORBIKE: "/motorbike-placeholder.svg",
  SPORTSWEAR: "/sportswear-placeholder.svg",
  LEATHER: "/leather-placeholder.svg",
};

export function getCategoryPlaceholder(category: string) {
  return categoryImageMap[category] ?? "/product-placeholder.svg";
}

export function getProductImage(image: string, category: string) {
  const placeholder = getCategoryPlaceholder(category);
  if (!image || image === "/product-placeholder.svg") {
    return placeholder;
  }

  const trimmed = image.trim();
  if (!trimmed) {
    return placeholder;
  }

  const normalized = trimmed.startsWith("//") ? `https:${trimmed}` : trimmed;

  try {
    new URL(normalized, "https://example.com");
    return encodeURI(normalized);
  } catch {
    return placeholder;
  }
}
