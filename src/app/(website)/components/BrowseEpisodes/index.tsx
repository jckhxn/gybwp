import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import { Separator } from "../ui/separator";
export const BrowseEpisodes = () => {
  // Sample seasons and episodes data
  const seasons = [
    { id: 1, name: "Season 1" },
    { id: 2, name: "Season 2" },
    { id: 3, name: "Season 3" },
    { id: 4, name: "Season 4" },
  ];

  const episodes = {
    1: [
      {
        id: 1,
        title: "Starting Your Purpose-Driven Business",
        date: "Jan 15, 2022",
      },
      { id: 2, title: "Finding Your Why", date: "Jan 22, 2022" },
      { id: 3, title: "Building a Strong Foundation", date: "Jan 29, 2022" },
    ],
    2: [
      { id: 4, title: "Scaling with Purpose", date: "Jun 15, 2022" },
      { id: 5, title: "Impact-Driven Marketing", date: "Jun 22, 2022" },
      { id: 6, title: "Sustainable Business Models", date: "Jun 29, 2022" },
    ],
    3: [
      { id: 7, title: "Leading with Values", date: "Jan 15, 2023" },
      { id: 8, title: "Purpose and Profit Balance", date: "Jan 22, 2023" },
      {
        id: 9,
        title: "Building Community Around Your Brand",
        date: "Jan 29, 2023",
      },
    ],
    4: [
      {
        id: 10,
        title: "The Future of Purpose-Driven Business",
        date: "Jun 15, 2023",
      },
      { id: 11, title: "Global Impact Strategies", date: "Jun 22, 2023" },
      {
        id: 12,
        title: "Building Sustainable Business Models",
        date: "Apr 10, 2025",
      },
    ],
  };
  return (
    <section id="episodes" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Browse Episodes by Season
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Explore our full library of episodes organized by season.
            </p>
          </div>

          <Tabs defaultValue="4" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                {seasons.map((season) => (
                  <TabsTrigger key={season.id} value={season.id.toString()}>
                    {season.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            </div>

            {Object.entries(episodes).map(([seasonId, seasonEpisodes]) => (
              <TabsContent
                key={seasonId}
                value={seasonId}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {seasonEpisodes.map((episode) => (
                    <Card key={episode.id} className="overflow-hidden">
                      <Link href={`/episodes/${episode.id}`} className="block">
                        <Image
                          src={`/placeholder.svg?height=200&width=400&text=Episode+${episode.id}`}
                          width={400}
                          height={200}
                          alt={`Thumbnail for ${episode.title}`}
                          className="w-full h-48 object-cover"
                        />
                      </Link>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <Link
                                href={`/episodes/${episode.id}`}
                                className="hover:underline"
                              >
                                <h3 className="font-medium">{episode.title}</h3>
                              </Link>
                              <p className="text-xs text-muted-foreground">
                                {episode.date}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Play className="h-4 w-4" />
                              <span className="sr-only">Play</span>
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/episodes/${episode.id}`}
                              className="text-sm text-primary hover:underline"
                            >
                              Listen Now
                            </Link>
                            <Separator orientation="vertical" className="h-4" />
                            <Link
                              href={`/episodes/${episode.id}#show-notes`}
                              className="text-sm text-primary hover:underline"
                            >
                              Show Notes
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};
