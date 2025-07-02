import Image from "next/image";
import Button from "@/src/app/(website)/components/ui/button";
import Link from "next/link";
import { urlFor } from "@/src/app/(website)/lib/utils";
import { formatEpisodeTitle } from "@/src/lib/formatTitle";

export default function RelatedEpisodes({
  slug,
  uuid,
  relatedEpisodes,
}: {
  slug?: string;
  uuid?: string;
  relatedEpisodes?: any[];
}) {
  // Use the relatedEpisodes data if available, otherwise fallback to empty array
  const episodes = relatedEpisodes || [];

  if (!episodes || episodes.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-sm py-4">
        No related episodes available.
      </div>
    );
  }

  // Helper function to determine if a value is a Sanity image
  const isSanityImage = (value: any) => {
    return value && typeof value === "object" && value._type === "image";
  };

  return (
    <div className="space-y-4">
      {episodes.map((episode: any, index: number) => {
        // For references that have been expanded, the data is in either episode.youtube or episode
        // For references that haven't been expanded, we might just have _ref fields
        const youtube = episode?.youtube || {};

        // Extract necessary data from the referenced episode
        const rawTitle = youtube.title || episode.title || "Untitled Episode";
        const title = formatEpisodeTitle(rawTitle);
        const seasonNumber =
          youtube.seasonNumber || episode.seasonNumber || "?";
        const episodeNumber =
          youtube.episodeNumber || episode.episodeNumber || "?";

        // Handle image/thumbnail with special consideration for Sanity image objects
        let thumbnailUrl = "/placeholder.svg";
        if (youtube.thumbnail) {
          thumbnailUrl = youtube.thumbnail;
        } else if (episode.image) {
          thumbnailUrl = isSanityImage(episode.image)
            ? urlFor(episode.image).width(80).height(80).url()
            : episode.image;
        }

        // Determine path to episode
        const episodeId =
          youtube.uuid || episode._id || episode.uuid || episode._ref;
        const pathName =
          episode.pathname?.current ||
          episode.slug?.current ||
          `/episodes/${episodeId}`;

        return (
          <div key={episodeId || index} className="flex gap-3">
            <Image
              src={thumbnailUrl}
              alt={title}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                S{seasonNumber}E{episodeNumber}
              </span>
              <h4 className="text-sm font-medium line-clamp-2">{title}</h4>
              <Link href={pathName}>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto mt-1 justify-start"
                >
                  Listen Now
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
      <div className="pt-4 mt-2">
        <Link href="/episodes">
          <Button variant="outline" size="sm" className="w-full">
            View All Episodes
          </Button>
        </Link>
      </div>
    </div>
  );
}
