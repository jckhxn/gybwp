import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { InteractiveDemo } from "../components/InteractiveDemo";
import { FullScreenZoom } from "../components/FullScreenZoom";
import { MouseCursor } from "../components/MouseCursor";

export interface HeroSceneProps {
  title: string;
  subtitle: string;
  hostInfo?: {
    name: string;
    role: string;
    consultingProfile?: {
      bio: string;
    };
  };
  platforms?: Array<{
    name: string;
    url: string;
    logoImage: {
      asset: {
        url: string;
      };
    };
  }>;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ 
  title, 
  subtitle, 
  hostInfo, 
  platforms 
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Debug logging for props
  React.useEffect(() => {
    console.log('🎬 HeroScene Props Debug:');
    console.log('Title:', title);
    console.log('Subtitle:', subtitle);
    console.log('Host Info:', hostInfo);
    console.log('Platforms:', platforms);
    console.log('Host name from props:', hostInfo?.name);
    console.log('Host role from props:', hostInfo?.role);
    console.log('Platform count:', platforms?.length || 0);
  }, [title, subtitle, hostInfo, platforms]);

  // Animation timings
  const badgeOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleTransform = interpolate(frame, [20, 60], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subtitleOpacity = interpolate(frame, [40, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleTransform = interpolate(frame, [40, 80], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const buttonsOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonsTransform = interpolate(frame, [60, 100], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const platformsOpacity = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const imageOpacity = interpolate(frame, [100, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const imageScale = interpolate(frame, [100, 140], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Floating animation for background elements
  const floatingY1 = interpolate(
    frame,
    [0, fps * 8],
    [0, 20],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const floatingY2 = interpolate(
    frame,
    [0, fps * 12],
    [0, -15],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const floatingY3 = interpolate(
    frame,
    [0, fps * 10],
    [0, 15],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Button zoom coordinates (calculated based on actual video dimensions and layout)
  // Layout breakdown:
  // - Container: px-14 (56px padding on each side)
  // - Left content: w-1/2 (50% of remaining width)
  // - Button position: approximately 30% into the left content area
  const containerPadding = 56; // px-14 = 3.5rem = 56px
  const leftContentWidth = (width - containerPadding * 2) / 2;
  const buttonX = containerPadding + leftContentWidth * 0.35; // Adjusted to 35% into left content
  const buttonY = height * 0.62; // Adjusted to 62% down the screen for better positioning
  
  // Debug logging for coordinate calculation
  React.useEffect(() => {
    console.log('🎯 Button Coordinates Debug:');
    console.log('Video dimensions:', { width, height });
    console.log('Container padding:', containerPadding);
    console.log('Left content width:', leftContentWidth);
    console.log('Calculated button position:', { buttonX, buttonY });
  }, [width, height, buttonX, buttonY]);
  
  // Enhanced button interaction animations
  const zoomStartFrame = 160;
  const zoomEndFrame = 300; // Extended for smoother transitions
  const cursorStartFrame = 185;
  const cursorEndFrame = 275;
  const clickFrame = 220;
  
  // Button hover animation (before click)
  const buttonHoverScale = interpolate(
    frame,
    [cursorStartFrame, clickFrame - 15, clickFrame, clickFrame + 10],
    [1, 1.05, 0.95, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  
  // Button glow intensity during zoom sequence
  const buttonGlowIntensity = interpolate(
    frame,
    [zoomStartFrame, zoomStartFrame + 30, zoomEndFrame - 30, zoomEndFrame],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  
  // Button pulse animation during zoom
  const buttonPulse = interpolate(
    Math.sin(frame / 8),
    [-1, 1],
    [0.98, 1.02],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  // Ripple effect timing
  const rippleOpacity = interpolate(
    frame,
    [clickFrame, clickFrame + 25],
    [0.8, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  const rippleScale = interpolate(
    frame,
    [clickFrame, clickFrame + 25],
    [0.5, 2.5],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );
  
  return (
    <FullScreenZoom
      startFrame={zoomStartFrame}
      endFrame={zoomEndFrame}
      targetX={buttonX}
      targetY={buttonY}
      zoomScale={2.5}
      disabled={frame < zoomStartFrame || frame > zoomEndFrame}
    >
      <AbsoluteFill className="bg-gradient-to-br from-main-dark via-main to-main-light overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHpNNDAgMzJoNHYxaC00ek0zMiAzN2g0djFoLTR6TTM2IDM5aDR2MWgtNHpNNDAgNDFoNHYxaC00ek0zMiA0NGg0djFoLTR6TTM2IDQ2aDR2MWgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] mix-blend-overlay pointer-events-none"></div>

      {/* Animated floating shapes */}
      <div
        className="absolute -top-20 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
        style={{
          transform: `translateY(${floatingY1}px)`,
          opacity: 0.5 + Math.sin(frame / 20) * 0.3,
        }}
      />
      <div
        className="absolute top-1/2 -left-12 w-44 h-44 rounded-full bg-secondary/20 blur-2xl"
        style={{
          transform: `translate(10px, ${floatingY2}px)`,
          opacity: 0.3 + Math.sin(frame / 30) * 0.3,
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-52 h-52 rounded-full bg-accent/10 blur-3xl"
        style={{
          transform: `translateY(${floatingY3}px)`,
          opacity: 0.2 + Math.sin(frame / 25) * 0.3,
        }}
      />

      <div className="container mx-auto px-14 flex items-center h-full">
        <div className="flex flex-row items-center gap-24 w-full">
          {/* Left content */}
          <div className="w-1/2 flex flex-col gap-8">
            {/* Badge */}
            <div
              style={{
                opacity: badgeOpacity,
              }}
              className="inline-flex items-center rounded-full bg-primary/20 backdrop-blur-sm px-4 py-1.5 w-fit"
            >
              <span className="text-primary-light font-semibold tracking-widest uppercase text-base">
                Business Leadership Podcast
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                opacity: titleOpacity,
                transform: `translateY(${titleTransform}px)`,
              }}
              className="text-white text-7xl font-extrabold leading-tight font-sans bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                opacity: subtitleOpacity,
                transform: `translateY(${subtitleTransform}px)`,
              }}
              className="text-gray-200 text-2xl max-w-[600px] leading-relaxed"
            >
              {hostInfo?.consultingProfile?.bio || 
               `Join CEO & Leadership Coach ${hostInfo?.name || 'Jeff Lackey'} as he explores how the best leaders grow their companies by investing in their most valuable asset: their people.`}
            </p>

            {/* Buttons */}
            <div
              style={{
                opacity: buttonsOpacity,
                transform: `translateY(${buttonsTransform}px)`,
              }}
              className="flex gap-4 mt-4"
            >
              {/* Enhanced Listen Now Button */}
              <div 
                className="group relative h-14 px-8 text-base font-medium text-white overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary-light shadow-lg flex items-center gap-2 justify-center"
                style={{
                  transform: `scale(${buttonHoverScale * (frame >= zoomStartFrame && frame <= zoomEndFrame ? buttonPulse : 1)})`,
                  boxShadow: `0 0 ${20 + buttonGlowIntensity * 30}px rgba(59, 130, 246, ${0.3 + buttonGlowIntensity * 0.4}), 0 4px 14px 0 rgba(0, 0, 0, 0.39)`,
                  filter: `brightness(${1 + buttonGlowIntensity * 0.2})`,
                }}
              >
                {/* Button ripple effect */}
                {frame >= clickFrame && frame <= clickFrame + 25 && (
                  <div
                    className="absolute inset-0 rounded-lg bg-white"
                    style={{
                      opacity: rippleOpacity * 0.3,
                      transform: `scale(${rippleScale})`,
                      transformOrigin: 'center',
                    }}
                  />
                )}
                
                {/* Enhanced glow overlay during zoom */}
                {buttonGlowIntensity > 0 && (
                  <div 
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-light to-secondary"
                    style={{
                      opacity: buttonGlowIntensity * 0.3,
                      mixBlendMode: 'overlay',
                    }}
                  />
                )}
                
                <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span className="relative z-10">Listen Now</span>
              </div>

              <div className="h-14 px-8 text-base font-medium text-white bg-transparent border-2 border-white/30 rounded-lg flex items-center gap-2 justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                About Jeff
              </div>
            </div>

            {/* Platforms */}
            <div
              style={{
                opacity: platformsOpacity,
              }}
              className="pt-8"
            >
              <p className="text-gray-300 mb-4 font-medium">Available on:</p>
              <div className="flex gap-4">
                {platforms?.slice(0, 3).map((platform, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/10 py-2.5 px-5 rounded-full shadow-md backdrop-blur-sm">
                    {platform.logoImage?.asset?.url ? (
                      <Img
                        src={platform.logoImage.asset.url}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-primary rounded-full"></div>
                    )}
                    <span className="text-white font-medium">{platform.name}</span>
                  </div>
                )) || (
                  // Fallback platforms
                  <>
                    <div className="flex items-center gap-2 bg-white/10 py-2.5 px-5 rounded-full shadow-md backdrop-blur-sm">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                      <span className="text-white font-medium">Apple Podcasts</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 py-2.5 px-5 rounded-full shadow-md backdrop-blur-sm">
                      <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                      <span className="text-white font-medium">Spotify</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 py-2.5 px-5 rounded-full shadow-md backdrop-blur-sm">
                      <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                      <span className="text-white font-medium">Buzzsprout</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right content - Hero image */}
          <div className="w-1/2 flex justify-end relative">
            {/* Host Badge */}
            <div className="absolute bottom-6 right-6 z-20 bg-black/70 backdrop-blur-xl px-6 py-4 rounded-xl shadow-xl border border-primary/20 ring-1 ring-white/10">
              <div className="flex items-center gap-4">
                <div className="w-[3px] h-14 bg-gradient-to-b from-primary to-primary-light rounded-full"></div>
                <div>
                  <p className="text-gray-300 text-xs uppercase tracking-wider font-medium">HOST</p>
                  <p className="text-white font-bold text-xl">{hostInfo?.name || 'Jeff Lackey'}</p>
                  <p className="text-gray-400 text-xs mt-1">{hostInfo?.role || 'CEO & Leadership Coach'}</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-40 h-40 rounded-full bg-primary/20 blur-3xl"></div>
            <div className="absolute -bottom-4 -right-4 w-48 h-48 rounded-full bg-accent/20 blur-3xl"></div>

            {/* Main image */}
            <div
              style={{
                opacity: imageOpacity,
                transform: `scale(${imageScale}) translateY(${Math.sin(frame / 60) * 8}px)`,
              }}
              className="relative z-10"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl blur-xl opacity-30"></div>
              <div className="relative z-10 w-[600px] h-[400px] rounded-2xl shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.747L4.838 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.838l3.545-2.747A1 1 0 019.383 3.076zM12 5a1 1 0 011.414 0L15.707 7.293a1 1 0 010 1.414L13.414 11a1 1 0 11-1.414-1.414L13.586 8 12 6.414A1 1 0 0112 5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">Podcast Hero Image</h3>
                  <p className="text-gray-400">Main podcast artwork would appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced mouse cursor positioned over the Listen Now button */}
      <MouseCursor
        startFrame={cursorStartFrame}
        endFrame={cursorEndFrame}
        x={buttonX}
        y={buttonY}
        clickFrame={clickFrame}
        visible={frame >= cursorStartFrame && frame <= cursorEndFrame}
      />
      
      {/* Debug: Visual indicator for cursor position (remove in production) */}
      {frame >= cursorStartFrame && frame <= cursorEndFrame && (
        <div
          style={{
            position: "absolute",
            left: buttonX - 5,
            top: buttonY - 5,
            width: 10,
            height: 10,
            backgroundColor: "red",
            borderRadius: "50%",
            zIndex: 999,
            opacity: 0.7,
          }}
        />
      )}
    </AbsoluteFill>
    </FullScreenZoom>
  );
};