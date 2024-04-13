import { useState, useCallback } from "react";
import { Heading, Flex, Box, TextArea } from "@sanity/ui";
import { FormField, set, unset } from "sanity"; // We only need set for updates

const VideoInfo = ({
  id,
  title,
  description,
  blurb = "",
  onChange,
}: {
  id?: string;
  title?: string;
  description?: string;
  blurb?: string;
  onChange: (updatedField: string, newValue: string) => void;
}) => {
  const [fields, setFields] = useState({
    title: title,
    description: description,
    blurb: blurb,
  });

  const handleChange = useCallback(
    (fieldName, newValue) => {
      setFields((prevFields) => ({ ...prevFields, [fieldName]: newValue }));
      set(newValue);
    },
    [onChange]
  );

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
              value={fields.title} // Use the updated state from fields
            />
            <FormField title="Episode Description">
              <TextArea
                height="100%"
                onChange={(event) =>
                  handleChange("description", event.currentTarget.value)
                }
                value={fields.description} // Use the updated state from fields
              />
            </FormField>
            <FormField title="Episode Blurb">
              <TextArea
                height="100%"
                onChange={(event) =>
                  handleChange("blurb", event.currentTarget.value)
                }
                placeholder="Enter a blurb here"
                value={fields.blurb} // Use the updated state from fields
              />
            </FormField>
          </Box>
        </Flex>
      </FormField>
    </>
  );
};

export default VideoInfo;
