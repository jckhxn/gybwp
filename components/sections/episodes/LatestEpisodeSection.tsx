import { LatestEpisode } from "@/src/app/(website)/components/LatestEpisode";

interface LatestEpisodeSectionProps {
  section: {
    _type: "latestEpisode";
    _key: string;
    title?: string;
    subtitle?: string;
  };
}

export function LatestEpisodeSection({ section }: LatestEpisodeSectionProps) {
  return (
    <section className="pt-14 pb-10 md:pt-20 md:pb-16 relative">
      {/* Subtle divider at top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <LatestEpisode />
    </section>
  );
}
