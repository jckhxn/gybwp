import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source: any) {
  return builder.image(source);
}

// Helper to get image URL from Sanity image object
export function getImageUrl(
  image: any,
  options?: { width?: number; height?: number; quality?: number }
): string {
  if (!image?.asset?.url) {
    return "";
  }

  let url = urlFor(image);

  if (options?.width) {
    url = url.width(options.width);
  }

  if (options?.height) {
    url = url.height(options.height);
  }

  if (options?.quality) {
    url = url.quality(options.quality);
  }

  return url.url();
}
