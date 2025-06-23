# JSON-LD Structured Data Implementation for Growing Your Business With People Podcast

## Overview

Your podcast website now has comprehensive JSON-LD structured data implementation that follows Schema.org standards and modern Next.js patterns. This improves SEO, helps search engines understand your content, and enables rich snippets in search results.

## What's Implemented

### 1. Enhanced JSON-LD Component (`/components/SEO/jsonld.tsx`)

- **Next.js Script component** for optimal loading and performance
- **Improved typing** with proper TypeScript interfaces including `potentialAction` support
- **Support for multiple schema types**: PodcastSeries, PodcastEpisode, VideoObject, Person, Organization
- **Unique IDs** for each JSON-LD script to prevent conflicts
- **Pretty formatting** for better debugging

### 2. Structured Data Utilities (`/lib/structured-data.ts`)

- **Centralized functions** for generating consistent structured data
- **Podcast-specific schemas** optimized for your content
- **Flexible data mapping** from your Sanity CMS data
- **Proper Schema.org compliance** with ImageObject for logos and potentialAction for discoverability

### 3. Key Features

#### potentialAction Support

All podcast schemas now include `potentialAction` with `ListenAction` type:

```json
{
  "potentialAction": {
    "@type": "ListenAction",
    "target": [
      {
        "@type": "EntryPoint",
        "urlTemplate": "https://gybwp.com/episode/{episodeId}"
      }
    ]
  }
}
```

#### Proper Logo Structure

Publisher logos now use the correct ImageObject format:

```json
{
  "publisher": {
    "@type": "Organization",
    "name": "Growing Your Business With People",
    "logo": {
      "@type": "ImageObject",
      "url": "https://gybwp.com/images/logo.webp"
    }
  }
}
```

#### Script Component Benefits

- **Better performance** with Next.js Script optimization
- **Unique IDs** prevent multiple script conflicts
- **Strategy control** for when scripts load

### 3. Implemented Pages

#### Homepage (`/components/HomePage/index.tsx`)

- **PodcastSeries schema** with complete podcast information
- **Host and publisher data**
- **Genre, keywords, and feed information**

#### Episode Details (`/components/EpisodeDetails/index.tsx`)

- **PodcastEpisode schema** with episode-specific data
- **VideoObject schema** for YouTube integration
- **Guest mentions and episode metadata**
- **Timestamps and transcript support**

#### About Page (`/components/AboutPage/index.tsx`)

- **Organization schema** for your business
- **Contact information and social links**
- **Founder/host information**

## Available Functions

### Core Functions

```typescript
// Generate podcast series data (homepage)
generatePodcastSeriesStructuredData(): PodcastSeries

// Generate episode data (episode pages)
generatePodcastEpisodeStructuredData(episodeData: {
  title: string;
  description?: string;
  url: string;
  episodeNumber?: number;
  seasonNumber?: number;
  publishedAt?: string;
  duration?: string;
  youtubeId?: string;
  uuid?: string;
  blurb?: string;
  guests?: Array<{name: string; title?: string; about?: string}>;
  keywords?: string[];
}): PodcastEpisode

// Generate video object data (YouTube integration)
generateVideoObjectStructuredData(episodeData: {
  title: string;
  description?: string;
  youtubeId: string;
  publishedAt?: string;
  duration?: string;
  uuid?: string;
  blurb?: string;
}): VideoObject

// Generate person data (guest pages)
generatePersonStructuredData(guestData: {
  name: string;
  title?: string;
  about?: string;
  image?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  episodes?: Array<{title: string; url: string; publishedAt?: string}>;
})

// Generate organization data (about/company pages)
generateAboutPageStructuredData()

// Generate service data (consulting pages)
generateServiceStructuredData()

// Generate breadcrumb data (navigation)
generateBreadcrumbStructuredData(items: Array<{name: string; url: string}>)
```

### Utility Functions

```typescript
// Convert duration to ISO 8601 format (PT#M#S)
formatDurationToISO(duration?: string): string | undefined
```

## How to Use

### 1. For New Pages

```tsx
import JSONLD from "@/components/SEO/jsonld";
import { generatePodcastEpisodeStructuredData } from "@/lib/structured-data";

export default function MyPage({ data }) {
  const structuredData = generatePodcastEpisodeStructuredData({
    title: data.title,
    description: data.description,
    url: `https://gybwp.com/episode/${data.uuid}`,
    episodeNumber: data.episodeNumber,
    // ... other data
  });

  return (
    <>
      <JSONLD data={structuredData} id="my-page-jsonld" />
      {/* Your page content */}
    </>
  );
}
```

### 2. For Guest Pages

```tsx
import JSONLD from "@/components/SEO/jsonld";
import { generatePersonStructuredData } from "@/lib/structured-data";

