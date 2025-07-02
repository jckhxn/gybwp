"use client";

import { useState, useEffect, useRef } from "react";
import { X, Maximize2, Play, Pause } from "lucide-react";
import PodcastPlayer, {
  PlayerHandle,
} from "../../episodes/[uuid]_backup/podcast-player";

interface StickyVideoPlayerProps {
  videoId?: string;
  title?: string;
  onPlayerRef?: (ref: React.RefObject<PlayerHandle>) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export default function StickyVideoPlayer({
  videoId,
  title,
  onPlayerRef,
  onPlayStateChange,
}: StickyVideoPlayerProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [wasPlaying, setWasPlaying] = useState(false);
  const [isChildPlayerReady, setIsChildPlayerReady] = useState(false);
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [transitionId, setTransitionId] = useState(0);
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);

  const playerRef = useRef<PlayerHandle>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);

  // Pass player ref to parent component
  useEffect(() => {
    if (onPlayerRef) {
      onPlayerRef(playerRef);
    }
  }, [onPlayerRef]);

  // Track and notify parent of play state changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && onPlayStateChange) {
        const playing = playerRef.current.isPlaying;
        setIsCurrentlyPlaying(playing);
        onPlayStateChange(playing);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [onPlayStateChange]);

  useEffect(() => {
    const handleScroll = () => {
      if (!placeholderRef.current) return;

      const rect = placeholderRef.current.getBoundingClientRect();
      const shouldBeSticky = rect.top < 0 && rect.bottom < 0;

      if (isSticky !== shouldBeSticky) {
        console.log(
          `Transitioning to ${shouldBeSticky ? "sticky" : "normal"} mode`
        );

        // Capture current state before transition
        if (playerRef.current) {
          try {
            const time = playerRef.current.getCurrentTime();
            const playing = playerRef.current.isPlaying;
            console.log(`Capturing state: time=${time}, playing=${playing}`);
            console.log(`Player state details:`, {
              time,
              playing,
              playerExists: !!playerRef.current,
            });
            setCurrentTime(time);
            setWasPlaying(playing);
          } catch (error) {
            console.log("Error capturing state:", error);
            // Ensure we don't accidentally resume if there's an error
            setWasPlaying(false);
          }
        } else {
          console.log("No player ref available, setting wasPlaying to false");
          setWasPlaying(false);
        }

        setIsSticky(shouldBeSticky);
        setHasTransitioned(true);
        setIsChildPlayerReady(false);
        setTransitionId((prev) => prev + 1);
      }
    };

    const scrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [isSticky, isChildPlayerReady]);

  // Restore playback state after transition
  useEffect(() => {
    if (isChildPlayerReady && playerRef.current) {
      if (isFirstLoad) {
        console.log("First load - keeping player paused");
        setIsFirstLoad(false);
        return;
      }

      if (hasTransitioned) {
        console.log(
          `Restoring state: time=${currentTime}, wasPlaying=${wasPlaying}`
        );

        setTimeout(() => {
          if (playerRef.current) {
            console.log("Seeking to", currentTime);
            console.log(`Restoration details:`, {
              currentTime,
              wasPlaying,
              playerExists: !!playerRef.current,
            });

            // Always seek without auto-play first
            playerRef.current.seekTo(currentTime, false);

            // Add extra safety check - only play if it was DEFINITELY playing before
            if (wasPlaying === true) {
              console.log("wasPlaying is TRUE - will resume playback");
              setTimeout(() => {
                if (playerRef.current) {
                  playerRef.current.play();
                  setIsCurrentlyPlaying(true);
                  console.log("Resuming playback");
                  // Notify parent of play state change immediately
                  if (onPlayStateChange) {
                    onPlayStateChange(true);
                  }
                }
              }, 100);
            } else {
              console.log("wasPlaying is FALSE or undefined - staying paused");
              // Explicitly pause to ensure it stays paused
              setTimeout(() => {
                if (playerRef.current) {
                  playerRef.current.pause();
                  setIsCurrentlyPlaying(false);
                  console.log("Explicitly paused player");
                }
              }, 200);
              // Ensure parent knows we're paused
              if (onPlayStateChange) {
                onPlayStateChange(false);
              }
            }
          }
        }, 1000);

        setHasTransitioned(false);
      }
    }
  }, [
    hasTransitioned,
    isChildPlayerReady,
    currentTime,
    wasPlaying,
    isFirstLoad,
    transitionId,
    onPlayStateChange,
  ]);

  const handleClose = () => {
    setIsVisible(false);
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isCurrentlyPlaying) {
        playerRef.current.pause();
        setIsCurrentlyPlaying(false);
        if (onPlayStateChange) {
          onPlayStateChange(false);
        }
      } else {
        playerRef.current.play();
        setIsCurrentlyPlaying(true);
        if (onPlayStateChange) {
          onPlayStateChange(true);
        }
      }
    }
  };

  const handleExpand = () => {
    if (placeholderRef.current) {
      placeholderRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  if (!isVisible) return null;

  const PlayerComponent = (
    <PodcastPlayer
      key={`player-${videoId}-${transitionId}-${isSticky ? "sticky" : "normal"}`}
      ref={playerRef}
      videoId={videoId}
      onPlayerReady={() => {
        console.log(`Player ready in ${isSticky ? "sticky" : "normal"} mode`);
        setIsChildPlayerReady(true);

        // Update parent component with new player ref
        if (onPlayerRef) {
          onPlayerRef(playerRef);
        }

        // Immediately sync play state with parent after player is ready
        setTimeout(() => {
          if (playerRef.current && onPlayStateChange) {
            const currentlyPlaying = playerRef.current.isPlaying;
            setIsCurrentlyPlaying(currentlyPlaying);
            onPlayStateChange(currentlyPlaying);
            console.log(`Initial state sync: playing=${currentlyPlaying}`);
          }
        }, 100);
      }}
    />
  );

  return (
    <>
      {/* Main player placeholder */}
      <div
        ref={placeholderRef}
        className="aspect-video bg-muted rounded-lg overflow-hidden relative"
      >
        {!isSticky && PlayerComponent}
      </div>

      {/* Sticky mini player */}
      <div
        ref={stickyContainerRef}
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${
          isSticky
            ? "translate-y-0 opacity-100 visible scale-100"
            : "translate-y-full opacity-0 invisible scale-95"
        }`}
      >
        <div className="bg-black rounded-xl shadow-2xl overflow-hidden border border-gray-700 group hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="w-80 h-48 relative">
            <div className="w-full h-full">{isSticky && PlayerComponent}</div>

            {/* Control buttons */}
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <button
                className="bg-black/70 hover:bg-black/90 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
                title={isCurrentlyPlaying ? "Pause" : "Play"}
              >
                {isCurrentlyPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
              <button
                className="bg-black/70 hover:bg-black/90 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  handleExpand();
                }}
                title="Expand player"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <button
                className="bg-black/70 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                title="Close player"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Title overlay */}
            {title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pointer-events-none">
                <p className="text-white text-sm font-medium truncate">
                  {title}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
