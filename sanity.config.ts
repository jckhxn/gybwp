import { defineConfig } from "sanity";
// Plugins
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { youtubeInput } from "./src/plugins/youtube";
import schemas from "./src/app/sanity/schemas";

const config = defineConfig({
  projectId: "hxymd1na",
  dataset: "production",
  title: "JKL Data",
  apiVersion: "2023-08-22",
  basePath: "/dash",
  plugins: [
    structureTool(),
    visionTool(),
    youtubeInput({ apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY }),
  ],
  schema: { types: schemas },
  useCdn: false,
});
export default config;
