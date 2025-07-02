import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from "@sanity/ui";
import { useState, useEffect } from "react";
import {
  YoutubeChannelVideo,
  YoutubeChannelSearchResult,
  searchChannelVideos,
  fetchVideoData,
  YoutubeVideoData,
} from "../utils";

interface ChannelBrowserProps {
  apiKey: string;
  channelId?: string;
  onSubmit: (data: YoutubeVideoData) => void;
}

export function ChannelBrowser({
  apiKey,
  channelId: configChannelId,
  onSubmit,
}: ChannelBrowserProps) {
  const [searchResult, setSearchResult] =
    useState<YoutubeChannelSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Automatically load channel videos if channelId is configured
  useEffect(() => {
    if (configChannelId && !searchResult) {
      const loadChannelVideos = async () => {
        setLoading(true);
        setError(null);

        try {
          const result = await searchChannelVideos(configChannelId, apiKey, 5);
          setSearchResult(result);
        } catch (err) {
          console.error(err);
          setError("Error loading channel videos");
        } finally {
          setLoading(false);
        }
      };

      loadChannelVideos();
    }
  }, [configChannelId, apiKey, searchResult]);

  const handleVideoSelect = async (video: YoutubeChannelVideo) => {
    setSelectedVideo(video.id);
    setLoading(true);

    try {
      // Fetch full video data
      const videoData = await fetchVideoData(video.id, apiKey);

      if (!videoData) {
        setError("Could not fetch video details");
        return;
      }

      onSubmit(videoData);
    } catch (err) {
      console.error(err);
      setError("Error fetching video data");
    } finally {
      setLoading(false);
      setSelectedVideo(null);
    }
  };

  const loadMoreVideos = async () => {
    if (!configChannelId || !searchResult?.nextPageToken) return;

    setLoading(true);
    try {
      const moreResults = await searchChannelVideos(
        configChannelId,
        apiKey,
        5,
        searchResult.nextPageToken
      );

      setSearchResult({
        videos: [...searchResult.videos, ...moreResults.videos],
        nextPageToken: moreResults.nextPageToken,
        totalResults: moreResults.totalResults,
      });
    } catch (err) {
      console.error(err);
      setError("Error loading more videos");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Stack space={4}>
      {!configChannelId && (
        <Card padding={3} tone="caution">
          <Text>
            No channel configured. Please set NEXT_PUBLIC_YOUTUBE_CHANNEL_ID in
            your environment variables.
          </Text>
        </Card>
      )}

      {loading && !searchResult && (
        <Card padding={3}>
          <Text>Loading latest videos...</Text>
        </Card>
      )}

      {error && (
        <Card padding={3} tone="critical">
          <Text>{error}</Text>
        </Card>
      )}

      {searchResult && (
        <Stack space={3}>
          <Heading size={1}>
            Channel Videos ({searchResult.videos.length} loaded)
          </Heading>

          <Grid columns={1} gap={2}>
            {searchResult.videos.map((video) => (
              <Card
                key={video.id}
                padding={3}
                radius={2}
                shadow={1}
                tone={selectedVideo === video.id ? "primary" : "default"}
                style={{ cursor: "pointer" }}
                onClick={() => handleVideoSelect(video)}
              >
                <Flex gap={3} align="flex-start">
                  <Box style={{ flexShrink: 0 }}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      style={{
                        width: "120px",
                        height: "90px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </Box>
                  <Stack space={2} flex={1}>
                    <Text weight="semibold" size={1}>
                      {video.title}
                    </Text>
                    <Text size={0} muted>
                      {video.description.slice(0, 150)}
                      {video.description.length > 150 ? "..." : ""}
                    </Text>
                    <Flex gap={3}>
                      <Text size={0} muted>
                        {formatDate(video.publishedAt)}
                      </Text>
                      <Text size={0} muted>
                        Duration: {video.duration}
                      </Text>
                    </Flex>
                  </Stack>
                </Flex>
              </Card>
            ))}
          </Grid>

          {searchResult.nextPageToken && (
            <Box paddingTop={2}>
              <Button
                text="Load More Videos"
                onClick={loadMoreVideos}
                disabled={loading}
                mode="ghost"
                style={{ width: "100%" }}
              />
            </Box>
          )}
        </Stack>
      )}
    </Stack>
  );
}
