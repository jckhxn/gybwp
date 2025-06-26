/**
 * Removes the "SxEx" prefix from episode titles
 * @param title - The original title that may contain "SxEx" prefix
 * @returns The clean title without the prefix
 */
export function formatEpisodeTitle(title?: string): string {
  if (!title) return title || '';
  
  // Remove "SxEx" prefix pattern (e.g., "S2E15: Episode Title" -> "Episode Title")
  const cleanTitle = title.replace(/^S\d+E\d+:\s*/, '');
  
  return cleanTitle;
}
