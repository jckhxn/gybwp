"use client";

import React from "react";
import { ObjectInputProps, set, unset } from "sanity";
import { Card, Flex, Text, Button, Stack } from "@sanity/ui";
import { TrashIcon, LinkIcon } from "@sanity/icons";

// Custom input component for the entire componentLink object
export function ComponentLinkInput(props: ObjectInputProps) {
  const { value, onChange, renderDefault } = props;
  const hasValue = value && Object.keys(value).length > 0;

  const handleClear = () => {
    onChange(unset());
  };

  const handleEnable = () => {
    onChange(set({ linkType: "samePage" }));
  };

  if (!hasValue) {
    return (
      <Card padding={3} radius={2} tone="primary">
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <LinkIcon />
            <Text weight="semibold">Advanced Component Linking</Text>
          </Flex>

          <Text size={1} style={{ color: "var(--card-muted-fg-color)" }}>
            Enable advanced linking to link to specific sections on this page,
            other pages, or external URLs. If you don&apos;t enable this, the
            simple text and link fields above will be used instead.
          </Text>

          <Button
            text="Enable Advanced Linking"
            tone="primary"
            onClick={handleEnable}
            icon={LinkIcon}
          />
        </Stack>
      </Card>
    );
  }

  return (
    <Card padding={3} radius={2} tone="positive">
      <Stack space={3}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={2}>
            <LinkIcon />
            <Text weight="semibold" style={{ color: "var(--card-fg-color)" }}>
              ✅ Advanced Component Linking Enabled
            </Text>
          </Flex>

          <Button
            icon={TrashIcon}
            mode="ghost"
            tone="critical"
            onClick={handleClear}
            title="Disable advanced linking and use simple text/link fields instead"
          />
        </Flex>

        <Card padding={2} tone="caution" radius={1}>
          <Text size={1}>
            💡 <strong>Note:</strong> While this is enabled, the simple
            &ldquo;Button Text&rdquo; and &ldquo;Button Link&rdquo; fields above
            will be ignored. Click the trash button to disable advanced linking
            and go back to the simple approach.
          </Text>
        </Card>

        {/* Render the default componentLink fields */}
        {renderDefault(props)}
      </Stack>
    </Card>
  );
}
