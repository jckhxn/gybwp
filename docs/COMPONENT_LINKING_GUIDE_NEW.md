# Component Linking System Guide

This guide explains how to use the robust component linking system in our Next.js/Sanity project.

## Overview

The component linking system allows components (sections) to link to other components on the same page or different pages, with support for automatic ID matching, host page references, and improved UX for editors.

## Key Features

- **Same-page component linking**: Scroll to components on the current page
- **Cross-page component linking**: Navigate to specific components on other pages
- **External URL support**: Link to external websites
- **Automatic ID generation**: Components automatically get IDs from their schema or content
- **Editor-friendly**: Dynamic dropdowns show available component IDs in Sanity Studio
- **Server-safe**: Works with Next.js App Router and server components

## Core Components

### 1. ComponentLink Schema (`componentLink.ts`)

The Sanity schema object that defines component links:

```typescript
// In your Sanity schemas
{
  name: 'mySection',
  type: 'object',
  fields: [
    // ... other fields
    {
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'componentLink', // <- Use the componentLink type
    }
  ]
}
```

### 2. ComponentLink React Component

Client-side component for rendering links:

```tsx
import ComponentLink from "@/src/components/ui/ComponentLink";

<ComponentLink data={linkData}>
  <button>Click me</button>
</ComponentLink>;
```

### 3. ComponentLinksProvider

Client component that handles hash-based navigation:

```tsx
// In your layout or page
import { ComponentLinksProvider } from "@/src/components/providers/ComponentLinksProvider";

export default function Layout({ children }) {
  return (
    <ComponentLinksProvider scrollOffset={80}>
      {children}
    </ComponentLinksProvider>
  );
}
```

## Usage Patterns

### Adding Links to Sections

1. **In your Sanity schema**, add a componentLink field:

```typescript
defineField({
  name: "ctaLink",
  title: "Call to Action Link",
  type: "componentLink",
});
```

2. **In your React component**, render the link:

```tsx
import ComponentLink from "@/src/components/ui/ComponentLink";

export function MySection({ section }) {
  return (
    <div>
      {/* Your section content */}

      {section.ctaLink && (
        <ComponentLink data={section.ctaLink}>
          <button className="btn">
            {section.ctaLink.linkText || "Learn More"}
          </button>
        </ComponentLink>
      )}
    </div>
  );
}
```

### Ensuring Components Have IDs

All section components should have proper IDs for linking:

```tsx
import { getComponentId } from "@/src/lib/sectionId";

export function MySection({ section, index }) {
  const componentId = getComponentId(section, "my-section", index);

  return <div id={componentId}>{/* Section content */}</div>;
}
```

### Setting Up Navigation

#### App Router (Recommended)

Add the ComponentLinksProvider to your root layout:

```tsx
// app/layout.tsx
import { ComponentLinksProvider } from "@/src/components/providers/ComponentLinksProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ComponentLinksProvider scrollOffset={80}>
          {children}
        </ComponentLinksProvider>
      </body>
    </html>
  );
}
```

#### Programmatic Navigation

For client components that need to trigger navigation:

```tsx
import { navigateToComponent } from "@/src/hooks/useComponentLinks";

function MyComponent() {
  const handleClick = () => {
    navigateToComponent("episode-player");
  };

  return <button onClick={handleClick}>Go to Player</button>;
}
```

## Schema Configuration

### Section IDs

All section schemas include a `sectionId` field:

```typescript
defineField({
  name: "sectionId",
  title: "Section ID",
  type: "string",
  description:
    "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
  placeholder: "my-section-name",
});
```

### Component Link Types

The `componentLink` schema supports three link types:

1. **Same Page Component** (`samePage`)

   - Links to a component on the current page
   - Uses the custom ComponentIdInput for easy selection
   - Shows available component IDs dynamically

2. **Different Page Component** (`differentPage`)

   - Links to a component on a different page
   - Requires selecting a target page reference
   - Optional component ID on the target page

3. **External URL** (`external`)
   - Links to external websites
   - Supports opening in new tab

## Best Practices

### Component ID Naming

1. **Use kebab-case**: `episode-player`, `about-section`
2. **Be descriptive**: `consulting-services` not `services`
3. **Include context**: `episode-transcript` not just `transcript`

### Section Implementation

1. **Always use getComponentId()** to generate consistent IDs
2. **Add sectionId to your schema** for manual override capability
3. **Wrap sections in divs** with the generated ID

### Editor Experience

1. **Use descriptive link text** in the componentLink
2. **Test links** in preview mode
3. **Use the dropdown suggestions** for same-page links

## Server Safety

The system is designed to work with Next.js App Router and server components:

- ✅ `ComponentLinksProvider` - Client component for navigation
- ✅ `ComponentLink` - Client component marked with "use client"
- ✅ `getComponentId()` - Server-safe utility function
- ✅ Navigation utilities check `typeof window`

## Troubleshooting

### Links Not Working

1. Check that target component has the correct ID in the DOM
2. Verify ComponentLinksProvider is set up in your layout
3. Ensure ComponentLink data is properly structured

### IDs Not Showing in Dropdown

1. Check that sections have `sectionId` fields in their schema
2. Verify the document structure matches expected format
3. Check browser console for ComponentIdInput errors

### Scroll Not Working

1. Verify scroll offset matches your header height
2. Check that target element is visible and not hidden
3. Ensure smooth scrolling is supported in the browser

## Advanced Usage

### Custom Scroll Behavior

```tsx
<ComponentLinksProvider scrollOffset={100}>{children}</ComponentLinksProvider>
```

### Conditional Links

```tsx
{
  section.ctaLink?.linkType && (
    <ComponentLink data={section.ctaLink}>
      <button>{section.ctaLink.linkText}</button>
    </ComponentLink>
  );
}
```

### Multiple Links

```tsx
{
  section.links?.map((link, index) => (
    <ComponentLink key={index} data={link}>
      <a>{link.linkText}</a>
    </ComponentLink>
  ));
}
```

## Migration from Old System

If you have existing code using the old hooks:

### Before (Client Components Only)

```tsx
import { useAppRouterComponentLinks } from "@/src/hooks/useComponentLinks";

function MyPage() {
  useAppRouterComponentLinks(80);
  return <div>...</div>;
}
```

### After (Server + Client Compatible)

```tsx
// In layout.tsx (once)
import { ComponentLinksProvider } from "@/src/components/providers/ComponentLinksProvider";

export default function Layout({ children }) {
  return (
    <ComponentLinksProvider scrollOffset={80}>
      {children}
    </ComponentLinksProvider>
  );
}

// In your pages (no hooks needed)
export default function MyPage() {
  return <div>...</div>;
}
```
