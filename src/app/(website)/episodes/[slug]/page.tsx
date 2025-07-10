// @ts-nocheck
import React from "react";
import { SanityDocument } from "next-sanity";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

// Components
import EpisodeDetails from "@/src/components/features/EpisodeDetails";

// Queries and utilities
import { loadEpisode } from "@/data/sanity";
import processMetadata from "@/src/lib/processMetadata";
import { formatEpisodeTitle } from "@/src/lib/formatTitle";

// Import redirect map for legacy UUID support
import redirectMap from "@/uuid-to-pathname-redirects.json";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Helper function to detect UUID format
function isUUID(identifier: string): boolean {
  // Match patterns like: 807, 807-1, 807-2, 111-2, 401-3, etc.
  return /^[0-9]+(-[0-9]+)*(_[0-9]+)*$/.test(identifier);
}

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const { slug: rawSlug } = resolvedParams;

  // Decode the URL parameter to handle special characters
  const slug = decodeURIComponent(rawSlug);

  // Check if this is a UUID format
  const isUuidFormat = isUUID(slug);

  // For UUID format, check if we have a redirect mapping
  if (isUuidFormat && redirectMap[slug]) {
    redirect(redirectMap[slug]);
  }

  // For slug format, ensure it starts with /episodes/
  const identifier = isUuidFormat
    ? slug
    : slug.startsWith("/episodes/")
      ? slug
      : `/episodes/${slug}`;
  const epID = isUuidFormat ? slug.split("-")[0] : null;

  const initial = await loadEpisode(identifier, slug);

  // If episode found by UUID, redirect to pathname
  if (initial && isUuidFormat && initial.pathname?.current) {
    redirect(initial.pathname.current);
  }

  // If no episode found, return 404
  if (!initial) {
    throw new Error("Episode not found");
  }

  return <EpisodeDetails data={initial} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const isUuidFormat = isUUID(slug);
  const identifier = isUuidFormat
    ? slug
    : slug.startsWith("/episodes/")
      ? slug
      : `/episodes/${slug}`;

  try {
    const initial = await loadEpisode(identifier, slug);
    const episode = initial;

    if (!episode) {
      return {
        title: "Episode Not Found",
        description: "The requested episode could not be found.",
        openGraph: {
          title: "Episode Not Found",
          description: "The requested episode could not be found.",
          url: `https://gybwp.com/episodes/${slug}`,
          images: ["https://gybwp.com/images/logo.webp"],
          siteName: "Growing Your Business With People",
          locale: "en_US",
        },
        twitter: {
          card: "summary_large_image",
          title: "Episode Not Found",
          description: "The requested episode could not be found.",
          images: ["https://gybwp.com/images/logo.webp"],
        },
        alternates: {
          canonical: `https://gybwp.com/episodes/${slug}`,
        },
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
    const updatedAt = episode._updatedAt || publishedAt;
    const seasonNumber = episode.seasonNumber || episode.youtube?.seasonNumber;
    const episodeNumber =
      episode.episodeNumber || episode.youtube?.episodeNumber;
    const duration = episode.youtube?.duration || episode.duration;
    const youtubeId = episode.youtube?.id;

    // Build episode URL - use pathname if available, otherwise construct from slug
    const episodeUrl = episode.pathname?.current
      ? `https://gybwp.com${episode.pathname.current}`
      : `https://gybwp.com/episodes/${slug}`;

    const youtubeUrl = youtubeId
      ? `https://www.youtube.com/watch?v=${youtubeId}`
      : null;

    // Use clean episode title without episode/season prefix
    const rawTitle = title;
    const fullTitle = formatEpisodeTitle(rawTitle);

    return {
      title: fullTitle,
      description,
      openGraph: {
        title: fullTitle,
        description,
        url: episodeUrl,
        type: "article",
        publishedTime: publishedAt,
        modifiedTime: updatedAt,
        siteName: "Growing Your Business With People",
        locale: "en_US",
        images: [image],
        ...(youtubeId && {
          videos: [
            {
              url: `https://www.youtube.com/watch?v=${youtubeId}`,
              width: 1280,
              height: 720,
              type: "video/mp4",
            },
          ],
        }),
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description,
        images: [image],
        site: "@gybwpodcast",
      },
      alternates: {
        canonical: episodeUrl,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Episode",
      description: "Growing Your Business With People podcast episode.",
      openGraph: {
        title: "Episode",
        description: "Growing Your Business With People podcast episode.",
        url: `https://gybwp.com/episodes/${slug}`,
        images: ["https://gybwp.com/images/logo.webp"],
        siteName: "Growing Your Business With People",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Episode",
        description: "Growing Your Business With People podcast episode.",
        images: ["https://gybwp.com/images/logo.webp"],
        site: "@gybwpodcast",
      },
      alternates: {
        canonical: `https://gybwp.com/episodes/${slug}`,
      },
    };
  }
}
