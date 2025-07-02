import React, { useState, useEffect } from "react";
import { Stack, Button, TextInput, Flex, Text } from "@sanity/ui";
import { PatchEvent, set, unset } from "sanity";
import { ClockIcon } from "@sanity/icons";

interface TimestampInputProps {
  value?: string;
  onChange: (event: PatchEvent) => void;
  placeholder?: string;
}

export const TimestampInput: React.FC<TimestampInputProps> = ({
  value = "",
  onChange,
  placeholder = "e.g., 1:23 or 1:23:45",
}) => {
  const [inputValue, setInputValue] = useState(value);

  // Sync with external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    setInputValue(newValue);

    if (newValue) {
      onChange(PatchEvent.from(set(newValue)));
    } else {
      onChange(PatchEvent.from(unset()));
    }
  };

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

  const handleBlur = () => {
    if (inputValue) {
      const formatted = formatTimestamp(inputValue);
      setInputValue(formatted);
      handleChange(formatted);
    }
  };

  const insertCurrentTime = () => {
    const now = new Date();
    const minutes = now.getMinutes().toString();
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const timestamp = `${minutes}:${seconds}`;

    setInputValue(timestamp);
    handleChange(timestamp);
  };

  const insertCommonTimes = (time: string) => {
    setInputValue(time);
    handleChange(time);
  };

  return (
    <Stack space={2}>
      <Flex gap={2} align="center">
        <TextInput
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          style={{
            fontFamily: "monospace",
            fontSize: "14px",
            minWidth: "100px",
          }}
        />
        <Button
          icon={ClockIcon}
          text="Now"
          mode="ghost"
          onClick={insertCurrentTime}
          fontSize={1}
          title="Insert current time (MM:SS)"
        />
      </Flex>

      {/* Quick time buttons */}
      <Flex gap={1} wrap="wrap">
        {["0:00", "0:30", "1:00", "2:00", "5:00"].map((time) => (
          <Button
            key={time}
            text={time}
            mode="ghost"
            fontSize={0}
            padding={1}
            onClick={() => insertCommonTimes(time)}
            style={{ fontFamily: "monospace" }}
          />
        ))}
      </Flex>

      {inputValue && inputValue !== formatTimestamp(inputValue) && (
        <Text size={1} muted style={{ fontFamily: "monospace" }}>
          Will format as: {formatTimestamp(inputValue)}
        </Text>
      )}
    </Stack>
  );
};
