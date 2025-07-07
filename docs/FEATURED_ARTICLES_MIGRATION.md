# Featured Articles Schema Migration

## Overview

This document describes the migration from the deprecated `featuredArticle` schema to using a `featured` boolean flag on the main `article` schema.

## Changes Made

### 1. Schema Updates

- **Removed**: `featuredArticle` schema from both `/sanity/schemas/documents/featuredArticle.ts` and `/src/app/(website)/sanity/schemas/featuredArticles.tsx`
- **Updated**: `article` schema to include:
  - `featured` boolean field (marks articles as featured for dashboard display)
  - `image` field for article thumbnails
  - `publication` field for publication name
  - `excerpt` field for article previews
  - `description` field for detailed article descriptions
  - Enhanced preview with featured indicator (⭐ prefix)

### 2. Query Updates

- **Added**: `FEATURED_ARTICLES_QUERY` in all query files:

  - `/data/sanity/queries.ts`
  - `/src/app/(website)/lib/queries.ts`
  - `/src/lib/queries.ts`

- **Query Definition**:
  ```typescript
  export const FEATURED_ARTICLES_QUERY = groq`
    *[_type == "article" && featured == true] | order(_createdAt desc) {
      _id,
      company,
      title,
      link,
      date,
      image,
      excerpt,
      description,
      publication
    }
  `;
  ```

### 3. Component Updates

- **FeaturedNews Component**: Updated to use `FEATURED_ARTICLES_QUERY` instead of filtering `ALL_ARTICLES_WITH_FEATURED_QUERY`
- **News Page**: Updated to use the new dedicated query for better performance

### 4. Schema Index Updates

- Removed `featuredArticle` import and export from:
  - `/sanity/schemas/index.ts`
  - `/src/app/(website)/sanity/schemas/index.ts`

## Migration Script

A migration script already exists at `/migrations/migrate-featured-articles-to-article-flag.ts` that:

1. Fetches all `featuredArticle` documents
2. Matches them with existing `article` documents by title and link
3. Sets `featured = true` on matching articles
4. Migrates additional fields (image, excerpt, description, publication) if missing

## Verification

Use the verification script to check migration status:

```bash
npx tsx scripts/check-featured-articles-migration.ts
```

This script will:

- Count remaining `featuredArticle` documents
- Count articles with `featured = true`
- Show total articles
- Provide migration status summary

## Benefits

1. **Simplified Schema**: Single article schema instead of separate featured articles
2. **Better Performance**: Dedicated query for featured articles instead of filtering
3. **Improved Dashboard**: Featured articles are clearly marked with ⭐ in the Sanity dashboard
4. **Consistent Data Model**: All article data in one place

## Usage

### Marking Articles as Featured

In the Sanity dashboard:

1. Go to Articles
2. Open any article
3. Check the "Featured" checkbox
4. Save the article

Featured articles will show with a ⭐ prefix in the article list.

### Querying Featured Articles

```typescript
import { client } from "@/data/sanity/client";
import { FEATURED_ARTICLES_QUERY } from "@/data/sanity/queries";

// Fetch featured articles
const featuredArticles = await client.fetch(FEATURED_ARTICLES_QUERY);
```

### Component Usage

```tsx
import FeaturedNews from "@/src/components/features/FeaturedNews";

// Use in your page/component
<FeaturedNews color="light" hideHeading={false} hideBadge={false} />;
```

## Notes

- The migration preserves all existing featured article data
- Old `featuredArticle` documents can be safely deleted after confirming migration success
- The `featured` field defaults to `false` for new articles
- All existing queries and components continue to work as expected
