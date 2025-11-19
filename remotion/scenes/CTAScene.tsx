import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { VideoData } from "../data/fetchVideoData";

export interface CTASceneProps {
  hostInfo?: VideoData['hostInfo'];
  featuredArticles: VideoData['featuredArticles'];
}

export const CTAScene: React.FC<CTASceneProps> = ({ hostInfo, featuredArticles }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(frame, [0, 40], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Newsletter form animation
  const formOpacity = interpolate(frame, [30, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const formY = interpolate(frame, [30, 70], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Social links animation
  const socialOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const socialY = interpolate(frame, [60, 100], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Logo animation
  const logoOpacity = interpolate(frame, [100, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = interpolate(frame, [100, 140], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Background pulse
  const pulseScale = 1 + Math.sin(frame / 30) * 0.1;

  return (
    <AbsoluteFill className="bg-gradient-to-br from-main-dark via-main to-main-light">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
          style={{ transform: `scale(${pulseScale})` }}
        />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-secondary/15 blur-2xl" />
        <div className="absolute top-1/2 left-1/6 w-32 h-32 rounded-full bg-accent/10 blur-xl" />
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHpNNDAgMzJoNHYxaC00ek0zMiAzN2g0djFoLTR6TTM2IDM5aDR2MWgtNHpNNDAgNDFoNHYxaC00ek0zMiA0NGg0djFoLTR6TTM2IDQ2aDR2MWgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-14">
        {/* Main CTA Section */}
        <div className="text-center max-w-4xl">
          {/* Title */}
          <div
            style={{
              opacity: titleOpacity,
              transform: `scale(${titleScale})`,
            }}
          >
            <h2 className="text-7xl font-bold text-white mb-6 leading-tight">
              Stay Connected
            </h2>
            <p className="text-2xl text-gray-200 mb-12 leading-relaxed">
              Join our community of leaders and get exclusive insights delivered to your inbox
            </p>
          </div>

          {/* Newsletter Signup */}
          <div
            style={{
              opacity: formOpacity,
              transform: `translateY(${formY}px)`,
            }}
            className="mb-16"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-white/10 border border-white/30 rounded-lg px-6 py-4 text-white placeholder-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="bg-gradient-to-r from-primary to-primary-light text-white px-8 py-4 rounded-lg font-medium text-lg cursor-pointer hover:shadow-lg transition-shadow">
                  Subscribe
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-4">
                Get weekly leadership insights and episode updates. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div
            style={{
              opacity: socialOpacity,
              transform: `translateY(${socialY}px)`,
            }}
            className="mb-16"
          >
            <p className="text-gray-300 text-xl mb-8">Follow us on social media</p>
            <div className="flex justify-center gap-6">
              {/* LinkedIn */}
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>

              {/* Twitter */}
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>

              {/* YouTube */}
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Logo/Branding */}
          <div
            style={{
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
            }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-bold text-white">GYBWP</h3>
                <p className="text-primary-light text-lg">Growing Your Business With People</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg">
              Thank you for watching!
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};