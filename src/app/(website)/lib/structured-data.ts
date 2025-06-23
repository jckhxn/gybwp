import {
  PodcastSeries,
  PodcastEpisode,
  VideoObject,
  Person,
  Organization,
  ImageObject,
  ListenAction,
} from "@/src/app/(website)/components/SEO/jsonld";

// Base organization data for your podcast
export const PODCAST_ORGANIZATION: Organization = {
  "@type": "Organization",
  name: "Growing Your Business With People",
  url: "https://gybwp.com",
  logo: {
    "@type": "ImageObject",
    url: "https://gybwp.com/images/logo.webp",
  },
  description:
    "A podcast for CEOs and business leaders focusing on growth through investing in their teams.",
};

// Base host/author data
export const PODCAST_HOST: Person = {
  "@type": "Person",
  name: "Jeffrey Lackey",
  jobTitle: "CEO & Leadership Coach",
  description:
    "CEO & Leadership Coach helping business leaders grow through people-first strategies",
  url: "https://gybwp.com/about",
  image: "https://gybwp.com/images/consulting1.webp",
};

// Generate structured data for the main podcast series
export function generatePodcastSeriesStructuredData(): PodcastSeries {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "@id": "https://gybwp.com#podcast",
    name: "Growing Your Business With People",
    description:
      "The ultimate podcast for CEOs and business leaders focusing on growth through investing in their teams. Join Jeff Lackey as he explores proven strategies, actionable insights, and real-world examples of building successful businesses through people-first leadership. Learn from industry experts, thought leaders, and successful entrepreneurs who share their experiences on team building, leadership development, organizational culture, and sustainable business growth.",
    url: "https://gybwp.com",
    image: "https://gybwp.com/images/logo.webp",
    author: PODCAST_HOST,
    publisher: PODCAST_ORGANIZATION,
    inLanguage: "en-US",
    genre: [
      "Business",
      "Leadership",
      "Management",
      "Entrepreneurship",
      "Education",
    ],
    keywords: [
      "business growth",
      "leadership development",
      "people management",
      "CEO insights",
      "entrepreneurship",
      "team building",
      "organizational culture",
      "leadership strategies",
      "business coaching",
      "management training",
      "executive leadership",
      "people-first leadership",
      "sustainable growth",
      "team development",
    ],
    webFeed: "https://feeds.buzzsprout.com/2057493.rss",
    // Rich Results Enhancement Fields
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://gybwp.com",
    },
    sameAs: [
      "https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511",
      "https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH",
      "https://www.youtube.com/@jkladvisors",
      "https://www.linkedin.com/company/growing-your-business-with-people",
      "https://twitter.com/gybwp_podcast",
      "https://www.facebook.com/gybwpodcast",
      "https://www.instagram.com/gybwpodcast",
    ],
    potentialAction: {
      "@type": "ListenAction",
      target: [
        {
          "@type": "EntryPoint",
          urlTemplate: "https://gybwp.com/episode/{episodeId}",
        },
      ],
    },
  };
}

