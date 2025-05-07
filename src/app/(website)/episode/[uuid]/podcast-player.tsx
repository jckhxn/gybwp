"use client";

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
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
import { Slider } from "@/src/app/(website)/components/ui/slider";
import Button from "@/src/app/(website)/components/ui/button";

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
  seekTo: (timeInSeconds: number) => void;
}

// Define props interface for the component
interface PodcastPlayerProps {
  videoId?: string;
}

const PodcastPlayer = forwardRef<PlayerHandle, PodcastPlayerProps>(
  (props, ref) => {
    // Use the provided videoId or fallback to a default
    const videoId = props.videoId || "aR5N2Jl8k14";

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(80);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");

    const playerRef = useRef<HTMLDivElement>(null);
    const youtubePlayerRef = useRef<YT.Player | null>(null);

    // Expose methods to parent component via ref
    useImperativeHandle(ref, () => ({
      play: () => {
        if (youtubePlayerRef.current) {
          youtubePlayerRef.current.playVideo();
          setIsPlaying(true);
        }
      },
      pause: () => {
        if (youtubePlayerRef.current) {
          youtubePlayerRef.current.pauseVideo();
          setIsPlaying(false);
        }
      },
      togglePlay: () => {
        togglePlay();
      },
      isPlaying,
      seekTo: (timeInSeconds: number) => {
        if (youtubePlayerRef.current) {
          youtubePlayerRef.current.seekTo(timeInSeconds, true);
          if (!isPlaying) {
            youtubePlayerRef.current.playVideo();
            setIsPlaying(true);
          }
        }
      },
    }));

    // Load YouTube API
    useEffect(() => {
      // Only load the API once
      if (window.YT) return;

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
    });

    // Initialize YouTube player when API is ready
    const initializeYouTubePlayer = () => {
      if (!playerRef.current) return;

      // Clear any existing player
      const existingPlayer = playerRef.current.querySelector("#youtube-player");
      if (existingPlayer) {
        existingPlayer.innerHTML = "";
      }

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
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
        width: "100%",
        height: "100%",
      });
    };

    // When player is ready
    const onPlayerReady = (event: YT.PlayerEvent) => {
      // Set initial duration
      const durationSec = event.target.getDuration();
      setDuration(formatTime(durationSec));

      // Set initial volume
      event.target.setVolume(volume);

      // Start progress tracking
      startProgressTracking();
    };

    // When player state changes
    const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
      setIsPlaying(event.data === YT.PlayerState.PLAYING);
    };

    // Format seconds to MM:SS
    const formatTime = (seconds: number): string => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? "0" + secs : secs}`;
    };

    // Track progress
    const startProgressTracking = () => {
      const interval = setInterval(() => {
        if (!youtubePlayerRef.current) return;

        try {
          const currentTimeSec = youtubePlayerRef.current.getCurrentTime();
          const durationSec = youtubePlayerRef.current.getDuration();
          const progressPercent = (currentTimeSec / durationSec) * 100;

          setCurrentTime(formatTime(currentTimeSec));
          setProgress(progressPercent);
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      }, 1000);

      return () => clearInterval(interval);
    };
    // Seek to a specific time
    const seekTo = (time: number) => {
      if (!youtubePlayerRef.current) return;

      youtubePlayerRef.current.seekTo(time, true);
    };

    // Player controls
    const togglePlay = () => {
      if (!youtubePlayerRef.current) return;

      if (isPlaying) {
        youtubePlayerRef.current.pauseVideo();
      } else {
        youtubePlayerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
      if (!youtubePlayerRef.current) return;

      if (isMuted) {
        youtubePlayerRef.current.unMute();
        youtubePlayerRef.current.setVolume(volume);
      } else {
        youtubePlayerRef.current.mute();
      }
      setIsMuted(!isMuted);
    };

    const handleVolumeChange = (value: number[]) => {
      if (!youtubePlayerRef.current) return;

      const newVolume = value[0];
      youtubePlayerRef.current.setVolume(newVolume);
      setVolume(newVolume);

      // If changing from 0, unmute
      if (isMuted && newVolume > 0) {
        youtubePlayerRef.current.unMute();
        setIsMuted(false);
      }

      // If changing to 0, mute
      if (newVolume === 0 && !isMuted) {
        youtubePlayerRef.current.mute();
        setIsMuted(true);
      }
    };

    const handleProgressChange = (value: number[]) => {
      if (!youtubePlayerRef.current) return;

      const newProgress = value[0];
      const durationSec = youtubePlayerRef.current.getDuration();
      const seekToSec = (newProgress / 100) * durationSec;

      youtubePlayerRef.current.seekTo(seekToSec, true);
      setProgress(newProgress);
    };

    const skipForward = () => {
      if (!youtubePlayerRef.current) return;

      const currentTime = youtubePlayerRef.current.getCurrentTime();
      youtubePlayerRef.current.seekTo(currentTime + 10, true);
    };

    const skipBackward = () => {
      if (!youtubePlayerRef.current) return;

      const currentTime = youtubePlayerRef.current.getCurrentTime();
      youtubePlayerRef.current.seekTo(Math.max(0, currentTime - 10), true);
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
