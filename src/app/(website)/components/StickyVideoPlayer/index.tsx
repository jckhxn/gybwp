"use client";

import { useState, useEffect, useRef } from "react";
import { X, Maximize2 } from "lucide-react";
import PodcastPlayer, {
  PlayerHandle,
} from "../../episode/[uuid]/podcast-player";

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

  const playerRef = useRef<PlayerHandle>(null);
  const placeholderRef = useRef<HTMLDivElement>(null); // Ref for the placeholder
  const stickyContainerRef = useRef<HTMLDivElement>(null); // Ref for the sticky container

  // Pass the player ref to parent component
  useEffect(() => {
    if (onPlayerRef) {
      onPlayerRef(playerRef);
    }
  }, [onPlayerRef]);

  // Effect to track and notify parent of play state changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && onPlayStateChange) {
        const playing = playerRef.current.isPlaying;
        onPlayStateChange(playing);
      }
    }, 500); // Check every 500ms

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

        // Capture current state before transition - always try to get current state
        if (playerRef.current) {
          try {
            const time = playerRef.current.getCurrentTime();
            const playing = playerRef.current.isPlaying;
            console.log(
              `Capturing state before transition: time=${time}, playing=${playing}`
            );
            setCurrentTime(time);
            setWasPlaying(playing);
          } catch (error) {
            console.log("Error capturing state:", error);
          }
        }

        setIsSticky(shouldBeSticky);
        setHasTransitioned(true);
        setIsChildPlayerReady(false); // Reset for the new player instance
        setTransitionId((prev) => prev + 1); // Increment transition ID to track each transition
      }
    };

    const scrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [isSticky, isChildPlayerReady]);

  // Effect to restore playback state after transition
  useEffect(() => {
    if (isChildPlayerReady && playerRef.current) {
      if (isFirstLoad) {
        // On first load, don't do anything - just let the player load paused
        console.log("First load - keeping player paused");
        setIsFirstLoad(false);
        return;
      }

      if (hasTransitioned) {
        console.log(
          `Restoring state (transition ${transitionId}): time=${currentTime}, wasPlaying=${wasPlaying}`
        );

        // Wait a bit for the YouTube player to be fully ready
        setTimeout(() => {
          if (playerRef.current) {
            console.log("Seeking to", currentTime);

            if (wasPlaying) {
              // If it was playing, seek and play immediately
              playerRef.current.seekTo(currentTime, true); // true = play after seek
              console.log("Seeking with autoplay");
            } else {
              // If it was paused, just seek without playing
              playerRef.current.seekTo(currentTime, false);
              console.log("Seeking without autoplay");
            }
          }
        }, 1000); // Give YouTube player more time to initialize

        // Reset the transition flag
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
  ]);

  const handleClose = () => {
    setIsVisible(false);
    if (playerRef.current) {
      playerRef.current.pause();
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
        console.log(
          `Player ready in ${isSticky ? "sticky" : "normal"} mode (transition ${transitionId})`
        );
        setIsChildPlayerReady(true);
      }}
    />
  );

  return (
    <>
      {/* Placeholder for the original player */}
      <div
        ref={placeholderRef}
        className="aspect-video bg-muted rounded-lg overflow-hidden relative"
      >
        {!isSticky && PlayerComponent}
      </div>

      {/* Sticky minimized player */}
      <div
        ref={stickyContainerRef}
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${
          isSticky
            ? "translate-y-0 opacity-100 visible scale-100"
            : "translate-y-full opacity-0 invisible scale-95"
        }`}
      >
        <div className="bg-black rounded-xl shadow-2xl overflow-hidden border border-gray-700 group hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div
            className="w-80 h-48 relative cursor-pointer"
            onClick={handleExpand}
          >
            {/* The single player instance will be rendered here when sticky */}
            <div className="w-full h-full">{isSticky && PlayerComponent}</div>

            {/* Controls overlay */}
            <div className="absolute top-3 right-3 z-10 flex gap-2">
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
