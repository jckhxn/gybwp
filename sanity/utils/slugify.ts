// Generate episode pathname from YouTube title
export function generateEpisodePathname(title: string): string {
  // Handle undefined or empty title
  if (!title || typeof title !== "string") {
    return "/episode/untitled";
  }

  // Extract the main content before the show name and episode info
  let cleanTitle = title
    .replace(/\s*\|\.?\s*Growing Your Business With People.*$/i, "") // Remove show name and after (handles typo with |.)
    .replace(/\s*\|\.?\s*S\d+E\d+.*$/i, "") // Remove season/episode info (handles typo with |.)
    .replace(/\s*\|\.?\s*$/, "") // Remove trailing pipe with optional period
    .trim(); // Remove leading/trailing whitespace

  // Smart word-based truncation instead of character-based
  const words = cleanTitle
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // Replace special characters with spaces
    .replace(/\s+/g, " ") // Normalize multiple spaces to single space
    .trim()
    .split(" ")
    .filter((word) => word.length > 0); // Remove empty strings

  // Build URL by adding words until we reach a reasonable length
  const maxLength = 55; // Increased from 35 to capture more meaningful content
  let result = "";

  for (const word of words) {
    const testResult = result ? `${result}-${word}` : word;
    if (testResult.length > maxLength) {
      break; // Stop adding words if it would exceed length
    }
    result = testResult;
  }

  // If after cleaning we have an empty string, provide a fallback
  if (!result || result.length === 0) {
    return "/episode/untitled";
  }

  return `/episode/${result}`;
}
