// @ts-nocheck
"use client";

import Image from "next/image";
import { ThumbnailImage } from "@/src/components/ui/thumbnail-image";
import { useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
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
  Bookmark,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { formatEpisodeTitle } from "@/src/lib/formatTitle";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { SponsorsList } from "@/src/components/features/sponsors";
import { urlForImage } from "@/src/lib/sanity-image";
import TranscriptDisplay from "@/src/components/features/TranscriptDisplay";
import {
  RelatedEpisodes,
  type PlayerHandle,
} from "@/src/components/features/episodes";

import {
  formatDate,
  formatDescriptionText,
  formatDuration,
  urlFor,
} from "@/src/lib/utils";
import JSONLD from "@/src/components/SEO/jsonld";
import {
  generateSimplifiedPodcastEpisodeStructuredData,
  generateEpisodeArticleStructuredData,
  generateEnhancedVideoObjectStructuredData,
} from "@/src/lib/structured-data";

import { PodcastAudioPlayer } from "@/src/components/features/episodes/podcast-audio-player";

interface DiscussionTopic {
  title?: string;
  description?: string;
}

interface Highlight {
  title?: string;
  timestamp?: string;
  description?: string;
}

const PlatformLinks = () => (
  <div className="flex flex-wrap gap-2 mt-3">
    {[
      { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511", logo: "/social-logos/apple.png" },
      { label: "Spotify", href: "https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH", logo: "/social-logos/spotify.png" },
      { label: "Buzzsprout", href: "https://www.buzzsprout.com/2057493", logo: "/social-logos/buzzsprout.png" },
    ].map(({ label, href, logo }) => (
      <Link
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all"
      >
        <Image src={logo} alt={label} width={14} height={14} className="object-contain" />
        {label}
      </Link>
    ))}
  </div>
);

const SubscribeCTA = () => (
  <div className="bg-stone-900 rounded-2xl p-8 text-white">
    <h3 className="text-xl font-bold mb-2">Like this conversation?</h3>
    <p className="text-stone-300 text-sm mb-4 leading-relaxed">
      One email a week — the episode plus one operator lesson worth stealing.
    </p>
    <Link
      href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7049506606413213696"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-xl transition-all duration-200"
    >
      Subscribe on LinkedIn
      <ArrowRight className="w-4 h-4" />
    </Link>
    <p className="text-xs text-stone-500 mt-3">Also available on:</p>
    <PlatformLinks />
  </div>
);

export default function EpisodeDetails({ data }: { data: SanityDocument }) {
  const episode = Array.isArray(data) ? data[0] : data;

  const playerRef = useRef<PlayerHandle>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!episode) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-4">Episode Not Found</h1>
          <p className="text-stone-500">The requested episode could not be loaded.</p>
        </div>
      </div>
    );
  }

  const rawTitle = episode?.youtube?.title || episode?.episodeName || "Untitled Episode";
  const title = formatEpisodeTitle(rawTitle);
  const blurb = episode?.youtube?.blurb || episode?.blurb || "";
  const seasonNumber = episode?.youtube?.seasonNumber || episode?.seasonNumber || "";
  const episodeNumber = episode?.youtube?.episodeNumber || episode?.episodeNumber || "";
  const publishedAt = episode?.youtube?.publishedAt || episode?.publishedAt;
  const description = episode?.youtube?.description || "";
  const takeaways = episode?.details?.keyTakeaways || [];
  const discussionTopics = episode?.details?.discussionTopics || [];
  const highlights = episode?.details?.highlights || [];
  const transcript = episode?.transcript || episode?.details?.transcript || "";
  const transcriptSegments = episode?.transcriptSegments || [];
  const uuid = episode?.youtube?.uuid || episode?.uuid;
  const duration = episode?.youtube?.duration || "";
  const episodeSponsors = episode?.season?.sponsors || [];
  const sponsors = episodeSponsors;
  const guests = episode?.guests || [];

  const articleStructuredData = generateEpisodeArticleStructuredData({
    title, description: description || blurb,
    url: `https://gybwp.com/episodes/${uuid}`,
    publishedAt, youtubeId: episode?.youtube?.id, uuid, blurb,
    guests: guests.map((g: any) => ({ name: g.name, title: g.title })),
    keywords: [...(takeaways || []), ...(discussionTopics?.map((t: any) => t.title).filter(Boolean) || [])],
    wordCount: transcript?.length ? transcript.length / 5 : transcriptSegments.length * 50 || 2000,
  });

  const episodeStructuredData = generateSimplifiedPodcastEpisodeStructuredData({
    title, description: description || blurb,
    url: `https://gybwp.com/episodes/${uuid}`,
    episodeNumber: episodeNumber ? Number(episodeNumber) : undefined,
    seasonNumber: seasonNumber ? Number(seasonNumber) : undefined,
    publishedAt, duration, youtubeId: episode?.youtube?.id, uuid, blurb,
    guests: guests.map((g: any) => ({ name: g.name, title: g.title, about: g.about })),
    keywords: [...(takeaways || []), ...(discussionTopics?.map((t: any) => t.title).filter(Boolean) || [])],
  });

  const videoStructuredData = episode?.youtube?.id
    ? generateEnhancedVideoObjectStructuredData({
        title, description: description || blurb,
        youtubeId: episode.youtube.id, publishedAt, duration, uuid, blurb,
      })
    : null;

  const primaryGuest = guests[0];
  const guestImage = primaryGuest?.guestProfile?.profileImage || primaryGuest?.image;
  const guestName = primaryGuest?.name || "";
  const guestTitle = primaryGuest?.guestProfile?.title || primaryGuest?.title || "";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <>
      <JSONLD data={articleStructuredData} id="episode-article-jsonld" />
      <JSONLD data={episodeStructuredData} id="podcast-episode-jsonld" />
      {videoStructuredData && <JSONLD data={videoStructuredData} id="video-object-jsonld" />}

      <div className="min-h-screen bg-stone-50">

        {/* ── Nav bar ── */}
        <div className="bg-amber-50 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {episode?.prevEpisode ? (
                <Link href={episode.prevEpisode}>
                  <button className="flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                  </button>
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 text-sm font-medium text-stone-300 cursor-default">
                  <ChevronLeft className="w-4 h-4" /> Prev
                </span>
              )}
            </div>

            <Link href="/episodes" className="text-sm font-semibold text-stone-500 hover:text-stone-900 transition-colors">
              ← All episodes
            </Link>

            <div className="flex items-center gap-3">
              {(seasonNumber || episodeNumber) && (
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
                  {seasonNumber ? `S${seasonNumber} · ` : ""}EP {episodeNumber}
                </span>
              )}
              {episode?.nextEpisode ? (
                <Link href={episode.nextEpisode}>
                  <button className="flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 text-sm font-medium text-stone-300 cursor-default">
                  Next <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── HERO: Listen-First ── */}
        <div className="bg-amber-50 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
            <div className="grid lg:grid-cols-[400px_1fr] gap-10 lg:gap-14 items-start">

              {/* Left: Cover art + podcast player */}
              <div className="space-y-4">
                {/* Album art */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-stone-200/60 aspect-square bg-stone-100">
                  <ThumbnailImage
                    src={episode?.youtube?.thumbnail || episode?.image || "/images/logo.webp"}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 80vw, 400px"
                    priority
                  />
                </div>

                {/* Podcast audio player */}
                <PodcastAudioPlayer
                  thumbnail={episode?.youtube?.thumbnail || episode?.image || "/images/logo.webp"}
                  title={title}
                  guestName={guestName || undefined}
                  episodeNumber={episodeNumber || undefined}
                  duration={duration || undefined}
                />

              </div>

              {/* Right: Episode info */}
              <div className="flex flex-col gap-5">
                {/* Date + duration */}
                <div className="flex items-center gap-4 text-sm text-stone-500">
                  {publishedAt && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(publishedAt)}
                    </span>
                  )}
                  {duration && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDuration(duration)}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 leading-[1.15] tracking-tight">
                  {title}
                </h1>

                {blurb && (
                  <p className="text-base text-stone-600 leading-relaxed max-w-xl">
                    {blurb}
                  </p>
                )}

                {/* Primary guest */}
                {primaryGuest && (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11 border border-stone-200">
                      {guestImage ? (
                        <AvatarImage
                          src={urlFor(guestImage).width(88).height(88).url()}
                          alt={guestName}
                        />
                      ) : (
                        <AvatarFallback className="bg-amber-100 text-amber-700 font-semibold text-sm">
                          {guestName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm leading-tight">{guestName}</p>
                      {guestTitle && <p className="text-xs text-stone-500">{guestTitle}</p>}
                    </div>
                    {guests.length > 1 && (
                      <span className="text-xs text-stone-400 ml-1">+{guests.length - 1} more</span>
                    )}
                  </div>
                )}

                {/* Quick nav pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {description && (
                    <button
                      onClick={() => scrollTo("overview")}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-stone-200 rounded-full text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all"
                    >
                      Overview
                    </button>
                  )}
                  {takeaways?.length > 0 && (
                    <button
                      onClick={() => scrollTo("key-takeaways")}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-stone-200 rounded-full text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all"
                    >
                      Takeaways
                    </button>
                  )}
                  {discussionTopics?.length > 0 && (
                    <button
                      onClick={() => scrollTo("discussion-topics")}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-stone-200 rounded-full text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all"
                    >
                      Topics
                    </button>
                  )}
                  {highlights?.length > 0 && (
                    <button
                      onClick={() => scrollTo("episode-highlights")}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-stone-200 rounded-full text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all"
                    >
                      Highlights
                    </button>
                  )}
                  {((transcript && transcript.length > 0) || transcriptSegments?.length > 0) && (
                    <button
                      onClick={() => scrollTo("transcript")}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-stone-200 rounded-full text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all"
                    >
                      Transcript
                    </button>
                  )}
                  {guests.length > 0 && (
                    <button
                      onClick={() => scrollTo("featured-guest")}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-stone-200 rounded-full text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all"
                    >
                      Guest{guests.length > 1 ? "s" : ""}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Three-column info strip ── */}
        {(blurb || takeaways?.length > 0 || discussionTopics?.length > 0) && (
          <div className="bg-white border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
              <div className="grid sm:grid-cols-3 gap-6">
                {/* About / TL;DR */}
                {blurb && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-stone-400">About this episode</p>
                    <p className="text-sm text-stone-600 leading-relaxed">{blurb}</p>
                  </div>
                )}

                {/* Three takeaways */}
                {takeaways?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                      {takeaways.length === 1 ? "Key takeaway" : `${Math.min(takeaways.length, 3)} takeaways`}
                    </p>
                    <ol className="space-y-2">
                      {takeaways.slice(0, 3).map((t: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                          <span className="flex-shrink-0 w-5 h-5 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                            {i + 1}
                          </span>
                          {t}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Topics / mentioned */}
                {discussionTopics?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Discussion topics</p>
                    <ul className="space-y-1.5">
                      {discussionTopics.slice(0, 4).map((t: DiscussionTopic, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                          <span className="text-amber-500 mt-0.5 flex-shrink-0">→</span>
                          {t.title || `Topic ${i + 1}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Main content ── */}
        <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main column */}
            <div className="lg:col-span-2 space-y-10">

              {/* Episode Overview */}
              {description && (
                <div id="overview" className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-500" />
                  <div className="p-8">
                    <h2 className="text-xl font-bold text-stone-900 mb-4">Episode Overview</h2>
                    <div className="space-y-4 text-stone-700 leading-relaxed">
                      {formatDescriptionText(description).map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Key Takeaways */}
              {takeaways?.length > 0 && (
                <div id="key-takeaways" className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
                  <div className="p-8">
                    <h2 className="text-xl font-bold text-stone-900 mb-5">Key Takeaways</h2>
                    <div className="space-y-4">
                      {takeaways.map((takeaway: string, i: number) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-7 h-7 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-xs font-bold text-amber-700">{i + 1}</span>
                          </div>
                          <p className="text-stone-700 leading-relaxed">{takeaway}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Discussion Topics */}
              {discussionTopics?.length > 0 && (
                <div id="discussion-topics" className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-sky-400 to-blue-500" />
                  <div className="p-8">
                    <h2 className="text-xl font-bold text-stone-900 mb-5">Discussion Topics</h2>
                    <div className="grid gap-5">
                      {discussionTopics.map((topic: DiscussionTopic, i: number) => (
                        <div key={i} className="border-l-4 border-sky-300 pl-5">
                          <h3 className="font-semibold text-stone-900 mb-1">
                            {topic.title || `Topic ${i + 1}`}
                          </h3>
                          {topic.description && (
                            <p className="text-stone-600 leading-relaxed text-sm">{topic.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Highlights */}
              {highlights?.length > 0 && (
                <div id="episode-highlights" className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
                  <div className="p-8">
                    <h2 className="text-xl font-bold text-stone-900 mb-5">Episode Highlights</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {highlights.map((h: Highlight, i: number) => (
                        <div key={i} className="bg-stone-50 rounded-xl p-5 border border-stone-100">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-emerald-700">{i + 1}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-stone-900 text-sm">
                                  {h.title || `Highlight ${i + 1}`}
                                </h3>
                                {h.timestamp && (
                                  <button
                                    onClick={() => {
                                      if (playerRef.current && typeof h.timestamp === "string") {
                                        const parts = h.timestamp.split(":");
                                        let seconds = 0;
                                        if (parts.length === 3) seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
                                        else if (parts.length === 2) seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
                                        else seconds = parseInt(parts[0]);
                                        playerRef.current.seekTo(seconds, true);
                                      }
                                    }}
                                    className="inline-flex items-center gap-1 bg-emerald-500 text-white text-xs font-medium rounded-md px-2 py-0.5 hover:bg-emerald-600 transition-colors"
                                  >
                                    <Play className="w-2.5 h-2.5 fill-current" />
                                    {h.timestamp}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          {h.description && (
                            <p className="text-stone-600 text-sm leading-relaxed ml-10">
                              {h.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Transcript */}
              {((transcript && transcript.length > 0) || transcriptSegments?.length > 0) && (
                <div id="transcript" className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-violet-400 to-purple-500" />
                  <div className="p-8">
                    <h2 className="text-xl font-bold text-stone-900 mb-5">Episode Transcript</h2>
                    <div className="bg-stone-50 rounded-xl border border-stone-200 p-6">
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
                      <p className="text-xs text-stone-400 text-center mt-4">
                        Scroll to read more · Click timestamps to jump to specific moments
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Featured Guests */}
              {guests.length > 0 && (
                <div id="featured-guest" className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-amber-400 to-rose-400" />
                  <div className="p-8">
                    <h2 className="text-xl font-bold text-stone-900 mb-5">
                      Featured Guest{guests.length > 1 ? "s" : ""}
                    </h2>
                    <div className="space-y-6">
                      {guests.map((guest: any, index: number) => {
                        const img = guest.guestProfile?.profileImage || guest.image;
                        return (
                          <div key={guest._id || index} className="flex gap-5 items-start">
                            <Avatar className="h-16 w-16 border border-stone-200 flex-shrink-0">
                              {img ? (
                                <AvatarImage
                                  src={urlFor(img).width(128).height(128).url()}
                                  alt={guest.name || "Guest"}
                                />
                              ) : (
                                <AvatarFallback className="bg-amber-100 text-amber-700 font-semibold">
                                  {guest.name ? guest.name.substring(0, 2).toUpperCase() : "GU"}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-stone-900">{guest.name || "Guest Name"}</h3>
                              {(guest.guestProfile?.title || guest.title) && (
                                <p className="text-sm text-stone-500 mb-2">
                                  {guest.guestProfile?.title || guest.title}
                                </p>
                              )}
                              {(guest.guestProfile?.bio || guest.about) && (
                                <p className="text-sm text-stone-600 leading-relaxed mb-3">
                                  {guest.guestProfile?.bio || guest.about}
                                </p>
                              )}
                              {guest.slug?.current && (
                                <Link href={`/guest/${encodeURIComponent(guest.slug.current)}`}>
                                  <button className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors">
                                    View profile <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                </Link>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              {/* Related Episodes */}
              {data.relatedEpisodes && (
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
                  <h3 className="text-xl font-bold text-stone-900 mb-6">More episodes you&apos;ll enjoy</h3>
                  <RelatedEpisodes
                    uuid={uuid}
                    relatedEpisodes={Array.isArray(data.relatedEpisodes) ? data.relatedEpisodes : []}
                  />
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">

              {/* Subscribe CTA */}
              <SubscribeCTA />

              {/* Sponsors */}
              {sponsors?.length > 0 && (
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-emerald-400 to-sky-500" />
                  <div className="p-6">
                    <h3 className="text-sm font-bold text-stone-900 mb-4">Episode Sponsors</h3>
                    <div className="flex flex-wrap items-center gap-4">
                      {sponsors.map((sponsor: any, i: number) => (
                        <div key={sponsor._id || sponsor.uuid || i} className="group relative">
                          {sponsor.slug?.current || sponsor.uuid || sponsor.website ? (
                            <Link
                              href={
                                sponsor.slug?.current
                                  ? `/sponsors/${sponsor.slug.current}`
                                  : sponsor.uuid
                                    ? `/sponsors/${sponsor.uuid}`
                                    : sponsor.website
                              }
                              target={sponsor.website ? "_blank" : undefined}
                              rel={sponsor.website ? "noopener noreferrer" : undefined}
                              className="flex flex-col items-center"
                            >
                              <div className="w-24 h-16 relative rounded-xl overflow-hidden border border-stone-200 bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                                <Image
                                  src={sponsor.logo ? urlForImage(sponsor.logo)?.width(200).height(120).url() : sponsor.image || "/placeholder-logo.png"}
                                  alt={`${sponsor.name} logo`}
                                  width={90}
                                  height={60}
                                  className="object-contain p-2 max-w-full max-h-full"
                                />
                              </div>
                              <span className="mt-1.5 text-xs font-medium text-stone-600 truncate max-w-[96px]">{sponsor.name}</span>
                            </Link>
                          ) : (
                            <div className="flex flex-col items-center">
                              <div className="w-24 h-16 relative rounded-xl overflow-hidden border border-stone-200 bg-white flex items-center justify-center shadow-sm">
                                <Image
                                  src={sponsor.logo ? urlForImage(sponsor.logo)?.width(200).height(120).url() : sponsor.image || "/placeholder-logo.png"}
                                  alt={`${sponsor.name} logo`}
                                  width={90}
                                  height={60}
                                  className="object-contain p-2 max-w-full max-h-full"
                                />
                              </div>
                              <span className="mt-1.5 text-xs font-medium text-stone-600 truncate max-w-[96px]">{sponsor.name}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-stone-400 mt-4">
                      Thanks to our sponsors for supporting this show
                    </p>
                  </div>
                </div>
              )}

              {/* All guests sidebar card */}
              {guests.length > 1 && (
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-stone-900 mb-4">Guests in this episode</h3>
                  <div className="space-y-3">
                    {guests.map((guest: any, i: number) => {
                      const img = guest.guestProfile?.profileImage || guest.image;
                      return (
                        <div key={guest._id || i} className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-stone-200">
                            {img ? (
                              <AvatarImage src={urlFor(img).width(72).height(72).url()} alt={guest.name} />
                            ) : (
                              <AvatarFallback className="bg-amber-100 text-amber-700 text-xs font-semibold">
                                {guest.name?.substring(0, 2).toUpperCase() || "GU"}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-stone-900 truncate">{guest.name}</p>
                            <p className="text-xs text-stone-500 truncate">
                              {guest.guestProfile?.title || guest.title || ""}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
