# Dynamic Button System Guide

## Overview

Our button system now supports **dynamic linking** - buttons automatically choose between the new advanced component linking system and the legacy text/link approach based on what data is available.

## How It Works

When you configure a button in Sanity Studio, the system will use this priority order:

1. **Component Link** (if configured) - Use the advanced component linking features
2. **Legacy Text/Link** (if no component link) - Use the simple text and link fields
3. **Fallback** - Use component defaults if neither is configured

## For Editors

### Setting Up Buttons

#### Option 1: Simple Text + Link (Legacy)

This is the easiest option for basic navigation:

1. Set the "Button Text" field (e.g., "Learn More")
2. Set the "Button Link" field (e.g., "/about")
3. Leave the "Component Link" field empty

The button will work as a simple link.

#### Option 2: Advanced Component Link (New)

For more advanced functionality like scrolling to sections:

1. Leave "Button Text" and "Button Link" empty (or set them as fallbacks)
2. Configure the "Component Link" field:
   - **Link Type**: Choose from:
     - "Same Page" - Scroll to a section on the current page
     - "Different Page" - Navigate to another page and optionally scroll to a section
     - "External" - Link to an external website
   - **Link Text**: What the button should say
   - **Target**: Depending on link type, choose the target section or page
   - **Behavior**: Scroll behavior, offset, and other options

### Examples

#### Simple Link Button

```
Button Text: "View Episodes"
Button Link: "/episodes"
Component Link: (empty)
```

#### Scroll to Section on Same Page

```
Button Text: (empty or fallback)
Button Link: (empty or fallback)
Component Link:
  - Link Type: "Same Page"
  - Link Text: "Learn More"
  - Target Component: "about-section"
  - Scroll Behavior: "smooth"
  - Scroll Offset: 80
```

#### Navigate to Different Page and Scroll

```
Component Link:
  - Link Type: "Different Page"
  - Link Text: "Read This Episode"
  - Target Page: "Episode: Building Teams"
  - Target Component: "episode-transcript"
  - Open in New Tab: false
```

#### External Link

```
Component Link:
  - Link Type: "External"
  - Link Text: "Visit Our Sponsor"
  - External URL: "https://example.com"
  - Open in New Tab: true
```

## For Developers

### Using SmartButton Component

```tsx
import { SmartButton } from "@/src/components/ui/SmartButton";

// Button data from Sanity (can have legacy or new format)
const buttonData = {
  // Legacy fields (optional)
  text: "Listen Now",
  link: "/episodes",

  // New componentLink field (optional)
  componentLink: {
    linkType: "samePage",
    linkText: "Scroll to Player",
    targetComponentId: "episode-player",
    scrollBehavior: "smooth",
    scrollOffset: 80,
  },
};

// SmartButton automatically chooses the right approach
<SmartButton
  data={buttonData}
  className="btn btn-primary"
  fallbackText="Default Text"
  fallbackLink="/default"
>
  Optional children content
</SmartButton>;
```

### Priority Logic

The SmartButton component uses this logic:

```javascript
// 1. Check if componentLink exists and has linkType
const hasComponentLink = data?.componentLink && data.componentLink.linkType;

// 2. For text: componentLink.linkText > data.text > fallbackText > children
const buttonText = hasComponentLink
  ? data.componentLink.linkText || children
  : data.text || fallbackText || children;

// 3. For link: componentLink takes priority, otherwise use legacy link
const useComponentLink = hasComponentLink;
const legacyLink = !useComponentLink ? data.link || fallbackLink : null;
```

### Backward Compatibility

All existing buttons continue to work without any changes:

```tsx
// This still works exactly as before
const oldButtonData = {
  text: "Click Me",
  link: "/some-page",
};

<SmartButton data={oldButtonData} />;
```

## Available Components with Dynamic Buttons

### Home Hero Section

- **Primary Button**: Main call-to-action (e.g., "Listen Now")
- **Secondary Button**: Secondary action (e.g., "About Jeff")

### Consulting CTA Section

