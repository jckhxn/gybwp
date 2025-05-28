// YouTube Player API types
declare namespace YT {
  interface PlayerEvent {
    target: Player;
  }

  interface Player {
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setVolume(volume: number): void;
    getVolume(): number;
    getDuration(): number;
    getCurrentTime(): number;
    getPlayerState(): PlayerState;
    getPlaybackRate(): number;
    setPlaybackRate(rate: number): void;
    getAvailablePlaybackRates(): number[];
    getVideoLoadedFraction(): number;
    getVideoUrl(): string;
    getVideoEmbedCode(): string;
    getOptions(): string[];
    getOption(option: string): any;
    destroy(): void;
  }

  interface PlayerOptions {
    videoId?: string;
    width?: number | string;
    height?: number | string;
    playerVars?: {
      autoplay?: 0 | 1;
      cc_load_policy?: 1;
      color?: "red" | "white";
      controls?: 0 | 1 | 2;
      disablekb?: 0 | 1;
      enablejsapi?: 0 | 1;
      end?: number;
      fs?: 0 | 1;
      hl?: string;
      iv_load_policy?: 1 | 3;
      list?: string;
      listType?: "playlist" | "search" | "user_uploads";
      loop?: 0 | 1;
      modestbranding?: 1;
      origin?: string;
      playlist?: string;
      playsinline?: 0 | 1;
      rel?: 0 | 1;
      showinfo?: 0 | 1;
      start?: number;
      mute?: 0 | 1;
    };
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
      onPlaybackQualityChange?: (event: any) => void;
      onPlaybackRateChange?: (event: any) => void;
      onError?: (event: any) => void;
      onApiChange?: (event: any) => void;
    };
  }

  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }

  interface OnStateChangeEvent {
    data: PlayerState;
    target: Player;
  }
}
