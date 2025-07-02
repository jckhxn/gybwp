// @ts-nocheck
import React from "react";
import { draftMode } from "next/headers";
import { SanityDocument } from "next-sanity";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

// Components
import EpisodePreview from "@/src/app/(website)/components/EpisodePreview";
import EpisodeDetails from "@/src/app/(website)/components/EpisodeDetails/";
import { EpisodeSectionRenderer } from "@/components/sections/episodes/EpisodeSectionRenderer";

// Queries and utilities
import { 
  EPISODE_BY_IDENTIFIER_QUERY, 
  EPISODE_WITH_PAGE_BUILDER_QUERY,
  DEFAULT_EPISODE_TEMPLATE_QUERY 
} from "../../lib/queries";
import { loadQuery } from "@/src/app/(website)/lib/store";
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
  const { slug } = resolvedParams;

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

  const initial = await loadQuery<SanityDocument>(
    EPISODE_WITH_PAGE_BUILDER_QUERY,
    { identifier, epID },
    {
      perspective: (await draftMode()).isEnabled
        ? "previewDrafts"
        : "published",
    }
  );

  // If episode found by UUID, redirect to pathname
  if (initial.data && isUuidFormat && initial.data.pathname?.current) {
    redirect(initial.data.pathname.current);
  }

  // If no episode found, return 404
  if (!initial.data) {
    throw new Error("Episode not found");
  }

  // Get episode data
  const episode = initial.data;

  // Check if episode has custom layout enabled
  if (episode.customLayout && episode.sectionsBody && episode.sectionsBody.length > 0) {
    // Use custom page builder layout
    if ((await draftMode()).isEnabled) {
      return <EpisodePreview initial={initial} params={{ identifier, epID }} />;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {episode.sectionsBody.map((section: any, index: number) => (
              <EpisodeSectionRenderer
                key={index}
                section={section}
                episode={episode}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Check for default template
  const templateQuery = await loadQuery<SanityDocument>(
    DEFAULT_EPISODE_TEMPLATE_QUERY,
    {},
    {
      perspective: (await draftMode()).isEnabled
        ? "previewDrafts"
        : "published",
    }
  );

  if (templateQuery.data && templateQuery.data.sectionsBody && templateQuery.data.sectionsBody.length > 0) {
    // Use default template layout
    if ((await draftMode()).isEnabled) {
      return <EpisodePreview initial={initial} params={{ identifier, epID }} />;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {templateQuery.data.sectionsBody.map((section: any, index: number) => (
              <EpisodeSectionRenderer
                key={index}
                section={section}
                episode={episode}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Fallback to legacy EpisodeDetails component
  return (await draftMode()).isEnabled ? (
    <EpisodePreview initial={initial} params={{ identifier, epID }} />
  ) : (
    <>
      <EpisodeDetails data={initial.data} />
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
  const epID = isUuidFormat ? slug.split("-")[0] : null;

  try {
    const initial = await loadQuery<SanityDocument>(
      EPISODE_WITH_PAGE_BUILDER_QUERY,
      { identifier, epID },
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

    // Process metadata with all episode information
    const metadata = processMetadata({
      type: "episode",
      title: fullTitle,
      description,
      image,
      url: episodeUrl,
      publishedAt,
      seasonNumber,
      episodeNumber,
      duration,
      youtubeUrl,
    });

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Episode",
      description: "Growing Your Business With People podcast episode.",
    };
  }
}
