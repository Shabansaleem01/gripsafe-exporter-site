export function getProductLabel(name: string, alibabaLink: string) {
  const cleaned = name
    .split(" - Buy")[0]
    .replace(/\s*Product on Alibaba\.com$/i, "")
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length >= 8) {
    return cleaned;
  }

  return slugToName(alibabaLink);
}

function slugToName(url: string) {
  const slug = url.split("/").pop()?.split("?")[0] ?? "";
  const titlePart = slug.split("_")[0];
  return titlePart
    .replace(/[-_]+/g, " ")
    .replace(/\b[a-z]/g, (match) => match.toUpperCase())
    .trim();
}
