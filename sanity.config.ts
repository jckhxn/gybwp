import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";
const config = defineConfig({
  projectId: "hxymd1na",
  dataset: "production",
  title: "JKL Data",
  apiVersion: "2023-08-22",
  basePath: "/dash",
  plugins: [deskTool()],
  schema: { types: schemas },
});
export default config;
