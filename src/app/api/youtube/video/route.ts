import { NextRequest, NextResponse } from "next/server";
import config from "@/config";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const videoId = searchParams.get("id");

  console.log("YouTube API route called with videoId:", videoId);
  console.log("YouTube API key configured:", !!config.youtube.apiKey);
  console.log("YouTube API key length:", config.youtube.apiKey.length);
  console.log(
    "YouTube API key first/last chars:",
    config.youtube.apiKey.charAt(0),
    config.youtube.apiKey.charAt(config.youtube.apiKey.length - 1)
  );

  if (!videoId) {
    return NextResponse.json(
      { error: "Video ID is required" },
      { status: 400 }
    );
  }

  if (!config.youtube.apiKey) {
    console.error("YouTube API key is missing!");
    return NextResponse.json(
      { error: "YouTube API key not configured" },
      { status: 500 }
    );
  }

  try {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${config.youtube.apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch video data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching YouTube video:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