// Generate structured data for individual podcast episodes
export function generatePodcastEpisodeStructuredData(episodeData: {
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
  guests?: Array<{
    name: string;
    title?: string;
    about?: string;
  }>;
  keywords?: string[];
  rating?: {
    value: number;
    reviewCount: number;
  };
}): PodcastEpisode {
  const baseUrl = "https://gybwp.com";
  const episodeUrl = episodeData.url.startsWith("http")
    ? episodeData.url
    : `${baseUrl}/episode/${episodeData.uuid}`;

  // Create mentions array for guests
  const mentions: Person[] =
    episodeData.guests?.map((guest) => ({
      "@type": "Person",
      name: guest.name,
      jobTitle: guest.title,
      description: guest.about,
    })) || [];

  // Generate YouTube URLs if available
  const youtubeId = episodeData.youtubeId || episodeData.url.split("/").pop();
  const contentUrl = youtubeId
    ? `https://www.youtube.com/watch?v=${youtubeId}`
    : episodeUrl;
  const embedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : undefined;
  const thumbnailUrl = youtubeId
    ? `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`
    : undefined;

  // Format duration to ISO 8601 if available
  const isoDuration = formatDurationToISO(episodeData.duration);

  // Create base episode object
  const episode: PodcastEpisode = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "@id": `${episodeUrl}#episode`,
    name: episodeData.title,
    description:
      episodeData.description ||
      episodeData.blurb ||
      `Episode ${episodeData.episodeNumber} of Growing Your Business With People podcast featuring insights on business growth, leadership, and people management strategies.`,
    url: episodeUrl,
    episodeNumber: episodeData.episodeNumber,
    seasonNumber: episodeData.seasonNumber,
    datePublished: episodeData.publishedAt,
    duration: isoDuration || episodeData.duration,
    image: thumbnailUrl,
    partOfSeries: {
      "@type": "PodcastSeries",
      "@id": "https://gybwp.com#podcast",
      name: "Growing Your Business With People",
      url: "https://gybwp.com",
    },
    author: PODCAST_HOST,
    publisher: PODCAST_ORGANIZATION,
    associatedMedia: {
      "@type": "MediaObject",
      contentUrl: contentUrl,
      embedUrl: embedUrl,
      encodingFormat: youtubeId ? "video/mp4" : "audio/mpeg",
      duration: isoDuration || episodeData.duration,
    },
    keywords: [
      "business growth",
      "leadership",
      "people management",
      "CEO insights",
      "entrepreneurship",
      "team building",
      "management strategies",
      ...(episodeData.keywords || []),
    ],
    genre: ["Business", "Leadership", "Management", "Entrepreneurship"],
    mentions: mentions,
    potentialAction: {
      "@type": "ListenAction",
      target: [
        {
          "@type": "EntryPoint",
          urlTemplate: episodeUrl,
        },
      ],
    },
    // Rich Results Enhancement Fields
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": episodeUrl,
    },
    isAccessibleForFree: true,
    inLanguage: "en-US",
    timeRequired: isoDuration || episodeData.duration,
    dateModified: episodeData.publishedAt,
    headline: episodeData.title,
    educationalLevel: "Professional",
    learningResourceType: "Podcast Episode",
    teaches: [
      "Leadership strategies",
      "Business growth techniques",
      "People management",
      "Team building",
      "CEO insights",
      "Entrepreneurship",
    ],
  };

  // Add aggregate rating if available
  if (episodeData.rating) {
    episode.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: episodeData.rating.value.toString(),
      reviewCount: episodeData.rating.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    };
  }

  // Add offer information (free content)
  episode.offers = {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  };

  return episode;
}

// Generate structured data for YouTube video objects (alternative to podcast episode)
export function generateVideoObjectStructuredData(episodeData: {
  title: string;
  description?: string;
  youtubeId: string;
  publishedAt?: string;
  duration?: string;
  uuid?: string;
  blurb?: string;
  viewCount?: number;
  likeCount?: number;
  rating?: {
    value: number;
    reviewCount: number;
  };
}): VideoObject {
  const baseUrl = "https://gybwp.com";
  const episodeUrl = `${baseUrl}/episode/${episodeData.uuid}`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${episodeData.youtubeId}`;

  // Format duration to ISO 8601 if available
  const isoDuration = formatDurationToISO(episodeData.duration);

  const video: VideoObject = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: episodeData.title,
    description:
      episodeData.description ||
      episodeData.blurb ||
      "Growing Your Business With People podcast episode featuring expert insights on leadership, business growth, and people management strategies.",
    url: episodeUrl,
    contentUrl: youtubeUrl,
    embedUrl: `https://www.youtube.com/embed/${episodeData.youtubeId}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${episodeData.youtubeId}/maxresdefault.jpg`,
    uploadDate: episodeData.publishedAt,
    duration: isoDuration || episodeData.duration,
    author: PODCAST_HOST,
    publisher: PODCAST_ORGANIZATION,
    keywords: [
      "business growth",
      "leadership",
      "people management",
      "CEO insights",
      "entrepreneurship",
      "team building",
      "management strategies",
    ],
    genre: ["Business", "Leadership", "Management", "Education"],
    // Rich Results Enhancement Fields
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": episodeUrl,
    },
    isAccessibleForFree: true,
    inLanguage: "en-US",
    potentialAction: {
      "@type": "WatchAction",
      target: [youtubeUrl, episodeUrl],
    },
  };

  // Add interaction statistics if available
  if (episodeData.viewCount || episodeData.likeCount) {
    video.interactionStatistic = [];

    if (episodeData.viewCount) {
      video.interactionStatistic.push({
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/WatchAction",
        userInteractionCount: episodeData.viewCount,
      });
    }

    if (episodeData.likeCount) {
      video.interactionStatistic.push({
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: episodeData.likeCount,
      });
    }
  }

  // Add aggregate rating if available
  if (episodeData.rating) {
    video.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: episodeData.rating.value.toString(),
      reviewCount: episodeData.rating.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    };
  }

  return video;
}

