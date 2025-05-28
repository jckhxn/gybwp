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
// Helper function to format description text into paragraphs
export const formatDescriptionText = (text: string) => {
  if (!text) return [];

  // Split by double newlines or single newlines
  const paragraphs = text.split(/\n{2,}|\n/).filter((p) => p.trim() !== "");
  return paragraphs;
};

/**
 * Formats a YouTube duration string (like "1H 45m") into a readable format
 * @param durationString - Duration string from YouTube data or similar format
 * @param defaultDuration - Default duration to return if parsing fails
 * @returns Formatted duration string like "1 hour 45 minutes" or "45 minutes"
 */
export function formatDuration(
  durationString?: string,
  defaultDuration = "45 minutes"
): string {
  if (!durationString) return defaultDuration;

  // Parse hours and minutes from the format like "1H 45m"
  const hoursMatch = durationString.match(/(\d+)H/i);
  const minutesMatch = durationString.match(/(\d+)m/i);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  // If we couldn't parse any values, return the default
  if (hours === 0 && minutes === 0) return defaultDuration;

  // Build the readable string
  if (hours > 0 && minutes > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
}

/**
 * Generates three random numbers between min and max (inclusive)
 * Ensures that no number ends with 0 as no episode UUIDs end with 0
 * @param min - Minimum value for random numbers (defaults to 101)
 * @param max - Maximum value for random numbers (defaults to 807)
 * @returns An array containing three random integers within the specified range, none ending with 0
 */
export function generateRandomNumbers(
  min: number = 101,
  max: number = 807
): [number, number, number] {
  // Helper function to generate a single valid random number
  const generateValidNumber = (): number => {
    let num;
    do {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (num % 10 === 0); // Ensure number doesn't end with 0

    return num;
  };

  // Generate three random numbers, ensuring none end with 0
  const firstNumber = generateValidNumber();
  const secondNumber = generateValidNumber();
  const thirdNumber = generateValidNumber();

  return [firstNumber, secondNumber, thirdNumber];
}
