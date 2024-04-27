import { createClient, groq } from "next-sanity";
export const client = createClient({
  projectId: "hxymd1na",
  dataset: "production",
  apiVersion: "2023-08-22",

  useCdn: false,
  // perspective: "published",
  // stega: {
  //   enabled: false,
  //   studioUrl: "/dash",
  // },
});
interface Params {
  uuid: string;
}

export async function getEpisodesFeaturingGuest(guestName: string) {
  return client.fetch(
    groq`*[_type == "episode" && details.featuredGuests[].name match "${guestName}"]
    {
      episodeName,
        uuid,
        image
    }
    `
  );
}
export async function getAllEpisodes() {
  return client.fetch(
    groq`*[_type == "episode"]{
     uuid,
     _createdAt
    }`
  );
}
export async function getEpisodeDetails(uuid: Params) {
  return client.fetch(
    groq`*[_type == "episode" && uuid == "${uuid}"]{
      episodeName,
      blurb,
      image,
      url,
    }`
  );
}
