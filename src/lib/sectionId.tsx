import React from "react";
import { generateComponentId } from "./generateComponentId";

// Re-export for convenience
export { generateComponentId };

/**
 * Generates a component ID for a section based on its schema and properties
 */
export function getComponentId(
  section: any,
  sectionType: string,
  index?: number
): string {
  // Use explicit sectionId if provided
  if (section?.sectionId) {
    return section.sectionId;
  }

  // Generate from title
  if (section?.title) {
    return generateComponentId(section.title);
  }

  // Generate from name
  if (section?.name) {
    return generateComponentId(section.name);
  }

  // Generate from heading
  if (section?.heading) {
    return generateComponentId(section.heading);
  }

  // Fallback to section type with index if provided
  if (typeof index === "number") {
    return `${sectionType}-${index + 1}`;
  }

  // Final fallback to just the section type
  return sectionType;
}

/**
 * Higher-order component that adds consistent ID management to section components
 */
export function withSectionId<T extends { section: any }>(
  Component: React.ComponentType<T>,
  sectionType: string
) {
  return function SectionWithId(props: T & { index?: number }) {
    const { section, index, ...rest } = props;
    const componentId = getComponentId(section, sectionType, index);

    return (
      <div id={componentId}>
        <Component {...(rest as T)} section={section} />
      </div>
    );
  };
}
