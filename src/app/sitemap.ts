// Sanity
import { getAllEpisodes } from "./sanity/sanity-utils";

export default async function sitemap() {
  const baseUrl = "https://gybwp.com";

  const episodes = await getAllEpisodes();

  const episodeUrls = episodes.map((episode) => ({
    url: `${baseUrl}/episode/${episode.uuid}`,
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
