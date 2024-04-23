import { Box, Stack } from "@sanity/ui";
import { ObjectInputProps, ObjectSchemaType, set, unset } from "sanity";
import { ActionsMenu } from "./ActionsMenu";
import { VideoPreview } from "./VideoPreview";
import { VideoSearch } from "./VideoSearch";
import { YoutubeVideoData } from "../utils";
import VideoInfo from "./VideoInfo";

export type YoutubeObject = {
  id: string;
  title: string;
  description: string;
  episodeNumber: number;
  seasonNumber: number;
  publishedAt: string;
  uuid: string;
  thumbnails: string[];
};

export type YoutubeInputProps = ObjectInputProps<
  YoutubeObject,
  ObjectSchemaType
>;

type Props = YoutubeInputProps & { apiKey: string };

export function YoutubeInputComponent(props: Props) {
  function reset() {
    props.onChange(unset());
  }

  function patchData(data: YoutubeVideoData) {
    console.log(data);
    props.onChange(set(data));
  }

  return (
    <Stack space={3}>
      {!props.value?.id && (
        <VideoSearch apiKey={props.apiKey} onSubmit={patchData} />
      )}
      {!!props.value?.id && (
        <Box style={{ position: "relative" }}>
          <VideoPreview
            id={props.value.id}
            title={props.value.title}
            description={props.value.description}
          />
          <ActionsMenu
            onReset={reset}
            apiKey={props.apiKey}
            onReplace={patchData}
            details={props.value}
          />
          <VideoInfo details={props.value} onReplace={patchData} />
        </Box>
      )}
    </Stack>
  );
}

export function createScopedInputComponent(apiKey: string) {
  return function ScopedInputComponent(props: YoutubeInputProps) {
    return <YoutubeInputComponent {...props} apiKey={apiKey} />;
  };
}
