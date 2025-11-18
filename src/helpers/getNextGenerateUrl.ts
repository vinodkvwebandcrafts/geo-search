import { baseUrl } from "./variables";

export function getNextGenerateUrl(image?: { url?: string } | null) {
  const imgUrl = image?.url?.trim();
  if (!imgUrl) return null;

  // If already optimized or a data URI
  if (imgUrl.startsWith("/_next/") || imgUrl.startsWith("data:")) return imgUrl;

  // If it's already an absolute URL (e.g. http or https)
  const isAbsolute = /^https?:\/\//i.test(imgUrl);
  const fullUrl = isAbsolute ? imgUrl : new URL(imgUrl.replace(/^\/+/, ""), baseUrl).href;

  // Construct optimized Next.js image URL
  return `/_next/image?url=${encodeURIComponent(fullUrl)}&w=1200&q=90`;
}
