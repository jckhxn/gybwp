

// https://www.sanity.io/guides/your-first-input-component-for-sanity-studio-v3
// https://www.sanity.io/ui/
// https://www.sanity.io/ui/arcade
import {useCallback} from 'react'
import { set, unset } from "sanity";
import {Stack, Card,Heading TextInput} from '@sanity/ui'
type Props = {};

const VideoInfo = (props: Props) => {
  const handleChange = (event) => {
    /* more code to come */
  };
  //
  return (
    <>
      <Card padding={[4, 5, 6]}>
        <Stack space={4}>
          <Heading as="h1">Video Details</Heading>
          <TextInput
            fontSize={[2, 2, 3, 4]}
            onChange={(event) => setValue(event.currentTarget.value)}
            padding={[3, 3, 4]}
            placeholder="TextInput"
            value="{value}"
          />
          <TextInput
            fontSize={[2, 2, 3, 4]}
            onChange={(event) => setValue(event.currentTarget.value)}
            padding={[3, 3, 4]}
            placeholder="TextInput"
            value="{value}"
          />
          <TextInput
            fontSize={[2, 2, 3, 4]}
            onChange={(event) => setValue(event.currentTarget.value)}
            padding={[3, 3, 4]}
            placeholder="TextInput"
            value="{value}"
          />
        </Stack>
      </Card>
    </>
  );
};

export default VideoInfo;
