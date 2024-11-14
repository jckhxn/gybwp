import { Button } from "@sanity/ui";
import { useState, RefObject } from "react";

interface YoutubeFetcherProps {
  inputRef: RefObject<HTMLInputElement>;
  onVideoFetch?: (videoUrl: string) => void;
  validateAndSubmit: () => void;
}

const YoutubeFetcher = ({
  inputRef,
  onVideoFetch,
  validateAndSubmit,
}: YoutubeFetcherProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestVideo = async () => {
    setLoading(true);
    setError(null);

    try {
      const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

      if (!channelId || !apiKey) {
        throw new Error("Missing YouTube API configuration");
      }

      // Fetch the uploads playlist ID
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
      );

      if (!channelResponse.ok) {
        throw new Error("Failed to fetch channel data");
      }

      const channelData = await channelResponse.json();
      const uploadsPlaylistId =
        channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

      if (!uploadsPlaylistId) {
        throw new Error("Could not find uploads playlist");
      }

      // Fetch the latest video
      const videoResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${uploadsPlaylistId}&key=${apiKey}`
      );

      if (!videoResponse.ok) {
        throw new Error("Failed to fetch video data");
      }

      const videoData = await videoResponse.json();
      const videoId = videoData.items?.[0]?.snippet?.resourceId?.videoId;

      if (!videoId) {
        throw new Error("No videos found");
      }

      const latestVideoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      // Update input and trigger validation
      if (inputRef.current) {
        inputRef.current.value = latestVideoUrl;
        const event = new Event("change", { bubbles: true });
        inputRef.current.dispatchEvent(event);
        onVideoFetch?.(latestVideoUrl);
        setTimeout(validateAndSubmit, 100);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Error fetching latest video:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      mode="ghost"
      text={loading ? "Fetching..." : "Sync Latest"}
      onClick={fetchLatestVideo}
      disabled={loading}
      tone={error ? "critical" : "primary"}
    />
  );
};

export default YoutubeFetcher;
