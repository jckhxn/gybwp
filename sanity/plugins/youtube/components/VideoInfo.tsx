import { Heading, Flex, Box, TextArea } from "@sanity/ui";
import { useState } from "react";
import { FormField, ObjectInputProps, ObjectSchemaType } from "sanity"; // We only need set for updates
import { YoutubeObject } from "./InputComponent";
import { YoutubeVideoData } from "../utils";
export type YoutubeInputProps = ObjectInputProps<
  YoutubeObject,
  ObjectSchemaType
>;

type Props = YoutubeInputProps & {
  apiKey: string;
  onReplace: (data: YoutubeVideoData) => void;
};
const VideoInfo = (props: Props) => {
  // @ts-ignore
  const { details } = props;
  const [title, setTitle] = useState(details.title);
  const [description, setDescription] = useState(details.description);
  const [blurb, setBlurb] = useState(details.blurb ? details.blurb : ""); // Assuming blurb is not provided initially

  // @ts-ignore
  const handleTitleChange = (event) => {
    setTitle(event.target.value);

    props.onReplace({ ...details, title: event.target.value });
  };
  // @ts-ignore
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    props.onReplace({ ...details, description: event.target.value });
  };
  // @ts-ignore
  const handleBlurbChange = (event) => {
    setBlurb(event.target.value);
    props.onReplace({ ...details, blurb: event.target.value });
  };

  return (
    <>
      <Heading as="h1">Video Details</Heading>
      <FormField title="Episode Title">
        <Flex gap={2} width="100%">
          <Box flex={1}>
            <TextArea
              height="100%"
              value={title}
              onChange={handleTitleChange}
              onPaste={handleTitleChange}
            />
            <FormField title="Episode Description">
              <TextArea
                height="100%"
                rows={10}
                value={description}
                onChange={handleDescriptionChange}
              />
            </FormField>
            <FormField title="Episode Blurb">
              <TextArea
                height="100%"
                placeholder="Enter a blurb here"
                value={blurb}
                onChange={handleBlurbChange}
              />
            </FormField>
          </Box>
        </Flex>
      </FormField>
    </>
  );
};
export default VideoInfo;