- **CTA Button**: Call-to-action button (e.g., "Get in Touch")

More sections can easily be updated to use dynamic buttons by:

1. Adding the `componentLink` field to their Sanity schema
2. Updating their React component to use `SmartButton`

## Migration Strategy

### For Existing Content

- No immediate action required - all existing buttons continue to work
- Gradually migrate important buttons to use component linking when needed
- Legacy text/link fields serve as fallbacks

### For New Content

- Use component linking for any buttons that need to scroll to sections
- Use simple text/link for basic navigation
- Use external links for sponsor links, social media, etc.

## Technical Details

### Server Safety

- All components are server-safe by default
- Client-side navigation is handled in the SmartButton component
- Hash-based scrolling is managed by the ComponentLinksProvider

### Performance

- No unnecessary re-renders or useEffect dependencies
- Smooth scrolling with configurable offsets
- Automatic cleanup of event listeners

### TypeScript Support

Full TypeScript support with proper type definitions:

```tsx
interface SmartButtonData extends Partial<ComponentLinkData> {
  text?: string; // Legacy text field
  link?: string; // Legacy link field
  componentLink?: ComponentLinkData; // New component link
}
```

## Testing the System

### In Sanity Studio

1. Open a page with hero sections
2. Try configuring buttons using only the legacy text/link fields
3. Try configuring buttons using only the component link field
4. Try mixing both approaches and see how the priority system works

### In the Frontend

1. Verify that legacy buttons still work as expected
2. Test same-page scrolling with component links
3. Test cross-page navigation with component links
4. Test external links with proper new tab behavior

## Common Use Cases

### Homepage Hero Buttons

- **Primary**: Often links to episodes or main content
- **Secondary**: Often links to about page or specific sections

### Call-to-Action Sections

- **Contact buttons**: Link to contact forms or contact sections
- **Learn more buttons**: Scroll to detailed sections on same page
- **External buttons**: Link to social media, sponsors, etc.

### Navigation Enhancement

- **Anchor links**: Smooth scroll to page sections
- **Deep links**: Link directly to specific content areas
- **Cross-page jumps**: Navigate and scroll in one action

## Common Issues and Solutions

### Scroll Behavior Not Working

**Problem**: Scroll behavior errors or buttons not scrolling to target components.

**Solutions**:

1. **Check Element ID**: Ensure the target component has the correct ID in the DOM
2. **Verify Scroll Behavior**: Use valid values: "smooth", "auto", or "instant"
3. **Adjust Scroll Offset**: Account for fixed headers (typically 80px)
4. **Check Browser Console**: Look for warnings about missing elements

**Example Configuration**:

```
Component Link:
  - Link Type: "Same Page"
  - Target Component: "episode-player" (must match actual DOM ID)
  - Scroll Behavior: "smooth"
  - Scroll Offset: 80
```

**Debugging Tips**:

- Open browser dev tools and check if `document.getElementById('your-target-id')` returns the element
- Verify the target component renders with the expected ID
- Check console for warnings about missing elements

### Legacy vs Component Link Priority

**Problem**: Button using wrong text/link even when component link is configured.

**Solution**: The system uses this priority:

1. If `componentLink` has `linkType` set → use component link
2. Otherwise → use legacy `text`/`link` fields
3. Clear the `linkType` field to force legacy mode

### Cross-Page Navigation Issues

**Problem**: Navigation to different pages with hash scrolling doesn't work.

**Solutions**:

1. **Verify Page Structure**: Ensure target page has ComponentLinksProvider
2. **Check URL Format**: URLs should be like `/page-name#component-id`
3. **Increase Timeout**: Page load might need more time (we use 500ms)

### Scroll Offset Problems

**Problem**: Scrolling goes to wrong position due to fixed headers.

**Solution**: Adjust the scroll offset value:

- No fixed header: `0`
- Small header: `60-80px`
- Large header: `100-120px`
- Multiple fixed elements: Add their heights together

This dynamic system provides the best of both worlds - simple configuration for basic needs and powerful features for advanced use cases, all while maintaining complete backward compatibility.
