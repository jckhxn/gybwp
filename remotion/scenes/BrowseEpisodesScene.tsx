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
import { InteractiveDemo } from "../components/InteractiveDemo";
import { FullScreenZoom } from "../components/FullScreenZoom";
import { MouseCursor } from "../components/MouseCursor";

export interface BrowseEpisodesSceneProps {
  episodes: VideoData['recentEpisodes'];
}

export const BrowseEpisodesScene: React.FC<BrowseEpisodesSceneProps> = ({ episodes }) => {
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

  // Season filter animation
  const filterOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const filterY = interpolate(frame, [20, 50], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Episode cards staggered animation
  const getCardAnimation = (index: number) => {
    const startFrame = 40 + index * 15;
    const endFrame = startFrame + 40;

    const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const scale = interpolate(frame, [startFrame, endFrame], [0.8, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

    const y = interpolate(frame, [startFrame, endFrame], [50, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

    return { opacity, scale, y };
  };

  // SVG placeholder for episode thumbnails
  const EPISODE_PLACEHOLDER_SVG = `data:image/svg+xml;base64,${btoa(`
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#CBA052;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2A6B74;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <circle cx="200" cy="150" r="40" fill="rgba(255,255,255,0.2)"/>
  <polygon points="185,135 185,165 215,150" fill="white"/>
  <text x="200" y="220" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">PODCAST EPISODE</text>
  <text x="200" y="240" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="12">Growing Your Business With People</text>
</svg>
`)}`;

  // Use passed episodes or fallback data
  const fallbackEpisodes = [
    {
      _id: "fallback-1",
      title: "The Future of Remote Leadership",
      pathname: "/episodes/future-remote-leadership",
      youtube: {
        title: "The Future of Remote Leadership",
        thumbnail: EPISODE_PLACEHOLDER_SVG,
        episodeNumber: 24,
        seasonNumber: 3,
        id: "abc123"
      },
      guests: [{ name: "Sarah Johnson" }],
      _createdAt: "2024-12-08T00:00:00Z"
    },
    {
      _id: "fallback-2", 
      title: "Building Resilient Organizations",
      pathname: "/episodes/building-resilient-organizations",
      youtube: {
        title: "Building Resilient Organizations",
        thumbnail: EPISODE_PLACEHOLDER_SVG,
        episodeNumber: 23,
        seasonNumber: 3,
        id: "def456"
      },
      guests: [{ name: "Michael Chen" }],
      _createdAt: "2024-12-01T00:00:00Z"
    },
    {
      _id: "fallback-3",
      title: "Emotional Intelligence in Management", 
      pathname: "/episodes/emotional-intelligence-management",
      youtube: {
        title: "Emotional Intelligence in Management",
        thumbnail: EPISODE_PLACEHOLDER_SVG,
        episodeNumber: 22,
        seasonNumber: 3,
        id: "ghi789"
      },
      guests: [{ name: "Dr. Lisa Rodriguez" }],
      _createdAt: "2024-11-24T00:00:00Z"
    },
    {
      _id: "fallback-4",
      title: "Creating a Culture of Innovation",
      pathname: "/episodes/culture-innovation",
      youtube: {
        title: "Creating a Culture of Innovation",
        thumbnail: EPISODE_PLACEHOLDER_SVG, 
        episodeNumber: 21,
        seasonNumber: 3,
        id: "jkl012"
      },
      guests: [{ name: "Alex Thompson" }],
      _createdAt: "2024-11-17T00:00:00Z"
    }
  ];

  const displayEpisodes = episodes && episodes.length > 0 ? episodes.slice(0, 6) : fallbackEpisodes;

  // First episode card zoom coordinates (approximate position)
  const firstCardX = 400; // Left side episode card center
  const firstCardY = 350; // Vertical center of first card

  return (
    <FullScreenZoom
      startFrame={120}
      endFrame={210}
      targetX={firstCardX}
      targetY={firstCardY}
      zoomScale={2.0}
      disabled={frame < 120 || frame > 210}
    >
      <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 left-1/4 w-40 h-40 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-56 h-56 rounded-full bg-secondary/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-10 w-28 h-28 rounded-full bg-accent/25 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-14 py-16">
        {/* Section Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-bold text-white mb-4">Browse Episodes</h2>
          <p className="text-2xl text-gray-300">Discover insights from business leaders</p>
        </div>

        {/* Season Filter */}
        <div
          style={{
            opacity: filterOpacity,
            transform: `translateY(${filterY}px)`,
          }}
          className="flex justify-center mb-12"
        >
          <div className="flex gap-4">
            <div className="bg-primary text-white px-6 py-3 rounded-lg font-medium">
              Season 3
            </div>
            <div className="bg-white/10 text-gray-300 px-6 py-3 rounded-lg font-medium border border-white/20">
              Season 2
            </div>
            <div className="bg-white/10 text-gray-300 px-6 py-3 rounded-lg font-medium border border-white/20">
              Season 1
            </div>
          </div>
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
          {displayEpisodes.map((episode, index) => {
            const animation = getCardAnimation(index);
            const isFirstCard = index === 0;
            
            const episodeCard = (
              <div
                className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Episode thumbnail */}
                  <div className="flex-shrink-0">
                    {episode.youtube?.thumbnail ? (
                      <div className="w-20 h-20 rounded-lg overflow-hidden relative">
                        <Img
                          src={getEpisodeThumbnail(episode)}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/80 to-primary-light/80 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Episode info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-primary text-sm font-medium">
                        Episode {episode.youtube?.episodeNumber || 'N/A'}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400 text-sm">
                        Season {episode.youtube?.seasonNumber || 'N/A'}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2 leading-tight">
                      {getEpisodeTitle(episode)}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {episode._createdAt ? 
                            new Date(episode._createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) :
                            'Recent'
                          }
                        </span>
                      </div>
                      {episode.guests && episode.guests.length > 0 && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{episode.guests[0].name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );

            return (
              <div
                key={episode._id || index}
                style={{
                  opacity: animation.opacity,
                  transform: `translateY(${animation.y}px) scale(${animation.scale})`,
                }}
              >
                {episodeCard}
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div
          style={{
            opacity: interpolate(frame, [200, 240], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
          className="flex justify-center mt-12"
        >
          <div className="bg-gradient-to-r from-primary to-primary-light text-white px-8 py-4 rounded-lg font-medium text-lg flex items-center gap-2">
            <span>View All Episodes</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Mouse cursor positioned over the first episode card */}
      <MouseCursor
        startFrame={140} // Appear after zoom starts
        endFrame={190} // Disappear before zoom ends
        x={firstCardX} // Center on first card
        y={firstCardY}
        clickFrame={165} // Click in the middle of the zoom
        visible={frame >= 140 && frame <= 190}
      />
    </AbsoluteFill>
    </FullScreenZoom>
  );
};