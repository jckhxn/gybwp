import type { Metadata } from "next";

interface Episode {
  episodeName?: string;
  blurb?: string;
  youtube?: {
    title?: string;
    blurb?: string;
    id?: string;
    thumbnail?: string;
    publishedAt?: string;
    duration?: string;
    episodeNumber?: number;
    seasonNumber?: number;
  };
  episodeNumber?: number;
  seasonNumber?: number;
  publishedAt?: string;
  uuid?: string;
  url?: string;
  guests?: Array<{
    name: string;
    title?: string;
  }>;
  sponsors?: Array<{
    name: string;
  }>;
}

interface Data {
  seo?: {
    title?: string;
    description?: string;
    ogimage?: string[];
    noIndex?: boolean;
  };
  pathname?: {
    current?: string;
  };
  data?: Episode[];
}

export default async function processMetadata(data: Data): Promise<Metadata> {
  const { title, description, ogimage, noIndex } = data?.seo || {};

  // Handle array of episodes (typical structure)
  const episode = Array.isArray(data.data) ? data.data[0] : data.data;

  if (!episode) {
    return {
      title: "Episode Not Found",
      description: "The requested episode could not be found.",
    };
  }

  // Extract episode information
  const episodeTitle =
    episode.episodeName || episode.youtube?.title || title || "Episode";
  const episodeDescription =
    episode.blurb ||
    episode.youtube?.blurb ||
    description ||
    "Listen to this episode of Growing Your Business With People.";
  const youtubeId = episode.youtube?.id;
  const thumbnail =
    episode.youtube?.thumbnail ||
    ogimage?.[0] ||
    "https://gybwp.com/images/logo.webp";
  const publishedAt = episode.youtube?.publishedAt || episode.publishedAt;
  const episodeNumber = episode.episodeNumber || episode.youtube?.episodeNumber;
  const seasonNumber = episode.seasonNumber || episode.youtube?.seasonNumber;
  const duration = episode.youtube?.duration;
  const uuid = episode.uuid;

  // Build URLs
  const episodeUrl = `https://gybwp.com/episode/${uuid}`;
  const youtubeUrl = youtubeId
    ? `https://www.youtube.com/watch?v=${youtubeId}`
    : episode.url;

  // Format title with episode information
  let fullTitle = episodeTitle;
  if (seasonNumber && episodeNumber) {
    fullTitle = `S${seasonNumber}E${episodeNumber}: ${episodeTitle}`;
  } else if (episodeNumber) {
    fullTitle = `Episode ${episodeNumber}: ${episodeTitle}`;
  }

  // Enhanced description with guest information
  let enhancedDescription = episodeDescription;
  if (episode.guests && episode.guests.length > 0) {
    const guestNames = episode.guests.map((guest) => guest.name).join(", ");
    enhancedDescription = `${episodeDescription} Featuring ${guestNames}.`;
  }

  return {
    metadataBase: new URL("https://gybwp.com"),
    title: fullTitle,
    description: enhancedDescription,

    openGraph: {
      type: "video.episode",
      url: episodeUrl,
      title: fullTitle,
      description: enhancedDescription,
      images: [
        {
          url: thumbnail,
          width: 1280,
          height: 720,
          alt: `${episodeTitle} - Growing Your Business With People Podcast`,
        },
      ],
      videos: youtubeId
        ? [
            {
              url: youtubeUrl || "",
              secureUrl: `https://www.youtube.com/embed/${youtubeId}`,
              type: "text/html",
              width: 1280,
              height: 720,
            },
          ]
        : undefined,
      siteName: "Growing Your Business With People",
      locale: "en_US",
    },

    twitter: {
      card: "player",
      site: "@gybwp", // Update with actual Twitter handle
      creator: "@gybwp", // Update with actual Twitter handle
      title: fullTitle,
      description: enhancedDescription,
      images: [thumbnail],
      ...(youtubeId && {
        players: [
          {
            playerUrl: `https://www.youtube.com/embed/${youtubeId}`,
            streamUrl: youtubeUrl || "",
            width: 1280,
            height: 720,
          },
        ],
      }),
    },

    alternates: {
      canonical: episodeUrl,
    },

    other: {
      // Podcast-specific metadata
      "podcast:episode": episodeNumber?.toString() || "",
      "podcast:season": seasonNumber?.toString() || "",
      "podcast:duration": duration || "",
      "podcast:publishedAt": publishedAt || "",
      // Schema.org structured data hints
      "article:published_time": publishedAt || "",
      "article:section": "Podcast",
      "article:tag": "business,leadership,people,growth",
    },

    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    keywords: [
      "business podcast",
      "leadership",
      "growing business",
      "people management",
      "CEO podcast",
      "business growth",
      episodeTitle,
      ...(episode.guests?.map((guest) => guest.name) || []),
      ...(episode.sponsors?.map((sponsor) => sponsor.name) || []),
    ].filter(Boolean),
  };
}
