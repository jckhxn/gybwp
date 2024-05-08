import { createClient } from "next-sanity";
export const client = createClient({
  projectId: "hxymd1na",
  dataset: "production",
  apiVersion: "2023-08-22",

  useCdn: false,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/dash",
  },
});
interface Params {
  uuid: string;
}
