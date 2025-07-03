import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hxymd1na",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-08-22",
  useCdn: false,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/dash",
  },
});

// Client for draft mode with stega enabled
export const draftClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hxymd1na",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-08-22",
  useCdn: false,
  perspective: "previewDrafts",
  token: process.env.SANITY_READ_TOKEN,
  stega: {
    enabled: true,
    studioUrl: "/dash",
  },
});

interface Params {
  uuid: string;
}
