"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Maximize2, Play, Pause, GripHorizontal } from "lucide-react";
import {
  PodcastPlayer,
  type PlayerHandle,
} from "@/src/components/features/episodes";

interface Position {
  x: number;
  y: number;
}

interface StickyVideoPlayerProps {
  videoId?: string;
  title?: string;
  onPlayerRef?: (ref: React.RefObject<PlayerHandle | null>) => void;
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

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [hasCustomPosition, setHasCustomPosition] = useState(false);

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
        // Capture current state before transition
        if (playerRef.current) {
          try {
            const time = playerRef.current.getCurrentTime();
            const playing = playerRef.current.isPlaying;

            setCurrentTime(time);
            setWasPlaying(playing);
          } catch (error) {
            // Ensure we don't accidentally resume if there's an error
            setWasPlaying(false);
          }
        } else {
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
        return;
      }

      if (hasTransitioned) {
        setTimeout(() => {
          if (playerRef.current) {
            // Always seek without auto-play first
            playerRef.current.seekTo(currentTime, false);

            // Add extra safety check - only play if it was DEFINITELY playing before
            if (wasPlaying === true) {
              setTimeout(() => {
                if (playerRef.current) {
                  playerRef.current.play();
                  setIsCurrentlyPlaying(true);

                  // Notify parent of play state change immediately
                  if (onPlayStateChange) {
                    onPlayStateChange(true);
                  }
                }
              }, 100);
            } else {
              // Explicitly pause to ensure it stays paused
              setTimeout(() => {
                if (playerRef.current) {
                  playerRef.current.pause();
                  setIsCurrentlyPlaying(false);
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

  // Drag handlers for PiP-style dragging
  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!stickyContainerRef.current) return;

      e.preventDefault();
      setIsDragging(true);

      const rect = stickyContainerRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      setDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });

      if (!hasCustomPosition) {
        // Initialize position based on current location
        setPosition({
          x: rect.left,
          y: rect.top,
        });
        setHasCustomPosition(true);
      }
    },
    [hasCustomPosition],
  );

  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !stickyContainerRef.current) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const playerWidth = stickyContainerRef.current.offsetWidth;
      const playerHeight = stickyContainerRef.current.offsetHeight;

      // Calculate new position with bounds checking
      let newX = clientX - dragOffset.x;
      let newY = clientY - dragOffset.y;

      // Keep within viewport bounds with padding
      const padding = 12;
      newX = Math.max(
        padding,
        Math.min(window.innerWidth - playerWidth - padding, newX),
      );
      newY = Math.max(
        padding,
        Math.min(window.innerHeight - playerHeight - padding, newY),
      );

      setPosition({ x: newX, y: newY });
    },
    [isDragging, dragOffset],
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging || !stickyContainerRef.current) return;

    setIsDragging(false);

    // Optional: Snap to nearest corner
    const playerWidth = stickyContainerRef.current.offsetWidth;
    const playerHeight = stickyContainerRef.current.offsetHeight;
    const padding = 24;

    const centerX = position.x + playerWidth / 2;
    const centerY = position.y + playerHeight / 2;
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;

    // Determine which quadrant to snap to
    const snapX =
      centerX < screenCenterX
        ? padding
        : window.innerWidth - playerWidth - padding;
    const snapY =
      centerY < screenCenterY
        ? padding
        : window.innerHeight - playerHeight - padding;

    setPosition({ x: snapX, y: snapY });
  }, [isDragging, position]);

  // Add/remove global mouse/touch event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleDragMove(e);
      const handleTouchMove = (e: TouchEvent) => handleDragMove(e);
      const handleMouseUp = () => handleDragEnd();
      const handleTouchEnd = () => handleDragEnd();

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleTouchEnd);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Reset position when becoming sticky
  useEffect(() => {
    if (!isSticky) {
      setHasCustomPosition(false);
    }
  }, [isSticky]);

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
        className={`fixed z-50 ${
          isDragging ? "" : "transition-all duration-300 ease-out"
        } ${
          isSticky
            ? "opacity-100 visible scale-100"
            : "opacity-0 invisible scale-95"
        }`}
        style={
          hasCustomPosition
            ? {
                left: `${position.x}px`,
                top: `${position.y}px`,
              }
            : {
                bottom: "24px",
                right: "24px",
              }
        }
      >
        <div
          className={`bg-black rounded-xl shadow-2xl overflow-hidden border border-gray-700 group transition-all duration-300 ${isDragging ? "cursor-grabbing scale-105 shadow-3xl" : "hover:shadow-3xl"}`}
        >
          {/* Drag handle */}
          <div
            className="absolute top-0 left-0 right-0 h-8 z-20 cursor-grab active:cursor-grabbing flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            <div className="bg-black/70 rounded-full px-3 py-1 flex items-center gap-1">
              <GripHorizontal className="h-4 w-4 text-white/70" />
              <span className="text-white/70 text-xs">Drag</span>
            </div>
          </div>

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
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 pointer-events-none">
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
