import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageUrlBuilder from "@sanity/image-url";

import type { SanityImageProps } from "@tinloof/sanity-web";

import { SanityImage as SanityImageBase } from "@tinloof/sanity-web";

// Format UTC data string with robust error handling
export function formatDate(dateString: string) {
  try {
    // Check if dateString is null, undefined or empty
    if (!dateString) {
      return "Recent";
    }

    // Try to parse the date - handles both ISO dates and other string formats
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      // If can't parse as date, just return the string if it has content
      return dateString &&
        typeof dateString === "string" &&
        dateString.trim() !== ""
        ? dateString
        : "Recent";
    }

    // Format the date if it's valid
    return Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    // Return a fallback value if any error occurs
    console.error("Error formatting date:", error);
    return dateString || "Recent";
  }
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
 * Formats a duration string into a readable format
 * Handles multiple input formats:
 * - YouTube format: "1H 45m", "45m", "2H"
 * - ISO 8601 format: "PT1H45M", "PT45M", "PT2H"
 * - Time format: "1:45:30", "45:30"
 * - Already formatted: "1 hour 45 minutes"
 * @param durationString - Duration string from various sources
 * @param defaultDuration - Default duration to return if parsing fails
 * @returns Formatted duration string like "1 hour 45 minutes" or "45 minutes"
 */
export function formatDuration(
  durationString?: string,
  defaultDuration = "45 minutes"
): string {
  if (!durationString) return defaultDuration;

  // If already formatted (contains "hour" or "minute"), return as-is
  if (durationString.includes("hour") || durationString.includes("minute")) {
    return durationString;
  }

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  // Handle ISO 8601 format (PT1H45M30S, PT45M, etc.)
  if (durationString.startsWith("PT")) {
    const iso8601Match = durationString.match(
      /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/i
    );
    if (iso8601Match) {
      hours = iso8601Match[1] ? parseInt(iso8601Match[1], 10) : 0;
      minutes = iso8601Match[2] ? parseInt(iso8601Match[2], 10) : 0;
      seconds = iso8601Match[3] ? parseInt(iso8601Match[3], 10) : 0;
    }
  }
  // Handle YouTube format (1H 45m, 45m, etc.)
  else if (durationString.includes("H") || durationString.includes("m")) {
    const hoursMatch = durationString.match(/(\d+)H/i);
    const minutesMatch = durationString.match(/(\d+)m/i);

    hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
  }
  // Handle full text format (1 hour 45 minutes)
  else if (
    durationString.includes("hour") ||
    durationString.includes("minute")
  ) {
    const hoursMatch = durationString.match(/(\d+)\s+hours?/i);
    const minutesMatch = durationString.match(/(\d+)\s+minutes?/i);

    hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
  }
  // Handle time format (1:45:30, 45:30, etc.)
  else if (durationString.includes(":")) {
    const timeParts = durationString.split(":");
    if (timeParts.length === 3) {
      // HH:MM:SS format
      hours = parseInt(timeParts[0], 10) || 0;
      minutes = parseInt(timeParts[1], 10) || 0;
      seconds = parseInt(timeParts[2], 10) || 0;
    } else if (timeParts.length === 2) {
      // MM:SS format (assume no hours)
      minutes = parseInt(timeParts[0], 10) || 0;
      seconds = parseInt(timeParts[1], 10) || 0;
    }
  }
  // Handle plain numbers (assume minutes)
  else if (/^\d+$/.test(durationString)) {
    minutes = parseInt(durationString, 10);
  }

  // Round up seconds to next minute if 30+ seconds
  if (seconds >= 30) {
    minutes += 1;
  }

  // If we couldn't parse any meaningful values, return the default
  if (hours === 0 && minutes === 0) return defaultDuration;

  // Build the readable string
  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  }

  // If we only have hours with no minutes, still show it
  if (parts.length === 0 && hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  }

  return parts.join(" ");
}

/**
 * Formats a duration string into a compact readable format for cards/lists
 * @param durationString - Duration string from various sources
 * @param defaultDuration - Default duration to return if parsing fails
 * @returns Compact formatted duration string like "1h 45m" or "45m"
 */
export function formatDurationCompact(
  durationString?: string,
  defaultDuration = "45m"
): string {
  if (!durationString) return defaultDuration;

  // If already compact (contains "h" or "m" without "hour"/"minute"), return as-is
  if (
    (durationString.includes("h") || durationString.includes("m")) &&
    !durationString.includes("hour") &&
    !durationString.includes("minute")
  ) {
    return durationString;
  }

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  // Handle ISO 8601 format (PT1H45M30S, PT45M, etc.)
  if (durationString.startsWith("PT")) {
    const iso8601Match = durationString.match(
      /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/i
    );
    if (iso8601Match) {
      hours = iso8601Match[1] ? parseInt(iso8601Match[1], 10) : 0;
      minutes = iso8601Match[2] ? parseInt(iso8601Match[2], 10) : 0;
      seconds = iso8601Match[3] ? parseInt(iso8601Match[3], 10) : 0;
    }
  }
  // Handle YouTube format (1H 45m, 45m, etc.)
  else if (durationString.includes("H") || durationString.includes("m")) {
    const hoursMatch = durationString.match(/(\d+)H/i);
    const minutesMatch = durationString.match(/(\d+)m/i);

    hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
  }
  // Handle full text format (1 hour 45 minutes)
  else if (
    durationString.includes("hour") ||
    durationString.includes("minute")
  ) {
    const hoursMatch = durationString.match(/(\d+)\s+hours?/i);
    const minutesMatch = durationString.match(/(\d+)\s+minutes?/i);

    hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
  }
  // Handle time format (1:45:30, 45:30, etc.)
  else if (durationString.includes(":")) {
    const timeParts = durationString.split(":");
    if (timeParts.length === 3) {
      // HH:MM:SS format
      hours = parseInt(timeParts[0], 10) || 0;
      minutes = parseInt(timeParts[1], 10) || 0;
      seconds = parseInt(timeParts[2], 10) || 0;
    } else if (timeParts.length === 2) {
      // MM:SS format (assume no hours)
      minutes = parseInt(timeParts[0], 10) || 0;
      seconds = parseInt(timeParts[1], 10) || 0;
    }
  }
  // Handle plain numbers (assume minutes)
  else if (/^\d+$/.test(durationString)) {
    minutes = parseInt(durationString, 10);
  }

  // Round up seconds to next minute if 30+ seconds
  if (seconds >= 30) {
    minutes += 1;
  }

  // If we couldn't parse any meaningful values, return the default
  if (hours === 0 && minutes === 0) return defaultDuration;

  // Build the compact string
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
}
