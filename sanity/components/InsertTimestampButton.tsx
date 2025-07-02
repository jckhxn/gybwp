import React, { useState } from "react";
import {
  Button,
  Dialog,
  Stack,
  TextInput,
  Switch,
  Text,
  Flex,
} from "@sanity/ui";
import { ClockIcon } from "@sanity/icons";

interface InsertTimestampButtonProps {
  onInsert: (timestamp: string) => void;
}

export const InsertTimestampButton: React.FC<InsertTimestampButtonProps> = ({
  onInsert,
}) => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const [keyMoment, setKeyMoment] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    const cleaned = timestamp.replace(/[^\d:]/g, "");
    const parts = cleaned.split(":").filter((p) => p);

    if (parts.length === 1 && parts[0].length <= 2) {
      return `0:${parts[0].padStart(2, "0")}`;
    } else if (parts.length === 1 && parts[0].length > 2) {
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

  const handleInsert = () => {
    if (time) {
      const formatted = formatTimestamp(time);
      const timestampText = `[${formatted}${keyMoment ? " ⭐" : ""}] `;
      onInsert(timestampText);
      setTime("");
      setKeyMoment(false);
      setOpen(false);
    }
  };

  const quickInsert = (timeValue: string) => {
    setTime(timeValue);
  };

  return (
    <>
      <Button
        icon={ClockIcon}
        mode="ghost"
        tone="default"
        title="Insert Timestamp"
        onClick={() => setOpen(true)}
      />

      {open && (
        <Dialog
          header="Insert Timestamp"
          id="timestamp-dialog"
          onClose={() => setOpen(false)}
          width={0}
        >
          <Stack space={4} padding={4}>
            <Text size={1}>
              Insert a timestamp at the current cursor position.
            </Text>

            {/* Quick timestamp buttons */}
            <Stack space={2}>
              <Text size={1} weight="medium">
                Quick Insert:
              </Text>
              <Flex gap={2} wrap="wrap">
                <Button
                  text="0:00"
                  mode="ghost"
                  onClick={() => quickInsert("0:00")}
                  fontSize={1}
                />
                <Button
                  text="5:00"
                  mode="ghost"
                  onClick={() => quickInsert("5:00")}
                  fontSize={1}
                />
                <Button
                  text="10:00"
                  mode="ghost"
                  onClick={() => quickInsert("10:00")}
                  fontSize={1}
                />
              </Flex>
            </Stack>

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
              <Switch
                checked={keyMoment}
                onChange={() => setKeyMoment(!keyMoment)}
              />
              <Text size={1}>Mark as key moment ⭐</Text>
            </Flex>

            <Flex gap={2} justify="flex-end">
              <Button
                text="Cancel"
                mode="ghost"
                onClick={() => setOpen(false)}
              />
              <Button
                text="Insert"
                tone="primary"
                onClick={handleInsert}
                disabled={!time}
                icon={ClockIcon}
              />
            </Flex>
          </Stack>
        </Dialog>
      )}
    </>
  );
};
