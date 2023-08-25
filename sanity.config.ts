import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./src/app/sanity/schemas";
const config = defineConfig({
  projectId: "hxymd1na",
  dataset: "production",
  title: "JKL Data",
  apiVersion: "2023-08-22",
  basePath: "/dash",
  plugins: [deskTool(), visionTool()],
  schema: { types: schemas },
  useCdn: false,

});
export default config;
