"use client";

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";
import EpisodeSlider from "@/src/components/ui/EpisodeSlider";
import { Button } from "@/src/components/ui/Button";
import { Slider } from "@/src/components/ui/slider";

// Add YouTube Player API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | null;
  }
}

// Define the ref handle type
export interface PlayerHandle {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  isPlaying: boolean;
  seekTo: (timeInSeconds: number, playAfterSeek?: boolean) => void;
  getCurrentTime: () => number;
}

// Define props interface for the component
interface PodcastPlayerProps {
  videoId?: string;
  onPlayerReady?: () => void;
}

const PodcastPlayer = forwardRef<PlayerHandle, PodcastPlayerProps>(
  (props, ref) => {
    // Extract props to avoid deps issues
    const { videoId = "aR5N2Jl8k14", onPlayerReady } = props;

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(80);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    const playerRef = useRef<HTMLDivElement>(null);
    const youtubePlayerRef = useRef<YT.Player | null>(null);
    const volumeRef = useRef(volume);
    const onPlayerReadyRef = useRef(onPlayerReady);

    // Simple pending seek - only store the latest one
    const pendingSeekRef = useRef<{
      timeInSeconds: number;
      playAfterSeek: boolean;
    } | null>(null);

    // Update refs when values change
    useEffect(() => {
      volumeRef.current = volume;
    }, [volume]);

    useEffect(() => {
      onPlayerReadyRef.current = onPlayerReady;
    }, [onPlayerReady]);

    // Expose methods to parent component via ref
    useImperativeHandle(ref, () => ({
      play: () => {
        if (youtubePlayerRef.current && isPlayerReady) {
          youtubePlayerRef.current.playVideo();
          setIsPlaying(true);
        }
      },
      pause: () => {
        if (youtubePlayerRef.current && isPlayerReady) {
          youtubePlayerRef.current.pauseVideo();
          setIsPlaying(false);
        }
      },
      togglePlay: () => {
        if (isPlayerReady) {
          togglePlay();
        }
      },
      isPlaying,
      seekTo: (timeInSeconds: number, playAfterSeek = false) => {
        if (!youtubePlayerRef.current || !isPlayerReady) {
          pendingSeekRef.current = { timeInSeconds, playAfterSeek };
          return;
        }

        // Player is ready, execute immediately
        try {
          youtubePlayerRef.current.seekTo(timeInSeconds, true);
          if (playAfterSeek) {
            youtubePlayerRef.current.playVideo();
            setIsPlaying(true);
          }
        } catch (error) {
          console.error("Error seeking:", error);
        }
      },
      getCurrentTime: () => {
        if (
          youtubePlayerRef.current &&
          isPlayerReady &&
          typeof youtubePlayerRef.current.getCurrentTime === "function"
        ) {
          try {
            return youtubePlayerRef.current.getCurrentTime() || 0;
          } catch (error) {
            console.error("Error getting current time:", error);
            return 0;
          }
        }
        return 0;
      },
    }));

    // Format seconds to MM:SS
    // Format seconds to MM:SS - Memoized to avoid dependency changes
    const formatTime = useCallback((seconds: number): string => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? "0" + secs : secs}`;
    }, []);

    // Track progress - Memoized with the stable formatTime function as dependency
    const startProgressTracking = useCallback(() => {
      const interval = setInterval(() => {
        if (!youtubePlayerRef.current) return;

        try {
          if (
            typeof youtubePlayerRef.current.getCurrentTime === "function" &&
            typeof youtubePlayerRef.current.getDuration === "function"
          ) {
            const currentTimeSec = youtubePlayerRef.current.getCurrentTime();
            const durationSec = youtubePlayerRef.current.getDuration();

            if (currentTimeSec && durationSec) {
              const progressPercent = (currentTimeSec / durationSec) * 100;
              setCurrentTime(formatTime(currentTimeSec));
              setProgress(progressPercent);
            }
          }
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [formatTime]);

    // Define initializeYouTubePlayer with useCallback
    const initializeYouTubePlayer = useCallback(() => {
      if (!playerRef.current) return;

      // Destroy any existing player instance first
      if (youtubePlayerRef.current) {
        youtubePlayerRef.current.destroy();
        youtubePlayerRef.current = null;
      }

      // Clear any existing player
      const existingPlayer = playerRef.current.querySelector("#youtube-player");
      if (existingPlayer) {
        existingPlayer.innerHTML = "";
      }

      setIsPlayerReady(false);

      // Player event handlers defined inside useCallback
      const handlePlayerReady = (event: YT.PlayerEvent) => {
        try {
          // Verify the player methods are available
          if (typeof event.target.getDuration === "function") {
            const durationSec = event.target.getDuration();
            setDuration(formatTime(durationSec));
          }

          // Set initial volume
          if (typeof event.target.setVolume === "function") {
            event.target.setVolume(volumeRef.current);
          }

          // Start progress tracking
          startProgressTracking();
          setIsPlayerReady(true);

          // Execute any pending seek request
          if (pendingSeekRef.current) {
            const { timeInSeconds, playAfterSeek } = pendingSeekRef.current;

            setTimeout(() => {
              if (youtubePlayerRef.current) {
                try {
                  youtubePlayerRef.current.seekTo(timeInSeconds, true);
                  if (playAfterSeek) {
                    youtubePlayerRef.current.playVideo();
                    setIsPlaying(true);
                  }
                } catch (error) {
                  console.error("Error executing pending seek:", error);
                }
              }
              pendingSeekRef.current = null; // Clear the pending seek
            }, 500);
          }

          if (onPlayerReadyRef.current) {
            onPlayerReadyRef.current();
          }
        } catch (error) {
          console.error("Error in player ready handler:", error);
        }
      };

      const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
        try {
          setIsPlaying(event.data === YT.PlayerState.PLAYING);

          // Handle video end to prevent looping
          if (event.data === YT.PlayerState.ENDED) {
            setIsPlaying(false);
            setProgress(100);
          }

          // Prevent autoplay on ready
          if (
            event.data === YT.PlayerState.CUED ||
            event.data === YT.PlayerState.BUFFERING
          ) {
            setIsPlaying(false);
          }
        } catch (error) {
          console.error("Error in player state change:", error);
        }
      };

      // Initialize player
      youtubePlayerRef.current = new window.YT.Player("youtube-player", {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          playsinline: 1,
          loop: 0,
          fs: 1,
          cc_load_policy: 0,
          start: 0,
        },
        events: {
          onReady: handlePlayerReady,
          onStateChange: onPlayerStateChange,
        },
        width: "100%",
        height: "100%",
      });
    }, [videoId, startProgressTracking, formatTime]);

    // Load YouTube API
    useEffect(() => {
      // If YouTube API is already loaded, initialize the player
      if (window.YT) {
        initializeYouTubePlayer();
        return;
      }

      // Create script tag
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";

      // Add after the script tag is created
      const style = document.createElement("style");
      style.textContent = `
#youtube-player, #youtube-player iframe {
  width: 100% !important;
  height: 100% !important;
}
`;
      document.head.appendChild(style);

      // Add script tag to document
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Setup callback for when API is ready
      window.onYouTubeIframeAPIReady = initializeYouTubePlayer;

      return () => {
        window.onYouTubeIframeAPIReady = null;
      };
    }, [initializeYouTubePlayer]);

    // Player controls
    const togglePlay = () => {
      if (!youtubePlayerRef.current || !isPlayerReady) return;

      try {
        if (isPlaying) {
          if (typeof youtubePlayerRef.current.pauseVideo === "function") {
            youtubePlayerRef.current.pauseVideo();
          }
        } else {
          if (typeof youtubePlayerRef.current.playVideo === "function") {
            youtubePlayerRef.current.playVideo();
          }
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Error toggling play:", error);
      }
    };

    const toggleMute = () => {
      if (!youtubePlayerRef.current) return;

      try {
        if (isMuted) {
          if (
            typeof youtubePlayerRef.current.unMute === "function" &&
            typeof youtubePlayerRef.current.setVolume === "function"
          ) {
            youtubePlayerRef.current.unMute();
            youtubePlayerRef.current.setVolume(volume);
          }
        } else {
          if (typeof youtubePlayerRef.current.mute === "function") {
            youtubePlayerRef.current.mute();
          }
        }
        setIsMuted(!isMuted);
      } catch (error) {
        console.error("Error toggling mute:", error);
      }
    };

    const handleVolumeChange = (value: number[]) => {
      if (!youtubePlayerRef.current) return;

      try {
        const newVolume = value[0];

        if (typeof youtubePlayerRef.current.setVolume === "function") {
          youtubePlayerRef.current.setVolume(newVolume);
          setVolume(newVolume);

          // If changing from 0, unmute
          if (isMuted && newVolume > 0) {
            if (typeof youtubePlayerRef.current.unMute === "function") {
              youtubePlayerRef.current.unMute();
              setIsMuted(false);
            }
          }

          // If changing to 0, mute
          if (newVolume === 0 && !isMuted) {
            if (typeof youtubePlayerRef.current.mute === "function") {
              youtubePlayerRef.current.mute();
              setIsMuted(true);
            }
          }
        }
      } catch (error) {
        console.error("Error changing volume:", error);
      }
    };

    const handleProgressChange = (value: number[]) => {
      if (!youtubePlayerRef.current) return;

      try {
        if (
          typeof youtubePlayerRef.current.getDuration === "function" &&
          typeof youtubePlayerRef.current.seekTo === "function"
        ) {
          const newProgress = value[0];
          const durationSec = youtubePlayerRef.current.getDuration();

          // Check if duration is valid before seeking
          if (durationSec && durationSec > 0) {
            const seekToSec = (newProgress / 100) * durationSec;
            youtubePlayerRef.current.seekTo(seekToSec, true);
            setProgress(newProgress);
          }
        }
      } catch (error) {
        console.error("Error changing progress:", error);
      }
    };

    const skipForward = () => {
      if (!youtubePlayerRef.current) return;

      try {
        if (
          typeof youtubePlayerRef.current.getCurrentTime === "function" &&
          typeof youtubePlayerRef.current.seekTo === "function"
        ) {
          const currentTime = youtubePlayerRef.current.getCurrentTime();
          const duration = youtubePlayerRef.current.getDuration();

          // Check if we have valid time values before seeking
          if (currentTime !== undefined && duration && duration > 0) {
            youtubePlayerRef.current.seekTo(currentTime + 10, true);
          }
        }
      } catch (error) {
        console.error("Error skipping forward:", error);
      }
    };

    const skipBackward = () => {
      if (!youtubePlayerRef.current) return;

      try {
        if (
          typeof youtubePlayerRef.current.getCurrentTime === "function" &&
          typeof youtubePlayerRef.current.seekTo === "function"
        ) {
          const currentTime = youtubePlayerRef.current.getCurrentTime();
          const duration = youtubePlayerRef.current.getDuration();

          // Check if we have valid time values before seeking
          if (currentTime !== undefined && duration && duration > 0) {
            youtubePlayerRef.current.seekTo(
              Math.max(0, currentTime - 10),
              true
            );
          }
        }
      } catch (error) {
        console.error("Error skipping backward:", error);
      }
    };

    const toggleFullscreen = () => {
      if (!playerRef.current) return;

      if (!isFullscreen) {
        if (playerRef.current.requestFullscreen) {
          playerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }

      setIsFullscreen(!isFullscreen);
    };

    // Listen for fullscreen change
    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () =>
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
    });

    return (
      <div className="relative w-full h-full overflow-hidden" ref={playerRef}>
        {/* YouTube player container */}
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div id="youtube-player" className="w-full h-full"></div>
        </div>

        {/* Custom Controls - ensure high z-index */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20 pointer-events-auto">
          <div className="flex flex-col gap-2 text-white">
            <div className="flex items-center gap-2">
              <span className="text-xs">{currentTime}</span>
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                className="flex-1"
                onValueChange={handleProgressChange}
              />
              <span className="text-xs">{duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-white/20"
                  onClick={skipBackward}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-white/20"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-white/20"
                  onClick={skipForward}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-white/20"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  className="w-24"
                  onValueChange={handleVolumeChange}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-white/20"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <Minimize className="h-4 w-4" />
                  ) : (
                    <Maximize className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PodcastPlayer.displayName = "PodcastPlayer";

export default PodcastPlayer;