// Utility function to format duration to ISO 8601 format (PT#M#S)
export function formatDurationToISO(duration?: string): string | undefined {
  if (!duration) return undefined;

  // Handle various duration formats
  const parts = duration.split(":");

  if (parts.length === 2) {
    // MM:SS format
    const minutes = parseInt(parts[0]);
    const seconds = parseInt(parts[1]);
    return `PT${minutes}M${seconds}S`;
  } else if (parts.length === 3) {
    // HH:MM:SS format
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const seconds = parseInt(parts[2]);
    return `PT${hours}H${minutes}M${seconds}S`;
  }

  return undefined;
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(
  items: Array<{
    name: string;
    url: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate structured data for guest/person pages
export function generatePersonStructuredData(guestData: {
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
  episodes?: Array<{
    title: string;
    url: string;
    publishedAt?: string;
  }>;
}) {
  const person: any = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: guestData.name,
    jobTitle: guestData.title,
    description: guestData.about,
    image: guestData.image,
    url: guestData.website || guestData.socialLinks?.website,
  };

  // Add social media links
  const sameAs: string[] = [];
  if (guestData.socialLinks?.twitter)
    sameAs.push(guestData.socialLinks.twitter);
  if (guestData.socialLinks?.linkedin)
    sameAs.push(guestData.socialLinks.linkedin);
  if (sameAs.length > 0) person.sameAs = sameAs;

  // Add work organization if available
  if (guestData.title) {
    person.worksFor = PODCAST_ORGANIZATION;
  }

  return person;
}

// Generate structured data for the about page
export function generateAboutPageStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Growing Your Business With People",
    url: "https://gybwp.com",
    logo: {
      "@type": "ImageObject",
      url: "https://gybwp.com/images/logo.webp",
    },
    description:
      "A podcast and business consultancy helping CEOs and business leaders grow through people-first strategies. Founded by Jeff Lackey, CEO & Leadership Coach.",
    founder: PODCAST_HOST,
    sameAs: [
      "https://www.linkedin.com/company/growing-your-business-with-people",
      "https://www.youtube.com/channel/YOUR_CHANNEL_ID",
      "https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511",
      "https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://gybwp.com/consulting",
    },
  };
}

// Generate structured data for the consulting page
export function generateServiceStructuredData(): any {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Business Leadership Consulting",
    description:
      "Executive coaching and business consulting services focused on growing businesses through people-first leadership strategies.",
    provider: PODCAST_ORGANIZATION,
    serviceType: "Business Consulting",
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leadership Consulting Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Executive Coaching",
            description:
              "One-on-one leadership coaching for CEOs and executives",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Team Development",
            description:
              "Building high-performing teams through people-first strategies",
          },
        },
      ],
    },
  };
}

// Generate FAQ structured data
export function generateFAQStructuredData(
  faqs: Array<{
    question: string;
    answer: string;
  }>
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Generate How-To structured data
export function generateHowToStructuredData(howTo: {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    value: string;
  };
  supply?: string[];
  tool?: string[];
  steps: Array<{
    name: string;
    text: string;
    image?: string;
    url?: string;
  }>;
}): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    image: howTo.image,
    totalTime: howTo.totalTime,
    estimatedCost: howTo.estimatedCost,
    supply: howTo.supply?.map((item) => ({
      "@type": "HowToSupply",
      name: item,
    })),
    tool: howTo.tool?.map((item) => ({
      "@type": "HowToTool",
      name: item,
    })),
    step: howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
      image: step.image,
      url: step.url,
      position: index + 1,
    })),
  };
}

// Generate Article structured data (for blog posts/news)
export function generateArticleStructuredData(article: {
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  url: string;
  author?: Person;
  publisher?: Organization;
  wordCount?: number;
  keywords?: string[];
}): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    url: article.url,
    author: article.author || PODCAST_HOST,
    publisher: article.publisher || PODCAST_ORGANIZATION,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    wordCount: article.wordCount,
    keywords: article.keywords,
    isAccessibleForFree: true,
    inLanguage: "en-US",
  };
}

