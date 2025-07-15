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
  index?: number;
}

const sectionComponents: Record<string, any> = {
  episodeHero: (props: any) => <EpisodeHero {...props} />, // pass section, episode
  episodePlayer: (props: any) => <EpisodePlayer {...props} />, // pass section, episode
  episodeOverview: (props: any) => (
    <EpisodeOverview data={props.section} episode={props.episode} />
  ), // pass section, episode
  episodeTranscript: (props: any) => (
    <EpisodeTranscript data={props.section} episode={props.episode} />
  ), // pass section, episode
  episodeGuests: (props: any) => (
    <EpisodeGuests data={props.section} episode={props.episode} />
  ), // pass section, episode
  episodeSponsors: (props: any) => (
    <EpisodeSponsors data={props.section} episode={props.episode} />
  ), // pass section, episode
  relatedEpisodes: (props: any) => (
    <RelatedEpisodes data={props.section} episode={props.episode} />
  ), // pass section, episode
  subscribeSection: (props: any) => <SubscribeSection data={props.section} />, // pass section
  newsletter: (props: any) => <NewsletterSection section={props.section} />, // pass section
  consultingCTA: (props: any) => <ConsultingCTA section={props.section} />, // pass section
};

export function EpisodeSectionRenderer({
  section,
  episode,
  index,
}: EpisodeSectionRendererProps) {
  const SectionComponent = sectionComponents[section._type];
  if (!SectionComponent) {
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
  return <SectionComponent section={section} episode={episode} index={index} />;
}
