import { BrowseEpisodes } from "@/src/components/features/BrowseEpisodes";

interface BrowseEpisodesSectionProps {
  section: {
    _type: "browseEpisodes";
    _key: string;
    title?: string;
    subtitle?: string;
  };
}

export function BrowseEpisodesSection({ section }: BrowseEpisodesSectionProps) {
  return (
    <div className="mt-14">
      <BrowseEpisodes />
    </div>
  );
}