export default function GuestPage({ guest }) {
  const guestStructuredData = generatePersonStructuredData({
    name: guest.name,
    title: guest.title,
    about: guest.about,
    image: guest.image,
    socialLinks: guest.socialLinks,
  });

  return (
    <>
      <JSONLD data={guestStructuredData} />
      {/* Guest content */}
    </>
  );
}
```

### 3. For Multiple Schema Types

```tsx
// You can include multiple JSON-LD blocks with unique IDs
<>
  <JSONLD data={episodeStructuredData} id="episode-jsonld" />
  <JSONLD data={videoStructuredData} id="video-jsonld" />
  <JSONLD data={breadcrumbStructuredData} id="breadcrumb-jsonld" />
</>
```

## SEO Benefits

### 1. Rich Snippets

- **Episode cards** in search results
- **Podcast information** with play buttons
- **Guest information** with photos and bios
- **Organization details** with contact info

### 2. Voice Search Optimization

- **Proper podcast episode structure** for voice assistants
- **Guest and topic mentions** for content discovery
- **Duration and publish date** for filtering

### 3. Search Engine Understanding

- **Clear content hierarchy** (series > season > episode)
- **Relationship mapping** between guests, episodes, and topics
- **Content categorization** with genres and keywords

## Recent Enhancements for Better Rich Results

### Rich Results Optimization Fields Added

#### PodcastEpisode Enhancements

- **mainEntityOfPage**: Links episodes to their web pages
- **isAccessibleForFree**: Marks content as free (improves accessibility signals)
- **inLanguage**: Specifies content language for better targeting
- **timeRequired**: Provides duration in ISO 8601 format
- **educationalLevel**: Categorizes content for professional audiences
- **learningResourceType**: Identifies content as educational podcast episodes
- **teaches**: Lists key learning outcomes and topics covered
- **aggregateRating**: Shows ratings and review counts when available
- **offers**: Specifies pricing information (free in this case)

#### VideoObject Enhancements

- **interactionStatistic**: YouTube view counts and engagement metrics
- **potentialAction**: WatchAction for video content
- **mainEntityOfPage**: Proper page association

#### Enhanced Content Categorization

- **Expanded keywords**: More comprehensive and long-tail keyword targeting
- **Educational genres**: Added "Education" to genre classifications
- **Professional targeting**: Added professional development categories

### New Schema Types Available

#### FAQ Schema

```typescript
generateFAQStructuredData([
  {
    question: "What is this episode about?",
    answer: "This episode covers leadership strategies...",
  },
]);
```

#### HowTo Schema

```typescript
generateHowToStructuredData({
  name: "How to Build Leadership Skills",
  description: "Step-by-step guide...",
  steps: [...]
})
```

#### Article Schema

```typescript
generateArticleStructuredData({
  headline: "Leadership Tips for CEOs",
  description: "Expert insights...",
  url: "https://gybwp.com/article/...",
});
```

#### Course Schema

```typescript
generateCourseStructuredData({
  name: "Leadership Masterclass",
  description: "Comprehensive course...",
  teaches: ["Leadership", "Team Building"],
});
```

### Implementation Best Practices

1. **Use unique script IDs** for each JSON-LD block to prevent conflicts
2. **Include rating data** when available to improve rich result appearance
3. **Add FAQ schemas** to episode pages for better SERP features
4. **Use proper ISO 8601 duration format** (`PT45M30S` for 45 minutes 30 seconds)
5. **Include comprehensive keyword arrays** with long-tail keywords
6. **Add social proof** through sameAs arrays and rating information

### Testing and Validation

Always test your structured data using:

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/
- **Google Search Console**: Monitor performance and rich result appearances

### Expected Rich Result Improvements

With these enhancements, you should see:

- **Enhanced podcast episode snippets** with ratings, duration, and guest information
- **Video rich results** for YouTube-hosted episodes
- **FAQ rich snippets** for episode-related questions
- **Better categorization** in podcast search results
- **Improved local and topical authority** signals

## Testing Your Implementation

### 1. Google Rich Results Test

- Visit: https://search.google.com/test/rich-results
- Enter your page URLs to see how Google interprets your structured data

### 2. Schema.org Validator

- Visit: https://validator.schema.org/
- Paste your page HTML to validate the JSON-LD structure

### 3. Browser DevTools

- Check the `<head>` section for your JSON-LD scripts
- Verify the data structure matches your expectations

## Debugging: Testing with Page Source

### Why Copying Source is Better

When you copy from page source, you're testing exactly what Google's crawlers see, which is more accurate than testing the live URL (which might have rendering issues, authentication, or other access problems).

### Step-by-Step Source Testing

1. **Extract JSON-LD from Source**

   ```bash
   # Go to your episode page
   # Right-click → View Page Source
   # Search for: application/ld+json
   # Copy everything between <script> tags
   ```

2. **Test in Schema.org Validator**

   - Go to: https://validator.schema.org/
   - Paste your JSON-LD
   - Look for specific error messages

3. **Test in Google Rich Results Test**
   - Go to: https://search.google.com/test/rich-results
   - Click "Code Snippet" tab
   - Paste your JSON-LD
   - Check results

### Common Source Code Issues

#### Issue 1: HTML Entities

**Problem**: HTML encoding in JSON

```json
// ❌ Bad (HTML entities)
"description": "Learn how to grow your business &amp; improve leadership"

