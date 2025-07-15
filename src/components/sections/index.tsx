import { Section } from "@/types";
import { HomeHero } from "@/src/components/sections/hero/HomeHero";
import { LatestEpisode } from "@/src/components/sections/episodes/LatestEpisode";
import { BrowseEpisodes } from "@/src/components/sections/episodes/BrowseEpisodes";
import { Newsletter } from "@/src/components/sections/shared/Newsletter";
import { FeaturedNews } from "@/src/components/sections/shared/FeaturedNews";
import { getComponentId } from "@/src/lib/sectionId";
// Import episode-specific sections
import EpisodeOverview from "@/src/components/sections/episodes/EpisodeOverview";
import EpisodeTranscript from "@/src/components/sections/episodes/EpisodeTranscript";
import EpisodeGuests from "@/src/components/sections/episodes/EpisodeGuests";
import EpisodeSponsors from "@/src/components/sections/episodes/EpisodeSponsors";
import RelatedEpisodes from "@/src/components/sections/episodes/RelatedEpisodes";
import SubscribeSection from "@/src/components/sections/episodes/SubscribeSection";
// Import About sections
import { AboutHero } from "@/src/components/sections/about/AboutHero";
import { AboutMission } from "@/src/components/sections/about/AboutMission";
import { AboutHost } from "@/src/components/sections/about/AboutHost";
import { AboutTestimonials } from "@/src/components/sections/about/AboutTestimonials";
import { AboutListenConnect } from "@/src/components/sections/about/AboutListenConnect";

const sectionComponents: Record<string, any> = {
  homeHero: HomeHero,
  latestEpisode: LatestEpisode,
  browseEpisodes: BrowseEpisodes,
  newsletter: Newsletter,
  featuredNews: FeaturedNews,
  episodeOverview: EpisodeOverview,
  episodeTranscript: EpisodeTranscript,
  episodeGuests: EpisodeGuests,
  episodeSponsors: EpisodeSponsors,
  relatedEpisodes: RelatedEpisodes,
  subscribeSection: SubscribeSection,
  aboutHero: AboutHero,
  aboutMission: AboutMission,
  aboutHost: AboutHost,
  aboutTestimonials: AboutTestimonials,
  aboutListenConnect: AboutListenConnect,
};

export function SectionRenderer(props: {
  section: Section;
  index?: number;
  episode?: any; // For episode-specific data
}) {
  const { section, index, episode } = props;
  const componentId = getComponentId(section, section._type, index);
  const SectionComponent = sectionComponents[section._type];
  if (!SectionComponent) {
    console.warn(`Section type "${section._type}" not found in registry`);
    return (
      <div
        id={componentId}
        className="p-8 bg-red-50 border border-red-200 rounded-lg"
      >
        <p className="text-red-600">
          Unknown section type: <code>{section._type}</code>
        </p>
      </div>
    );
  }
  // Home page components manage their own IDs
  if (section._type === "homeHero") {
    return <HomeHero section={section} />;
  }
  if (section._type === "newsletter") {
    return <Newsletter section={section} />;
  }
  if (section._type === "latestEpisode") {
    return <LatestEpisode section={section} />;
  }
  if (section._type === "browseEpisodes") {
    return <BrowseEpisodes section={section} />;
  }
  if (section._type === "featuredNews") {
    return <FeaturedNews section={section} />;
  }
  return (
    <div id={componentId}>
      <SectionComponent {...section} episode={episode} index={index} />
    </div>
  );
}
