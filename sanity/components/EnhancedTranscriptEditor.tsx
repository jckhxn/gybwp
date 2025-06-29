import React, { useState, useCallback } from "react";
import {
  Stack,
  Button,
  Card,
  Text,
  Flex,
  Box,
  Select,
  TextInput,
} from "@sanity/ui";
import { ClockIcon, UserIcon, AddIcon } from "@sanity/icons";
import { PatchEvent, set } from "sanity";

interface EnhancedTranscriptEditorProps {
  value?: any[];
  onChange: (event: PatchEvent) => void;
  schemaType: any;
  readOnly?: boolean;
}

import React, { useState, useCallback } from "react";
import {
  Stack,
  Button,
  Card,
  Text,
  Flex,
  Box,
  Select,
  TextInput,
} from "@sanity/ui";
import { ClockIcon, UserIcon, AddIcon } from "@sanity/icons";
import { PatchEvent, set } from "sanity";

interface EnhancedTranscriptEditorProps {
  value?: any[];
  onChange: (event: PatchEvent) => void;
  schemaType: any;
  readOnly?: boolean;
}

export const EnhancedTranscriptEditor: React.FC<
  EnhancedTranscriptEditorProps
> = ({ value = [], onChange, schemaType, readOnly = false }) => {
  const [quickTimestamp, setQuickTimestamp] = useState("");
  const [quickSpeaker, setQuickSpeaker] = useState("host");

  // Quick template for common transcript patterns
  const insertTranscriptTemplate = useCallback(() => {
    const template = [
      {
        _type: "block",
        _key: `block-${Date.now()}-1`,
        style: "h4",
        children: [
          {
            _type: "span",
            _key: `span-${Date.now()}-1`,
            text: "Host",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: `block-${Date.now()}-2`,
        style: "normal",
        children: [
          {
            _type: "span",
            _key: `span-${Date.now()}-2`,
            text: "Welcome to the show! Today we have...",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: `block-${Date.now()}-3`,
        style: "h4",
        children: [
          {
            _type: "span",
            _key: `span-${Date.now()}-3`,
            text: "Guest",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: `block-${Date.now()}-4`,
        style: "normal",
        children: [
          {
            _type: "span",
            _key: `span-${Date.now()}-4`,
            text: "Thanks for having me!",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ];

    onChange(PatchEvent.from(set([...(value || []), ...template])));
  }, [value, onChange]);

  // Add a timestamp block
  const addTimestampBlock = useCallback(() => {
    if (!quickTimestamp.trim()) return;

    const timestampBlock = {
      _type: "block",
      _key: `timestamp-block-${Date.now()}`,
      style: "normal",
      children: [
        {
          _type: "span",
          _key: `timestamp-span-${Date.now()}`,
          text: `[${quickTimestamp}] `,
          marks: ["strong"],
        },
      ],
      markDefs: [],
    };

    onChange(PatchEvent.from(set([...(value || []), timestampBlock])));
    setQuickTimestamp("");
  }, [quickTimestamp, value, onChange]);

  // Add a speaker header
  const addSpeakerHeader = useCallback(() => {
    const speakerName =
      quickSpeaker === "host"
        ? "Host"
        : quickSpeaker === "guest"
          ? "Guest"
          : "Speaker";

    const speakerBlock = {
      _type: "block",
      _key: `speaker-block-${Date.now()}`,
      style: "h4",
      children: [
        {
          _type: "span",
          _key: `speaker-span-${Date.now()}`,
          text: speakerName,
          marks: [],
        },
      ],
      markDefs: [],
    };

    onChange(PatchEvent.from(set([...(value || []), speakerBlock])));
  }, [quickSpeaker, value, onChange]);

  if (readOnly) {
    return (
      <Card padding={3}>
        <Text>Transcript content (read-only)</Text>
      </Card>
    );
  }

  return (
    <Stack space={4}>
      {/* Quick Annotation Toolbar */}
      <Card padding={3} tone="primary" radius={2}>
        <Stack space={3}>
          <Text weight="semibold" size={1}>
            📝 Quick Annotation Tools
          </Text>

          <Flex gap={3} align="flex-end" wrap="wrap">
            {/* Timestamp Input */}
            <Box flex={1} style={{ minWidth: "120px" }}>
              <Text size={1} weight="medium" style={{ marginBottom: "8px" }}>
                Timestamp
              </Text>
              <TextInput
                value={quickTimestamp}
                onChange={(event) =>
                  setQuickTimestamp(event.currentTarget.value)
                }
                placeholder="e.g., 1:23"
                fontSize={1}
              />
            </Box>

            {/* Speaker Selector */}
            <Box flex={1} style={{ minWidth: "120px" }}>
              <Text size={1} weight="medium" style={{ marginBottom: "8px" }}>
                Speaker
              </Text>
              <Select
                value={quickSpeaker}
                onChange={(event) => setQuickSpeaker(event.currentTarget.value)}
                fontSize={1}
              >
                <option value="host">Host</option>
                <option value="guest">Guest</option>
                <option value="other">Other</option>
              </Select>
            </Box>

            {/* Action Buttons */}
            <Flex gap={2}>
              <Button
                icon={ClockIcon}
                text="Add Timestamp"
                tone="primary"
                fontSize={1}
                disabled={!quickTimestamp.trim()}
                onClick={addTimestampBlock}
              />
              <Button
                icon={UserIcon}
                text="Add Speaker"
                tone="positive"
                fontSize={1}
                onClick={addSpeakerHeader}
              />
            </Flex>
          </Flex>

          {/* Helper Buttons */}
          <Flex gap={2}>
            <Button
              icon={AddIcon}
              text="Insert Template"
              mode="ghost"
              fontSize={1}
              onClick={insertTranscriptTemplate}
            />
          </Flex>
        </Stack>
      </Card>

      {/* Instructions */}
      <Card padding={3} tone="caution" radius={2}>
        <Stack space={2}>
          <Text weight="semibold" size={1}>
            💡 How to use:
          </Text>
          <Text size={1}>
            1. <strong>Paste your transcript</strong> directly into the editor
            below
          </Text>
          <Text size={1}>
            2. <strong>Use the buttons above</strong> to quickly add timestamps
            and speaker labels
          </Text>
          <Text size={1}>
            3. <strong>Use &ldquo;Speaker&rdquo; style</strong> for speaker
            names (H4 in the editor toolbar)
          </Text>
          <Text size={1}>
            4. <strong>Select text and use the timestamp annotation</strong> for
            clickable timestamps
          </Text>
        </Stack>
      </Card>

      {/* Note about the regular portable text editor */}
      <Card padding={3} tone="transparent" radius={2}>
        <Text size={1} muted>
          💡 The portable text editor will appear below when this field is
          configured in your episode schema.
        </Text>
      </Card>
    </Stack>
  );
};
