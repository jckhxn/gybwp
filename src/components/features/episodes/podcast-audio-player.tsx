"use client";

import { useState } from "react";
import { ThumbnailImage } from "@/src/components/ui/thumbnail-image";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

interface PodcastAudioPlayerProps {
  thumbnail?: string;
  title?: string;
  guestName?: string;
  episodeNumber?: number | string;
  duration?: string;
  // videoId kept in props signature for compatibility but unused
  videoId?: string;
}

function WaveBars({ playing }: { playing: boolean }) {
  const heights = [40, 65, 85, 55, 90, 45, 70, 60, 95, 50, 75, 40, 85, 60, 70, 50, 90, 65, 45, 80, 55, 70, 40, 85, 60, 75, 50, 65];
  return (
    <div className="flex items-end gap-[3px] h-8">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-full bg-amber-500 origin-bottom"
          style={{
            height: `${h}%`,
            animation: playing ? `barBounce ${0.6 + (i % 5) * 0.15}s ease-in-out infinite alternate` : "none",
            animationDelay: `${(i % 7) * 0.08}s`,
            opacity: playing ? 1 : 0.35,
            transition: "opacity 0.3s",
          }}
        />
      ))}
      <style>{`@keyframes barBounce { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }`}</style>
    </div>
  );
}

export function PodcastAudioPlayer({
  thumbnail,
  title = "Episode",
  guestName,
  episodeNumber,
  duration,
}: PodcastAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const thumbSrc = thumbnail || "/images/logo.webp";

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setProgress(((e.clientX - rect.left) / rect.width) * 100);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="p-6 flex gap-5 items-center">
        {/* Album art */}
        <div className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden shadow-md border border-stone-100">
          <ThumbnailImage src={thumbSrc} alt={title} fill className="object-cover" sizes="80px" />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            </div>
          )}
        </div>

        {/* Info + waveform */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              {episodeNumber && (
                <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-0.5">
                  Episode {episodeNumber}
                </p>
              )}
              <p className="text-sm font-semibold text-stone-900 line-clamp-1">{title}</p>
              {guestName && <p className="text-xs text-stone-500 mt-0.5">{guestName}</p>}
            </div>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex-shrink-0 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
          <WaveBars playing={isPlaying} />
        </div>
      </div>

      {/* Progress + controls */}
      <div className="px-6 pb-5 space-y-3">
        <div
          className="relative h-1.5 bg-stone-100 rounded-full cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div className="absolute left-0 top-0 h-full bg-amber-500 rounded-full" style={{ width: `${progress}%` }} />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-500 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-stone-400 font-mono tabular-nums">0:00</span>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-all" title="Back 15s">
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-11 h-11 rounded-full bg-amber-500 hover:bg-amber-400 text-white flex items-center justify-center shadow-md transition-all hover:scale-105"
            >
              {isPlaying
                ? <Pause className="w-5 h-5" />
                : <Play className="w-5 h-5 ml-0.5" fill="currentColor" />}
            </button>
            <button className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-all" title="Forward 15s">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs text-stone-400 font-mono tabular-nums">{duration || "–"}</span>
        </div>
      </div>
    </div>
  );
}
