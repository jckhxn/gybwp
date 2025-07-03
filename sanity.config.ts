// @ts-nocheck
import { defineConfig } from "sanity";
// Plugins
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { pages } from "@tinloof/sanity-studio";

import { youtubeInput } from "./sanity/plugins/youtube";
import schemas from "./sanity/schemas";
import config from "./config";

const sanityConfig = defineConfig({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  title: config.siteName,
  apiVersion: config.sanity.apiVersion,
  basePath: config.sanity.studioUrl,

  plugins: [
    pages({
      previewUrl: {
        previewMode: {
          enable: "/api/draft",
        },
      },
      creatablePages: ["page"],
    }),
    structureTool(),
    youtubeInput({
      apiKey: config.youtube.apiKey,
      channelId: config.youtube.channelId,
    }),
    visionTool(),
  ],
  schema: { types: schemas },
  useCdn: false,
});

export default sanityConfig;