// ✅ Good (clean text)
"description": "Learn how to grow your business & improve leadership"
```

#### Issue 2: Escaped Characters

**Problem**: Over-escaped quotes or characters

```json
// ❌ Bad
"name": "Jeffrey&#x27;s Leadership Tips"

// ✅ Good
"name": "Jeffrey's Leadership Tips"
```

#### Issue 3: Empty or Null Values

**Problem**: Fields with empty/null values

```json
// ❌ Bad
"episodeNumber": null,
"duration": "",
"description": undefined

// ✅ Good (remove empty fields)
{
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  "name": "Episode Title"
  // Don't include empty fields
}
```

#### Issue 4: Invalid URLs

**Problem**: Malformed or incomplete URLs

```json
// ❌ Bad
"url": "/episode/123",
"url": "episode/123",

// ✅ Good
"url": "https://gybwp.com/episode/123"
```

### Validation Checklist

When you paste your JSON-LD, check for:

- [ ] Valid JSON syntax (no trailing commas, proper quotes)
- [ ] All URLs are complete and accessible
- [ ] Dates in ISO 8601 format (`YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SSZ`)
- [ ] Duration in ISO 8601 format (`PT45M30S`)
- [ ] No HTML entities or escaped characters
- [ ] No empty/null values
- [ ] Required fields present for schema type

### Debug-Friendly JSON-LD Generator

For testing, here's a minimal PodcastEpisode structure that should always work:

```json
{
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  "name": "Test Episode Title",
  "url": "https://gybwp.com/episode/test-123",
  "partOfSeries": {
    "@type": "PodcastSeries",
    "name": "Growing Your Business With People",
    "url": "https://gybwp.com"
  },
  "author": {
    "@type": "Person",
    "name": "Jeffrey Lackey"
  }
}
```

### Next Steps for Source Testing

1. **Share your actual JSON-LD** - paste what you see in the page source
2. **Identify specific errors** - use Schema.org validator for detailed messages
3. **Test minimal version** - try the basic structure above first
4. **Add fields incrementally** - add one field at a time to isolate issues

## Best Practices

### 1. Consistent Data

- Use the centralized utility functions
- Maintain consistent naming and formatting
- Keep URLs absolute and canonical

### 2. Required vs Optional Fields

- Always include required fields (name, url, @type)
- Add optional fields when data is available
- Don't include empty or null values

### 3. Performance

- JSON-LD is loaded in `<head>` so it doesn't block rendering
- Keep structured data focused and relevant
- Don't duplicate information unnecessarily

## Customization

### Adding New Schema Types

1. **Define the interface** in `/components/SEO/jsonld.tsx`
2. **Create a generator function** in `/lib/structured-data.ts`
3. **Update the StructuredData union type**
4. **Add to your page components**

### Updating Base Data

Edit the constants in `/lib/structured-data.ts`:

- `PODCAST_ORGANIZATION`: Your business information
- `PODCAST_HOST`: Host/author details
- Update URLs, social links, and descriptions as needed

## Examples in Your Codebase

- **Homepage**: Full podcast series with host and publisher info
- **Episode Details**: Episode-specific data with guests and YouTube integration
- **About Page**: Organization schema with contact and social information

This implementation provides comprehensive SEO benefits while maintaining clean, maintainable code that integrates seamlessly with your existing Sanity CMS data structure.
