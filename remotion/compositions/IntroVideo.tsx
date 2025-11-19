import React from "react";
import { 
  AbsoluteFill, 
  Sequence, 
  useCurrentFrame, 
  useVideoConfig,
  Img,
  staticFile,
  delayRender,
  continueRender
} from "remotion";
import { HeroScene } from "../scenes/HeroScene";
import { LatestEpisodeScene } from "../scenes/LatestEpisodeScene";
import { BrowseEpisodesScene } from "../scenes/BrowseEpisodesScene";
import { CTAScene } from "../scenes/CTAScene";
import { fetchVideoData, VideoData } from "../data/fetchVideoData";

export interface IntroVideoProps {
  title: string;
  subtitle: string;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // State for fetched data
  const [videoData, setVideoData] = React.useState<VideoData | null>(null);
  const [handle] = React.useState(() => delayRender());

  // Fetch data when component mounts
  React.useEffect(() => {
    fetchVideoData()
      .then((data) => {
        setVideoData(data);
        continueRender(handle);
      })
      .catch((error) => {
        console.error('Failed to fetch video data:', error);
        continueRender(handle);
      });
  }, [handle]);

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Scene 1: Hero Section (0-10s) */}
      <Sequence from={0} durationInFrames={300}>
        <HeroScene 
          title={title} 
          subtitle={subtitle} 
          hostInfo={videoData?.hostInfo}
          platforms={videoData?.platformData?.sectionsBody?.[0]?.platforms}
        />
      </Sequence>

      {/* Scene 2: Latest Episode (10-20s) */}
      <Sequence from={300} durationInFrames={300}>
        <LatestEpisodeScene 
          episode={videoData?.latestEpisode}
          sponsors={videoData?.sponsorData}
        />
      </Sequence>

      {/* Scene 3: Browse Episodes (20-35s) */}
      <Sequence from={600} durationInFrames={450}>
        <BrowseEpisodesScene 
          episodes={videoData?.recentEpisodes || []}
        />
      </Sequence>

      {/* Scene 4: CTA/Outro (35-45s) */}
      <Sequence from={1050} durationInFrames={300}>
        <CTAScene 
          hostInfo={videoData?.hostInfo}
          featuredArticles={videoData?.featuredArticles || []}
        />
      </Sequence>
    </AbsoluteFill>
  );
};