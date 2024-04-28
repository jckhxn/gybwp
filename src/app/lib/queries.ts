// PUT ALL QUERIES HERE EVENTUALLY
// ./sanity/lib/queries.ts

import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]`;

export const EPISODE_QUERY = groq`*[_type == "episode" && youtube.uuid == $uuid][0]`;
