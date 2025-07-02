import {
  Box,
  Button,
  Card,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Text,
  TextInput,
} from "@sanity/ui";
import { KeyboardEvent, useRef, useState } from "react";
import { FormField } from "sanity";
import { YoutubeVideoData, deriveVideoId, fetchVideoData } from "../utils";
import YoutubeFetcher from "./SyncButton";
import { ChannelBrowser } from "./ChannelBrowser";

export function VideoSearch(props: {
  apiKey: string;
  channelId?: string;
  onSubmit: (data: YoutubeVideoData) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const timeout = useRef<NodeJS.Timeout>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("url");

  const handleVideoFetch = (videoUrl: string) => {
    if (inputRef.current) {
      inputRef.current.value = videoUrl;
      const event = new Event("change", { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
  };

  const validateInput = (): string | null => {
    const input = inputRef.current?.value;
    if (!input) {
      setError(null);
      return null;
    }
    const id = deriveVideoId(input);
    if (!id) {
      setError("Invalid Youtube URL");
      return null;
    }
    setError(null);
    return id;
  };

  const submit = async () => {
    if (!inputRef.current?.value) {
      setError("Missing YouTube URL");
      return;
    }

    const id = validateInput();
    if (!id) return;

    setLoading(true);
    try {
      const data = await fetchVideoData(id, props.apiKey);
      if (!data) {
        setError("YouTube video not found");
        return;
      }
      props.onSubmit(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching YouTube data");
    } finally {
      setLoading(false);
    }
  };

  const onPaste = () => {
    setTimeout(validateInput, 0);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  const onChange = () => {
    setError(null);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(validateInput, 800);
  };

  return (
    <Card padding={3}>
      <Stack space={3}>
        <TabList space={2}>
          <Tab
            aria-controls="url-panel"
            id="url-tab"
            label="Video URL"
            onClick={() => setActiveTab("url")}
            selected={activeTab === "url"}
          />
          <Tab
            aria-controls="channel-panel"
            id="channel-tab"
            label="Browse Channel"
            onClick={() => setActiveTab("channel")}
            selected={activeTab === "channel"}
          />
        </TabList>

        {activeTab === "url" && (
          <TabPanel aria-labelledby="url-tab" id="url-panel">
            <FormField
              title="YouTube URL"
              description="Enter a YouTube video URL"
              // @ts-ignore
              error={error}
            >
              <Flex gap={2}>
                <Box flex={1}>
                  <TextInput
                    ref={inputRef}
                    onPaste={onPaste}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    onBlur={validateInput}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </Box>
                <Button
                  mode="ghost"
                  text="Submit"
                  onClick={submit}
                  disabled={loading}
                  tone={error ? "critical" : "primary"}
                />
                <YoutubeFetcher
                  inputRef={inputRef}
                  onVideoFetch={handleVideoFetch}
                  validateAndSubmit={submit}
                />
              </Flex>
            </FormField>
          </TabPanel>
        )}

        {activeTab === "channel" && (
          <TabPanel aria-labelledby="channel-tab" id="channel-panel">
            <ChannelBrowser
              apiKey={props.apiKey}
              channelId={props.channelId}
              onSubmit={props.onSubmit}
            />
          </TabPanel>
        )}
      </Stack>
    </Card>
  );
}
