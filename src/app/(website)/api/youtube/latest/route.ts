import { NextResponse } from "next/server";
import { generateEpisodePathname } from "../../../../../../sanity/utils/slugify";

// Helper functions
function formatDuration(duration: string) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
  const match = duration.match(regex);
  const hours = match && match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match && match[2] ? parseInt(match[2], 10) : 0;
  
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

function getSeasonNumber(text: string) {
  const regex = /S(\d+)E(\d+)/;
  const match = regex.exec(text);
  if (!match || match.length !== 3) {
    return null;
  }
  return parseInt(match[1]);
}

function getEpisodeNumber(text: string) {
  const regex = /S(\d+)E(\d+)/;
  const match = regex.exec(text);
  if (!match || match.length !== 3) {
    return null;
  }
  return parseInt(match[2]);
}

export async function GET() {
  try {
    const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
    const apiKey = process.env.NEXT_YOUTUBE_API_KEY;

    console.log("Environment check:", {
      channelId: channelId ? "✓ Present" : "✗ Missing",
      apiKey: apiKey ? "✓ Present" : "✗ Missing"
    });

    if (!channelId || !apiKey) {
      return NextResponse.json(
        { error: "Missing YouTube API configuration" },
        { status: 500 }
      );
    }

    // Fetch the uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    );

    if (!channelResponse.ok) {
      const errorText = await channelResponse.text();
      console.error("YouTube API Error:", {
        status: channelResponse.status,
        statusText: channelResponse.statusText,
        response: errorText
      });
      return NextResponse.json(
        { error: `Failed to fetch channel data: ${channelResponse.status} ${channelResponse.statusText}` },
        { status: 500 }
      );
    }

    const channelData = await channelResponse.json();
    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      return NextResponse.json(
        { error: "Could not find uploads playlist" },
        { status: 500 }
      );
    }

    // Fetch the latest video
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${uploadsPlaylistId}&key=${apiKey}`
    );

    if (!videoResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch video data" },
        { status: 500 }
      );
    }

    const videoData = await videoResponse.json();
    const videoId = videoData.items?.[0]?.snippet?.resourceId?.videoId;

    if (!videoId) {
      return NextResponse.json(
        { error: "No videos found" },
        { status: 404 }
      );
    }

    // Fetch detailed video data
    const videoDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`
    );

    if (!videoDetailsResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch video details" },
        { status: 500 }
      );
    }

    const videoDetailsData = await videoDetailsResponse.json();
    const snippet = videoDetailsData?.items?.[0]?.snippet;
    const contentDetails = videoDetailsData?.items?.[0]?.contentDetails;

    if (!snippet) {
      return NextResponse.json(
        { error: "Video details not found" },
        { status: 404 }
      );
    }

    const latestVideoData = {
      id: videoId,
      title: snippet.title,
      description: snippet.description,
      blurb: extractBlurb(snippet.description),
      publishedAt: snippet.publishedAt,
      thumbnail:
        snippet.thumbnails.maxres?.url ||
        snippet.thumbnails.high?.url ||
        snippet.thumbnails.standard?.url,
      duration: formatDuration(contentDetails.duration),
      seasonNumber: getSeasonNumber(snippet.title),
      episodeNumber: getEpisodeNumber(snippet.title),
      uuid: generateEpisodePathname(snippet.title).replace('/episode/', ''),
    };

    return NextResponse.json(latestVideoData);
  } catch (error) {
    console.error("Error fetching latest video:", error);
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}