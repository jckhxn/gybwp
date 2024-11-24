// @ts-ignore
function getUUIDFromTitle(text) {
  const pattern = /S(\d+)E(\d+)(?:\sPart\s(\d+))?/;
  const match = text.match(pattern);
  if (match) {
    const season = match[1];
    const episode = match[2].padStart(2, "0"); // Ensure episode is always two digits
    const part = match[3];
    if (part) {
      return `${season}${episode}-${part}`;
    } else {
      return `${season}${episode}`;
    }
  } else {
    return null;
  }
}
// @ts-ignore
function getSeasonNumber(text) {
  // Regular expression to match "SxEXX" format
  const regex = /S(\d+)E(\d+)/;
  const match = regex.exec(text);

  // Check if format is valid (2 capture groups)
  if (!match || match.length !== 3) {
    return null;
  }

  // Return season and episode numbers as an object
  return parseInt(match[1]);
}
// @ts-ignore
function getEpisodeNumber(text) {
  // Regular expression to match "SxEXX" format
  const regex = /S(\d+)E(\d+)/;
  const match = regex.exec(text);

  // Check if format is valid (2 capture groups)
  if (!match || match.length !== 3) {
    return null;
  }

  // Return season and episode numbers as an object
  return parseInt(match[2]);
}

// Format duraation
function formatDuration(duration: string) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
  const match = duration.match(regex);

  // Extract hours and minutes (default to 0 if not present)
  const hours = match && match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match && match[2] ? parseInt(match[2], 10) : 0;

  // Format the output based on the presence of hours
  if (hours > 0) {
    return `${hours}H ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}
function extractBlurb(text: string) {
  const regex = /Episode Summary:\s*(.+?)(?=\n\n[A-Z])/s;
  const match = text.match(regex);
  return match ? match[1].trim() : "No Episode Summary found.";
}

export type YoutubeVideoData = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail?: string;
  uuid: string;
  seasonNumber: number;
  episodeNumber: number;
};

export function fetchVideoData(
  id: string,
  apiKey: string
): Promise<YoutubeVideoData | null> {
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${id}&key=${apiKey}`;
  // @ts-ignore
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const snippet = data?.items?.[0]?.snippet;
      const contentDetails = data?.items?.[0]?.contentDetails;

      if (!snippet) return null;
      if (!snippet.title) return null;
      if (!snippet.description) return null;
      if (!snippet.publishedAt) return null;

      return {
        id,
        title: snippet.title as string,
        description: snippet.description as string,
        blurb: extractBlurb(snippet.description),
        publishedAt: snippet.publishedAt as string,
        thumbnail: snippet.thumbnails.standard.url as string,
        uuid: getUUIDFromTitle(snippet.title),
        seasonNumber: getSeasonNumber(snippet.title),
        episodeNumber: getEpisodeNumber(snippet.title),
        duration: formatDuration(contentDetails.duration),
      };
    });
}

export function deriveVideoId(input: string): string | null {
  if (
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}($|&|#)/.test(
      input
    )
  ) {
    return new URL(input).searchParams.get("v");
  }

  if (/^https?:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}(?:\?.*)?$/.test(input)) {
    return new URL(input).pathname.split("/")[1];
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  return null;
}
