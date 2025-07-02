import React, { useState } from "react";
import { Button, Dialog } from "@sanity/ui";
import { ClockIcon } from "@sanity/icons";
import { TimestampAnnotationInput } from "./TimestampAnnotation";

interface TimestampToolbarButtonProps {
  onInsert?: (timestamp: { time: string; keyMoment: boolean }) => void;
}

export const TimestampToolbarButton: React.FC<TimestampToolbarButtonProps> = ({
  onInsert,
}) => {
  const [open, setOpen] = useState(false);

  const handleInsertTimestamp = (timestampData: {
    time: string;
    keyMoment: boolean;
  }) => {
    onInsert?.(timestampData);
    setOpen(false);
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
          <TimestampAnnotationInput
            onChange={(patch) => {
              // The patch event contains the timestamp data
              // We'll handle it in a simpler way
              console.log("Patch received:", patch);
            }}
            onClose={() => setOpen(false)}
            onSave={handleInsertTimestamp}
          />
        </Dialog>
      )}
    </>
  );
};
