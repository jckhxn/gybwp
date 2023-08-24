import { createClient, groq } from "next-sanity";
export async function getAllEpisodes() {
  const client = createClient({
    projectId: "hxymd1na",
    dataset: "production",
    apiVersion: "2023-08-22",
  });
  return await client.fetch(groq`*[_type == "episode"]{
    _id,
    _createdAt,
    seasonName,
    seasonNumber,
    name,
    number,
    uuid,
    podcastLinks,
    sponsors,
    url,
    "image":image.asset->url,
    blurb,
    guestDetails,
    episodeDetails,
  }`);
}

// Fetches info for Slider by Season number
export async function getSeasonByNumber(seasonNumber: number) {
  const client = createClient({
    projectId: "hxymd1na",
    dataset: "production",
    apiVersion: "2023-08-22",
  });
  return client.fetch(groq`*[_type == "episode" && seasonNumber == ${seasonNumber}]{
    _id,
    _createdAt,
    seasonName,
    seasonNumber,
    name,
    number,
    uuid,
    podcastLinks,
    sponsors,
    url,
    "image":image.asset->url,
    blurb,
    guestDetails,
    episodeDetails,
  }`);
}
export async function getEpisodesBySponsor(sponsor: string) {
  const client = createClient({
    projectId: "hxymd1na",
    dataset: "production",
    apiVersion: "2023-08-22",
  });
  return client.fetch(groq`*[_type == "episode" &&  ${sponsor} in sponsors]{
    _id,
    _createdAt,
    seasonName,
    seasonNumber,
    name,
    number,
    uuid,
    podcastLinks,
    sponsors,
    url,
    "image":image.asset->url,
    blurb,
    guestDetails,
    episodeDetails,
  }`);
}
export async function getEpisode(season: number, episodeUUID: number) {
  const client = createClient({
    projectId: "hxymd1na",
    dataset: "production",
    apiVersion: "2023-08-22",
  });
  return client.fetch(groq`*[_type == "episode" && seasonNumber == ${season}&& uuid == ${episodeUUID}]{
    _id,
    _createdAt,
    seasonName,
    seasonNumber,
    name,
    number,
    uuid,
    podcastLinks,
    sponsors,
    url,
    "image":image.asset->url,
    blurb,
    guestDetails,
    episodeDetails,
  }`);
}
