// PUT ALL QUERIES HERE EVENTUALLY
// ./sanity/lib/queries.ts

import { groq } from "next-sanity";

// Guest Details query (by URL param -> slug)
export const GUEST_QUERY = groq`*[_type == "guest" && slug.current == $slug][0] {
  ...,

"episodes": *[_type == "episode" && references('guests', ^._id)]
{
  ...,
  "uuid":coalesce(uuid,youtube.uuid),
  "image":coalesce(image,youtube.thumbnail),
  "seasonNumber":coalesce(seasonNumber,youtube.seasonNumber),
  "episodeNumber":coalesce(seasonNumber,youtube.episodeNumber),
  "publishedAt":youtube.publishedAt
}
}`;

// Detailed Guest query with latest episode and previous episodes
export const GUEST_DETAIL_QUERY = groq`*[_type == "guest" && slug.current == $slug][0] {
  _id,
  name,
  title,
about, 
  image,
  socialLinks,
  "latestEpisode": *[_type == "episode" && references(^._id)] | order(youtube.publishedAt desc)[0] {
  youtube {
  id},
    "title": youtube.title,
    "number": youtube.episodeNumber,
    "date": youtube.publishedAt,
    "duration": "45 minutes",
    "description": youtube.blurb,
    "uuid": youtube.uuid,
    "audioUrl": youtube.url
  },
  "previousEpisodes": *[_type == "episode" && references(^._id) && _id != ^.latestEpisode._id] | order(youtube.publishedAt desc)[0..2] {
    "title": youtube.title,
    "number": youtube.episodeNumber,
    "date": youtube.publishedAt,
    "description": youtube.blurb,
    "uuid": youtube.uuid,
    "duration": "45 minutes",
    "image": youtube.thumbnail
  }
}`;

// Get all Episodes by UUID
export const EPISODES = groq`*[_type == "episode"]| order(uuid asc){uuid}`;

// Get all Episodes for sitemap
export const ALL_EPISODES = groq`*[_type == "episode"] | order(uuid desc)`;

// Get the latest episode document
export const LATEST_EPISODE = groq`*[_type == "episode"] | order(_createdAt desc)[0]`;

// Get episode details
export const EPISODES_DETAILS_QUERY = groq`*[_type == "episode" && uuid == $uuid]{
  episodeName,
  blurb,
  image,
  url,
}`;

// Get all seasons
export const ALL_SEASONS_QUERY = groq`*[_type == "season"]|order(_createdAt desc)`;
// Gets the latest season
export const INITIAL_SEASON_EPISODES_QUERY = groq`{

  "latestSeasonNumber":count(array::unique(*[_type == "episode"].seasonName))
}
`;

// Get episodes by season Name
export const EPISODES_BY_SEASON_QUERY = groq`*[_type == "episode" && season->title == $name] | order(_createdAt desc)`;
// Get episodes homepage.
export const SEASON_EPISODES_QUERY = groq`*[_type == "episode" && coalesce(seasonNumber,youtube.seasonNumber) == $seasonNumber]|order(uuid desc){...,
  "uuid":coalesce(uuid,youtube.uuid),
  "image":coalesce(image,youtube.thumbnail),
  "seasonNumber":coalesce(seasonNumber,youtube.seasonNumber),
  "episodeNumber":coalesce(seasonNumber,youtube.episodeNumber),
  "publishedAt":youtube.publishedAt
}`;

//  Total Seasons with Episodes Query
export const TOTAL_SEASONS_QUERY = groq`{"seasonName":array::unique(*[_type == "episode"].seasonName),"seasonNumber":array::unique(*[_type == "episode" ].seasonNumber)}`;

// Get details for current Podcast.
export const PODCAST_DETAILS_QUERY = groq`*[_type == "episode" && coalesce(uuid,youtube.uuid) == $uuid][0] {
    ...,
  relatedEpisodes[]->
    {
      youtube{
      title,
      seasonNumber,
      episodeNumber,
      uuid,
      thumbnail,
    }
    }
   ,
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
    "publishedAt": youtube.publishedAt,
    guests[]->,
    sponsors[]-> {
      _id,
      name,
      uuid,
      slug,
      logo,
      image,
      description,
      website,
      tier,
      bgColor,
      isActive
    },
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
  "nextEpisode": *[_type == "episode" && _createdAt > ^._createdAt && uuid != ^._id] | order(_createdAt asc, uuid asc)[0].pathname.current,
    "prevEpisode": *[_type == "episode" && _createdAt < ^._createdAt && uuid != ^._id] | order(_createdAt desc, uuid desc)[0].pathname.current,uuid,
    season-> {
      ...,
       sponsors[]-> {
         _id,
         name,
         uuid,
         slug,
         logo,
         image,
         description,
         website,
         tier,
         bgColor,
         isActive
       }
    }
}
`;

// Get specific Sponsor by slug and episodes that reference the sponsor's UUID
export const SPONSOR_DETAILS_QUERY = groq`{
  "sponsors": *[_type == "sponsor" && slug.current == $slug] {
    _id,
    name,
    uuid,
    slug,
    logo,
    image,
    description,
    website,
    tier,
    bgColor,
    isActive,
    social
  },
  "episodes": *[_type == "episode" && (*[_type == "sponsor" && slug.current == $slug][0].uuid in sponsors)] | order(coalesce(youtube.publishedAt, _createdAt) desc) {
  _id,
  "uuid": coalesce(uuid, youtube.uuid),
  "image": coalesce(image, youtube.thumbnail),
  "seasonNumber": coalesce(seasonNumber, youtube.seasonNumber),
  "episodeNumber": coalesce(episodeNumber, youtube.episodeNumber),
  youtube {
    title,
    blurb,
    description,
    uuid,
    seasonNumber,
    episodeNumber,
    thumbnail,
    publishedAt
  },
  guests[] {
    name
  },
  season-> {
    title,
    seasonNumber
  }
}}`;

// Get all Sponsors
export const ALL_SPONSORS_QUERY = groq`*[_type == "sponsor"] {
  _id,
  name,
  uuid,
  slug,
  logo,
  image,
  description,
  website,
  tier,
  bgColor,
  isActive,
  social
}`;

// Featured News Articles
export const FEATURED_ARTICLES_QUERY = groq`*[_type == "featuredArticle"] {
  _id,
  title,
  company,
  publication,
  description,
  excerpt,
  date,
  link,
  "image": image
}`;

// Other Articles Query
export const OTHER_ARTICLES_QUERY = groq`*[_type == "article"]`;

/**
 * Query to fetch episode documents for specific UUIDs
 * Returns episodes ordered by UUID
 */
export const RANDOM_RELATED_EPISODES = groq`*[_type == "episode" && coalesce(uuid,youtube.uuid) in $uuids] | order(coalesce(uuid,youtube.uuid) asc) [0...3]`;
