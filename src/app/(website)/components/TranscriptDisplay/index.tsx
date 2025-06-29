// src/app/(website)/components/TranscriptDisplay/index.tsx
import React from "react";
import {
  PortableText,
  PortableTextMarkComponentProps,
} from "@portabletext/react";
import Link from "next/link";
import { PlayerHandle } from "@/src/app/(website)/episode/[uuid]/podcast-player";

interface TimestampAnnotation {
  _type: "timestamp";
  time: string;
  keyMoment?: boolean;
}

interface SpeakerAnnotation {
  _type: "speaker";
  type: "host" | "guest" | "other";
  hostRef?: any; // Allow any structure for now
  guestRef?: any; // Allow any structure for now
  otherName?: string;
}

interface TranscriptDisplayProps {
  transcript?: any[];
  transcriptSegments?: any[];
  className?: string;
  youtubeId?: string; // For video seeking
  playerRef?: React.RefObject<PlayerHandle>; // Player reference for seeking
  allSpeakers?: {
    hosts: any[];
    guests: any[];
  };
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  transcript,
  transcriptSegments,
  className = "",
  youtubeId,
  playerRef,
  allSpeakers,
}) => {
  // Function to resolve speaker reference
  const resolveSpeaker = (ref: any, type: "host" | "guest") => {
    if (!allSpeakers || !ref?._ref) return null;

    const speakerList =
      type === "host" ? allSpeakers.hosts : allSpeakers.guests;
    const resolved = speakerList.find((speaker: any) => speaker._id === ref._ref);
    
    console.log(`Resolving ${type}:`, {
      refId: ref._ref,
      speakerList,
      resolved,
      allSpeakers
    });
    
    return resolved;
  };
  // Debug logging
  console.log("TranscriptDisplay props:", {
    transcript: transcript?.length,
    transcriptSegments: transcriptSegments?.length,
    hasTranscript: !!transcript,
    hasTranscriptSegments: !!transcriptSegments,
    allSpeakers,
  });

  if (transcript && transcript.length > 0) {
    console.log("Sample transcript item:", transcript[0]);
  }

  if (transcriptSegments && transcriptSegments.length > 0) {
    console.log("Sample transcript segment:", transcriptSegments[0]);
  }
  // Function to convert timestamp to seconds for YouTube seeking
  const timestampToSeconds = (timestamp: string): number => {
    const parts = timestamp.split(":").map(Number);
    if (parts.length === 2) {
      // MM:SS format
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      // HH:MM:SS format
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
  };

  // Function to seek to timestamp in YouTube video
  const seekToTimestamp = (timestamp: string) => {
    const seconds = timestampToSeconds(timestamp);

    // First try to use the player ref if available
    if (playerRef?.current) {
      playerRef.current.seekTo(seconds, true);
      return;
    }

    // Fallback: update URL with timestamp parameter and scroll to video
    if (youtubeId) {
      const url = new URL(window.location.href);
      url.searchParams.set("t", seconds.toString());
      window.history.pushState({}, "", url.toString());

      // Scroll to video if it exists
      const videoElement = document.querySelector('iframe[src*="youtube.com"]');
      if (videoElement) {
        videoElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Custom components for portable text
  const portableTextComponents = {
    marks: {
      timestamp: ({
        children,
        value,
      }: PortableTextMarkComponentProps<TimestampAnnotation>) => (
        <button
          className={`inline-flex items-center px-2 py-1 mx-1 text-xs font-mono rounded-md cursor-pointer transition-colors ${
            value?.keyMoment
              ? "bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200"
              : "bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200"
          }`}
          onClick={() => seekToTimestamp(value?.time || "")}
          title={`Jump to ${value?.time}${value?.keyMoment ? " (Key Moment)" : ""}`}
        >
          {value?.keyMoment && <span className="mr-1">★</span>}
          {value?.time}
        </button>
      ),
      speaker: ({
        children,
        value,
      }: PortableTextMarkComponentProps<SpeakerAnnotation>) => {
        // Debug logging to see what we're getting
        console.log(
          "Speaker annotation value:",
          JSON.stringify(value, null, 2)
        );
        console.log("Speaker annotation children:", children);
        if (value?.hostRef)
          console.log(
            "hostRef details:",
            JSON.stringify(value.hostRef, null, 2)
          );
        if (value?.guestRef)
          console.log(
            "guestRef details:",
            JSON.stringify(value.guestRef, null, 2)
          );

        const renderSpeakerContent = () => (
          <span className="inline-flex items-center px-2 py-1 mx-1 text-xs font-medium rounded-md bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
            @ {children}
          </span>
        );

        // Helper functions to check if references are expanded
        const isExpanded = (ref: any) => ref && ref.name && !ref._ref;
        const isReference = (ref: any) =>
          ref && ref._ref && ref._type === "reference";

        // Try to resolve references if they aren't expanded
        const resolvedGuest =
          value?.type === "guest"
            ? isExpanded(value?.guestRef)
              ? value.guestRef
              : resolveSpeaker(value?.guestRef, "guest")
            : null;

        const resolvedHost =
          value?.type === "host"
            ? isExpanded(value?.hostRef)
              ? value.hostRef
              : resolveSpeaker(value?.hostRef, "host")
            : null;

        // If it's a guest with a slug, make it a link
        if (value?.type === "guest" && resolvedGuest?.slug?.current) {
          console.log("Guest with slug found:", resolvedGuest);
          return (
            <Link
              href={`/guest/${resolvedGuest.slug.current}`}
              className="hover:opacity-80 transition-opacity cursor-pointer inline-block"
              title={`View guest profile: ${resolvedGuest.name}`}
            >
              {renderSpeakerContent()}
            </Link>
          );
        }

        // If it's a host with a slug, make it a link to /guest/[slug] (redirect logic will handle it)
        if (value?.type === "host" && resolvedHost?.slug?.current) {
          console.log("Host with slug found:", resolvedHost);
          return (
            <Link
              href={`/guest/${resolvedHost.slug.current}`}
              className="hover:opacity-80 transition-opacity cursor-pointer inline-block"
              title={`View host profile: ${resolvedHost.name}`}
            >
              {renderSpeakerContent()}
            </Link>
          );
        } // If speaker couldn't be resolved or has no slug, show as non-clickable
        if (value && (value.type === "guest" || value.type === "host")) {
          const speaker = value.type === "guest" ? resolvedGuest : resolvedHost;
          const name =
            speaker?.name || (value.type === "guest" ? "Guest" : "Host");

          return (
            <span
              className="inline-flex items-center px-2 py-1 mx-1 text-xs font-medium rounded-md bg-gray-100 text-gray-600 border border-gray-300"
              title={`${name}${!speaker ? " (not found)" : !speaker.slug ? " (no profile)" : ""}`}
            >
              @ {children}
            </span>
          );
        }

        return renderSpeakerContent();
      },
    },
    block: {
      h4: (props: any) => (
        <h4 className="font-semibold text-gray-900 mt-4 mb-2">
          {props.children}
        </h4>
      ),
      normal: (props: any) => (
        <p className="mb-3 leading-relaxed text-gray-700">{props.children}</p>
      ),
    },
  };

  // If using structured transcript segments
  if (transcriptSegments && transcriptSegments.length > 0) {
    return (
      <div className={`transcript-segments ${className}`}>
        <div className="space-y-4">
          {transcriptSegments.map((segment: any, index: number) => (
            <div
              key={index}
              className="group flex gap-4 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              {/* Timestamp */}
              <div className="flex-shrink-0">
                <button
                  className={`inline-flex items-center px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                    segment.keyMoment
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200"
                      : "bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200"
                  }`}
                  onClick={() => seekToTimestamp(segment.timestamp)}
                  title={`Jump to ${segment.timestamp}${segment.keyMoment ? " (Key Moment)" : ""}`}
                >
                  {segment.keyMoment && <span className="mr-1">★</span>}
                  {segment.timestamp}
                </button>
              </div>

              {/* Content */}
              <div className="flex-grow">
                {segment.speaker && (
                  <div className="text-sm font-medium mb-1">
                    {(() => {
                      // Handle both old string format and new object format
                      if (typeof segment.speaker === "string") {
                        return (
                          <span className="text-gray-600 capitalize">
                            {segment.speaker}
                          </span>
                        );
                      } else if (
                        segment.speaker &&
                        typeof segment.speaker === "object"
                      ) {
                        const speaker = segment.speaker;
                        console.log("Structured segment speaker:", speaker);
                        switch (speaker.type) {
                          case "host":
                            const hostName = speaker.hostRef?.name || "Host";
                            const hostSlug = speaker.hostRef?.slug?.current;

                            console.log("Structured host:", {
                              hostName,
                              hostSlug,
                              hostRef: speaker.hostRef,
                            });

                            if (hostSlug) {
                              return (
                                <Link
                                  href={`/guest/${hostSlug}`}
                                  className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                                  title={`View host profile: ${hostName}`}
                                >
                                  {hostName}
                                </Link>
                              );
                            }
                            return (
                              <span className="text-gray-600">{hostName}</span>
                            );
                          case "guest":
                            const guestName = speaker.guestRef?.name || "Guest";
                            const guestSlug = speaker.guestRef?.slug?.current;

                            console.log("Structured guest:", {
                              guestName,
                              guestSlug,
                              guestRef: speaker.guestRef,
                            });

                            if (guestSlug) {
                              return (
                                <Link
                                  href={`/guest/${guestSlug}`}
                                  className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                                  title={`View guest profile: ${guestName}`}
                                >
                                  {guestName}
                                </Link>
                              );
                            }
                            return (
                              <span className="text-gray-600">{guestName}</span>
                            );
                          case "other":
                            return (
                              <span className="text-gray-600">
                                {speaker.otherName || "Other"}
                              </span>
                            );
                          default:
                            return (
                              <span className="text-gray-600">
                                Unknown Speaker
                              </span>
                            );
                        }
                      }
                      return <span className="text-gray-600">Speaker</span>;
                    })()}
                  </div>
                )}
                <div className="text-gray-800 leading-relaxed">
                  {segment.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If using portable text transcript
  if (transcript && transcript.length > 0) {
    return (
      <div className={`transcript-portable ${className}`}>
        <PortableText value={transcript} components={portableTextComponents} />
      </div>
    );
  }

  // No transcript available
  return (
    <div className={`transcript-empty ${className}`}>
      <div className="text-center py-8 text-gray-500">
        <div className="text-lg mb-2">📄</div>
        <p>Transcript not available for this episode.</p>
      </div>
    </div>
  );
};

export default TranscriptDisplay;
