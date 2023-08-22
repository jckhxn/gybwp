import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
const config = defineConfig({
  projectId: "hxymd1na",
  dataset: "production",
  title: "JKL Data",
  apiVersion: "2023-08-22",
  basePath: "/dash",
  plugins: [deskTool()],
});
export default config;
