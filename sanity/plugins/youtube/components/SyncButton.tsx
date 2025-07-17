import { Button } from "@sanity/ui";
import { useState, RefObject } from "react";
import { YoutubeVideoData } from "../utils";

interface YoutubeFetcherProps {
  inputRef: RefObject<HTMLInputElement>;
  onVideoFetch?: (videoUrl: string) => void;
  onSubmit: (data: YoutubeVideoData) => void;
}

const YoutubeFetcher = ({
  inputRef,
  onVideoFetch,
  onSubmit,
}: YoutubeFetcherProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestVideo = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/youtube/latest");
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch latest video");
      }

      const videoData = await response.json();
      const latestVideoUrl = `https://www.youtube.com/watch?v=${videoData.id}`;

      // Update input field for display purposes
      if (inputRef.current) {
        inputRef.current.value = latestVideoUrl;
        const event = new Event("change", { bubbles: true });
        inputRef.current.dispatchEvent(event);
        onVideoFetch?.(latestVideoUrl);
      }

      // Directly submit the video data
      onSubmit(videoData);
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
