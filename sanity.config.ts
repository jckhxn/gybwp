// @ts-nocheck
import { defineConfig } from "sanity";
// Plugins
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { locate } from "./src/app/(website)/lib/locate";
import { pages } from "@tinloof/sanity-studio";

import { youtubeInput } from "./src/app/(website)/sanity/plugins/youtube";
import schemas from "./sanity/schemas";
import config from "./config";

const sanityConfig = defineConfig({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  title: config.siteName,
  apiVersion: config.sanity.apiVersion,
  basePath: config.sanity.studioUrl,

  plugins: [
    structureTool({}),
    pages({
      title: "Pages",
      creatablePages: ["page", "person", "episode", "sponsor"],
      locate,
      previewUrl: {
        draftMode: {
          enable: "/api/draft",
        },
        preview: "/",
      },
    }),
    youtubeInput({ apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY }),
    visionTool(),
  ],
  schema: { types: schemas },
  useCdn: false,
});

export default sanityConfig;
