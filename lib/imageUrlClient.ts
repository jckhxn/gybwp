import imageUrlBuilder from "@sanity/image-url";
import config from "@/config";

// Client-safe image URL builder that doesn't depend on server-only client
// Uses the public project config directly

// Create a client-safe image URL builder
const builder = imageUrlBuilder({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
});

// Client-safe version of urlFor
export function urlForClient(source: any) {
  return builder.image(source);
}

// Client-safe helper to get image URL from Sanity image object
export function getImageUrlClient(
  image: any,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "jpg" | "png";
    fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  }
): string {
  if (!image?.asset?.url) {
    return "";
  }

  let url = urlForClient(image);

  if (options?.width) {
    url = url.width(options.width);
  }

  if (options?.height) {
    url = url.height(options.height);
  }

  if (options?.quality) {
    url = url.quality(options.quality);
  }

  if (options?.format) {
    url = url.format(options.format as any);
  }

  if (options?.fit) {
    url = url.fit(options.fit as any);
  }

  return url.url();
}

// High-quality hero image helper with responsive sizes
export function getHeroImageUrl(image: any, width: number = 1600): string {
  return getImageUrlClient(image, {
    width,
    quality: 100,
    format: "webp",
    fit: "crop",
  });
}

// Generate responsive image srcSet for hero images
export function getHeroImageSrcSet(image: any): string {
  if (!image?.asset?.url) return "";

  const sizes = [600, 800, 1200, 1600, 2000, 2400];
  return sizes
    .map((size) => `${getHeroImageUrl(image, size)} ${size}w`)
    .join(", ");
}

// Generate sizes attribute for responsive images
export function getHeroImageSizes(): string {
  return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px";
}
