# Page Builder Architecture

This document explains the new page builder system that allows creating pages from reusable components defined in Sanity.

## 🎯 Goal

Transform standalone pages into modular, component-based pages where:

- Page structure is defined in Sanity CMS
- Components are reusable across different pages
- Content editors can build pages by composing sections
- Data fetching is handled efficiently per component

## 🏗️ Architecture Overview

### Current Structure

```
src/app/(website)/
├── page.tsx                    # Home page (with feature flag)
├── components/
│   └── HomePage/
│       ├── index.tsx           # Current standalone HomePage
│       └── PageBuilderHomePage.tsx # New page builder version
│
components/
├── Page.tsx                    # Page renderer
└── sections/
    ├── index.tsx              # Section registry
    ├── episodes/
    │   ├── LatestEpisodeSection.tsx
    │   └── BrowseEpisodesSection.tsx
    ├── shared/
    │   ├── NewsletterSection.tsx
    │   └── FeaturedNewsSection.tsx
    └── hero/
        └── HomeHero.tsx

sanity/schemas/
├── documents/
│   └── homePage.ts            # Home page schema
└── sections/                  # Section schemas
    ├── homeHero.ts
    ├── latestEpisode.ts
    ├── browseEpisodes.ts
    ├── newsletter.ts
    └── featuredNews.ts
```

### How It Works

1. **Page Schema**: Defines page structure in Sanity with `sectionsBody` array
2. **Section Registry**: Maps section types to React components
3. **Page Component**: Renders sections based on Sanity data
4. **Section Components**: Wrap existing components for page builder compatibility

## 🚀 Getting Started

### Switch to Page Builder (Development)

```bash
# Enable page builder for development
export NEXT_PUBLIC_USE_PAGE_BUILDER=true

# Or add to .env.local
echo "NEXT_PUBLIC_USE_PAGE_BUILDER=true" >> .env.local
```

### Current Sections Available

- `homeHero` - Hero section with title, description, and CTA buttons
- `latestEpisode` - Latest episode showcase
- `browseEpisodes` - Episode browsing grid
- `newsletter` - Newsletter signup form
- `featuredNews` - Featured news articles

## 📝 Creating New Sections

### 1. Create Section Schema

```typescript
// sanity/schemas/sections/mySection.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "mySection",
  title: "My Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
    }),
    // Add more fields as needed
  ],
});
```

### 2. Create Section Component

```typescript
// components/sections/shared/MySection.tsx
interface MySectionProps {
  section: {
    _type: "mySection";
    _key: string;
    title?: string;
  };
}

export function MySection({ section }: MySectionProps) {
  return (
    <section className="py-12">
      <h2>{section.title}</h2>
      {/* Section content */}
    </section>
  );
}
```

### 3. Register Section

```typescript
// components/sections/index.tsx
import { MySection } from "@/components/sections/shared/MySection";

export const sections = {
  // ...existing sections
  mySection: MySection,
};
```

### 4. Add to Page Schema

```typescript
// sanity/schemas/documents/homePage.ts
defineField({
  name: "sectionsBody",
  type: "array",
  title: "Page Sections",
  of: [
    // ...existing sections
    { type: "mySection" },
  ],
}),
```

## 🔄 Migration Strategy

### Phase 1: Parallel Development ✅

- ✅ Page builder infrastructure in place
- ✅ Feature flag system for switching
- ✅ Basic sections created
- ✅ HomePage has both versions

### Phase 2: Section Enhancement (Current)

- [ ] Enhance existing sections with full features
- [ ] Create comprehensive Hero section
- [ ] Add data fetching per section
- [ ] Improve type safety

### Phase 3: Content Migration

- [ ] Create home page document in Sanity
- [ ] Set up content for sections
- [ ] Test with real data

### Phase 4: Full Migration

- [ ] Switch default to page builder
- [ ] Remove old standalone pages
- [ ] Clean up legacy code

### Phase 5: Expansion

- [ ] Apply to other pages (About, Episodes, etc.)
- [ ] Create more section types
- [ ] Advanced page builder features

## 🎛️ Feature Flag Control

The system uses environment variables to control which version is used:

```bash
# Use old standalone HomePage
NEXT_PUBLIC_USE_PAGE_BUILDER=false

# Use new page builder HomePage
NEXT_PUBLIC_USE_PAGE_BUILDER=true
```

## 📊 Benefits

1. **Content Flexibility**: Editors can rearrange page sections
2. **Component Reusability**: Sections work across multiple pages
3. **Maintainability**: Single source of truth for components
4. **Performance**: Efficient data fetching per section
5. **Scalability**: Easy to add new section types

## 🎨 Example Page Configuration

```typescript
// Example home page structure
const homePageData = {
  sectionsBody: [
    {
      _type: "homeHero",
      title: "Growing Your Business With People",
      primaryButton: { text: "Listen Now", link: "/episodes" },
    },
    {
      _type: "latestEpisode",
    },
    {
      _type: "browseEpisodes",
    },
    {
      _type: "newsletter",
    },
  ],
};
```

## 🚧 Next Steps

1. **Enable page builder**: Set `NEXT_PUBLIC_USE_PAGE_BUILDER=true`
2. **Test functionality**: Verify all sections render correctly
3. **Enhance sections**: Add missing features and styling
4. **Create Sanity content**: Set up actual page documents
5. **Migrate other pages**: Apply system to About, Episodes, etc.

This architecture provides a foundation for a flexible, maintainable page building system while preserving the current functionality during the transition.
