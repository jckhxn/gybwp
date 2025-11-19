import { Metadata } from "next";
import { urlFor } from "@/src/lib/utils";

export interface BasePageData {
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    noIndex?: boolean;
    noFollow?: boolean;
    canonical?: string;
    openGraph?: {
      title?: string;
      description?: string;
      image?: any;
      type?: "website" | "article" | "video.episode" | "music.song" | "profile";
    };
    twitter?: {
      cardType?: "summary" | "summary_large_image" | "player";
      site?: string;
      creator?: string;
    };
  };
  title?: string;
  pathname?: {
    current?: string;
  };
}

export interface EpisodeData extends BasePageData {
  youtube?: {
    title?: string;
    description?: string;
    thumbnail?: string;
    videoId?: string;
  };
  guests?: Array<{
    name?: string;
    guestProfile?: {
      title?: string;
      company?: string;
    };
  }>;
  category?: string;
}

export interface PersonData extends BasePageData {
  name?: string;
  role?: string;
  guestProfile?: {
    title?: string;
    company?: string;
    bio?: string;
    profileImage?: any;
  };
  consultingProfile?: {
    bio?: string;
    profileImage?: any;
  };
}

export interface PageData extends BasePageData {
  title?: string;
}

const SITE_CONFIG = {
  siteName: "Growing Your Business With People",
  siteUrl: "https://gybwp.com",
  defaultDescription: "The podcast for CEOs and business leaders focusing on growth through investing in their teams.",
  defaultImage: "/images/logo.webp",
  twitterSite: "@gybwp_podcast",
  author: "Jeffrey Lackey",
};

/**
 * Generates Next.js Metadata object from Sanity data
 */
