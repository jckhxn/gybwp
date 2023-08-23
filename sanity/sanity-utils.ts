import { createClient, groq } from "next-sanity";
export async function getEpisodes() {
  const client = createClient({
    projectId: "hxymd1na",
    dataset: "production",
    apiVersion: "2023-08-22",
  });
  return await client.fetch(groq`*[_type == "episode"]{
    _id,
    _createdAt,
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
