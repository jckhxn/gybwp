import { useState, useEffect } from "react";
import {
  Stack,
  Card,
  Heading,
  Text,
  TextInput,
  Flex,
  Box,
  TextArea,
} from "@sanity/ui";
import { FormField, set, unset } from "sanity";

const VideoInfo = ({
  id,
  title,
  description,
  blurb = "",
}: {
  id?: string;
  title?: string;
  description?: string;
  blurb?: string;
}) => {
  const [titleUpdate, setTitleUpdate] = useState(title);
  const [descriptionUpdate, setDescriptionUpdate] = useState(description);
  const [blurbUpdate, setBlurbUpdate] = useState(blurb);

  const updateData = async () => {
    const patch = set({
      _id: id, // Assuming you have the document ID
      title: titleUpdate,
      description: descriptionUpdate,
      blurb: blurbUpdate,
    });
    await patch.commit("production"); // Replace with your dataset name
  };

  const handleChange = (fieldName, newValue) => {
    // Update local state
    if (fieldName === "title") {
      setTitleUpdate(newValue);
    }
    if (fieldName === "description") {
      setDescriptionUpdate(newValue);
    }
    if (fieldName === "blurb") {
      setBlurbUpdate(newValue);
    }
  };

  // Update data in Sanity on state change using useEffect
  useEffect(() => {
    const updateOnchange = async () => {
      await updateData();
    };

    // Trigger update on any state change (titleUpdate, descriptionUpdate, blurbUpdate)
    if (
      titleUpdate !== title ||
      descriptionUpdate !== description ||
      blurbUpdate !== blurb
    ) {
      updateOnchange();
    }
  }, [titleUpdate, descriptionUpdate, blurbUpdate]); // Dependency array

  return (
    <>
      <Heading as="h1">Video Details</Heading>
      <FormField title="Episode Title">
        <Flex gap={2} width="100%">
          <Box flex={1}>
            <TextArea
              height="100%"
              onChange={(event) =>
                handleChange("title", event.currentTarget.value)
              }
              value={titleUpdate} // Use the updated state value
            />
            <FormField title="Episode Description">
              <TextArea
                height="100%"
                onChange={(event) =>
                  handleChange("description", event.currentTarget.value)
                }
                value={descriptionUpdate} // Use the updated state value
              />
            </FormField>
            <FormField title="Episode Blurb">
              <TextArea
                height="100%"
                onChange={(event) =>
                  handleChange("blurb", event.currentTarget.value)
                }
                placeholder="Enter a blurb here"
                value={blurbUpdate} // Use the updated state value
              />
            </FormField>
          </Box>
        </Flex>
      </FormField>
    </>
  );
};

export default VideoInfo;
