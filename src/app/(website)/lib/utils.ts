import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder({
  projectId: "hxymd1na",
  dataset: "production",
});
export function urlFor(source) {
  return builder.image(source);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(
  text: string,
  maxLength: number,
  truncationIndicator = "..."
) {
  // Check if the text length is less than or equal to the maximum length
  if (text.length <= maxLength) {
    return text;
  } else {
    // Truncate the text and append the truncation indicator
    return (
      text.substring(0, maxLength - truncationIndicator.length) +
      truncationIndicator
    );
  }
}
