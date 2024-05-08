// Sanity
import { episodeType } from "./components/Pages/HomePage/episode-data";
import { client } from "./sanity/sanity-utils";

import { ALL_EPISODES } from "./lib/queries";

export default async function sitemap() {
  const baseUrl = "https://gybwp.com";

  const episodes = await client.fetch(ALL_EPISODES);

  if (episodes) console.log(episodes);
  const episodeUrls = episodes.map((episode: episodeType) => ({
    url: `${baseUrl}/episode/${episode.uuid}`,
    //@ts-ignore
    lastModified: episode._createdAt,
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
