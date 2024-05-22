// PUT ALL QUERIES HERE EVENTUALLY
// ./sanity/lib/queries.ts

import { groq } from "next-sanity";

// Guest Details query (by URL param -> slug)
export const GUEST_QUERY = groq` *[_type == "guest" && slug.current == $slug] {
  ...,
"episodes": *[_type == "episode" && references('guests', ^._id)]
}`;

// Get all Episodes by UUID
export const EPISODES = groq`*[_type == "episode"]| order(uuid asc){uuid}`;

// Get all Episodes for sitemap
export const ALL_EPISODES = groq`*[_type == "episode"]{
  uuid,
  _createdAt
 }`;
// Get episode details
export const EPISODES_DETAILS_QUERY = groq`*[_type == "episode" && uuid == $uuid]{
  episodeName,
  blurb,
  image,
  url,
}`;
// Gets the latest season
export const INITIAL_SEASON_EPISODES_QUERY = groq`{

  "latestSeasonNumber":count(array::unique(*[_type == "episode"].seasonName))
}
`;
// Get episodes homepage.
export const SEASON_EPISODES_QUERY = groq`*[_type == "episode" && seasonNumber == $seasonNumber]|order(uuid desc)`;

//  Total Seasons with Episodes Query
export const TOTAL_SEASONS_QUERY = groq`{"seasonName":array::unique(*[_type == "episode"].seasonName),"seasonNumber":array::unique(*[_type == "episode" ].seasonNumber)}`;
// Used in Live Preview Component.
export const EPISODE_QUERY = groq`*[_type == "episode" && youtube.uuid == $uuid][0]`;

// Get details for current Podcast.
export const PODCAST_DETAILS_QUERY = groq`*[_type == "episode" && coalesce(uuid,youtube.uuid) == $uuid] {
    ...,
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
    "seasonNumber": coalesce(youtube.seasonNumber, seasonNumber),
    "url": coalesce("https://www.youtube.com/" + youtube.id, url),
    "uuid": coalesce(youtube.uuid, uuid),
    guests[]->,
    details {
    ...,
      featuredGuests[] {
        ...,
        "image": image.asset->url,
       "episodes": *[_type=="episode" && details.featuredGuests[].name match ^.name && !(uuid == $uuid)] {
      ...,
      "episodeName": coalesce(youtube.title, episodeName),
      "episodeNumber": coalesce(youtube.episodeNumber, episodeNumber),
      "url": coalesce("https://www.youtube.com/" + youtube.id, url),
      
    }
      }
    },
    "allParts":*[_type == "episode" && uuid != $uuid && uuid match $epID] | order(uuid asc) 
,
    "nextEpisode": *[_type == "episode" && _createdAt > ^._createdAt && uuid != ^._id] | order(_createdAt asc, uuid asc)[0].uuid,
    "prevEpisode": *[_type == "episode" && _createdAt < ^._createdAt && uuid != ^._id] | order(_createdAt desc, uuid desc)[0].uuid,
    "sponsors":*[_type=="sponsor" && uuid in ^.sponsors]
}
`;

// Get specific Sponsor
export const SPONSOR_DETAILS_QUERY = groq`{"sponsors":*[_type == "sponsor" && uuid == $id] ,"episodes":*[_type == "episode" &&  $id in sponsors]| order(uuid desc)}`;

// Get all Sponsors
export const ALL_SPONSORS_QUERY = groq`*[_type == "sponsor"]`;

// Featured News Articles
export const FEATURED_ARTICLES_QUERY = groq`*[_type == "featuredArticle"]`;

// Other Articles Query
export const OTHER_ARTICLES_QUERY = groq`*[_type == "article"]`;
