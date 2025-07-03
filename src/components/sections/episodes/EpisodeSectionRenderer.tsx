// @ts-nocheck
import { EpisodeHero } from "@/src/components/sections/hero/EpisodeHero";
import { EpisodePlayer } from "@/src/components/sections/episodes/EpisodePlayer";
import EpisodeOverview from "@/src/components/sections/episodes/EpisodeOverview";
import EpisodeTranscript from "@/src/components/sections/episodes/EpisodeTranscript";
import EpisodeGuests from "@/src/components/sections/episodes/EpisodeGuests";
import EpisodeSponsors from "@/src/components/sections/episodes/EpisodeSponsors";
import RelatedEpisodes from "@/src/components/sections/episodes/RelatedEpisodes";
import SubscribeSection from "@/src/components/sections/episodes/SubscribeSection";
import { NewsletterSection } from "@/src/components/sections/shared/NewsletterSection";
import { ConsultingCTA } from "@/src/components/sections/consulting/ConsultingCTA";

interface EpisodeSectionRendererProps {
  section: any;
  episode: any;
}

export function EpisodeSectionRenderer({
  section,
  episode,
}: EpisodeSectionRendererProps) {
  switch (section._type) {
    case "episodeHero":
      return <EpisodeHero section={section} episode={episode} />;
    case "episodePlayer":
      return <EpisodePlayer section={section} episode={episode} />;
    case "episodeOverview":
      return <EpisodeOverview data={section} episode={episode} />;
    case "episodeTranscript":
      return <EpisodeTranscript data={section} episode={episode} />;
    case "episodeGuests":
      return <EpisodeGuests data={section} episode={episode} />;
    case "episodeSponsors":
      return <EpisodeSponsors data={section} episode={episode} />;
    case "relatedEpisodes":
      return <RelatedEpisodes data={section} episode={episode} />;
    case "subscribeSection":
      return <SubscribeSection data={section} />;
    case "newsletter":
      return <NewsletterSection section={section} />;
    case "consultingCTA":
      return <ConsultingCTA section={section} />;
    default:
      console.warn(
        `Episode section type "${section._type}" not found in registry`
      );
      return (
        <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">
            Unknown episode section type: <code>{section._type}</code>
          </p>
        </div>
      );
  }
}
