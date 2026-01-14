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
import { generateEpisodeMetadata } from "@/src/lib/metadata";
import { generatePodcastEpisodeStructuredData } from "@/src/lib/structured-data";
import JSONLD from "@/src/components/SEO/jsonld";

// Import redirect map for legacy UUID support
import redirectMap from "@/uuid-to-pathname-redirects.json";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

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

  // If episode found by UUID, redirect to pathname (only if it's different)
  if (initial && isUuidFormat && initial.pathname?.current) {
    const currentPath = `/episodes/${slug}`;
    if (initial.pathname.current !== currentPath) {
      redirect(initial.pathname.current);
    }
  }

  // If no episode found, return 404
  if (!initial) {
    throw new Error("Episode not found");
  }

  // Generate structured data for SEO
  const structuredData = generatePodcastEpisodeStructuredData({
    title: initial.youtube?.title || initial.title || "Episode",
    description: initial.youtube?.description || initial.blurb,
    url: initial.pathname?.current || `/episodes/${slug}`,
    episodeNumber: initial.episodeNumber || initial.youtube?.episodeNumber,
    seasonNumber: initial.seasonNumber || initial.youtube?.seasonNumber,
    publishedAt: initial.youtube?.publishedAt || initial.publishedAt,
    duration: initial.youtube?.duration || initial.duration,
    youtubeId: initial.youtube?.videoId || initial.youtube?.id,
    uuid: initial.uuid || slug,
    blurb: initial.blurb,
    guests: initial.guests?.map((guest: any) => ({
      name: guest.name,
      title: guest.guestProfile?.title,
      about: guest.guestProfile?.bio,
    })),
    keywords: initial.seo?.keywords || [],
  });

  return (
    <>
      <JSONLD data={structuredData} id="episode-jsonld" />
      <EpisodeDetails data={initial} />
    </>
  );
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

    // Use our new metadata generation utility
    return generateEpisodeMetadata(episode);
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
