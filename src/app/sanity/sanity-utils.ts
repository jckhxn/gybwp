import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: "hxymd1na",
  dataset: "production",
  apiVersion: "2023-08-22",
  useCdn: false,
});
export async function getAllEpisodes() {
  try {
    const allEpisodes = await client.fetch(
      groq`*[_type == "episode"]{
      _id,
      _createdAt,
      seasonName,
      seasonNumber,
      episodeMame,
      episodeNumber,
      uuid,
      podcastLinks,
      sponsors,
      url,
     image,
      blurb,
      guestDetails,
      episodeDetails,
    }`
    );
    if (!allEpisodes) throw Error("No episodes");
    return allEpisodes.results;
  } catch (error) {
    console.log(error);
  }
}

// Fetches info for Slider by Season number
export async function getSeasonByNumber(seasonNumber: number) {
  return client.fetch(groq`*[_type == "episode" && seasonNumber == ${seasonNumber}]{
    _id,
    _createdAt,
    seasonName,
    seasonNumber,
    episodeName,
    episodeNumber,
    uuid,
    podcastLinks,
    sponsors,
    url,
    image,
    blurb,
    guestDetails,
    episodeDetails,
  }`);
}
export async function getEpisodesBySponsor(sponsor: string) {
  return client.fetch(groq`*[_type == "episode" &&  ${sponsor} in sponsors]{
    _id,
    _createdAt,
    seasonName,
    seasonNumber,
    episodeName,
    episodeNumber,
    uuid,
    podcastLinks,
    sponsors,
    url,
    image,
    blurb,
    guestDetails,
    episodeDetails,
  }`);
}
export async function getEpisode(season: number, episodeUUID: number) {
  return client.fetch(groq`*[_type == "episode" && seasonNumber == ${season}&& uuid == ${episodeUUID}]{
    _id,
    _createdAt,
    seasonName,
    seasonNumber,
    episodeName,
    episodeNumber,
    uuid,
    podcastLinks,
    sponsors,
    url,
  image,
    blurb,
    guestDetails,
    episodeDetails,
  }`);
}
