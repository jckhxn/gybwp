# Component Linking System

This document explains how to use the new component linking system that allows components to link to other components on the same page or different pages within the Sanity dashboard.

## Overview

The component linking system consists of:

1. **componentLink schema** - Sanity schema for defining links
2. **ComponentLink React component** - Handles link rendering and navigation
3. **Utility functions** - Helper functions for URL building and navigation
4. **Host page reference system** - Special handling for host profiles

## Sanity Schema Usage

### Basic componentLink Object

```typescript
defineField({
  name: "componentLink",
  type: "componentLink",
  title: "Component Link",
  description: "Link to another component or page",
});
```

### Link Types

#### 1. Same Page Component Link

Links to another component on the same page using scroll behavior.

- **linkType**: `"samePage"`
- **targetComponentId**: ID of the target component (e.g., "about-section")
- **scrollBehavior**: `"smooth"` | `"auto"` | `"instant"`
- **scrollOffset**: Offset in pixels from top (useful for fixed headers)

#### 2. Different Page Component Link

Links to a component on a different page.

- **linkType**: `"differentPage"`
- **targetPage**: Reference to page/episode/person document
- **targetPageComponentId**: Optional ID of specific component on target page
- **openInNewTab**: Whether to open in new tab

#### 3. External URL

Links to external websites.

- **linkType**: `"external"`
- **externalUrl**: External URL
- **openInNewTab**: Whether to open in new tab

## React Component Usage

### Basic ComponentLink Usage

```tsx
import ComponentLink, { ComponentLinkData } from '@/src/components/ui/ComponentLink'

const linkData: ComponentLinkData = {
  linkType: 'samePage',
  targetComponentId: 'contact-section',
  linkText: 'Contact Us',
  scrollBehavior: 'smooth',
  scrollOffset: 80
}

<ComponentLink
  data={linkData}
  className="btn btn-primary"
>
  Click me to scroll to contact section
</ComponentLink>
```

### Page Builder Section with Component ID

```tsx
import { generateComponentId } from "@/src/lib/componentLink";

function MySection({ title, componentLink }) {
  const elementId = generateComponentId(title);

  return (
    <section id={elementId} className="py-12">
      <h2>{title}</h2>
      {componentLink && (
        <ComponentLink data={componentLink}>
          {componentLink.linkText}
        </ComponentLink>
      )}
    </section>
  );
}
```

### Hash Navigation Hook

For handling hash navigation on page load:

```tsx
import { useAppRouterComponentLinks } from "@/src/hooks/useComponentLinks";

function MyPage() {
  // Automatically handles hash navigation with 80px offset
  useAppRouterComponentLinks(80);

  return <div>{/* Your page content */}</div>;
}
```

## Host Page Reference System

For hosts (people with role "host-consultant"), you can now set up page references:

### 1. Configure Host Page Reference in Sanity

1. Go to the person document for a host
2. Fill out the "Page Reference" field:
   - **Link Type**: Choose "Different Page Component"
   - **Target Page**: Select the page (e.g., consulting page)
   - **Target Page Component ID**: Enter the component ID (e.g., "team-section")

### 2. Guest Route Behavior

When someone visits `/guest/host-slug`:

- If the host has a `pageReference` configured, they'll be redirected to that specific page and component
- If no `pageReference` is set, they'll be redirected to `/consulting#profile` (fallback)

## Utility Functions

### generateComponentId

Converts a title to a URL-friendly component ID:

```tsx
generateComponentId("Contact Us Section"); // Returns: "contact-us-section"
```

### buildComponentLinkUrl

Builds the complete URL for a component link:

```tsx
const url = buildComponentLinkUrl(componentLinkData);
```

### handleHashScroll

Manually scroll to a component by hash:

```tsx
handleHashScroll("#contact-section", 80, "smooth");
```

## Example Implementations

### Section Schema with Component Link

```typescript
defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "primaryButton",
      type: "object",
      title: "Primary Button",
      fields: [
        defineField({
          name: "text",
          type: "string",
          title: "Button Text",
        }),
        defineField({
          name: "componentLink",
          type: "componentLink",
          title: "Button Link",
          description: "Where should this button link to?",
        }),
      ],
    }),
  ],
});
```

### React Component Implementation

```tsx
function HeroSection({ title, primaryButton }) {
  const sectionId = generateComponentId(title);

  return (
    <section id={sectionId} className="hero">
      <h1>{title}</h1>

      {primaryButton?.componentLink && (
        <ComponentLink
          data={primaryButton.componentLink}
          className="btn btn-primary"
        >
          {primaryButton.text}
        </ComponentLink>
      )}
    </section>
  );
}
```

## Best Practices

1. **Always use meaningful component IDs** - Use the `generateComponentId` function for consistency
2. **Set appropriate scroll offsets** - Account for fixed headers (typically 60-100px)
3. **Provide fallback behavior** - Handle cases where target components don't exist
4. **Use semantic HTML** - Ensure accessibility with proper link/button semantics
5. **Test hash navigation** - Verify that direct URL access with hashes works correctly

## Benefits

1. **Flexible Navigation** - Link to any component on any page
2. **Better UX** - Smooth scrolling and precise positioning
3. **Content Management** - Non-technical users can set up complex navigation
4. **SEO Friendly** - Proper URL structure with meaningful anchors
5. **Future Proof** - Easy to extend with new link types and behaviors
