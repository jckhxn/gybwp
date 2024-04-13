// https://www.sanity.io/guides/your-first-input-component-for-sanity-studio-v3
// https://www.sanity.io/ui/
// https://www.sanity.io/ui/arcade
import { useCallback } from "react";
import { set, unset } from "sanity";
import { Stack, Card, Heading, TextInput } from "@sanity/ui";

const VideoInfo = ({
  id,
  title,
  description,
}: {
  // Destructure props object
  id?: string;
  title?: string;
  description?: string;
}) => {
  const handleChange = useCallback((field, value) => {
    // Function to handle changes
    // Update state or call a function from props to update data (explained later)
  }, []);

  return (
    <>
      <Card padding={[4, 5, 6]}>
        <Stack space={4}>
          <Heading as="h1">Video Details</Heading>
          <TextInput
            fontSize={[2, 2, 3, 4]}
            onChange={(event) =>
              handleChange("title", event.currentTarget.value)
            } // Pass field name and value
            padding={[3, 3, 4]}
            placeholder="TextInput"
            value={title}
          />
          <TextInput
            fontSize={[2, 2, 3, 4]}
            onChange={(event) =>
              handleChange("description", event.currentTarget.value)
            }
            padding={[3, 3, 4]}
            placeholder="TextInput"
            value={description}
          />
          <TextInput
            fontSize={[2, 2, 3, 4]}
            onChange={(event) =>
              handleChange("blurb", event.currentTarget.value)
            } // Update "blurb" field
            padding={[3, 3, 4]}
            placeholder="Insert blurb here."
            value=""
          />
        </Stack>
      </Card>
    </>
  );
};

export default VideoInfo;
