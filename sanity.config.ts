// @ts-nocheck
import { defineConfig } from "sanity";
// Plugins
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { locate } from "./src/app/lib/locate";
import { pages } from "@tinloof/sanity-studio";

import { youtubeInput } from "./src/app/sanity/plugins/youtube";
import schemas from "./src/app/sanity/schemas";

const config = defineConfig({
  projectId: "hxymd1na",
  dataset: "production",
  title: "JKL Data",
  apiVersion: "2023-08-22",
  basePath: "/dash",
  plugins: [
    structureTool(),
    pages({
      title: "Live Preview",

      creatablePages: ["episode"],
      locate,
      previewUrl: {
        draftMode: {
          enable: "/api/draft",
        },
      },
    }),
    youtubeInput({ apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY }),
    visionTool(),
  ],
  schema: { types: schemas },
  useCdn: false,
});
export default config;
