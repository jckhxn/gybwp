// @ts-nocheck
"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import routes from "@/src/app/(website)/routes";
import { SanityDocument } from "sanity";
import { PortableText } from "@portabletext/react";

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
import Button from "@/src/app/(website)/components/ui/button";
import { Separator } from "@/src/app/(website)/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/app/(website)/components/ui/avatar";
import { Card, CardContent } from "@/src/app/(website)/components/ui/card";
import { Badge } from "@/src/app/(website)/components/ui/badge";
import { CTA } from "../HomePage/static-data";
import PodcastPlayer, {
  PlayerHandle,
} from "../../episode/[uuid]/podcast-player";
import StickyVideoPlayer from "../StickyVideoPlayer";
import RelatedEpisodes from "../../episode/[uuid]/related-episodes";
import {
  formatDate,
  formatDescriptionText,
  formatDuration,
  urlFor,
} from "../../lib/utils";

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
      href={CTA.buttonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-8 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-secondary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect width="4" height="12" x="2" y="9"></rect>
        <circle cx="4" cy="4" r="2"></circle>
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

  // Extract data from Sanity document
  const title =
    episode?.youtube?.title || episode?.episodeName || "Untitled Episode";
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
  const transcript = episode?.details?.transcript || "";
  const featuredGuests = episode?.details?.featuredGuests || [];
  const uuid = episode?.youtube?.uuid || episode?.uuid;
  const duration = episode?.youtube?.duration || "";

  // Get sponsors from either direct sponsors or from season
  const episodeSponsors = episode?.season.sponsors || [];
  const seasonSponsors = episode?.season?.sponsors || [];
  const sponsors =
    episodeSponsors.length > 0 ? episodeSponsors : seasonSponsors;

  const relatedEpisodes = episode?.relatedEpisodes;

  // Create a ref to the player component
  const playerRef = useRef<PlayerHandle>(null);
  // Track playing state
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle play button click
  const handlePlayClick = () => {
    if (playerRef.current) {
      playerRef.current.togglePlay();
      setIsPlaying(!isPlaying);
    }
  };

  // Update playing state from the player
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setIsPlaying(playerRef.current.isPlaying);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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

  // Share modal component
  const ShareModal = () => {
    const [currentUrl, setCurrentUrl] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);

    // Update the URL after component is mounted (client-side only)
    useEffect(() => {
      setCurrentUrl(window.location.href);
    }, []);

    const handleCopyLink = async () => {
      if (!currentUrl) return;

      try {
        await navigator.clipboard.writeText(currentUrl);
        setCopySuccess(true);

        // Reset the success message after 2 seconds
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${
          isShareModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 ease-in-out`}
        onClick={() => setIsShareModalOpen(false)}
      >
        <div
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 ${
            isShareModalOpen
              ? "scale-100 translate-y-0"
              : "scale-95 translate-y-4"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Share this episode</h3>
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Share this episode with your network:
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={currentUrl ? link.getShareUrl(currentUrl) : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} text-white px-4 py-2 rounded-md hover:opacity-90 transition-all transform hover:scale-105 shadow-md flex items-center gap-2`}
                  aria-label={`Share on ${link.name}`}
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Or copy the link:
            </p>
            <div className="flex flex-col">
              <div className="flex">
                <input
                  type="text"
                  value={currentUrl}
                  readOnly
                  className="flex-1 p-2 text-sm border rounded-l-md bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 rounded-r-md transition-colors flex items-center justify-center ${
                    copySuccess
                      ? "bg-green-500 text-white"
                      : "bg-primary text-white hover:bg-primary-dark"
                  }`}
                >
                  {copySuccess ? (
                    <Check className="h-4 w-4 mr-1" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1" />
                  )}
                  {copySuccess ? "Copied" : "Copy"}
                </button>
              </div>
              {copySuccess && (
                <p className="text-green-500 text-xs mt-2">
                  Link copied to clipboard!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Episode Navigation */}
            <div className="flex justify-between items-center">
              {episode?.prevEpisode ? (
                <Link href={`${episode.prevEpisode}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous Episode
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 opacity-50"
                  disabled
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Episode
                </Button>
              )}

              {episode?.nextEpisode ? (
                <Link href={`${episode.nextEpisode}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    Next Episode
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 opacity-50"
                  disabled
                >
                  Next Episode
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Episode Header */}
            <div>
              <Badge variant="outline" className="mb-2">
                Season {seasonNumber} • Episode {episodeNumber}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight mb-4">
                {title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                {publishedAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(publishedAt)}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(duration)}</span>
                </div>
              </div>
            </div>

            {/* Video Player */}
            <StickyVideoPlayer 
              videoId={episode?.youtube?.id}
              title={title}
              onPlayerRef={(ref) => {
                if (ref?.current) {
                  // @ts-expect-error - assigning ref for player controls
                  playerRef.current = ref.current;
                }
              }}
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                className="flex items-center gap-2"
                onClick={handlePlayClick}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause Episode
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Play Episode
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setIsShareModalOpen(true)}
              >
                <Share2 className="h-4 w-4" />
                Share Episode
              </Button>
            </div>

            {/* Jump to Section */}
            <div className="bg-muted/30 dark:bg-muted/10 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-3">Jump to Section:</h3>
              <div className="flex flex-wrap gap-2">
                {/* Overview is always shown if there's a description */}
                {description && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
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
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      const element = document.getElementById("key-takeaways");
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
                    variant="outline"
                    size="sm"
                    className="text-xs"
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
                    variant="outline"
                    size="sm"
                    className="text-xs"
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
                {transcript && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
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
                {data.guests &&
                  Array.isArray(data.guests) &&
                  data.guests.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        const element =
                          document.getElementById("featured-guest");
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
                      Featured Guest
                    </Button>
                  )}
              </div>
            </div>

            <Separator />

            {/* Episode Content Sections */}
            <div className="space-y-8">
              {/* Overview Section - always shown if there's a description */}
              {description && (
                <div
                  id="overview"
                  className="bg-muted/20 dark:bg-muted/10 rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold mb-3">
                    Episode Overview
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {formatDescriptionText(description).map(
                      (paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Key Takeaways Section */}
              {takeaways && takeaways.length > 0 && (
                <div
                  id="key-takeaways"
                  className="bg-muted/20 dark:bg-muted/10 rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {takeaways.map((takeaway: string, index: number) => (
                      <li key={index}>{takeaway}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Discussion Topics Section */}
              {discussionTopics && discussionTopics.length > 0 && (
                <div
                  id="discussion-topics"
                  className="bg-muted/20 dark:bg-muted/10 rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold mb-3">
                    Discussion Topics
                  </h2>
                  <div className="space-y-4">
                    {discussionTopics.map(
                      (topic: DiscussionTopic, index: number) => (
                        <div key={index}>
                          <h3 className="font-medium text-base">
                            {topic.title || `Topic ${index + 1}`}
                          </h3>
                          <p className="text-muted-foreground">
                            {topic.description || ""}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Episode Highlights Section */}
              {highlights && highlights.length > 0 && (
                <div
                  id="episode-highlights"
                  className="bg-muted/20 dark:bg-muted/10 rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold mb-3">
                    Episode Highlights
                  </h2>
                  <div className="space-y-3">
                    {highlights.map((highlight: Highlight, index: number) => (
                      <div key={index} className="flex gap-3">
                        <button
                          onClick={() => {
                            if (
                              playerRef.current &&
                              highlight.timestamp &&
                              typeof highlight.timestamp === "string"
                            ) {
                              // Convert timestamp to seconds
                              const parts = highlight.timestamp.split(":");
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
                                  parseInt(parts[0]) * 60 + parseInt(parts[1]);
                              } else if (parts.length === 1) {
                                // SS
                                seconds = parseInt(parts[0]);
                              }
                              playerRef.current.seekTo(seconds);
                              setIsPlaying(true);
                            }
                          }}
                          className=""
                        >
                          <span className="bg-primary/10 text-primary font-medium rounded-full h-6 w-16 flex items-center justify-center text-xs">
                            {highlight.timestamp || "00:00"}
                          </span>
                        </button>
                        <div>
                          <p className="font-medium">
                            {highlight.title || `Highlight ${index + 1}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transcript Section */}
              {transcript && (
                <div
                  id="transcript"
                  className="bg-muted/20 dark:bg-muted/10 rounded-lg p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      Episode Transcript
                    </h2>
                    <Button variant="outline" size="sm">
                      View Full Transcript
                    </Button>
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-4">
                    <PortableText
                      value={transcript}
                      components={{
                        block: (props) => {
                          const { value, children } = props;
                          const style = value.style || "normal";

                          if (style === "h4") {
                            return (
                              <h4 className="font-medium text-base mt-4 mb-2">
                                {children}
                              </h4>
                            );
                          }

                          return (
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                              {children}
                            </p>
                          );
                        },
                        marks: {
                          strong: ({ children }) => <strong>{children}</strong>,
                          em: ({ children }) => <em>{children}</em>,
                          timestamp: ({ value, children }) => (
                            <button
                              className="bg-primary/10 text-primary font-medium rounded-full px-2 py-1 text-xs ml-1 hover:bg-primary/20 transition-colors"
                              onClick={() => {
                                if (playerRef.current && value?.time) {
                                  // Convert timestamp to seconds
                                  const parts = value.time.split(":");
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
                                  }
                                  playerRef.current.seekTo(seconds);
                                  setIsPlaying(true);
                                }
                              }}
                            >
                              {value?.time || "00:00"}
                            </button>
                          ),
                        },
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Featured Guest */}
            {data.guests &&
              Array.isArray(data.guests) &&
              data.guests.length > 0 && (
                <div
                  id="featured-guest"
                  className="bg-muted/20 dark:bg-muted/10 rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold mb-4">
                    Featured Guest{data.guests.length > 1 ? "s" : ""}
                  </h2>
                  <div className="space-y-8">
                    {data.guests.map((guest, index) => (
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
                              <Link href={`/guest/${guest.slug.current}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-1"
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
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Subscribe to our Podcast
                </h3>

                <SubscribeForm />
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Also available on:</p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Image
                          src="/social-logos/apple.png"
                          alt="Apple Podcasts"
                          width={16}
                          height={16}
                        />
                        Apple Podcasts
                      </Button>
                    </Link>
                    <Link
                      href="https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Image
                          src="/social-logos/spotify.png"
                          alt="Spotify"
                          width={16}
                          height={16}
                        />
                        Spotify
                      </Button>
                    </Link>
                    <Link
                      href={routes.external.listen}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Image
                          src="/social-logos/buzzsprout.png"
                          alt="Buzzsprout"
                          width={16}
                          height={16}
                        />
                        Buzzsprout
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sponsors Card - only shown if sponsors exist */}
            {sponsors && sponsors.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Our Sponsors</h3>
                  <div className="space-y-4">
                    {sponsors.map((sponsor: Sponsor, index: number) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg flex flex-col items-center text-center"
                      >
                        {sponsor.image ? (
                          <div
                            className={`w-[120px] h-[120px] relative mb-3 rounded-full overflow-hidden flex items-center justify-center ${
                              sponsor.bgColor || "bg-white"
                            }`}
                          >
                            <Image
                              src={sponsor.image}
                              alt={sponsor.name || "Sponsor Logo"}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                        ) : (
                          <div
                            className={`w-[120px] h-[120px] relative mb-3 rounded-full flex items-center justify-center ${
                              sponsor.bgColor || "bg-gray-100"
                            }`}
                          >
                            <span className="text-gray-400 text-sm font-medium">
                              {sponsor.name || "Sponsor"}
                            </span>
                          </div>
                        )}
                        {/* Too wordy */}
                        {/* <p className="text-sm text-muted-foreground">
                          {sponsor.description ||
                            "Support our sponsors who make this podcast possible."}
                        </p> */}
                        <Link
                          href={
                            sponsor.url ||
                            (sponsor.uuid ? `/sponsors/${sponsor.uuid}` : "#")
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <ExternalLink size={16} />
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Episodes */}
            {data.relatedEpisodes && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Related Episodes
                  </h3>

                  <RelatedEpisodes
                    uuid={uuid}
                    relatedEpisodes={
                      Array.isArray(data.relatedEpisodes)
                        ? data.relatedEpisodes
                        : []
                    }
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Share Modal */}
      <ShareModal />
    </div>
  );
}