// Generate Course structured data (if you have educational content)
export function generateCourseStructuredData(course: {
  name: string;
  description: string;
  url: string;
  image?: string;
  provider: Organization;
  instructor?: Person;
  courseCode?: string;
  educationalLevel?: string;
  about?: string[];
  teaches?: string[];
  timeRequired?: string;
  isAccessibleForFree?: boolean;
  inLanguage?: string;
}): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    url: course.url,
    image: course.image,
    provider: course.provider,
    instructor: course.instructor,
    courseCode: course.courseCode,
    educationalLevel: course.educationalLevel,
    about: course.about,
    teaches: course.teaches,
    timeRequired: course.timeRequired,
    isAccessibleForFree: course.isAccessibleForFree ?? true,
    inLanguage: course.inLanguage || "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": course.url,
    },
  };
}

// Generate simplified podcast episode structured data optimized for Google Rich Results
export function generateSimplifiedPodcastEpisodeStructuredData(episodeData: {
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
  guests?: Array<{
    name: string;
    title?: string;
    about?: string;
  }>;
  keywords?: string[];
}): Record<string, any> {
  const baseUrl = "https://gybwp.com";
  const episodeUrl = episodeData.url.startsWith("http")
    ? episodeData.url
    : `${baseUrl}/episode/${episodeData.uuid}`;

  // Format duration to ISO 8601 if available
  const isoDuration = formatDurationToISO(episodeData.duration);

  // Generate YouTube URLs if available
  const youtubeId = episodeData.youtubeId || episodeData.url.split("/").pop();
  const contentUrl = youtubeId
    ? `https://www.youtube.com/watch?v=${youtubeId}`
    : episodeUrl;

  // Create base episode object with only essential fields
  const episode: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episodeData.title,
    url: episodeUrl,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Growing Your Business With People",
      url: "https://gybwp.com",
    },
  };

  // Add optional fields only if they exist and are valid
  if (episodeData.description || episodeData.blurb) {
    episode.description = episodeData.description || episodeData.blurb;
  }

  if (episodeData.episodeNumber && episodeData.episodeNumber > 0) {
    episode.episodeNumber = episodeData.episodeNumber;
  }

  if (episodeData.publishedAt) {
    episode.datePublished = episodeData.publishedAt;
  }

  if (isoDuration) {
    episode.duration = isoDuration;
  }

  if (youtubeId) {
    episode.associatedMedia = {
      "@type": "MediaObject",
      contentUrl: contentUrl,
      encodingFormat: "video/mp4",
    };
  }

  // Add author
  episode.author = {
    "@type": "Person",
    name: "Jeffrey Lackey",
  };

  return episode;
}

// Generate simplified podcast series structured data optimized for Google Rich Results
export function generateSimplifiedPodcastSeriesStructuredData(): Record<
  string,
  any
> {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: "Growing Your Business With People",
    description:
      "The podcast for CEOs and business leaders focusing on growth through investing in their teams.",
    url: "https://gybwp.com",
    author: {
      "@type": "Person",
      name: "Jeffrey Lackey",
    },
    publisher: {
      "@type": "Organization",
      name: "Growing Your Business With People",
      url: "https://gybwp.com",
    },
    webFeed: "https://feeds.buzzsprout.com/2057493.rss",
  };
}

// Ultra-minimal test functions for debugging Google Rich Results
export function generateTestPodcastEpisode(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: "Test Episode",
    url: "https://gybwp.com/test",
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Test Podcast",
      url: "https://gybwp.com",
    },
  };
}

export function generateTestArticle(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Test Article",
    url: "https://gybwp.com/test",
    author: {
      "@type": "Person",
      name: "Test Author",
    },
    datePublished: "2024-01-01",
  };
}

export function generateTestVideoObject(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Test Video",
    description: "Test description",
    url: "https://gybwp.com/test",
    contentUrl: "https://www.youtube.com/watch?v=test123",
    uploadDate: "2024-01-01",
  };
}

