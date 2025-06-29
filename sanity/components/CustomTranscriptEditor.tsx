import React, { useState } from "react";
import {
  Stack,
  Button,
  Card,
  Text,
  Flex,
  Tab,
  TabList,
  TabPanel,
} from "@sanity/ui";
import { ClockIcon, AddIcon, TextIcon } from "@sanity/icons";
import { PatchEvent, set } from "sanity";

interface CustomTranscriptEditorProps {
  value?: any[];
  onChange: (event: PatchEvent) => void;
  schemaType: any;
}

export const CustomTranscriptEditor: React.FC<CustomTranscriptEditorProps> = ({
  value = [],
  onChange,
  schemaType,
}) => {
  const [activeTab, setActiveTab] = useState("segments");

  const addTimestampSegment = () => {
    const newSegment = {
      _type: "object",
      _key: `segment-${Date.now()}`,
      timestamp: "",
      speaker: "host",
      text: "",
      keyMoment: false,
    };

    const newValue = [...(value || []), newSegment];
    onChange(PatchEvent.from(set(newValue)));
  };

  const insertTimestampInPortableText = () => {
    // Add a new block with a timestamp placeholder
    const newBlock = {
      _type: "block",
      _key: `block-${Date.now()}`,
      style: "normal",
      children: [
        {
          _type: "span",
          _key: `span-${Date.now()}`,
          text: "[TIMESTAMP] ",
          marks: [],
        },
      ],
      markDefs: [],
    };

    const newValue = [...(value || []), newBlock];
    onChange(PatchEvent.from(set(newValue)));
  };

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary">
        <Stack space={3}>
          <Text weight="medium">Transcript Editor</Text>
          <Text size={1}>
            Choose your preferred editing method. Segments provide structured
            editing with easy timestamp insertion.
          </Text>

          <TabList space={2}>
            <Tab
              id="segments"
              aria-controls="segments-panel"
              selected={activeTab === "segments"}
              onClick={() => setActiveTab("segments")}
              label="Structured Segments"
            />
            <Tab
              id="portable"
              aria-controls="portable-panel"
              selected={activeTab === "portable"}
              onClick={() => setActiveTab("portable")}
              label="Rich Text"
            />
          </TabList>
        </Stack>
      </Card>

      <TabPanel
        id="segments-panel"
        aria-labelledby="segments"
        hidden={activeTab !== "segments"}
      >
        <Stack space={3}>
          <Flex justify="space-between" align="center">
            <Text weight="medium">Transcript Segments</Text>
            <Button
              icon={AddIcon}
              text="Add Segment"
              tone="primary"
              onClick={addTimestampSegment}
            />
          </Flex>

          <Card padding={3} tone="transparent" border>
            <Stack space={2}>
              <Text size={1} weight="medium">
                Quick Insert Templates:
              </Text>
              <Flex gap={2} wrap="wrap">
                <Button
                  fontSize={1}
                  mode="ghost"
                  text="Host Intro"
                  onClick={() => {
                    const segment = {
                      _type: "object",
                      _key: `segment-${Date.now()}`,
                      timestamp: "0:00",
                      speaker: "host",
                      text: "Welcome to [episode title]...",
                      keyMoment: false,
                    };
                    const newValue = [...(value || []), segment];
                    onChange(PatchEvent.from(set(newValue)));
                  }}
                />
                <Button
                  fontSize={1}
                  mode="ghost"
                  text="Guest Introduction"
                  onClick={() => {
                    const segment = {
                      _type: "object",
                      _key: `segment-${Date.now()}`,
                      timestamp: "",
                      speaker: "host",
                      text: "Today I'm joined by [guest name]...",
                      keyMoment: false,
                    };
                    const newValue = [...(value || []), segment];
                    onChange(PatchEvent.from(set(newValue)));
                  }}
                />
                <Button
                  fontSize={1}
                  mode="ghost"
                  text="Key Moment"
                  onClick={() => {
                    const segment = {
                      _type: "object",
                      _key: `segment-${Date.now()}`,
                      timestamp: "",
                      speaker: "guest",
                      text: "",
                      keyMoment: true,
                    };
                    const newValue = [...(value || []), segment];
                    onChange(PatchEvent.from(set(newValue)));
                  }}
                />
              </Flex>
            </Stack>
          </Card>

          {/* The actual segments will be rendered by Sanity's default array input */}
          <Text size={1} muted>
            Use the + button above or templates to add transcript segments. Each
            segment will appear below with timestamp, speaker, and text fields.
          </Text>
        </Stack>
      </TabPanel>

      <TabPanel
        id="portable-panel"
        aria-labelledby="portable"
        hidden={activeTab !== "portable"}
      >
        <Stack space={3}>
          <Flex justify="space-between" align="center">
            <Text weight="medium">Rich Text Transcript</Text>
            <Button
              icon={ClockIcon}
              text="Insert Timestamp Block"
              mode="ghost"
              onClick={insertTimestampInPortableText}
            />
          </Flex>

          <Card padding={3} tone="caution" border>
            <Stack space={2}>
              <Text size={1} weight="medium">
                💡 Tip for Timestamp Annotations:
              </Text>
              <Text size={1}>
                1. Type your text first: &ldquo;This is an important
                point&rdquo;
              </Text>
              <Text size={1}>2. Select the text you want to annotate</Text>
              <Text size={1}>3. Click the timestamp button in the toolbar</Text>
              <Text size={1}>4. Enter the timestamp (e.g., 1:23)</Text>
            </Stack>
          </Card>
        </Stack>
      </TabPanel>
    </Stack>
  );
};
