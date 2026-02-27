// @ts-nocheck
import { defineConfig } from "sanity";
// Plugins
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { pages } from "@tinloof/sanity-studio";

import { youtubeInput } from "./sanity/plugins/youtube";
import schemas from "./sanity/schemas";
import config from "./config";
import { locate } from "./src/app/(website)/lib/locate";

const SINGLETON_TYPES = new Set(["siteSettings"]);

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
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .icon(() => "⚙️")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site Settings"),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !SINGLETON_TYPES.has(item.getId() ?? ""),
            ),
          ]),
    }),
    youtubeInput({
      apiKey: config.youtube.apiKey,
      channelId: config.youtube.channelId,
    }),
    visionTool(),
  ],
  schema: { types: schemas },
  useCdn: false,
  presentation: {
    locate,
  },
});

export default sanityConfig;
