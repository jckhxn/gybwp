// @ts-nocheck
"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import routes from "@/src/app/(website)/routes";
import { SanityDocument } from "sanity";

import {
  Play,
  Share2,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Pause,
  X,
  Check,
  Copy,
} from "lucide-react";

// Fix import paths to use @/src/app/(website)/components instead of full paths
import Button from "@/src/components/ui/Button";
import { Separator } from "@/src/components/ui/separator";
import { formatEpisodeTitle } from "@/src/lib/formatTitle";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/src/components/ui/badge";
import { SponsorsList } from "@/src/components/features/sponsors";
import { urlForImage } from "@/src/lib/sanity-image";
import { CTA } from "@/src/components/pages/HomePage/static-data";
import TranscriptDisplay from "@/src/components/features/TranscriptDisplay";
import {
  PodcastPlayer,
  RelatedEpisodes,
  type PlayerHandle,
} from "@/src/components/features/episodes";
import StickyVideoPlayer from "@/src/components/features/StickyVideoPlayer";
import {
  formatDate,
  formatDescriptionText,
  formatDuration,
  urlFor,
} from "@/src/lib/utils";
import JSONLD from "@/src/components/SEO/jsonld";
import {
  generatePodcastEpisodeStructuredData,
  generateSimplifiedPodcastEpisodeStructuredData,
  generateEpisodeArticleStructuredData,
  generateEnhancedVideoObjectStructuredData,
  generateVideoObjectStructuredData,
  formatDurationToISO,
} from "@/src/lib/structured-data";

// Add at the top of the file after existing imports
interface DiscussionTopic {
  title?: string;
  description?: string;
}

interface Highlight {
  title?: string;
  timestamp?: string;
}

interface Sponsor {
  name?: string;
  logo?: any;
  image?: any;
  description?: string;
  url?: string;
  bgColor?: string;
  uuid?: string;
}

// Simple SubscribeForm component
const SubscribeForm = () => (
  <div className="flex flex-col space-y-4">
    <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
      <p className="text-lg font-medium">
        Join our community of purpose-driven entrepreneurs
      </p>
      <p className="text-muted-foreground">
        Connect with like-minded business owners and get weekly insights
        directly on LinkedIn.
      </p>
    </div>
    <Link
      href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7049506606413213696"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-3 rounded-lg bg-primary hover:bg-primary-dark px-8 py-3 text-base font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="white"
        className="w-5 h-5"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
      Subscribe on LinkedIn
    </Link>
    <p className="text-xs text-muted-foreground max-w-[400px] text-center sm:text-left">
      By subscribing, you&apos;ll receive our weekly newsletter and can easily
      engage with our content and community on the LinkedIn platform.
    </p>
  </div>
);

