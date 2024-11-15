// @ts-nocheck
import { Box, Stack } from "@sanity/ui";
import {
  ObjectInputProps,
  ObjectSchemaType,
  set,
  unset,
  useFormValue,
  useClient,
} from "sanity";

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
  const client = useClient({ apiVersion: "2022-03-07" });
  // Get parent document ID for updating the document
  const documentId = useFormValue(["_id"]) as string;

  function reset() {
    props.onChange(unset());
  }

  async function patchData(data: YoutubeVideoData) {
    await client
      .transaction()
      .createIfNotExists({ _type: "episode", _id: documentId })
      .commit();

    await client
      .patch(documentId)
      .set({ pathname: { current: String(data.uuid) } })
      .commit();
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
