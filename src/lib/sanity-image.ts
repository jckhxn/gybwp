import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "./sanity-utils";

const builder = createImageUrlBuilder(client);

export const urlForImage = (source: Image) => {
  return builder.image(source);
};
