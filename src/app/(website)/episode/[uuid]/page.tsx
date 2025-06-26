// @ts-nocheck
import React from "react";
import { draftMode } from "next/headers";
import { SanityDocument } from "next-sanity";
import type { Metadata } from "next";

// Components
import EpisodePreview from "@/src/app/(website)/components/EpisodePreview";
import EpisodeDetails from "@/src/app/(website)/components/EpisodeDetails/";

// Queries and utilities
import { PODCAST_DETAILS_QUERY } from "../../lib/queries";
import { loadQuery } from "@/src/app/(website)/lib/store";
import processMetadata from "@/src/lib/processMetadata";
import { formatEpisodeTitle } from "@/src/lib/formatTitle";

type PageProps = {
  params: Promise<{ uuid: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const { uuid } = resolvedParams;
  const epID = uuid.split("-")[0];

  const initial = await loadQuery<SanityDocument>(
    PODCAST_DETAILS_QUERY,
    { uuid, epID },
    {
      perspective: (await draftMode()).isEnabled
        ? "previewDrafts"
        : "published",
    }
  );

  return (await draftMode()).isEnabled ? (
    <EpisodePreview initial={initial} params={{ uuid, epID }} />
  ) : (
    <>
      <EpisodeDetails data={initial.data} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uuid: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { uuid } = resolvedParams;
  const epID = uuid.split("-")[0];

  try {
    const initial = await loadQuery<SanityDocument>(
      PODCAST_DETAILS_QUERY,
      { uuid, epID },
      {
        perspective: (await draftMode()).isEnabled
          ? "previewDrafts"
          : "published",
      }
    );

    const episode = initial.data;

    if (!episode) {
      return {
        title: "Episode Not Found",
        description: "The requested episode could not be found.",
      };
    }

    // Extract episode data
    const title = episode.episodeName || episode.youtube?.title || "Episode";
    const description =
      episode.blurb ||
      episode.youtube?.blurb ||
      "Listen to this episode of Growing Your Business With People.";
    const image =
      episode.image ||
      episode.youtube?.thumbnail ||
      "https://gybwp.com/images/logo.webp";
    const publishedAt = episode.youtube?.publishedAt || episode.publishedAt;
    const seasonNumber = episode.seasonNumber || episode.youtube?.seasonNumber;
    const episodeNumber =
      episode.episodeNumber || episode.youtube?.episodeNumber;
    const duration = episode.youtube?.duration || episode.duration;
    const youtubeId = episode.youtube?.id;

    // Build episode URL
    const episodeUrl = `https://gybwp.com/episode/${uuid}`;
    const youtubeUrl = youtubeId
      ? `https://www.youtube.com/watch?v=${youtubeId}`
      : null;

    // Use clean episode title without episode/season prefix
    const rawTitle = title;
    const fullTitle = formatEpisodeTitle(rawTitle);

    // Get guest names for description enhancement
    const guestNames =
      episode.guests?.map((guest: any) => guest.name).filter(Boolean) || [];
    let enhancedDescription = description;
    if (guestNames.length > 0) {
      enhancedDescription = `${description} Featuring ${guestNames.join(", ")}.`;
    }

    // Add published date to description if available
    if (publishedAt) {
      const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      enhancedDescription += ` Published on ${formattedDate}.`;
    }

    return {
      title: fullTitle,
      description: enhancedDescription,

      openGraph: {
        type: "video.episode",
        url: episodeUrl,
        title: fullTitle,
        description: enhancedDescription,
        images: [
          {
            url: image,
            width: 1280,
            height: 720,
            alt: `${title} - Growing Your Business With People Podcast`,
          },
        ],
        videos: youtubeId
          ? [
              {
                url: youtubeUrl!,
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
        images: [image],
        ...(youtubeId && {
          players: [
            {
              playerUrl: `https://www.youtube.com/embed/${youtubeId}`,
              streamUrl: youtubeUrl!,
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
        index: true,
        follow: true,
        googleBot: {
          index: true,
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
        title,
        ...guestNames,
      ].filter(Boolean),
    };
  } catch (error) {
    console.error("Error generating metadata for episode:", error);
    return {
      title: "Episode - Growing Your Business With People",
      description:
        "Listen to this episode of Growing Your Business With People podcast.",
    };
  }
}
