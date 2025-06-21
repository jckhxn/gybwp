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
}

export default function StickyVideoPlayer({
  videoId,
  title,
  onPlayerRef,
}: StickyVideoPlayerProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [wasPlaying, setWasPlaying] = useState(false);
  const [isChildPlayerReady, setIsChildPlayerReady] = useState(false);

  const playerRef = useRef<PlayerHandle>(null);
  const placeholderRef = useRef<HTMLDivElement>(null); // Ref for the placeholder
  const stickyContainerRef = useRef<HTMLDivElement>(null); // Ref for the sticky container

  // Pass the player ref to parent component
  useEffect(() => {
    if (onPlayerRef) {
      onPlayerRef(playerRef);
    }
  }, [onPlayerRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (!placeholderRef.current) return;

      const rect = placeholderRef.current.getBoundingClientRect();
      const shouldBeSticky = rect.top < 0 && rect.bottom < 0;

      if (isSticky !== shouldBeSticky) {
        // Before changing state, get the current state
        if (playerRef.current) {
          const time = playerRef.current.getCurrentTime();
          const playing = playerRef.current.isPlaying;
          setCurrentTime(time);
          setWasPlaying(playing);
        }
        setIsChildPlayerReady(false); // Reset readiness on transition
        setIsSticky(shouldBeSticky);
      }
    };

    const scrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [isSticky]);

  // Effect to seek to the correct time when the player's container changes
  useEffect(() => {
    // Only seek when the child player has signaled it is ready
    if (playerRef.current && isChildPlayerReady) {
      playerRef.current.seekTo(currentTime, wasPlaying);
    }
  }, [isChildPlayerReady, currentTime, wasPlaying]);

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
      ref={playerRef}
      videoId={videoId}
      onPlayerReady={() => setIsChildPlayerReady(true)}
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