export default function EpisodeDetails({ data }: { data: SanityDocument }) {
  // For redesign just grab the document manually.
  const episode = Array.isArray(data) ? data[0] : data;

  // All hooks must be called before any early returns
  const playerRef = useRef<PlayerHandle>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Handle cases where episode data is missing or invalid
  if (!episode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Episode Not Found
          </h1>
          <p className="text-gray-600">
            The requested episode could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  // Extract data from Sanity document with proper fallbacks
  const rawTitle =
    episode?.youtube?.title || episode?.episodeName || "Untitled Episode";
  const title = formatEpisodeTitle(rawTitle);
  const blurb = episode?.youtube?.blurb || episode?.blurb || "";
  const seasonNumber =
    episode?.youtube?.seasonNumber || episode?.seasonNumber || "";
  const episodeNumber =
    episode?.youtube?.episodeNumber || episode?.episodeNumber || "";
  const publishedAt = episode?.youtube?.publishedAt || episode?.publishedAt;
  const description = episode?.youtube?.description || "";
  const takeaways = episode?.details?.keyTakeaways || [];
  const discussionTopics = episode?.details?.discussionTopics || [];
  const highlights = episode?.details?.highlights || [];
  const transcript = episode?.transcript || episode?.details?.transcript || "";
  const transcriptSegments = episode?.transcriptSegments || [];
  const featuredGuests = episode?.details?.featuredGuests || [];
  const uuid = episode?.youtube?.uuid || episode?.uuid;
  const duration = episode?.youtube?.duration || "";

  // Get sponsors from either direct sponsors or from season
  const episodeSponsors = episode?.season?.sponsors || [];
  const seasonSponsors = episode?.season?.sponsors || [];
  const sponsors =
    episodeSponsors.length > 0 ? episodeSponsors : seasonSponsors;

  const relatedEpisodes = episode?.relatedEpisodes;

  // Generate hybrid structured data for maximum rich results compatibility

  // 1. Article schema (Google Rich Results compatible)
  const articleStructuredData = generateEpisodeArticleStructuredData({
    title,
    description: description || blurb,
    url: `https://gybwp.com/episodes/${uuid}`,
    publishedAt,
    youtubeId: episode?.youtube?.id,
    uuid,
    blurb,
    guests:
      episode?.guests?.map((guest: any) => ({
        name: guest.name,
        title: guest.title,
      })) || [],
    keywords: [
      ...(takeaways || []),
      ...(discussionTopics?.map((topic: any) => topic.title).filter(Boolean) ||
        []),
    ],
    wordCount:
      (transcript && transcript.length > 0) ||
      (transcriptSegments && transcriptSegments.length > 0)
        ? transcript?.length
          ? transcript.length / 5
          : transcriptSegments.length * 50
        : 2000, // Estimate word count
  });

  // 2. PodcastEpisode schema (semantic correctness)
  const episodeStructuredData = generateSimplifiedPodcastEpisodeStructuredData({
    title,
    description: description || blurb,
    url: `https://gybwp.com/episodes/${uuid}`,
    episodeNumber: episodeNumber ? Number(episodeNumber) : undefined,
    seasonNumber: seasonNumber ? Number(seasonNumber) : undefined,
    publishedAt,
    duration,
    youtubeId: episode?.youtube?.id,
    uuid,
    blurb,
    guests:
      episode?.guests?.map((guest: any) => ({
        name: guest.name,
        title: guest.title,
        about: guest.about,
      })) || [],
    keywords: [
      ...(takeaways || []),
      ...(discussionTopics?.map((topic: any) => topic.title).filter(Boolean) ||
        []),
    ],
  });

  // 3. VideoObject schema for YouTube episodes (Google Rich Results compatible)
  const videoStructuredData = episode?.youtube?.id
    ? generateEnhancedVideoObjectStructuredData({
        title,
        description: description || blurb,
        youtubeId: episode?.youtube?.id,
        publishedAt,
        duration,
        uuid,
        blurb,
        // Add view count if available from your data
        // viewCount: episode?.youtube?.viewCount,
      })
    : null;

  // Handle play button click
  const handlePlayClick = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
    }
  };

  // Handle play state changes from the sticky player
  const handlePlayStateChange = (playing: boolean) => {
    setIsPlaying(playing);
  };

  // Share links data
  const shareLinks = [
    {
      name: "Twitter",
      icon: (
        <Image
          src="/social-logos/twitter.png"
          alt="Twitter"
          width={20}
          height={20}
        />
      ),
      color: "bg-blue-500",
      getShareUrl: (url: string) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      icon: (
        <Image
          src="/social-logos/facebook.png"
          alt="Facebook"
          width={20}
          height={20}
        />
      ),
      color: "bg-blue-600",
      getShareUrl: (url: string) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: (
        <Image
          src="/social-logos/linkedin.png"
          alt="LinkedIn"
          width={20}
          height={20}
        />
      ),
      color: "bg-blue-700",
      getShareUrl: (url: string) =>
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <>
      {/* Hybrid structured data approach for maximum rich results */}

      {/* 1. Article schema - Google Rich Results compatible */}
      <JSONLD data={articleStructuredData} id="episode-article-jsonld" />

      {/* 2. PodcastEpisode schema - semantic correctness */}
      <JSONLD data={episodeStructuredData} id="podcast-episode-jsonld" />

      {/* 3. VideoObject schema - for YouTube episodes */}
      {videoStructuredData && (
        <JSONLD data={videoStructuredData} id="video-object-jsonld" />
      )}

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary/5 via-white to-secondary/5 border-b border-gray-100">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            {/* Episode Navigation */}
            <div className="flex justify-between items-center mb-8">
              {episode?.prevEpisode ? (
                <Link href={`${episode.prevEpisode}`}>
                  <Button
                    color="primary"
                    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-sm transition-all px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous Episode
                  </Button>
                </Link>
              ) : (
                <Button
                  color="white"
                  className="flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-gray-200 opacity-50 px-4 py-2 rounded-lg text-sm font-medium"
                  disabled
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Episode
                </Button>
              )}

              {episode?.nextEpisode ? (
                <Link href={`${episode.nextEpisode}`}>
                  <Button
                    color="primary"
                    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-sm transition-all px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Next Episode
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button
                  color="white"
                  className="flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-gray-200 opacity-50 px-4 py-2 rounded-lg text-sm font-medium"
                  disabled
                >
                  Next Episode
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Episode Header */}
            <div className="text-center max-w-4xl mx-auto">
              {(seasonNumber || episodeNumber) && (
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 px-4 py-2 text-sm font-medium text-primary border border-primary/20 mb-6">
                  {seasonNumber && `Season ${seasonNumber}`}
                  {seasonNumber && episodeNumber && " • "}
                  {episodeNumber && `Episode ${episodeNumber}`}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {title}
              </h1>

              {blurb && (
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                  {blurb}
                </p>
              )}

              <div className="flex flex-wrap justify-center gap-6 text-gray-600 mb-8">
                {publishedAt && (
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">
                      {formatDate(publishedAt)}
                    </span>
                  </div>
                )}
                {duration && (
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">
                      {formatDuration(duration)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Video Player - only show if video ID exists */}
              {episode?.youtube?.id ? (
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <StickyVideoPlayer
                      videoId={episode.youtube.id}
                      title={title}
                      onPlayerRef={(ref) => {
                        if (ref?.current) {
                          // @ts-expect-error - assigning ref for player controls
                          playerRef.current = ref.current;
                        }
                      }}
                      onPlayStateChange={handlePlayStateChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-8 text-center">
                  <div className="text-gray-500">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Video Not Available
                    </h3>
                    <p className="text-gray-600">
                      This episode doesn&apos;t have an associated video.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {/* Remove the Button that triggers handlePlayClick and displays Play/Pause Episode */}
              </div>

              {/* Jump to Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Quick Navigation
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {/* Overview is always shown if there's a description */}
                  {description && (
                    <Button
                      color="primary"
                      className="py-2 px-4 text-base font-medium border-2 border-primary text-primary bg-white rounded hover:bg-primary hover:text-white transition"
                      onClick={() => {
                        const element = document.getElementById("overview");
                        if (element) {
                          const headerOffset = 80;
                          const elementPosition =
                            element.getBoundingClientRect().top +
                            window.pageYOffset;
                          const offsetPosition = elementPosition - headerOffset;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth",
                          });
                        }
                      }}
                    >
                      Overview
                    </Button>
                  )}

                  {/* Key Takeaways section */}
                  {takeaways && takeaways.length > 0 && (
                    <Button
                      color="primary"
                      className="py-2 px-4 text-base font-medium border-2 border-primary text-primary bg-white rounded hover:bg-primary hover:text-white transition"
                      onClick={() => {
                        const element =
                          document.getElementById("key-takeaways");
                        if (element) {
                          const headerOffset = 80;
                          const elementPosition =
                            element.getBoundingClientRect().top +
                            window.pageYOffset;
                          const offsetPosition = elementPosition - headerOffset;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth",
                          });
                        }
                      }}
                    >
                      Key Takeaways
                    </Button>
                  )}

                  {/* Discussion Topics section */}
                  {discussionTopics && discussionTopics.length > 0 && (
                    <Button
                      color="primary"
                      className="py-2 px-4 text-base font-medium border-2 border-primary text-primary bg-white rounded hover:bg-primary hover:text-white transition"
                      onClick={() => {
                        const element =
                          document.getElementById("discussion-topics");
                        if (element) {
                          const headerOffset = 80;
                          const elementPosition =
                            element.getBoundingClientRect().top +
                            window.pageYOffset;
                          const offsetPosition = elementPosition - headerOffset;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth",
                          });
                        }
                      }}
                    >
                      Discussion Topics
                    </Button>
                  )}

                  {/* Episode Highlights section */}
                  {highlights && highlights.length > 0 && (
                    <Button
                      color="primary"
                      className="py-2 px-4 text-base font-medium border-2 border-primary text-primary bg-white rounded hover:bg-primary hover:text-white transition"
                      onClick={() => {
                        const element =
                          document.getElementById("episode-highlights");
                        if (element) {
                          const headerOffset = 80;
                          const elementPosition =
                            element.getBoundingClientRect().top +
                            window.pageYOffset;
                          const offsetPosition = elementPosition - headerOffset;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth",
                          });
                        }
                      }}
                    >
                      Episode Highlights
                    </Button>
                  )}

                  {/* Transcript section */}
                  {((transcript && transcript.length > 0) ||
                    (transcriptSegments && transcriptSegments.length > 0)) && (
                    <Button
                      color="primary"
                      className="py-2 px-4 text-base font-medium border-2 border-primary text-primary bg-white rounded hover:bg-primary hover:text-white transition"
                      onClick={() => {
                        const element = document.getElementById("transcript");
                        if (element) {
                          const headerOffset = 80;
                          const elementPosition =
                            element.getBoundingClientRect().top +
                            window.pageYOffset;
                          const offsetPosition = elementPosition - headerOffset;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth",
                          });
                        }
                      }}
                    >
                      Transcript
                    </Button>
                  )}

                  {/* Featured Guest section */}
                  {episode?.guests &&
                    Array.isArray(episode.guests) &&
                    episode.guests.length > 0 && (
                      <Button
                        color="primary"
                        className="py-2 px-4 text-base font-medium border-2 border-primary text-primary bg-white rounded hover:bg-primary hover:text-white transition"
                        onClick={() => {
                          const element =
                            document.getElementById("featured-guest");
                          if (element) {
                            const headerOffset = 80;
                            const elementPosition =
                              element.getBoundingClientRect().top +
                              window.pageYOffset;
                            const offsetPosition =
                              elementPosition - headerOffset;

                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth",
                            });
                          }
                        }}
                      >
                        Featured Guests
                      </Button>
                    )}
                </div>
              </div>

              {/* Decorative Separator */}
              <div className="flex items-center justify-center py-8">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"></div>
                <div className="mx-4 p-2 bg-white rounded-full border border-gray-200 shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"></div>
              </div>

              {/* Episode Content Sections */}
              <div className="space-y-12">
                {/* Overview Section - always shown if there's a description */}
                {description && (
                  <div
                    id="overview"
                    className="relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Episode Overview
                        </h2>
                      </div>
                      <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                        {formatDescriptionText(description).map(
                          (paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Takeaways Section */}
                {takeaways && takeaways.length > 0 && (
                  <div
                    id="key-takeaways"
                    className="relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-yellow-100 rounded-xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-yellow-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Key Takeaways
                        </h2>
                      </div>
                      <div className="space-y-4">
                        {takeaways.map((takeaway: string, index: number) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                              <span className="text-sm font-bold text-yellow-600">
                                {index + 1}
                              </span>
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed">
                              {takeaway}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Discussion Topics Section */}
                {discussionTopics && discussionTopics.length > 0 && (
                  <div
                    id="discussion-topics"
                    className="relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Discussion Topics
                        </h2>
                      </div>
                      <div className="grid gap-6">
                        {discussionTopics.map(
                          (topic: DiscussionTopic, index: number) => (
                            <div
                              key={index}
                              className="border-l-4 border-blue-400 pl-6"
                            >
                              <h3 className="font-semibold text-xl text-gray-900 mb-2">
                                {topic.title || `Topic ${index + 1}`}
                              </h3>
                              <p className="text-gray-700 text-lg leading-relaxed">
                                {topic.description || ""}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Episode Highlights Section */}
                {highlights && highlights.length > 0 && (
                  <div
                    id="episode-highlights"
                    className="relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-500"></div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-green-100 rounded-xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Episode Highlights
                        </h2>
                      </div>
                      <div className="space-y-6">
                        {highlights.map(
                          (highlight: Highlight, index: number) => (
                            <div key={index} className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                                <span className="text-sm font-bold text-green-600">
                                  {index + 1}
                                </span>
                              </div>
                              <div className="flex-grow flex flex-col">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-xl text-gray-900">
                                    {highlight.title ||
                                      `Highlight ${index + 1}`}
                                  </h3>
                                  {highlight.timestamp && (
                                    <button
                                      onClick={() => {
                                        if (
                                          playerRef.current &&
                                          typeof highlight.timestamp ===
                                            "string"
                                        ) {
                                          // Convert timestamp to seconds
                                          const parts =
                                            highlight.timestamp.split(":");
                                          let seconds = 0;
                                          if (parts.length === 3) {
                                            // HH:MM:SS
                                            seconds =
                                              parseInt(parts[0]) * 3600 +
                                              parseInt(parts[1]) * 60 +
                                              parseInt(parts[2]);
                                          } else if (parts.length === 2) {
                                            // MM:SS
                                            seconds =
                                              parseInt(parts[0]) * 60 +
                                              parseInt(parts[1]);
                                          } else if (parts.length === 1) {
                                            // SS
                                            seconds = parseInt(parts[0]);
                                          }
                                          playerRef.current.seekTo(
                                            seconds,
                                            true
                                          );
                                        }
                                      }}
                                      className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-lg px-3 py-1.5 text-sm hover:from-green-600 hover:to-teal-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M8 5v14l11-7z" />
                                      </svg>
                                      {highlight.timestamp || "00:00"}
                                    </button>
                                  )}
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                  {highlight.description ||
                                    "Click the timestamp to jump to this moment in the episode"}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Transcript Section */}
                {((transcript && transcript.length > 0) ||
                  (transcriptSegments && transcriptSegments.length > 0)) && (
                  <div
                    id="transcript"
                    className="relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-purple-100 rounded-xl">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-purple-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900">
                            Episode Transcript
                          </h2>
                        </div>
                        <Button
                          color="primary"
                          className="bg-white border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 hover:text-purple-700 transition-all duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                            />
                          </svg>
                          View Full Transcript
                        </Button>
                      </div>

                      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                        <div className="max-h-80 overflow-y-scroll space-y-4 pr-2 transcript-scroll">
                          <TranscriptDisplay
                            transcript={transcript}
                            transcriptSegments={transcriptSegments}
                            className="transcript-content"
                            youtubeId={episode?.youtube?.id}
                            playerRef={playerRef}
                            allSpeakers={episode?.allSpeakers}
                          />
                        </div>

                        {/* Scroll indicator */}
                        <div className="mt-4 text-center">
                          <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                              />
                            </svg>
                            Scroll to read more • Click timestamps to jump to
                            specific moments
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Featured Guest */}
              {episode?.guests &&
                Array.isArray(episode.guests) &&
                episode.guests.length > 0 && (
                  <div
                    id="featured-guest"
                    className="bg-muted/20 dark:bg-muted/10 rounded-lg p-6"
                  >
                    <h2 className="text-xl font-semibold mb-4">
                      Featured Guest{episode.guests.length > 1 ? "s" : ""}
                    </h2>
                    <div className="space-y-8">
                      {episode.guests.map((guest, index) => (
                        <div
                          key={guest._id || index}
                          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                        >
                          <Avatar className="h-20 w-20">
                            {guest.image ? (
                              <AvatarImage
                                src={urlFor(guest.image)
                                  .width(160)
                                  .height(160)
                                  .url()}
                                alt={guest.name || "Guest"}
                              />
                            ) : (
                              <AvatarImage
                                src="/placeholder.svg?height=80&width=80"
                                alt={guest.name || "Guest"}
                              />
                            )}
                            <AvatarFallback>
                              {guest.name
                                ? guest.name.substring(0, 2).toUpperCase()
                                : "GU"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">
                              {guest.name || "Guest Name"}
                            </h3>
                            {guest.title && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {guest.title}
                              </p>
                            )}
                            {guest.about && (
                              <p className="text-sm text-muted-foreground mb-4">
                                {guest.about}
                              </p>
                            )}
                            <div className="flex gap-2">
                              {guest.slug && guest.slug.current && (
                                <Link href={`/guest/${encodeURIComponent(guest.slug.current)}`}>
                                  <Button
                                    color="primary"
                                    className="flex items-center gap-1 px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded transition-all text-sm font-medium"
                                  >
                                    More Details
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Subscribe Card */}
              <div className="relative bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 7.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9.879 9.879a3 3 0 000 4.242M6.343 6.343a7 7 0 000 10.314m8.485 0a7 7 0 000-10.314"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Subscribe to our Podcast
                    </h3>
                    <p className="text-gray-600">
                      Never miss an episode and get insights directly from
                      business leaders
                    </p>
                  </div>

                  <SubscribeForm />

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 mb-4 text-center">
                      Also available on:
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      <Link
                        href="https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          color="primary"
                          className="flex items-center justify-center gap-3 w-full bg-gray-900 text-white hover:bg-gray-800 font-medium py-3 transition-all"
                        >
                          <div className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center">
                            <Image
                              src="/social-logos/apple.png"
                              alt="Apple Podcasts"
                              width={16}
                              height={16}
                              className="brightness-0 invert"
                            />
                          </div>
                          Apple Podcasts
                        </Button>
                      </Link>
                      <Link
                        href="https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          color="primary"
                          className="flex items-center justify-center gap-3 w-full bg-green-500 text-white hover:bg-green-600 font-medium py-3 transition-all"
                        >
                          <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                            <Image
                              src="/social-logos/spotify.png"
                              alt="Spotify"
                              width={16}
                              height={16}
                              className="brightness-0 invert"
                            />
                          </div>
                          Spotify
                        </Button>
                      </Link>
                      <Link
                        href={routes.external.listen}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          color="primary"
                          className="flex items-center justify-center gap-3 w-full bg-orange-500 text-white hover:bg-orange-600 font-medium py-3 transition-all"
                        >
                          <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
                            <Image
                              src="/social-logos/buzzsprout.png"
                              alt="Buzzsprout"
                              width={16}
                              height={16}
                              className="brightness-0 invert"
                            />
                          </div>
                          Buzzsprout
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sponsors Card - only shown if sponsors exist */}
              {sponsors && sponsors.length > 0 && (
                <div className="relative bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Our Sponsors
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Supporting great content and community
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                      {sponsors.map((sponsor: any, index: number) => (
                        <div
                          key={
                            sponsor._id || sponsor.uuid || sponsor.name || index
                          }
                          className="group relative flex-shrink-0"
                        >
                          {/* Sponsor Link Wrapper */}
                          {sponsor.slug?.current ||
                          sponsor.uuid ||
                          sponsor.website ? (
                            <Link
                              href={
                                sponsor.slug?.current
                                  ? `/sponsors/${sponsor.slug.current}`
                                  : sponsor.uuid
                                    ? `/sponsors/${sponsor.uuid}`
                                    : sponsor.website
                              }
                              target={sponsor.website ? "_blank" : undefined}
                              rel={
                                sponsor.website
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="block transition-all duration-300 hover:scale-105 relative"
                            >
                              {/* External Link Indicator */}
                              {sponsor.website && (
                                <div className="absolute -top-1 -right-1 z-10 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <ExternalLink
                                    size={10}
                                    className="text-white"
                                  />
                                </div>
                              )}
                              <div className="flex flex-col items-center text-center">
                                {/* Logo Container */}
                                <div className="w-28 h-20 sm:w-36 sm:h-24 relative rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                  <Image
                                    src={
                                      sponsor.logo
                                        ? urlForImage(sponsor.logo)
                                            ?.width(250)
                                            .height(150)
                                            .url()
                                        : sponsor.image ||
                                          "/placeholder-logo.png"
                                    }
                                    alt={`${sponsor.name} logo`}
                                    width={120}
                                    height={80}
                                    className="object-contain p-3 max-w-full max-h-full"
                                    sizes="(max-width: 640px) 112px, 144px"
                                  />
                                </div>

                                {/* Sponsor Name - Always Visible */}
                                <h4 className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-gray-900 transition-colors duration-300 max-w-[112px] sm:max-w-[144px] truncate">
                                  {sponsor.name}
                                </h4>

                                {/* Tier Badge */}
                                {sponsor.tier && (
                                  <span
                                    className={`mt-1 inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-medium rounded-full ${
                                      sponsor.tier === "platinum"
                                        ? "bg-gray-800 text-white"
                                        : sponsor.tier === "gold"
                                          ? "bg-yellow-500 text-white"
                                          : sponsor.tier === "silver"
                                            ? "bg-gray-400 text-white"
                                            : sponsor.tier === "bronze"
                                              ? "bg-orange-600 text-white"
                                              : "bg-gray-200 text-gray-700"
                                    }`}
                                  >
                                    {sponsor.tier}
                                  </span>
                                )}
                              </div>
                            </Link>
                          ) : (
                            /* Non-clickable sponsor */
                            <div className="flex flex-col items-center text-center">
                              <div className="w-28 h-20 sm:w-36 sm:h-24 relative rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                                <Image
                                  src={
                                    sponsor.logo
                                      ? urlForImage(sponsor.logo)
                                          ?.width(250)
                                          .height(150)
                                          .url()
                                      : sponsor.image || "/placeholder-logo.png"
                                  }
                                  alt={`${sponsor.name} logo`}
                                  width={120}
                                  height={80}
                                  className="object-contain p-3 max-w-full max-h-full"
                                  sizes="(max-width: 640px) 112px, 144px"
                                />
                              </div>

                              <h4 className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-gray-900 max-w-[112px] sm:max-w-[144px] truncate">
                                {sponsor.name}
                              </h4>

                              {sponsor.tier && (
                                <span
                                  className={`mt-1 inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-medium rounded-full ${
                                    sponsor.tier === "platinum"
                                      ? "bg-gray-800 text-white"
                                      : sponsor.tier === "gold"
                                        ? "bg-yellow-500 text-white"
                                        : sponsor.tier === "silver"
                                          ? "bg-gray-400 text-white"
                                          : sponsor.tier === "bronze"
                                            ? "bg-orange-600 text-white"
                                            : "bg-gray-200 text-gray-700"
                                  }`}
                                >
                                  {sponsor.tier}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Support Message */}
                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        Special thanks to our sponsors who help make this
                        podcast possible
                      </p>
                      {sponsors.some(
                        (s) => s.website || s.slug?.current || s.uuid
                      ) && (
                        <p className="text-xs text-gray-500">
                          Click on sponsor logos to learn more about them
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Related Episodes */}
              {data.relatedEpisodes && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden p-8 mt-12">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Related Episodes
                    </h3>
                    <p className="text-gray-600 text-sm">
                      More episodes you might enjoy
                    </p>
                  </div>
                  <RelatedEpisodes
                    uuid={uuid}
                    relatedEpisodes={
                      Array.isArray(data.relatedEpisodes)
                        ? data.relatedEpisodes
                        : []
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
