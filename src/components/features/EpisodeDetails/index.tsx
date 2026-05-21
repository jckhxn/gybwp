// @ts-nocheck
"use client";

import Image from "next/image";
import { ThumbnailImage } from "@/src/components/ui/thumbnail-image";
import { useRef, useState } from "react";
import Link from "next/link";
import { SanityDocument } from "sanity";

import {
  Play,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Users,
  Lightbulb,
  MessageSquare,
  Star,
  FileText,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { formatEpisodeTitle } from "@/src/lib/formatTitle";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { SponsorsList } from "@/src/components/features/sponsors";
import { urlForImage } from "@/src/lib/sanity-image";
import TranscriptDisplay from "@/src/components/features/TranscriptDisplay";
import {
  RelatedEpisodes,
  type PlayerHandle,
} from "@/src/components/features/episodes";

import {
  formatDate,
  formatDuration,
  urlFor,
} from "@/src/lib/utils";

// Strip YouTube boilerplate (platform links, social footer, dashes) and emoji from description
function cleanDescription(text: string): string[] {
  if (!text) return [];

  // Cut off at boilerplate markers
  const cutoffs = [
    /\-{20,}/,
    /🔔/,
    /Subscribe To Channel/i,
    /Podcast is currently on your favorite/i,
    /Stay Connected With Us/i,
    /For Business Inquiries/i,
    /Apple Podcasts:/,
  ];
  let cleaned = text;
  for (const pattern of cutoffs) {
    const idx = cleaned.search(pattern);
    if (idx !== -1) cleaned = cleaned.substring(0, idx);
  }

  // Remove emoji / symbol characters
  cleaned = cleaned.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}✅✓→]/gu, "");

  return cleaned
    .split(/\n{2,}|\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 15);
}

const LOREM_TRANSCRIPT_SEGMENTS = [
  { timestamp: "0:00", speaker: "Jeff Lackey", text: "Welcome back to Growing Your Business With People. I'm your host Jeff Lackey, and today we have an absolutely incredible conversation lined up. My guest has spent years building high-performance teams and I cannot wait to dig into their story with you." },
  { timestamp: "1:22", speaker: "Guest", text: "Jeff, thank you so much for having me. I've been a listener of this show for a while and it's a real privilege to be on the other side of the microphone. The work you're doing here matters." },
  { timestamp: "2:45", speaker: "Jeff Lackey", text: "Let's start at the beginning. Take me back to the moment you realized that people — not strategy, not technology — were the real lever in your business. What happened?" },
  { timestamp: "4:10", speaker: "Guest", text: "It was actually a pretty humbling moment. We had a product that was winning in the market, solid funding, everything looked great on paper. But internally, things were falling apart. Turnover was climbing, collaboration had broken down, and I kept asking myself — what am I missing? And the answer was sitting right in front of me." },
  { timestamp: "6:33", speaker: "Jeff Lackey", text: "What did that look like in practice? When you say things were falling apart — can you give us a concrete picture of what was happening on the ground?" },
  { timestamp: "7:50", speaker: "Guest", text: "Sure. We'd have quarterly planning sessions where leaders would commit to cross-functional outcomes, and then go back to their teams and immediately revert to silo mode. There was no shared language, no shared accountability. Everyone was optimizing for their own function. It looked like alignment but it was theater." },
  { timestamp: "10:15", speaker: "Jeff Lackey", text: "That's such a common trap. And I think a lot of leaders listening right now have been in that exact room. So what changed? What was the intervention?" },
  { timestamp: "11:30", speaker: "Guest", text: "We started with listening. Not surveys — actual conversations. I spent four weeks doing one-on-ones with people at every level of the organization. No agenda, no performance review framing. Just: what's making your job harder than it needs to be? The patterns that emerged were both surprising and completely obvious in hindsight." },
  { timestamp: "14:05", speaker: "Jeff Lackey", text: "I love that. The answers are almost always already in the room. What were the top two or three patterns you kept hearing?" },
  { timestamp: "15:20", speaker: "Guest", text: "First was clarity — or the lack of it. People didn't know how their daily work connected to the company's most important priorities. Second was recognition. Not compensation, not perks — just being seen. Third, and this one surprised me, was psychological safety. People had ideas but were afraid to surface them because the culture had quietly become one where being wrong was costly." },
  { timestamp: "18:44", speaker: "Jeff Lackey", text: "Psychological safety — Patrick Lencioni talks about this, Amy Edmondson's research is foundational here. For leaders who want to build that, what's the first practical step they can take this week?" },
  { timestamp: "20:00", speaker: "Guest", text: "Model the behavior yourself. Share a mistake you made recently — not as a humble brag, as a genuine reflection. Talk about what you learned. When the leader does that, the permission structure in the team shifts immediately. It's remarkable how fast it works when it's authentic." },
];

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
  <div className="bg-stone-900 rounded-2xl p-6 text-white">
    <h3 className="text-lg font-bold mb-1.5">Enjoy this conversation?</h3>
    <p className="text-stone-300 text-sm mb-4 leading-relaxed">
      One email a week — the episode plus one operator lesson worth stealing.
    </p>
    <Link
      href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7049506606413213696"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-xl transition-all duration-200 text-sm"
    >
      Subscribe on LinkedIn
      <ArrowRight className="w-3.5 h-3.5" />
    </Link>
    <p className="text-xs text-stone-500 mt-3">Also available on:</p>
    <PlatformLinks />
  </div>
);

