import React, { useState, useCallback } from "react";
import {
  Stack,
  Button,
  TextInput,
  Flex,
  Text,
  Dialog,
  Box,
  Switch,
} from "@sanity/ui";
import { ClockIcon, EditIcon } from "@sanity/icons";
import { PatchEvent, set, unset } from "sanity";

interface TimestampAnnotationProps {
  value?: {
    time?: string;
    keyMoment?: boolean;
  };
  onChange: (event: PatchEvent) => void;
  onClose?: () => void;
  onSave?: (data: { time: string; keyMoment: boolean }) => void;
}

export const TimestampAnnotationInput: React.FC<TimestampAnnotationProps> = ({
  value = {},
  onChange,
  onClose,
  onSave,
}) => {
  const [time, setTime] = useState(value.time || "");
  const [keyMoment, setKeyMoment] = useState(value.keyMoment || false);

  const handleSave = useCallback(() => {
    if (time) {
      const timestampData = { time, keyMoment };

      // Call onSave if provided (for custom handling)
      if (onSave) {
        onSave(timestampData);
      } else {
        // Default behavior: update via onChange
        onChange(PatchEvent.from(set(timestampData)));
      }
    } else {
      onChange(PatchEvent.from(unset()));
    }
    onClose?.();
  }, [time, keyMoment, onChange, onClose, onSave]);

  const formatTimestamp = (timestamp: string) => {
    // Convert various formats to MM:SS or HH:MM:SS
    const cleaned = timestamp.replace(/[^\d:]/g, "");
    const parts = cleaned.split(":").filter((p) => p);

    if (parts.length === 1 && parts[0].length <= 2) {
      // Just seconds: "30" -> "0:30"
      return `0:${parts[0].padStart(2, "0")}`;
    } else if (parts.length === 1 && parts[0].length > 2) {
      // MMSS format: "123" -> "1:23"
      const str = parts[0];
      const minutes = str.slice(0, -2) || "0";
      const seconds = str.slice(-2);
      return `${minutes}:${seconds}`;
    } else if (parts.length === 2) {
      const [min, sec] = parts;
      return `${parseInt(min)}:${sec.padStart(2, "0")}`;
    } else if (parts.length === 3) {
      const [hr, min, sec] = parts;
      return `${parseInt(hr)}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
    }
    return timestamp;
  };

  const quickInsert = (timeValue: string) => {
    const formatted = formatTimestamp(timeValue);
    setTime(formatted);
  };

  return (
    <Stack space={3}>
      <Text weight="medium">Add Timestamp</Text>

      {/* Quick timestamp buttons */}
      <Flex gap={2} wrap="wrap">
        <Button
          text="0:00"
          mode="ghost"
          onClick={() => quickInsert("0:00")}
          fontSize={1}
        />
        <Button
          text="Current"
          mode="ghost"
          onClick={() => {
            // In a real implementation, you might get the current time from a video player
            const now = new Date();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            quickInsert(`${minutes}:${seconds.toString().padStart(2, "0")}`);
          }}
          fontSize={1}
        />
      </Flex>

      <TextInput
        value={time}
        onChange={(event) => setTime(event.currentTarget.value)}
        placeholder="e.g., 1:23 or 1:23:45"
        onBlur={() => {
          if (time) {
            setTime(formatTimestamp(time));
          }
        }}
      />

      <Flex align="center" gap={2}>
        <Switch checked={keyMoment} onChange={() => setKeyMoment(!keyMoment)} />
        <Text size={1}>Mark as key moment ⭐</Text>
      </Flex>

      <Flex gap={2} justify="flex-end">
        <Button text="Cancel" mode="ghost" onClick={onClose} />
        <Button
          text="Insert"
          tone="primary"
          onClick={handleSave}
          disabled={!time}
          icon={ClockIcon}
        />
      </Flex>
    </Stack>
  );
};

// Custom annotation render component for the editor
export const TimestampAnnotationRender = ({ children, value }: any) => {
  return (
    <span
      style={{
        backgroundColor: "#e6f3ff",
        padding: "2px 4px",
        borderRadius: "3px",
        border: "1px solid #b3d9ff",
        fontSize: "0.85em",
        fontWeight: "bold",
        color: "#0066cc",
      }}
    >
      {value?.keyMoment && <span style={{ marginRight: "2px" }}>⭐</span>}[
      {value?.time || "??:??"}]{children}
    </span>
  );
};
