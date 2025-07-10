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
import Button from "@/src/components/ui/Button";
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

    // Format seconds to MM:SS
    const formatTime = useCallback((seconds: number): string => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? "0" + secs : secs}`;
    }, []);

    // Track progress
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

    // Expose methods to parent component via ref
    useImperativeHandle(ref, () => ({
      play: () => {
        if (
          youtubePlayerRef.current &&
          isPlayerReady &&
          typeof youtubePlayerRef.current.playVideo === "function"
        ) {
          youtubePlayerRef.current.playVideo();
          setIsPlaying(true);
        }
      },
      pause: () => {
        if (
          youtubePlayerRef.current &&
          isPlayerReady &&
          typeof youtubePlayerRef.current.pauseVideo === "function"
        ) {
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
        console.log(
          `Seek request: ${timeInSeconds}s, playAfterSeek: ${playAfterSeek}, ready: ${isPlayerReady}`
        );

        if (!youtubePlayerRef.current || !isPlayerReady) {
          console.log("Player not ready - storing pending seek request");
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

    // Define initializeYouTubePlayer
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

      // Player event handlers
      const handlePlayerReady = (event: YT.PlayerEvent) => {
        try {
          console.log("YouTube player ready!");

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
            console.log(`Executing pending seek to ${timeInSeconds}s`);

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

      // Set up global callback for when YouTube API is ready
      window.onYouTubeIframeAPIReady = initializeYouTubePlayer;

      // Create script tag if YouTube API hasn't been loaded yet
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }, [initializeYouTubePlayer]);

    // Control functions
    const togglePlay = () => {
      if (!youtubePlayerRef.current || !isPlayerReady) return;

      try {
        if (isPlaying) {
          youtubePlayerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          youtubePlayerRef.current.playVideo();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Error toggling play:", error);
      }
    };

    const skipBackward = () => {
      if (!youtubePlayerRef.current || !isPlayerReady) return;

      try {
        const currentTime = youtubePlayerRef.current.getCurrentTime();
        const newTime = Math.max(0, currentTime - 10);
        youtubePlayerRef.current.seekTo(newTime, true);
      } catch (error) {
        console.error("Error skipping backward:", error);
      }
    };

    const skipForward = () => {
      if (!youtubePlayerRef.current || !isPlayerReady) return;

      try {
        const currentTime = youtubePlayerRef.current.getCurrentTime();
        const duration = youtubePlayerRef.current.getDuration();
        const newTime = Math.min(duration, currentTime + 10);
        youtubePlayerRef.current.seekTo(newTime, true);
      } catch (error) {
        console.error("Error skipping forward:", error);
      }
    };

    const toggleMute = () => {
      if (!youtubePlayerRef.current || !isPlayerReady) return;

      try {
        if (isMuted) {
          youtubePlayerRef.current.unMute();
          youtubePlayerRef.current.setVolume(volumeRef.current);
          setIsMuted(false);
        } else {
          youtubePlayerRef.current.mute();
          setIsMuted(true);
        }
      } catch (error) {
        console.error("Error toggling mute:", error);
      }
    };

    const handleVolumeChange = (newVolume: number[]) => {
      const vol = newVolume[0];
      setVolume(vol);
      volumeRef.current = vol;

      if (!youtubePlayerRef.current || !isPlayerReady) return;

      try {
        youtubePlayerRef.current.setVolume(vol);
        if (vol > 0 && isMuted) {
          youtubePlayerRef.current.unMute();
          setIsMuted(false);
        }
      } catch (error) {
        console.error("Error changing volume:", error);
      }
    };

    const handleProgressChange = (newProgress: number[]) => {
      if (!youtubePlayerRef.current || !isPlayerReady) return;

      try {
        const duration = youtubePlayerRef.current.getDuration();
        const newTime = (newProgress[0] / 100) * duration;
        youtubePlayerRef.current.seekTo(newTime, true);
        setProgress(newProgress[0]);
      } catch (error) {
        console.error("Error changing progress:", error);
      }
    };

    const toggleFullscreen = () => {
      setIsFullscreen(!isFullscreen);
    };

    return (
      <div
        className={`bg-gray-900 text-white rounded-lg overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? "fixed inset-4 z-50 shadow-2xl"
            : "w-full max-w-4xl mx-auto"
        }`}
      >
        {/* Video Player Container */}
        <div className="relative bg-black aspect-video">
          <div
            ref={playerRef}
            className="w-full h-full"
            id="youtube-player-container"
          >
            <div id="youtube-player" className="w-full h-full"></div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[progress]}
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={skipBackward}
                variant="ghost"
                size="sm"
                className="text-white hover:text-gray-300"
              >
                <SkipBack size={20} />
              </Button>

              <Button
                onClick={togglePlay}
                variant="ghost"
                size="sm"
                className="text-white hover:text-gray-300"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </Button>

              <Button
                onClick={skipForward}
                variant="ghost"
                size="sm"
                className="text-white hover:text-gray-300"
              >
                <SkipForward size={20} />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="sm"
                className="text-white hover:text-gray-300"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
              <div className="w-24">
                <Slider
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              <span className="text-sm text-gray-400 w-8">{volume}</span>
            </div>

            {/* Fullscreen Toggle */}
            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="sm"
              className="text-white hover:text-gray-300"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

PodcastPlayer.displayName = "PodcastPlayer";

export default PodcastPlayer;
