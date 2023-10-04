import { createClient, groq } from "next-sanity";
const client = createClient({
  projectId: "hxymd1na",
  dataset: "production",
  apiVersion: "2023-08-22",

  useCdn: false,
});
interface Params {
  uuid: string;
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
