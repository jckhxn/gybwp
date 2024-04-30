// PUT ALL QUERIES HERE EVENTUALLY
// ./sanity/lib/queries.ts

import { groq } from "next-sanity";

// Get all Episodes by UUID
export const EPISODES = groq`*[_type == "episode"]| order(uuid asc){uuid}`;

// Used in Preview Component.
export const EPISODE_QUERY = groq`*[_type == "episode" && youtube.uuid == $uuid][0]`;

// Get details for current Podcast.
export const PODCAST_DETAILS_QUERY = groq`{
  "episodeDetails": *[_type == "episode" && uuid == $uuid] {
    _createdAt,
    content {
      files[] {
        link,
        name,
        type,
        "file": pdf.asset->url,
        "image": image.asset->url
      }
    },
    "blurb": coalesce(youtube.blurb, blurb),
    "episodeName": coalesce(youtube.title, episodeName),
    "episodeNumber": coalesce(youtube.episodeNumber, episodeNumber),
    "image": coalesce(youtube.thumbnail, image),
    podcastLinks,
    seasonName,
    "seasonNumber": coalesce(youtube.seasonNumber, seasonNumber),
    sponsors,
    "url": coalesce("https://www.youtube.com/" + youtube.id, url),
    "uuid": coalesce(youtube.uuid, uuid),
    details {
      description,
      links,
      featuredGuests[] {
        name,
        about,
        title,
        url,
        "image": image.asset->url,
       "episodes": *[_type=="episode" && details.featuredGuests[].name match ^.name && !(uuid == $uuid)] {
      uuid,
      "episodeName": coalesce(youtube.title, episodeName),
      "episodeNumber": coalesce(youtube.episodeNumber, episodeNumber),
      "url": coalesce("https://www.youtube.com/" + youtube.id, url),
      image
    }
      }
    },
    "nextEpisode": *[_type == "episode" && _createdAt > ^._createdAt && uuid != ^._id] | order(_createdAt asc, uuid asc)[0].uuid,
    "prevEpisode": *[_type == "episode" && _createdAt < ^._createdAt && uuid != ^._id] | order(_createdAt desc, uuid desc)[0].uuid,
    "sponsors":*[_type=="sponsor" && uuid in ^.sponsors]{
      name,uuid,image,bgColor
    }
}
}`;
