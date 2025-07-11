import Image from "next/image";
import { Button } from "@/src/components/ui/Button";
import Link from "next/link";
import { urlFor } from "@/src/lib/utils";
import { formatEpisodeTitle } from "@/src/lib/formatTitle";

export default function RelatedEpisodes({
  slug,
  relatedEpisodes,
}: {
  slug: string;
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
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {episodes.map((episode: any, index: number) => {
          const youtube = episode?.youtube || {};
          const rawTitle = youtube.title || episode.title || "Untitled Episode";
          const title = formatEpisodeTitle(rawTitle);
          const seasonNumber =
            youtube.seasonNumber || episode.seasonNumber || "?";
          const episodeNumber =
            youtube.episodeNumber || episode.episodeNumber || "?";
          let thumbnailUrl = "/placeholder.svg";
          if (youtube.thumbnail) {
            thumbnailUrl = youtube.thumbnail;
          } else if (episode.image) {
            thumbnailUrl = isSanityImage(episode.image)
              ? urlFor(episode.image).width(80).height(80).url()
              : episode.image;
          }
          const episodeId =
            youtube.uuid || episode._id || episode.uuid || episode._ref;
          const pathName =
            episode.pathname?.current ||
            episode.slug?.current ||
            `/episodes/${episodeId}`;
          return (
            <div
              key={episodeId || index}
              className="flex flex-col bg-white rounded-xl border shadow-lg p-6 h-full transition-shadow hover:shadow-2xl"
            >
              <Image
                src={thumbnailUrl}
                alt={title}
                width={80}
                height={80}
                className="rounded-md object-cover mb-3 mx-auto"
              />
              <span className="text-xs text-muted-foreground mb-1">
                S{seasonNumber}E{episodeNumber}
              </span>
              <h4 className="text-sm font-medium line-clamp-2 mb-2">{title}</h4>
              <div className="flex-grow" />
              <Link href={pathName}>
                <Button className="w-full mt-2 px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded transition-all text-sm font-medium">
                  Listen Now
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="pt-4 mt-2 w-full flex justify-center items-center">
        <Link href="/episodes">
          <Button className="px-6 py-2 bg-primary text-white hover:bg-primary-dark rounded transition-all text-base font-semibold text-center mx-auto">
            View All Episodes
          </Button>
        </Link>
      </div>
    </>
  );
}
