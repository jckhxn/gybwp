// @ts-ignore
function getUUIDFromTitle(text) {
  // Regular expression to match "SxEXX" format
  const regex = /S(\d+)E(\d+)/;
  const match = regex.exec(text);

  // Check if format is valid (2 capture groups)
  if (!match || match.length !== 3) {
    return null;
  }

  // Return season and episode numbers as an string

  return match[1].toString() + match[2].toString();
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
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${apiKey}`;
  // @ts-ignore
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const snippet = data?.items?.[0]?.snippet;

      if (!snippet) return null;
      if (!snippet.title) return null;
      if (!snippet.description) return null;
      if (!snippet.publishedAt) return null;

      return {
        id,
        title: snippet.title as string,
        description: snippet.description as string,
        publishedAt: snippet.publishedAt as string,
        thumbnail: snippet.thumbnails.standard.url as string,
        uuid: getUUIDFromTitle(snippet.title),
        seasonNumber: getSeasonNumber(snippet.title),
        episodeNumber: getEpisodeNumber(snippet.title),
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
