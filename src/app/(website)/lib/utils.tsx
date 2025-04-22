import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageUrlBuilder from "@sanity/image-url";

import type { SanityImageProps } from "@tinloof/sanity-web";

import { SanityImage as SanityImageBase } from "@tinloof/sanity-web";

// Format UTC data string
export function formatDate(dateString: string) {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

// Sanity Data Blob -> Image URL
export function SanityImage({
  data,

  ...props
}: Omit<SanityImageProps, "config">) {
  return (
    <SanityImageBase
      data={data}
      config={{
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      }}
      {...props}
    />
  );
}

// Generate image from text
export const generateImage = ({
  text,
  foregroundColor = "#000000",
  backgroundColor = "#F2F2F3",
  width = 300,
  height = 170,
}: {
  text: string;
  foregroundColor?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
}) => {
  if (typeof window !== "undefined") {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    if (!context) {
      return null;
    }

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "bold 28px Assistant";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
  }

  return "";
};

const builder = imageUrlBuilder({
  projectId: "hxymd1na",
  dataset: "production",
});
export function urlFor(source: any) {
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
  if (text?.length <= maxLength) {
    return text;
  } else {
    // Truncate the text and append the truncation indicator
    return (
      text?.substring(0, maxLength - truncationIndicator.length) +
      truncationIndicator
    );
  }
}
