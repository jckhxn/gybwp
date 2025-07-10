"use client";

import React, { useState, useEffect, useMemo } from "react";
import { TextInput, Button, Flex, Text, Card } from "@sanity/ui";
import { StringInputProps, useFormValue, set, unset } from "sanity";
import { TrashIcon } from "@sanity/icons";
import { generateComponentId } from "@/src/lib/generateComponentId";

// Custom input component for component IDs that shows available IDs
export function ComponentIdInput(props: StringInputProps) {
  const [availableIds, setAvailableIds] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get the current document to extract section IDs
  const document = useFormValue([]) as any;

  // Extract component IDs from the current document
  const extractedIds = useMemo(() => {
    if (!document) {
      return [];
    }

    const ids: string[] = [];

    // Function to extract IDs from a section
    const extractFromSection = (section: any, index: number) => {
      if (!section || !section._type) return;

      let sectionId = "";

      // Use explicit sectionId if available
      if (section.sectionId) {
        sectionId = section.sectionId;
      }
      // Generate from title
      else if (section.title) {
        sectionId = generateComponentId(section.title);
      }
      // Generate from name
      else if (section.name) {
        sectionId = generateComponentId(section.name);
      }
      // Generate from heading
      else if (section.heading) {
        sectionId = generateComponentId(section.heading);
      }
      // Fallback to section type
      else {
        sectionId = `${section._type}-${index + 1}`;
      }

      if (sectionId && !ids.includes(sectionId)) {
        ids.push(sectionId);
      }
    };

    // Handle different document structures
    if (document.sections && Array.isArray(document.sections)) {
      // Standard page with sections array
      document.sections.forEach(extractFromSection);
    } else if (document.sectionsBody && Array.isArray(document.sectionsBody)) {
      // Page with sectionsBody array
      document.sectionsBody.forEach(extractFromSection);
    } else if (document.pageBuilder && Array.isArray(document.pageBuilder)) {
      // Page with pageBuilder array
      document.pageBuilder.forEach(extractFromSection);
    }

    // Add common default IDs that might be present
    const commonIds = [
      "hero-section",
      "episode-player",
      "episode-overview",
      "episode-transcript",
      "episode-guests",
      "episode-sponsors",
      "related-episodes",
      "page-header",
      "page-footer",
      "navigation",
      "subscribe-section",
      "newsletter-section",
    ];

    // Only add common IDs if no document-specific IDs were found
    if (ids.length === 0) {
      ids.push(...commonIds);
    }

    return ids.sort();
  }, [document]);

  // Update available IDs when document changes
  useEffect(() => {
    setAvailableIds(extractedIds);
  }, [extractedIds]);

  // Filter suggestions based on input value
  useEffect(() => {
    if (props.value && props.value.length > 0) {
      const filtered = availableIds.filter((id) =>
        id.toLowerCase().includes(props.value!.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(availableIds.slice(0, 10)); // Limit to first 10 for better UX
    }
  }, [props.value, availableIds]);

  const handleSuggestionClick = (id: string) => {
    props.onChange(set(id));
    setShowSuggestions(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(set(event.target.value));
  };

  const handleClear = () => {
    props.onChange(unset());
    setShowSuggestions(false);
  };

  return (
    <Card padding={1} radius={2} tone="transparent">
      <Flex direction="column" gap={2}>
        {/* Input field with clear button */}
        <Flex gap={2} align="center">
          <div style={{ flex: 1, position: "relative" }}>
            <TextInput
              value={props.value || ""}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Enter component ID or select from suggestions below"
              style={{
                backgroundColor: "var(--card-bg-color)",
                color: "var(--card-fg-color)",
                border: "1px solid var(--card-border-color)",
              }}
            />

            {showSuggestions && (
              <Card
                padding={0}
                radius={2}
                shadow={2}
                tone="default"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  maxHeight: "300px",
                  overflowY: "auto",
                  marginTop: "4px",
                  backgroundColor: "var(--card-bg-color)",
                  border: "1px solid var(--card-border-color)",
                }}
              >
                <Card
                  padding={2}
                  tone="caution"
                  style={{ borderRadius: "6px 6px 0 0" }}
                >
                  <Text size={1} style={{ color: "var(--card-fg-color)" }}>
                    {availableIds.length > 0
                      ? "📍 Available Component IDs from this page:"
                      : "✏️ No sections found. Enter a custom ID:"}
                  </Text>
                </Card>

                {suggestions.length > 0 ? (
                  suggestions.map((id, index) => (
                    <Card
                      key={index}
                      padding={2}
                      tone="default"
                      style={{
                        cursor: "pointer",
                        borderBottom:
                          index < suggestions.length - 1
                            ? "1px solid var(--card-border-color)"
                            : "none",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseDown={() => handleSuggestionClick(id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--card-muted-bg-color)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <Text
                        size={1}
                        style={{
                          color: "var(--card-fg-color)",
                          fontFamily: "monospace",
                        }}
                      >
                        #{id}
                      </Text>
                    </Card>
                  ))
                ) : (
                  <Card padding={3} tone="transparent">
                    <Text
                      size={1}
                      style={{
                        color: "var(--card-muted-fg-color)",
                        fontStyle: "italic",
                      }}
                    >
                      {props.value
                        ? "🔍 No matching component IDs found"
                        : "💡 Type to search or enter custom ID"}
                    </Text>
                  </Card>
                )}
              </Card>
            )}
          </div>

          {/* Clear button */}
          {props.value && (
            <Button
              icon={TrashIcon}
              mode="ghost"
              tone="critical"
              onClick={handleClear}
              title="Clear component link (use legacy text/link fields instead)"
              style={{ flexShrink: 0 }}
            />
          )}
        </Flex>

        {/* Help text */}
        <Card padding={2} tone="primary" radius={1}>
          <Text size={1} style={{ color: "var(--card-fg-color)" }}>
            💡 <strong>Tip:</strong> Use the trash button to clear this field
            and fall back to the simple text/link fields above.
          </Text>
        </Card>
      </Flex>
    </Card>
  );
}
