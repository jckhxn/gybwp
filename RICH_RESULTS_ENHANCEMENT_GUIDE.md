# Enhanced Rich Results Usage Examples

This file shows how to implement the enhanced structured data for better rich results in search engines.

## Episode Page with Enhanced Structured Data

```tsx
import JSONLD from "@/src/app/(website)/components/SEO/jsonld";
import {
  generatePodcastEpisodeStructuredData,
  generateVideoObjectStructuredData,
  generateFAQStructuredData,
} from "@/src/app/(website)/lib/structured-data";

export default function EpisodePage({ episode, faqs }) {
  // Enhanced episode structured data with rating
  const episodeStructuredData = generatePodcastEpisodeStructuredData({
    title: episode.title,
    description: episode.description,
    url: `https://gybwp.com/episode/${episode.uuid}`,
    episodeNumber: episode.episodeNumber,
    seasonNumber: episode.seasonNumber,
    publishedAt: episode.publishedAt,
    duration: episode.duration,
    youtubeId: episode.youtubeId,
    uuid: episode.uuid,
    blurb: episode.blurb,
    guests: episode.guests,
    keywords: episode.tags,
    // Add rating data if available
    rating: {
      value: 4.7,
      reviewCount: 23,
    },
  });

  // Video structured data for YouTube episodes
  const videoStructuredData = episode.youtubeId
    ? generateVideoObjectStructuredData({
        title: episode.title,
        description: episode.description,
        youtubeId: episode.youtubeId,
        publishedAt: episode.publishedAt,
        duration: episode.duration,
        uuid: episode.uuid,
        blurb: episode.blurb,
        // Add YouTube metrics if available
        viewCount: 1250,
        likeCount: 45,
        rating: {
          value: 4.8,
          reviewCount: 15,
        },
      })
    : null;

  // FAQ structured data for episode-related questions
  const faqStructuredData =
    faqs?.length > 0 ? generateFAQStructuredData(faqs) : null;

  return (
    <div>
      {/* Episode structured data */}
      <JSONLD data={episodeStructuredData} id="episode-jsonld" />

      {/* Video structured data for YouTube episodes */}
      {videoStructuredData && (
        <JSONLD data={videoStructuredData} id="video-jsonld" />
      )}

      {/* FAQ structured data */}
      {faqStructuredData && <JSONLD data={faqStructuredData} id="faq-jsonld" />}

      {/* Your episode content */}
    </div>
  );
}
```

## FAQ Example Data

```tsx
const episodeFAQs = [
  {
    question: "What is the main topic of this episode?",
    answer:
      "This episode focuses on building effective leadership strategies for growing businesses through people-first approaches.",
  },
  {
    question: "Who are the guests featured in this episode?",
    answer:
      "We feature industry leaders and successful entrepreneurs who share their real-world experiences in team building and organizational growth.",
  },
  {
    question: "How long is this podcast episode?",
    answer:
      "This episode is approximately 45 minutes long, perfect for your commute or workout session.",
  },
];
```

## HowTo Example for Business Guides

```tsx
import { generateHowToStructuredData } from "@/src/app/(website)/lib/structured-data";

const howToGuide = generateHowToStructuredData({
  name: "How to Build a People-First Leadership Strategy",
  description:
    "Learn the step-by-step process to develop leadership strategies that prioritize people and drive business growth.",
  image: "https://gybwp.com/images/leadership-guide.webp",
  totalTime: "PT30M", // 30 minutes
  steps: [
    {
      name: "Assess Your Current Leadership Style",
      text: "Evaluate your current approach to leadership and identify areas for improvement.",
      image: "https://gybwp.com/images/assessment.webp",
    },
    {
      name: "Define Your People-First Values",
      text: "Establish core values that put your team members at the center of your business strategy.",
      image: "https://gybwp.com/images/values.webp",
    },
    {
      name: "Implement Regular Team Check-ins",
      text: "Create structured opportunities for meaningful dialogue with your team members.",
      image: "https://gybwp.com/images/checkins.webp",
    },
    {
      name: "Measure and Adjust",
      text: "Track the impact of your people-first approach and make data-driven adjustments.",
      image: "https://gybwp.com/images/metrics.webp",
    },
  ],
});
```

## Course Example for Educational Content

```tsx
import {
  generateCourseStructuredData,
  PODCAST_ORGANIZATION,
  PODCAST_HOST,
} from "@/src/app/(website)/lib/structured-data";

const leadershipCourse = generateCourseStructuredData({
  name: "People-First Leadership Masterclass",
  description:
    "Comprehensive course on developing leadership skills that prioritize team growth and business success.",
  url: "https://gybwp.com/leadership-course",
  image: "https://gybwp.com/images/course-hero.webp",
  provider: PODCAST_ORGANIZATION,
  instructor: PODCAST_HOST,
  courseCode: "GYBWP-101",
  educationalLevel: "Professional Development",
  about: [
    "Leadership Development",
    "Team Management",
    "Business Growth",
    "Organizational Culture",
  ],
  teaches: [
    "People-first leadership principles",
    "Team building strategies",
    "Communication skills",
    "Performance management",
    "Cultural transformation",
  ],
  timeRequired: "PT8H", // 8 hours
  isAccessibleForFree: false,
  inLanguage: "en-US",
});
```

## Rich Results Best Practices

### 1. Episode Enhancement

- Always include `isAccessibleForFree: true` for podcast episodes
- Add `educationalLevel` and `learningResourceType` for better categorization
- Include comprehensive `teaches` array for educational content
- Use proper ISO 8601 duration format (`PT45M30S` for 45 minutes 30 seconds)

### 2. Rating and Reviews

- Include aggregate ratings when available
- Add individual reviews for episodes with high engagement
- Use realistic rating values (don't exceed 5.0)

### 3. Keywords and SEO

- Use long-tail keywords in descriptions
- Include industry-specific terminology
- Add location-based keywords if relevant
- Update keywords based on trending topics

### 4. Social Proof

- Add all social media profiles to `sameAs` arrays
- Include verified platform URLs
- Add podcast platform links (Apple, Spotify, Google, etc.)

### 5. Content Categorization

- Use specific genres beyond just "Business"
- Add "Education" genre for instructional content
- Include relevant industry categories

## Testing Your Structured Data

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Google Search Console**: Monitor rich result performance

## Common Rich Result Types for Podcasts

1. **Podcast Series** - Shows in podcast carousels
2. **Video Results** - For YouTube-hosted episodes
3. **FAQ** - Expandable question sections
4. **HowTo** - Step-by-step guides
5. **Course** - Educational content
6. **Article** - Blog posts and news
7. **Breadcrumb** - Navigation paths

Implement these enhancements gradually and monitor your search console for improvements in rich result appearances.
