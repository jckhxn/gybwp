import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
} from "remotion";
import { VideoData, getEpisodeThumbnail, getEpisodeTitle } from "../data/fetchVideoData";

export interface LatestEpisodeSceneProps {
  episode?: VideoData['latestEpisode'];
  sponsors?: VideoData['sponsorData'];
}

export const LatestEpisodeScene: React.FC<LatestEpisodeSceneProps> = ({ 
  episode,
  sponsors 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Episode card animation
  const cardOpacity = interpolate(frame, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardScale = interpolate(frame, [20, 60], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cardX = interpolate(frame, [20, 60], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Meta information animation
  const metaOpacity = interpolate(frame, [40, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const metaY = interpolate(frame, [40, 80], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Play button animation
  const playOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const playScale = interpolate(frame, [60, 100], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bounce,
  });

  // Pulse effect for play button
  const pulseScale = 1 + Math.sin(frame / 15) * 0.1;

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/30 blur-2xl"></div>
        <div className="absolute bottom-40 right-32 w-48 h-48 rounded-full bg-secondary/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-14 flex flex-col justify-center h-full">
        {/* Section Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold text-white mb-4">Latest Episode</h2>
          <p className="text-2xl text-gray-300">Catch up on our most recent conversation</p>
        </div>

        {/* Episode Card */}
        <div className="flex items-center justify-center">
          <div
            style={{
              opacity: cardOpacity,
              transform: `translateX(${cardX}px) scale(${cardScale})`,
            }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 max-w-4xl w-full shadow-2xl"
          >
            <div className="flex items-center gap-8">
              {/* Episode Thumbnail */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-xl shadow-lg relative overflow-hidden">
                  {episode?.youtube?.thumbnail ? (
                    <Img
                      src={getEpisodeThumbnail(episode)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-primary-light"></div>
                  )}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div
                      style={{
                        opacity: playOpacity,
                        transform: `scale(${playScale * pulseScale})`,
                      }}
                      className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm"
                    >
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Episode Content */}
              <div className="flex-1">
                <div
                  style={{
                    opacity: metaOpacity,
                    transform: `translateY(${metaY}px)`,
                  }}
                >
                  {/* Episode Badge */}
                  <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <span>Episode {episode?.youtube?.episodeNumber || '25'}</span>
                    <span>•</span>
                    <span>Season {episode?.youtube?.seasonNumber || '3'}</span>
                  </div>

                  {/* Episode Title */}
                  <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                    {getEpisodeTitle(episode) || 'Building High-Performance Teams Through Authentic Leadership'}
                  </h3>

                  {/* Episode Description */}
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {episode?.youtube?.blurb || 'In this episode, we dive deep into the strategies successful leaders use to create teams that consistently deliver exceptional results while maintaining a positive culture.'}
                  </p>

                  {/* Episode Meta */}
                  <div className="flex items-center gap-6 text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{episode?._createdAt ? new Date(episode._createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'December 15, 2024'}</span>
                    </div>
                    {episode?.guests && episode.guests.length > 0 && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Guest: {episode.guests[0].name}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <div className="bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Listen Now
                    </div>
                    <div className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium border border-white/20">
                      Show Notes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};