// Generate Article schema for episodes (Google Rich Results compatible)
export function generateEpisodeArticleStructuredData(episodeData: {
  title: string;
  description?: string;
  url: string;
  publishedAt?: string;
  youtubeId?: string;
  uuid?: string;
  blurb?: string;
  guests?: Array<{
    name: string;
    title?: string;
  }>;
  keywords?: string[];
  wordCount?: number;
}): Record<string, any> {
  const baseUrl = "https://gybwp.com";
  const episodeUrl = episodeData.url.startsWith("http")
    ? episodeData.url
    : `${baseUrl}/episode/${episodeData.uuid}`;

  // Get thumbnail from YouTube if available
  const thumbnailUrl = episodeData.youtubeId
    ? `https://i.ytimg.com/vi/${episodeData.youtubeId}/maxresdefault.jpg`
    : "https://gybwp.com/images/logo.webp";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: episodeData.title,
    description:
      episodeData.description ||
      episodeData.blurb ||
      `Podcast episode: ${episodeData.title}`,
    url: episodeUrl,
    image: thumbnailUrl,
    author: {
      "@type": "Person",
      name: "Jeffrey Lackey",
      url: "https://gybwp.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Growing Your Business With People",
      url: "https://gybwp.com",
      logo: {
        "@type": "ImageObject",
        url: "https://gybwp.com/images/logo.webp",
      },
    },
    datePublished: episodeData.publishedAt,
    dateModified: episodeData.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": episodeUrl,
    },
    articleSection: "Business Podcast",
    keywords: [
      "business podcast",
      "leadership",
      "entrepreneurship",
      "business growth",
      ...(episodeData.keywords || []),
    ],
    wordCount: episodeData.wordCount || 2000,
    isAccessibleForFree: true,
    inLanguage: "en-US",
  };
}

// Generate Organization schema for homepage
export function generateOrganizationStructuredData(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Growing Your Business With People",
    url: "https://gybwp.com",
    logo: "https://gybwp.com/images/logo.webp",
    description:
      "Podcast and consulting focused on business growth through people-first leadership strategies.",
    founder: {
      "@type": "Person",
      name: "Jeffrey Lackey",
    },
    sameAs: [
      "https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511",
      "https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH",
      "https://www.youtube.com/@jkladvisors",
      "https://www.linkedin.com/company/growing-your-business-with-people",
      "https://twitter.com/gybwp_podcast",
      "https://www.facebook.com/gybwpodcast",
    ],
  };
}

// Generate WebSite schema for homepage (enables sitelinks search box)
export function generateWebSiteStructuredData(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Growing Your Business With People",
    url: "https://gybwp.com",
    description:
      "The podcast for CEOs and business leaders focusing on growth through investing in their teams.",
    publisher: {
      "@type": "Organization",
      name: "Growing Your Business With People",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://gybwp.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// Enhanced VideoObject for YouTube episodes (Google Rich Results compatible)
export function generateEnhancedVideoObjectStructuredData(episodeData: {
  title: string;
  description?: string;
  youtubeId: string;
  publishedAt?: string;
  duration?: string;
  uuid?: string;
  blurb?: string;
  viewCount?: number;
}): Record<string, any> {
  const baseUrl = "https://gybwp.com";
  const episodeUrl = `${baseUrl}/episode/${episodeData.uuid}`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${episodeData.youtubeId}`;

  // Format duration to ISO 8601 if available
  const isoDuration = formatDurationToISO(episodeData.duration);

  const video: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: episodeData.title,
    description:
      episodeData.description ||
      episodeData.blurb ||
      `Podcast episode: ${episodeData.title}`,
    url: episodeUrl,
    contentUrl: youtubeUrl,
    embedUrl: `https://www.youtube.com/embed/${episodeData.youtubeId}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${episodeData.youtubeId}/maxresdefault.jpg`,
    uploadDate: episodeData.publishedAt,
    duration: isoDuration || episodeData.duration,
    author: {
      "@type": "Person",
      name: "Jeffrey Lackey",
      url: "https://gybwp.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Growing Your Business With People",
      url: "https://gybwp.com",
      logo: {
        "@type": "ImageObject",
        url: "https://gybwp.com/images/logo.webp",
      },
    },
    isAccessibleForFree: true,
    inLanguage: "en-US",
  };

  // Add interaction statistics if available
  if (episodeData.viewCount) {
    video.interactionStatistic = {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/WatchAction",
      userInteractionCount: episodeData.viewCount,
    };
  }

  return video;
}
