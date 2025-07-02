import { Section } from "@/types";
import { HomeHero } from "@/components/sections/hero/HomeHero";
import { LatestEpisodeSection } from "@/components/sections/episodes/LatestEpisodeSection";
import { BrowseEpisodesSection } from "@/components/sections/episodes/BrowseEpisodesSection";
import { NewsletterSection } from "@/components/sections/shared/NewsletterSection";
import { FeaturedNewsSection } from "@/components/sections/shared/FeaturedNewsSection";

// Section registry - maps Sanity section types to React components
export const sections = {
  homeHero: HomeHero,
  latestEpisode: LatestEpisodeSection,
  browseEpisodes: BrowseEpisodesSection,
  newsletter: NewsletterSection,
  featuredNews: FeaturedNewsSection,
};

export function SectionRenderer(props: { section: Section }) {
  const { section } = props;

  switch (section._type) {
    case "homeHero":
      return <HomeHero section={section} />;
    case "latestEpisode":
      return <LatestEpisodeSection section={section} />;
    case "browseEpisodes":
      return <BrowseEpisodesSection section={section} />;
    case "newsletter":
      return <NewsletterSection section={section} />;
    case "featuredNews":
      return <FeaturedNewsSection section={section} />;
    default:
      console.warn(
        `Section type "${(section as any)._type}" not found in registry`
      );
      return (
        <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">
            Unknown section type: <code>{(section as any)._type}</code>
          </p>
        </div>
      );
  }
}
