# Dynamic Button System with Dark Theme UI

## Overview

The component linking system now features a beautiful dark-themed UI that integrates seamlessly with Sanity Studio's design system. The interface provides clear options for using either the new advanced component linking or falling back to the simple text/link approach.

## New Features

### 🎨 Dark Theme Component Selector

- **Responsive Design**: Adapts to Sanity Studio's color scheme variables
- **Enhanced Visibility**: Uses proper contrast and visual hierarchy
- **Emoji Indicators**: Clear visual feedback for different states
- **Smooth Animations**: Hover effects and transitions for better UX

### 🔄 Dynamic Fallback System

The button system automatically chooses the appropriate data source:

1. **Advanced Component Link** (if configured)
   - Same page component linking
   - Different page component linking
   - External URL linking
2. **Legacy Text/Link Fields** (if component link is not configured)
   - Simple text field
   - Simple URL field

### 🗑️ Easy Reset/Unselect Option

- **Clear Button**: Trash icon button to completely remove component link configuration
- **Automatic Fallback**: When cleared, the system automatically uses the legacy text/link fields
- **Visual Feedback**: Clear indication of which mode is active

## How to Use

### For Editors

#### Using Simple Text/Link (Legacy Mode)

1. Leave the "Component Link" section empty or click the trash button to clear it
2. Fill in the "Button Text" and "Button Link" fields
3. The button will work as a standard link

#### Using Advanced Component Linking

1. Click "Enable Advanced Linking" in the Component Link section
2. Choose your link type:
   - **Same Page Component**: Links to a section on the current page
   - **Different Page Component**: Links to a section on another page
   - **External URL**: Links to an external website
3. Configure the specific options for your chosen link type
4. The simple text/link fields will be ignored while this is active

#### Switching Between Modes

- To switch from advanced to simple: Click the trash button in the Component Link section
- To switch from simple to advanced: Click "Enable Advanced Linking"

### Component ID Selector Features

#### Smart Suggestions

- **Auto-Detection**: Automatically detects available section IDs from the current page
- **Live Search**: Filter suggestions as you type
- **Custom IDs**: Enter any custom component ID
- **Visual Feedback**: Clear indication of available vs custom IDs

#### Dark Theme Elements

- **Proper Contrast**: Uses Sanity's CSS variables for consistent theming
- **Hover Effects**: Smooth color transitions on hover
- **Icon Indicators**: Emojis for different states (📍 for available, ✏️ for custom, etc.)
- **Monospace Font**: Component IDs displayed in code-friendly font

## Technical Implementation

### CSS Variables Used

- `--card-bg-color`: Background color for cards and inputs
- `--card-fg-color`: Foreground text color
- `--card-border-color`: Border color for elements
- `--card-muted-bg-color`: Muted background for hover states
- `--card-muted-fg-color`: Muted text color for secondary text

### Components

- `ComponentLinkInput.tsx`: Main wrapper for the entire component link object
- `ComponentIdInput.tsx`: Specialized input for component ID selection with dark theme
- `SmartButton.tsx`: React component that handles the dynamic fallback logic

## Example Usage in Schema

```typescript
{
  name: "primaryButton",
  type: "object",
  title: "Primary Button",
  fields: [
    // Legacy fields (always available as fallback)
    defineField({
      name: "text",
      type: "string",
      title: "Button Text",
      initialValue: "Click Me",
    }),
    defineField({
      name: "link",
      type: "string",
      title: "Button Link",
      initialValue: "/example",
    }),
    // Advanced component linking (optional)
    defineField({
      name: "componentLink",
      type: "componentLink",
      title: "Component Link",
      description: "Advanced linking options - use this instead of the simple link field for more control",
    }),
  ],
}
```

## Example Usage in React

```tsx
import { SmartButton } from "@/src/components/ui/SmartButton";

// The SmartButton automatically handles both modes
<SmartButton
  data={buttonData} // Contains both legacy and componentLink fields
  className="your-button-styles"
>
  Fallback Button Text
</SmartButton>;
```

## Benefits

### For Editors

- **No Learning Curve**: Can continue using simple text/link fields
- **Progressive Enhancement**: Can upgrade to advanced linking when needed
- **Clear Visual Feedback**: Always know which mode is active
- **Easy Switching**: One-click toggle between modes

### For Developers

- **Backward Compatibility**: Existing content continues to work
- **Future-Proof**: New advanced features available when needed
- **Server-Safe**: All components work with Next.js App Router
- **Type-Safe**: Full TypeScript support for both modes

### For Users

- **Seamless Experience**: Links work consistently regardless of configuration method
- **Better Performance**: Smart routing and scrolling optimizations
- **Accessibility**: Proper focus management and ARIA attributes
