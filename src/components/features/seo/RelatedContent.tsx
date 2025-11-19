import Link from "next/link";
import Image from "next/image";
import { Clock, User, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { urlFor } from "@/src/lib/utils";

export interface RelatedEpisode {
  _id: string;
  title: string;
  slug?: string;
  pathname?: { current: string };
  youtube?: {
    title?: string;
    thumbnail?: string;
    duration?: string;
    publishedAt?: string;
  };
  category?: string;
  guests?: Array<{
    _id: string;
    name: string;
    slug?: { current: string };
    guestProfile?: {
      title?: string;
      profileImage?: any;
    };
  }>;
}

export interface RelatedPerson {
  _id: string;
  name: string;
  slug?: { current: string };
  role?: string;
  guestProfile?: {
    title?: string;
    company?: string;
    profileImage?: any;
  };
  consultingProfile?: {
    profileImage?: any;
  };
  episodeCount?: number;
}

interface RelatedContentProps {
  title?: string;
  episodes?: RelatedEpisode[];
  persons?: RelatedPerson[];
  categories?: string[];
  currentItemId?: string;
  maxItems?: number;
  showType?: "episodes" | "persons" | "categories" | "all";
}

export default function RelatedContent({
  title = "Related Content",
  episodes = [],
  persons = [],
  categories = [],
  currentItemId,
  maxItems = 6,
  showType = "all",
}: RelatedContentProps) {
  // Filter out current item and limit results
  const filteredEpisodes = episodes
    .filter(episode => episode._id !== currentItemId)
    .slice(0, maxItems);

  const filteredPersons = persons
    .filter(person => person._id !== currentItemId)
    .slice(0, maxItems);

  const filteredCategories = categories.slice(0, maxItems);

  const hasContent = 
    (showType === "all" || showType === "episodes") && filteredEpisodes.length > 0 ||
    (showType === "all" || showType === "persons") && filteredPersons.length > 0 ||
    (showType === "all" || showType === "categories") && filteredCategories.length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Related Episodes */}
        {(showType === "all" || showType === "episodes") && filteredEpisodes.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-gray-600 mb-3 uppercase tracking-wide">
              Related Episodes
            </h4>
            <div className="space-y-3">
              {filteredEpisodes.map((episode) => {
                const episodeUrl = episode.pathname?.current || `/episodes/${episode.slug || episode._id}`;
                const episodeTitle = episode.youtube?.title || episode.title;
                const thumbnail = episode.youtube?.thumbnail;

                return (
                  <Link
                    key={episode._id}
                    href={episodeUrl}
                    className="block group"
                  >
                    <div className="flex gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all">
                      {thumbnail && (
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={thumbnail}
                            alt={episodeTitle}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {episodeTitle}
                        </h5>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          {episode.youtube?.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {episode.youtube.duration}
                            </div>
                          )}
                          {episode.category && (
                            <Badge variant="secondary" className="text-xs py-0">
                              {episode.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Persons */}
        {(showType === "all" || showType === "persons") && filteredPersons.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-gray-600 mb-3 uppercase tracking-wide">
              Related People
            </h4>
            <div className="space-y-3">
              {filteredPersons.map((person) => {
                const personUrl = `/guest/${person.slug?.current || person._id}`;
                const profileImage = person.guestProfile?.profileImage || person.consultingProfile?.profileImage;
                const title = person.guestProfile?.title;
                const company = person.guestProfile?.company;

                return (
                  <Link
                    key={person._id}
                    href={personUrl}
                    className="block group"
                  >
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all">
                      <Avatar className="w-12 h-12 flex-shrink-0">
                        <AvatarImage
                          src={profileImage ? urlFor(profileImage).url() : undefined}
                          alt={person.name}
                        />
                        <AvatarFallback className="text-xs">
                          {person.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-sm group-hover:text-primary transition-colors">
                          {person.name}
                        </h5>
                        {title && (
                          <p className="text-xs text-gray-600 line-clamp-1">
                            {title}
                            {company && ` at ${company}`}
                          </p>
                        )}
                        {person.episodeCount && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                            <User className="h-3 w-3" />
                            {person.episodeCount} episode{person.episodeCount !== 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Categories */}
        {(showType === "all" || showType === "categories") && filteredCategories.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-gray-600 mb-3 uppercase tracking-wide">
              Related Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {filteredCategories.map((category) => (
                <Link
                  key={category}
                  href={`/episodes?category=${encodeURIComponent(category)}`}
                  className="group"
                >
                  <Badge 
                    variant="outline" 
                    className="hover:bg-primary hover:text-white transition-colors group-hover:border-primary"
                  >
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Helper component for episode pages
export function EpisodeRelatedContent({
  currentEpisode,
  relatedEpisodes = [],
  maxItems = 4,
}: {
  currentEpisode: RelatedEpisode;
  relatedEpisodes?: RelatedEpisode[];
  maxItems?: number;
}) {
  return (
    <RelatedContent
      title="More Episodes"
      episodes={relatedEpisodes}
      persons={currentEpisode.guests}
      categories={currentEpisode.category ? [currentEpisode.category] : []}
      currentItemId={currentEpisode._id}
      maxItems={maxItems}
    />
  );
}

// Helper component for person pages
export function PersonRelatedContent({
  currentPerson,
  relatedEpisodes = [],
  relatedPersons = [],
  maxItems = 4,
}: {
  currentPerson: RelatedPerson;
  relatedEpisodes?: RelatedEpisode[];
  relatedPersons?: RelatedPerson[];
  maxItems?: number;
}) {
  return (
    <RelatedContent
      title="Related Content"
      episodes={relatedEpisodes}
      persons={relatedPersons}
      currentItemId={currentPerson._id}
      maxItems={maxItems}
    />
  );
}