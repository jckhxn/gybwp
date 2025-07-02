// Sanity
import { episodeType } from "./components/HomePage/episode-data";
import { client } from "./sanity/sanity-utils";

import { ALL_EPISODES } from "./lib/queries";

export default async function sitemap() {
  const baseUrl = "https://gybwp.com";

  const episodes = await client.fetch(ALL_EPISODES);

  const episodeUrls = episodes.map((episode: episodeType) => ({
    url: episode.pathname?.current
      ? `${baseUrl}${episode.pathname.current}`
      : `${baseUrl}/episodes/${episode.uuid}`, // Fallback for episodes without pathname
    //@ts-ignore
    lastModified: episode._updatedAt || episode._createdAt,
  }));
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sponsors`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/consulting`,
      lastModified: new Date(),
    },
    ...episodeUrls,
  ];
}
