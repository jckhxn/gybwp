// sanity/components/TranscriptEditor.tsx
import React, { useState, useCallback } from "react";
import {
  Stack,
  Button,
  TextInput,
  Card,
  Flex,
  Text,
  Badge,
  Dialog,
  Box,
} from "@sanity/ui";
import { AddIcon, TrashIcon, EditIcon } from "@sanity/icons";
import { PatchEvent, set, unset, insert } from "sanity";

interface TranscriptSegment {
  timestamp: string;
  speaker?: string;
  text: string;
  keyMoment?: boolean;
}

interface TranscriptEditorProps {
  value?: TranscriptSegment[];
  onChange: (event: PatchEvent) => void;
}

export const TranscriptEditor: React.FC<TranscriptEditorProps> = ({
  value = [],
  onChange,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newSegment, setNewSegment] = useState<TranscriptSegment>({
    timestamp: "",
    speaker: "host",
    text: "",
    keyMoment: false,
  });

  const addSegment = useCallback(() => {
    if (newSegment.timestamp && newSegment.text) {
      const newValue = [...value, newSegment];
      // Sort by timestamp
      newValue.sort(
        (a, b) => timeToSeconds(a.timestamp) - timeToSeconds(b.timestamp)
      );

      onChange(PatchEvent.from(set(newValue)));
      setNewSegment({
        timestamp: "",
        speaker: "host",
        text: "",
        keyMoment: false,
      });
    }
  }, [value, newSegment, onChange]);

  const removeSegment = useCallback(
    (index: number) => {
      const newValue = value.filter((_, i) => i !== index);
      onChange(PatchEvent.from(set(newValue)));
    },
    [value, onChange]
  );

  const timeToSeconds = (timestamp: string): number => {
    const parts = timestamp.split(":").map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
  };

  const formatTimestamp = (input: string): string => {
    // Auto-format as user types
    const numbers = input.replace(/\D/g, "");
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, -2)}:${numbers.slice(-2)}`;
    } else {
      return `${numbers.slice(0, -4)}:${numbers.slice(-4, -2)}:${numbers.slice(-2)}`;
    }
  };

  return (
    <Stack space={4}>
      {/* Add New Segment */}
      <Card padding={3} border>
        <Stack space={3}>
          <Text weight="semibold">Add New Transcript Segment</Text>

          <Flex gap={2}>
            <TextInput
              placeholder="1:23 or 1:23:45"
              value={newSegment.timestamp}
              onChange={(e) =>
                setNewSegment({
                  ...newSegment,
                  timestamp: formatTimestamp(e.currentTarget.value),
                })
              }
              style={{ fontFamily: "monospace", width: "120px" }}
            />

            <select
              value={newSegment.speaker}
              onChange={(e) =>
                setNewSegment({
                  ...newSegment,
                  speaker: e.target.value,
                })
              }
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="host">Host</option>
              <option value="guest">Guest</option>
              <option value="cohost">Co-host</option>
              <option value="other">Other</option>
            </select>
          </Flex>

          <TextInput
            placeholder="Transcript text..."
            value={newSegment.text}
            onChange={(e) =>
              setNewSegment({
                ...newSegment,
                text: e.currentTarget.value,
              })
            }
          />

          <Flex gap={2} align="center">
            <label
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input
                type="checkbox"
                checked={newSegment.keyMoment}
                onChange={(e) =>
                  setNewSegment({
                    ...newSegment,
                    keyMoment: e.target.checked,
                  })
                }
              />
              Key Moment
            </label>

            <Button
              icon={AddIcon}
              text="Add Segment"
              tone="primary"
              onClick={addSegment}
              disabled={!newSegment.timestamp || !newSegment.text}
            />
          </Flex>
        </Stack>
      </Card>

      {/* Existing Segments */}
      <Stack space={2}>
        {value.map((segment, index) => (
          <Card key={index} padding={3} border>
            <Flex justify="space-between" align="flex-start">
              <Stack space={2} flex={1}>
                <Flex gap={2} align="center">
                  <Badge tone="primary" style={{ fontFamily: "monospace" }}>
                    {segment.timestamp}
                  </Badge>

                  <Badge tone="default">{segment.speaker}</Badge>

                  {segment.keyMoment && (
                    <Badge tone="positive">⭐ Key Moment</Badge>
                  )}
                </Flex>

                <Text>{segment.text}</Text>
              </Stack>

              <Button
                icon={TrashIcon}
                mode="ghost"
                tone="critical"
                onClick={() => removeSegment(index)}
              />
            </Flex>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};
