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
  seasonNumber: number;
  episodeNumber: number;
  uuid: string;
};

export type YoutubeChannelVideo = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  duration: string;
};

export type YoutubeChannelSearchResult = {
  videos: YoutubeChannelVideo[];
  nextPageToken?: string;
  totalResults: number;
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

        thumbnail:
          snippet.thumbnails.maxres?.url ||
          snippet.thumbnails.high?.url ||
          (snippet.thumbnails.standard?.url as string),
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

// Search for videos in a specific YouTube channel
export function searchChannelVideos(
  channelId: string,
  apiKey: string,
  maxResults: number = 25,
  pageToken?: string
): Promise<YoutubeChannelSearchResult> {
  let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`;

  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }

  return fetch(url)
    .then((res) => res.json())
    .then(async (data) => {
      if (!data.items) {
        return { videos: [], totalResults: 0 };
      }

      // Get video IDs to fetch additional details (duration, etc.)
      const videoIds = data.items.map((item: any) => item.id.videoId).join(",");
      const detailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${apiKey}`;

      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      const videos: YoutubeChannelVideo[] = data.items.map(
        (item: any, index: number) => {
          const details = detailsData.items?.[index];
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt,
            thumbnail:
              item.snippet.thumbnails.medium?.url ||
              item.snippet.thumbnails.default?.url,
            duration: details
              ? formatDuration(details.contentDetails.duration)
              : "Unknown",
          };
        }
      );

      return {
        videos,
        nextPageToken: data.nextPageToken,
        totalResults: data.pageInfo.totalResults || 0,
      };
    });
}

// Get channel ID from channel URL or handle
export function getChannelId(
  channelInput: string,
  apiKey: string
): Promise<string | null> {
  // If it's already a channel ID (starts with UC)
  if (channelInput.startsWith("UC") && channelInput.length === 24) {
    return Promise.resolve(channelInput);
  }

  // If it's a channel URL, extract the ID or handle
  let identifier = channelInput;

  // Extract from various YouTube URL formats
  if (channelInput.includes("youtube.com/channel/")) {
    identifier = channelInput
      .split("youtube.com/channel/")[1]
      .split("/")[0]
      .split("?")[0];
  } else if (channelInput.includes("youtube.com/c/")) {
    identifier = channelInput
      .split("youtube.com/c/")[1]
      .split("/")[0]
      .split("?")[0];
  } else if (channelInput.includes("youtube.com/@")) {
    identifier = channelInput
      .split("youtube.com/@")[1]
      .split("/")[0]
      .split("?")[0];
  } else if (channelInput.includes("youtube.com/user/")) {
    identifier = channelInput
      .split("youtube.com/user/")[1]
      .split("/")[0]
      .split("?")[0];
  }

  // If it looks like a channel ID, return it
  if (identifier.startsWith("UC") && identifier.length === 24) {
    return Promise.resolve(identifier);
  }

  // Try to resolve username/handle to channel ID
  const url = `https://youtube.googleapis.com/youtube/v3/channels?part=id&forUsername=${identifier}&key=${apiKey}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.items && data.items.length > 0) {
        return data.items[0].id;
      }

      // If username lookup failed, try searching by handle (newer YouTube format)
      const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${identifier}&type=channel&maxResults=1&key=${apiKey}`;

      return fetch(searchUrl)
        .then((res) => res.json())
        .then((searchData) => {
          if (searchData.items && searchData.items.length > 0) {
            return searchData.items[0].snippet.channelId;
          }
          return null;
        });
    })
    .catch(() => null);
}
