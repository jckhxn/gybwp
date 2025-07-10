import { Section } from "@/types";
import { HomeHero } from "@/src/components/sections/hero/HomeHero";
import { LatestEpisodeSection } from "@/src/components/sections/episodes/LatestEpisodeSection";
import { BrowseEpisodesSection } from "@/src/components/sections/episodes/BrowseEpisodesSection";
import { NewsletterSection } from "@/src/components/sections/shared/NewsletterSection";
import { FeaturedNewsSection } from "@/src/components/sections/shared/FeaturedNewsSection";
import { getComponentId } from "@/src/lib/sectionId";

// Import episode-specific sections
import EpisodeOverview from "@/src/components/sections/episodes/EpisodeOverview";
import EpisodeTranscript from "@/src/components/sections/episodes/EpisodeTranscript";
import EpisodeGuests from "@/src/components/sections/episodes/EpisodeGuests";
import EpisodeSponsors from "@/src/components/sections/episodes/EpisodeSponsors";
import RelatedEpisodes from "@/src/components/sections/episodes/RelatedEpisodes";
import SubscribeSection from "@/src/components/sections/episodes/SubscribeSection";

// Section registry - maps Sanity section types to React components
export const sections = {
  homeHero: HomeHero,
  latestEpisode: LatestEpisodeSection,
  browseEpisodes: BrowseEpisodesSection,
  newsletter: NewsletterSection,
  featuredNews: FeaturedNewsSection,
  episodeOverview: EpisodeOverview,
  episodeTranscript: EpisodeTranscript,
  episodeGuests: EpisodeGuests,
  episodeSponsors: EpisodeSponsors,
  relatedEpisodes: RelatedEpisodes,
  subscribeSection: SubscribeSection,
};

export function SectionRenderer(props: {
  section: Section;
  index?: number;
  episode?: any; // For episode-specific data
}) {
  const { section, index, episode } = props;
  const componentId = getComponentId(section, section._type, index);

  // Wrapper function to add ID to sections that don't manage it themselves
  const wrapWithId = (component: React.ReactNode) => (
    <div id={componentId}>{component}</div>
  );

  switch (section._type) {
    case "homeHero":
      // HomeHero manages its own ID
      return <HomeHero section={section} />;
    case "latestEpisode":
      return wrapWithId(<LatestEpisodeSection section={section} />);
    case "browseEpisodes":
      return wrapWithId(<BrowseEpisodesSection section={section} />);
    case "newsletter":
      return wrapWithId(<NewsletterSection section={section} />);
    case "featuredNews":
      return wrapWithId(<FeaturedNewsSection section={section} />);
    default:
      console.warn(
        `Section type "${(section as any)._type}" not found in registry`
      );
      return (
        <div
          id={componentId}
          className="p-8 bg-red-50 border border-red-200 rounded-lg"
        >
          <p className="text-red-600">
            Unknown section type: <code>{(section as any)._type}</code>
          </p>
        </div>
      );
  }
}