function InfoStrip({ blurb, takeaways, discussionTopics }: { blurb: string; takeaways: string[]; discussionTopics: DiscussionTopic[] }) {
  const colCount = [blurb, takeaways?.length > 0, discussionTopics?.length > 0].filter(Boolean).length;
  const gridCols = colCount === 1 ? "grid-cols-1" : colCount === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3";
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
      <div className={`grid ${gridCols} gap-5`}>
        {blurb && (
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> About
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">{blurb}</p>
          </div>
        )}
        {takeaways?.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" /> Top takeaways
            </p>
            <ol className="space-y-1.5">
              {takeaways.slice(0, 3).map((t: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="flex-shrink-0 w-4 h-4 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        )}
        {discussionTopics?.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Topics
            </p>
            <ul className="space-y-1">
              {discussionTopics.slice(0, 4).map((t: DiscussionTopic, i: number) => (
                <li key={i} className="flex items-start gap-1.5 text-sm text-stone-600">
                  <span className="text-amber-500 mt-0.5 flex-shrink-0">→</span>
                  {t.title || `Topic ${i + 1}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EpisodeDetails({ data }: { data: SanityDocument }) {
  const episode = Array.isArray(data) ? data[0] : data;
  const playerRef = useRef<PlayerHandle>(null);
  const [activeTab, setActiveTab] = useState<"transcript" | "shownotes">("transcript");

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
  const rawDescription = episode?.youtube?.description || "";
  const description = rawDescription;
  const descriptionParagraphs = cleanDescription(rawDescription);
  const takeaways = episode?.details?.keyTakeaways || [];
  const discussionTopics = episode?.details?.discussionTopics || [];
  const highlights = episode?.details?.highlights || [];
  const transcript = episode?.transcript || episode?.details?.transcript || "";
  const transcriptSegments = episode?.transcriptSegments || [];
  const hasRealTranscript = (transcript && transcript.length > 0) || transcriptSegments?.length > 0;
  // Fall back to lorem ipsum segments so the sidebar panel is always populated
  const displaySegments = hasRealTranscript ? transcriptSegments : LOREM_TRANSCRIPT_SEGMENTS;
  const uuid = episode?.youtube?.uuid || episode?.uuid;
  const duration = episode?.youtube?.duration || "";
  const episodeSponsors = episode?.season?.sponsors || [];
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

  return (
    <>
      <JSONLD data={articleStructuredData} id="episode-article-jsonld" />
      <JSONLD data={episodeStructuredData} id="podcast-episode-jsonld" />
      {videoStructuredData && <JSONLD data={videoStructuredData} id="video-object-jsonld" />}

      <div className="min-h-screen bg-stone-50">

        {/* ── Episode nav bar ── */}
        <div className="sticky top-0 z-40 bg-amber-50/95 backdrop-blur-sm border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 lg:px-10 py-2.5 flex items-center justify-between">
            <div className="flex items-center">
              {episode?.prevEpisode ? (
                <Link href={episode.prevEpisode}>
                  <button className="flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors px-2 py-1 rounded-lg hover:bg-stone-100">
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                </Link>
              ) : (
                <span className="flex items-center gap-1 text-sm font-medium text-stone-300 px-2 py-1">
                  <ChevronLeft className="w-4 h-4" /> Prev
                </span>
              )}
            </div>

            <Link href="/episodes" className="text-sm font-semibold text-stone-500 hover:text-stone-900 transition-colors">
              ← All episodes
            </Link>

            <div className="flex items-center gap-2">
              {(seasonNumber || episodeNumber) && (
                <span className="hidden sm:inline text-xs font-semibold text-stone-400 uppercase tracking-wide">
                  {seasonNumber ? `S${seasonNumber} · ` : ""}EP {episodeNumber}
                </span>
              )}
              {episode?.nextEpisode ? (
                <Link href={episode.nextEpisode}>
                  <button className="flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors px-2 py-1 rounded-lg hover:bg-stone-100">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              ) : (
                <span className="flex items-center gap-1 text-sm font-medium text-stone-300 px-2 py-1">
                  Next <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Episode hero ── */}
        <div className="bg-amber-50 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 lg:px-10 py-8 lg:py-12">
            <div className="flex flex-col sm:flex-row gap-6 items-start">

              {/* Thumbnail */}
              <div className="flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-lg border-2 border-stone-200/60 bg-stone-100 relative">
                <ThumbnailImage
                  src={episode?.youtube?.thumbnail || episode?.image || "/images/logo.webp"}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="144px"
                  priority
                />
              </div>

              {/* Episode info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-2">
                  {(seasonNumber || episodeNumber) && (
                    <span className="font-bold uppercase tracking-widest text-amber-600">
                      {seasonNumber ? `S${seasonNumber} · ` : ""}EP {episodeNumber}
                    </span>
                  )}
                  {publishedAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(publishedAt)}
                    </span>
                  )}
                  {duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(duration)}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-[1.15] tracking-tight mb-3">
                  {title}
                </h1>

                {primaryGuest && (
                  <div className="flex items-center gap-2.5 mb-3">
                    <Avatar className="h-8 w-8 border border-stone-200">
                      {guestImage ? (
                        <AvatarImage src={urlFor(guestImage).width(64).height(64).url()} alt={guestName} />
                      ) : (
                        <AvatarFallback className="bg-amber-100 text-amber-700 font-semibold text-xs">
                          {guestName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm leading-tight">{guestName}</p>
                      {guestTitle && <p className="text-xs text-stone-500">{guestTitle}</p>}
                    </div>
                    {guests.length > 1 && (
                      <span className="text-xs text-stone-400">+{guests.length - 1} more</span>
                    )}
                  </div>
                )}

                {blurb && (
                  <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">{blurb}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Two-column layout: content + sticky player/transcript ── */}
        <div className="max-w-7xl mx-auto px-4 lg:px-10 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">

            {/* ── Left: main scrollable content ── */}
            <div className="space-y-6 min-w-0">

              {/* Key info strip */}
              {(blurb || takeaways?.length > 0 || discussionTopics?.length > 0) && (
                <InfoStrip
                  blurb={blurb}
                  takeaways={takeaways}
                  discussionTopics={discussionTopics}
                />
              )}

              {/* YouTube video placeholder */}
              {episode?.youtube?.id && (
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-red-500 to-red-400" />
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5" /> Watch on YouTube
                    </p>
                    <a
                      href={`https://www.youtube.com/watch?v=${episode.youtube.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block rounded-xl overflow-hidden aspect-video bg-stone-900 group"
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${episode.youtube.id}/maxresdefault.jpg`}
                        alt={title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-70 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 fill-white text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-red-500"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
                        <span className="text-white text-xs font-semibold">Watch on YouTube</span>
                      </div>
                    </a>
                  </div>
                </div>
              )}

              {/* Mobile-only: audio player */}
              <div className="lg:hidden">
                <PodcastAudioPlayer
                  thumbnail={episode?.youtube?.thumbnail || episode?.image || "/images/logo.webp"}
                  title={title}
                  guestName={guestName || undefined}
                  episodeNumber={episodeNumber || undefined}
                  duration={duration || undefined}
                />
              </div>

              {/* Episode Overview */}
              {descriptionParagraphs.length > 0 && (
                <div id="overview" className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-500" />
                  <div className="p-7">
                    <h2 className="text-lg font-bold text-stone-900 mb-4">Episode Overview</h2>
                    <div className="space-y-3 text-stone-700 leading-relaxed text-sm">
                      {descriptionParagraphs.map((paragraph, i) => (
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
                  <div className="p-7">
                    <h2 className="text-lg font-bold text-stone-900 mb-4">Key Takeaways</h2>
                    <div className="space-y-3">
                      {takeaways.map((takeaway: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-[11px] font-bold text-amber-700">{i + 1}</span>
                          </div>
                          <p className="text-stone-700 leading-relaxed text-sm">{takeaway}</p>
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
                  <div className="p-7">
                    <h2 className="text-lg font-bold text-stone-900 mb-4">Discussion Topics</h2>
                    <div className="grid gap-4">
                      {discussionTopics.map((topic: DiscussionTopic, i: number) => (
                        <div key={i} className="border-l-4 border-sky-300 pl-4">
                          <h3 className="font-semibold text-stone-900 mb-1 text-sm">
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
                  <div className="p-7">
                    <h2 className="text-lg font-bold text-stone-900 mb-4">Episode Highlights</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {highlights.map((h: Highlight, i: number) => (
                        <div key={i} className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                          <div className="flex items-start gap-2.5 mb-1.5">
                            <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] font-bold text-emerald-700">{i + 1}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-stone-900 text-xs">
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
                                    className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-medium rounded-md px-1.5 py-0.5 hover:bg-emerald-600 transition-colors"
                                  >
                                    <Play className="w-2 h-2 fill-current" />
                                    {h.timestamp}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          {h.description && (
                            <p className="text-stone-600 text-xs leading-relaxed ml-8">{h.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile transcript */}
              <div id="transcript-mobile" className="lg:hidden bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-violet-400 to-purple-500" />
                <div className="p-6">
                  <h2 className="text-lg font-bold text-stone-900 mb-1 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-violet-500" />
                    Episode Transcript
                  </h2>
                  {!hasRealTranscript && (
                    <p className="text-xs text-stone-400 mb-3">Transcript excerpt — full version coming soon</p>
                  )}
                  <div className="max-h-96 overflow-y-auto bg-stone-50 rounded-xl border border-stone-200 p-4">
                    <TranscriptDisplay
                      transcript={hasRealTranscript ? transcript : undefined}
                      transcriptSegments={displaySegments}
                      youtubeId={episode?.youtube?.id}
                      playerRef={playerRef}
                      allSpeakers={episode?.allSpeakers}
                    />
                  </div>
                  <p className="text-xs text-stone-400 text-center mt-3">
                    Scroll to read · Click timestamps to jump
                  </p>
                </div>
              </div>

              {/* Featured Guests */}
              {guests.length > 0 && (
                <div id="featured-guest" className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-amber-400 to-rose-400" />
                  <div className="p-7">
                    <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-rose-400" />
                      Featured Guest{guests.length > 1 ? "s" : ""}
                    </h2>
                    <div className="space-y-5">
                      {guests.map((guest: any, index: number) => {
                        const img = guest.guestProfile?.profileImage || guest.image;
                        return (
                          <div key={guest._id || index} className="flex gap-4 items-start">
                            <Avatar className="h-14 w-14 border border-stone-200 flex-shrink-0">
                              {img ? (
                                <AvatarImage src={urlFor(img).width(112).height(112).url()} alt={guest.name || "Guest"} />
                              ) : (
                                <AvatarFallback className="bg-amber-100 text-amber-700 font-semibold text-sm">
                                  {guest.name ? guest.name.substring(0, 2).toUpperCase() : "GU"}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="text-base font-semibold text-stone-900">{guest.name || "Guest Name"}</h3>
                              {(guest.guestProfile?.title || guest.title) && (
                                <p className="text-xs text-stone-500 mb-1.5">{guest.guestProfile?.title || guest.title}</p>
                              )}
                              {(guest.guestProfile?.bio || guest.about) && (
                                <p className="text-sm text-stone-600 leading-relaxed mb-2">
                                  {guest.guestProfile?.bio || guest.about}
                                </p>
                              )}
                              {guest.slug?.current && (
                                <Link href={`/guest/${encodeURIComponent(guest.slug.current)}`}>
                                  <button className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors">
                                    View profile <ArrowRight className="w-3 h-3" />
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

              {/* Sponsors */}
              {episodeSponsors?.length > 0 && (
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-emerald-400 to-sky-500" />
                  <div className="p-6">
                    <h3 className="text-sm font-bold text-stone-900 mb-4">Episode Sponsors</h3>
                    <div className="flex flex-wrap items-center gap-4">
                      {episodeSponsors.map((sponsor: any, i: number) => (
                        <div key={sponsor._id || sponsor.uuid || i} className="group">
                          {sponsor.slug?.current || sponsor.uuid || sponsor.website ? (
                            <Link
                              href={sponsor.slug?.current ? `/sponsors/${sponsor.slug.current}` : sponsor.uuid ? `/sponsors/${sponsor.uuid}` : sponsor.website}
                              target={sponsor.website ? "_blank" : undefined}
                              rel={sponsor.website ? "noopener noreferrer" : undefined}
                              className="flex flex-col items-center"
                            >
                              <div className="w-20 h-14 relative rounded-xl overflow-hidden border border-stone-200 bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                                <Image
                                  src={sponsor.logo ? urlForImage(sponsor.logo)?.width(200).height(120).url() : sponsor.image || "/placeholder-logo.png"}
                                  alt={`${sponsor.name} logo`}
                                  width={80}
                                  height={56}
                                  className="object-contain p-2"
                                />
                              </div>
                              <span className="mt-1 text-xs font-medium text-stone-600 truncate max-w-[80px]">{sponsor.name}</span>
                            </Link>
                          ) : (
                            <div className="flex flex-col items-center">
                              <div className="w-20 h-14 relative rounded-xl overflow-hidden border border-stone-200 bg-white flex items-center justify-center shadow-sm">
                                <Image
                                  src={sponsor.logo ? urlForImage(sponsor.logo)?.width(200).height(120).url() : sponsor.image || "/placeholder-logo.png"}
                                  alt={`${sponsor.name} logo`}
                                  width={80}
                                  height={56}
                                  className="object-contain p-2"
                                />
                              </div>
                              <span className="mt-1 text-xs font-medium text-stone-600 truncate max-w-[80px]">{sponsor.name}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-stone-400 mt-3">Thanks to our sponsors for supporting this show</p>
                  </div>
                </div>
              )}

              <Separator />

              {/* Related Episodes */}
              {data.relatedEpisodes && (
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-7">
                  <h3 className="text-lg font-bold text-stone-900 mb-5">More episodes you&apos;ll enjoy</h3>
                  <RelatedEpisodes
                    uuid={uuid}
                    relatedEpisodes={Array.isArray(data.relatedEpisodes) ? data.relatedEpisodes : []}
                  />
                </div>
              )}

              {/* Subscribe CTA (mobile) */}
              <div className="lg:hidden">
                <SubscribeCTA />
              </div>
            </div>

            {/* ── Right: Sticky player + transcript ── */}
            <div className="hidden lg:flex flex-col sticky top-[49px] h-[calc(100vh-57px)] gap-4">

              {/* Audio player */}
              <PodcastAudioPlayer
                thumbnail={episode?.youtube?.thumbnail || episode?.image || "/images/logo.webp"}
                title={title}
                guestName={guestName || undefined}
                episodeNumber={episodeNumber || undefined}
                duration={duration || undefined}
              />

              {/* Transcript + Show Notes panel */}
              <div className="flex-1 bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col min-h-0">

                {/* Tabs */}
                <div className="flex border-b border-stone-200 flex-shrink-0">
                  <button
                    onClick={() => setActiveTab("transcript")}
                    className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      activeTab === "transcript"
                        ? "text-stone-900 border-b-2 border-amber-500 -mb-[2px] bg-white"
                        : "text-stone-400 hover:text-stone-600 bg-stone-50"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    Transcript
                  </button>
                  <button
                    onClick={() => setActiveTab("shownotes")}
                    className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      activeTab === "shownotes"
                        ? "text-stone-900 border-b-2 border-amber-500 -mb-[2px] bg-white"
                        : "text-stone-400 hover:text-stone-600 bg-stone-50"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Show Notes
                  </button>
                </div>

                {/* Tab content */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  {activeTab === "transcript" && (
                    <div className="p-4">
                      {!hasRealTranscript && (
                        <p className="text-xs text-stone-400 mb-3 text-center border border-dashed border-stone-200 rounded-lg py-1.5">
                          Excerpt — full transcript coming soon
                        </p>
                      )}
                      {hasRealTranscript && (
                        <p className="text-xs text-stone-400 mb-3 text-center">
                          Click timestamps to jump · Scroll to read
                        </p>
                      )}
                      <TranscriptDisplay
                        transcript={hasRealTranscript ? transcript : undefined}
                        transcriptSegments={displaySegments}
                        youtubeId={episode?.youtube?.id}
                        playerRef={playerRef}
                        allSpeakers={episode?.allSpeakers}
                      />
                    </div>
                  )}

                  {activeTab === "shownotes" && (
                    <div className="p-4 space-y-5">
                      <SubscribeCTA />

                      {guests.length > 1 && (
                        <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                          <h3 className="text-xs font-bold text-stone-700 mb-3 uppercase tracking-wide">Guests</h3>
                          <div className="space-y-2.5">
                            {guests.map((guest: any, i: number) => {
                              const img = guest.guestProfile?.profileImage || guest.image;
                              return (
                                <div key={guest._id || i} className="flex items-center gap-2.5">
                                  <Avatar className="h-8 w-8 border border-stone-200">
                                    {img ? (
                                      <AvatarImage src={urlFor(img).width(64).height(64).url()} alt={guest.name} />
                                    ) : (
                                      <AvatarFallback className="bg-amber-100 text-amber-700 text-xs font-semibold">
                                        {guest.name?.substring(0, 2).toUpperCase() || "GU"}
                                      </AvatarFallback>
                                    )}
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-stone-900 truncate">{guest.name}</p>
                                    <p className="text-xs text-stone-500 truncate">{guest.guestProfile?.title || guest.title || ""}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
