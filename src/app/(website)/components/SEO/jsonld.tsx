import React from "react";
import Script from "next/script";

// Define comprehensive types for podcast structured data
export interface Person {
  "@type": "Person";
  name: string;
  url?: string;
  jobTitle?: string;
  description?: string;
  image?: string;
}

export interface ImageObject {
  "@type": "ImageObject";
  url: string;
}

export interface Organization {
  "@type": "Organization";
  name: string;
  url?: string;
  logo?: string | ImageObject;
  description?: string;
}

export interface EntryPoint {
  "@type": "EntryPoint";
  urlTemplate: string;
}

export interface ListenAction {
  "@type": "ListenAction";
  target: EntryPoint[];
}

export interface PodcastSeries {
  "@context": "https://schema.org";
  "@type": "PodcastSeries";
  "@id"?: string;
  name: string;
  description?: string;
  url: string;
  image?: string;
  thumbnailUrl?: string;
  headline?: string;
  author?: Person | Organization;
  publisher?: Organization;
  inLanguage?: string;
  genre?: string[];
  keywords?: string[];
  webFeed?: string;
  potentialAction?: ListenAction;
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    reviewCount: string;
    bestRating?: string;
    worstRating?: string;
  };
  mainEntityOfPage?: {
    "@type": "WebPage";
    "@id": string;
  };
  sameAs?: string[];
}

export interface PodcastEpisode {
  "@context": "https://schema.org";
  "@type": "PodcastEpisode";
  "@id"?: string;
  name: string;
  description?: string;
  url: string;
  episodeNumber?: number;
  seasonNumber?: number;
  datePublished?: string;
  duration?: string;
  image?: string;
  thumbnailUrl?: string;
  partOfSeries?: {
    "@type": "PodcastSeries";
    "@id"?: string;
    name: string;
    url: string;
  };
  author?: Person | Organization;
  publisher?: Organization;
  associatedMedia?: {
    "@type": "MediaObject";
    contentUrl: string;
    embedUrl?: string;
    encodingFormat?: string;
    duration?: string;
  };
  transcript?: {
    "@type": "MediaObject";
    contentUrl?: string;
    text?: string;
  };
  keywords?: string[];
  genre?: string[];
  mentions?: Person[];
  potentialAction?: ListenAction;
  // Rich Results Enhancement Fields
  mainEntityOfPage?: {
    "@type": "WebPage";
    "@id": string;
  };
  isAccessibleForFree?: boolean;
  inLanguage?: string;
  timeRequired?: string;
  dateModified?: string;
  headline?: string;
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    reviewCount: string;
    bestRating?: string;
    worstRating?: string;
  };
  review?: Array<{
    "@type": "Review";
    reviewRating: {
      "@type": "Rating";
      ratingValue: string;
      bestRating?: string;
      worstRating?: string;
    };
    author: Person;
    reviewBody?: string;
    datePublished?: string;
  }>;
  offers?: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    availability: string;
  };
  educationalLevel?: string;
  learningResourceType?: string;
  teaches?: string[];
}

export interface VideoObject {
  "@context": "https://schema.org";
  "@type": "VideoObject";
  name: string;
  description?: string;
  url: string;
  contentUrl: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  duration?: string;
  author?: Person | Organization;
  publisher?: Organization;
  keywords?: string[];
  genre?: string[];
  // Rich Results Enhancement Fields
  mainEntityOfPage?: {
    "@type": "WebPage";
    "@id": string;
  };
  isAccessibleForFree?: boolean;
  inLanguage?: string;
  interactionStatistic?: Array<{
    "@type": "InteractionCounter";
    interactionType: string;
    userInteractionCount: number;
  }>;
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    reviewCount: string;
    bestRating?: string;
    worstRating?: string;
  };
  potentialAction?: {
    "@type": "WatchAction";
    target: string[];
  };
}

export type StructuredData =
  | PodcastSeries
  | PodcastEpisode
  | VideoObject
  | Record<string, any>;

type Props = {
  data: StructuredData;
  id?: string;
};

const JSONLD = ({ data, id = "jsonld-data" }: Props) => {
  return (
    <Script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
};

export default JSONLD;