export function generateMetadata(
  data: BasePageData,
  options: {
    type?: "website" | "article" | "video.episode" | "profile";
    fallbackTitle?: string;
    fallbackDescription?: string;
    path?: string;
  } = {}
): Metadata {
  const {
    type = "website",
    fallbackTitle,
    fallbackDescription,
    path = "",
  } = options;

  // Build canonical URL
  const canonicalUrl = data.seo?.canonical || 
    `${SITE_CONFIG.siteUrl}${path || data.pathname?.current || ""}`;

  // Determine title
  const title = data.seo?.metaTitle || 
    fallbackTitle || 
    data.title || 
    SITE_CONFIG.siteName;

  // Determine description
  const description = data.seo?.metaDescription || 
    fallbackDescription || 
    SITE_CONFIG.defaultDescription;

  // Handle Open Graph image
  let ogImage = SITE_CONFIG.defaultImage;
  if (data.seo?.openGraph?.image) {
    const imageUrl = urlFor(data.seo.openGraph.image)
      .width(1200)
      .height(630)
      .url();
    ogImage = imageUrl;
  }

  // Build robots directive
  const robots: string[] = [];
  if (data.seo?.noIndex) robots.push("noindex");
  if (data.seo?.noFollow) robots.push("nofollow");
  const robotsString = robots.length > 0 ? robots.join(", ") : "index, follow";

  // Build keywords
  const keywords = data.seo?.keywords?.join(", ");

  const metadata: Metadata = {
    title,
    description,
    keywords,
    robots: robotsString,
    
    // Open Graph
    openGraph: {
      type: data.seo?.openGraph?.type || type,
      title: data.seo?.openGraph?.title || title,
      description: data.seo?.openGraph?.description || description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Twitter
    twitter: {
      card: data.seo?.twitter?.cardType || "summary_large_image",
      title: data.seo?.openGraph?.title || title,
      description: data.seo?.openGraph?.description || description,
      images: [ogImage],
      site: data.seo?.twitter?.site || SITE_CONFIG.twitterSite,
      creator: data.seo?.twitter?.creator || SITE_CONFIG.twitterSite,
    },

    // Additional metadata
    authors: [{ name: SITE_CONFIG.author }],
    publisher: SITE_CONFIG.siteName,
    alternates: {
      canonical: canonicalUrl,
    },
  };

  return metadata;
}

/**
 * Generates episode-specific metadata
 */
export function generateEpisodeMetadata(episodeData: EpisodeData): Metadata {
  const episodeTitle = episodeData.seo?.metaTitle || 
    episodeData.youtube?.title || 
    episodeData.title || 
    "Episode";

  // Create episode description with guest information
  let episodeDescription = episodeData.seo?.metaDescription || 
    episodeData.youtube?.description;

  if (!episodeDescription && episodeData.guests?.length) {
    const guestNames = episodeData.guests
      .map(guest => guest.name)
      .filter(Boolean)
      .join(", ");
    
    episodeDescription = `Join Jeff Lackey in conversation with ${guestNames}. ${SITE_CONFIG.defaultDescription}`;
  }

  // Add category to keywords if present
  const categoryKeywords = episodeData.category ? [episodeData.category] : [];
  const guestKeywords = episodeData.guests?.map(guest => guest.name).filter(Boolean) || [];
  
  const combinedKeywords = [
    ...(episodeData.seo?.keywords || []),
    ...categoryKeywords,
    ...guestKeywords,
    "podcast episode",
    "business podcast",
    "leadership podcast",
  ].filter(Boolean);

  const path = episodeData.pathname?.current || "";

  return generateMetadata(
    {
      ...episodeData,
      seo: {
        ...episodeData.seo,
        keywords: combinedKeywords,
      }
    },
    {
      type: "video.episode",
      fallbackTitle: episodeTitle,
      fallbackDescription: episodeDescription,
      path,
    }
  );
}

/**
 * Generates person-specific metadata
 */
export function generatePersonMetadata(personData: PersonData): Metadata {
  const personTitle = personData.seo?.metaTitle || 
    `${personData.name} - ${SITE_CONFIG.siteName}`;

  // Use bio as description if available
  const bio = personData.guestProfile?.bio || personData.consultingProfile?.bio;
  let personDescription = personData.seo?.metaDescription;
  
  if (!personDescription && bio) {
    personDescription = bio.length > 160 ? `${bio.substring(0, 157)}...` : bio;
  }

  if (!personDescription) {
    const roleTitle = personData.guestProfile?.title || 
      (personData.role === "host-consultant" ? "Host & Consultant" : "Guest");
    personDescription = `${personData.name}, ${roleTitle} on ${SITE_CONFIG.siteName} podcast.`;
  }

  // Add role-specific keywords
  const roleKeywords = [];
  if (personData.role === "host-consultant") {
    roleKeywords.push("host", "consultant", "business coach");
  } else if (personData.role === "guest") {
    roleKeywords.push("guest", "expert", personData.guestProfile?.title || "");
  }

  const combinedKeywords = [
    ...(personData.seo?.keywords || []),
    ...roleKeywords.filter(Boolean),
    personData.name || "",
    "business leader",
    "podcast guest",
  ].filter(Boolean);

  const path = personData.pathname?.current || "";

  return generateMetadata(
    {
      ...personData,
      seo: {
        ...personData.seo,
        keywords: combinedKeywords,
      }
    },
    {
      type: "profile",
      fallbackTitle: personTitle,
      fallbackDescription: personDescription,
      path,
    }
  );
}

/**
 * Generates page-specific metadata
 */
export function generatePageMetadata(pageData: PageData): Metadata {
  const pageTitle = pageData.seo?.metaTitle || 
    `${pageData.title} - ${SITE_CONFIG.siteName}`;

  const path = pageData.pathname?.current || "";

  return generateMetadata(pageData, {
    type: "website",
    fallbackTitle: pageTitle,
    path,
  });
}

/**
 * Generates default homepage metadata
 */
export function generateHomepageMetadata(): Metadata {
  return {
    title: `${SITE_CONFIG.siteName} | Business Leadership Podcast`,
    description: SITE_CONFIG.defaultDescription,
    keywords: "business podcast, leadership podcast, CEO podcast, entrepreneurship, team building, business growth, people management",
    
    openGraph: {
      type: "website",
      title: SITE_CONFIG.siteName,
      description: SITE_CONFIG.defaultDescription,
      url: SITE_CONFIG.siteUrl,
      siteName: SITE_CONFIG.siteName,
      images: [
        {
          url: `${SITE_CONFIG.siteUrl}${SITE_CONFIG.defaultImage}`,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.siteName,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.siteName,
      description: SITE_CONFIG.defaultDescription,
      images: [`${SITE_CONFIG.siteUrl}${SITE_CONFIG.defaultImage}`],
      site: SITE_CONFIG.twitterSite,
      creator: SITE_CONFIG.twitterSite,
    },

    alternates: {
      canonical: SITE_CONFIG.siteUrl,
      types: {
        "application/rss+xml": "https://feeds.buzzsprout.com/2057493.rss",
      },
    },

    authors: [{ name: SITE_CONFIG.author }],
    publisher: SITE_CONFIG.siteName,
  };
}