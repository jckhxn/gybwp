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

// Get all Episodes by creation date (replacing UUID-based ordering)
export const EPISODES = groq`*[_type == "episode"] | order(_createdAt asc) {
  uuid,
  pathname,
  _createdAt
}`;

// Get all Episodes for sitemap (updated to use pathname and proper ordering)
export const ALL_EPISODES = groq`*[_type == "episode"] | order(_createdAt desc) {
  uuid,
  pathname,
  _updatedAt,
  _createdAt
}`;

// Get the latest episode document with all needed fields
export const LATEST_EPISODE = groq`*[_type == "episode"] | order(_createdAt desc)[0] {
  ...,
  "uuid": coalesce(uuid, youtube.uuid),
  pathname,
  "image": coalesce(image, youtube.thumbnail),
  "seasonNumber": coalesce(seasonNumber, youtube.seasonNumber),
  "episodeNumber": coalesce(episodeNumber, youtube.episodeNumber),
  "title": coalesce(title, youtube.title),
  "blurb": coalesce(blurb, youtube.blurb),
  "publishedAt": coalesce(publishedAt, youtube.publishedAt),
  youtube
}`;

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

// Get episodes by season Name - updated to include pathname
export const EPISODES_BY_SEASON_QUERY = groq`*[_type == "episode" && season->title == $name] | order(_createdAt desc) {
  ...,
  "uuid": coalesce(uuid, youtube.uuid),
  pathname,
  "image": coalesce(image, youtube.thumbnail),
  "seasonNumber": coalesce(seasonNumber, youtube.seasonNumber),
  "episodeNumber": coalesce(episodeNumber, youtube.episodeNumber),
  "publishedAt": youtube.publishedAt,
  youtube {
    title,
    episodeNumber,
    seasonNumber,
    thumbnail,
    uuid,
    publishedAt,
    blurb,
    duration
  },
  details {
    keyTakeaways
  }
}`;
// Get episodes homepage - updated to include pathname and use proper ordering
export const SEASON_EPISODES_QUERY = groq`*[_type == "episode" && coalesce(seasonNumber,youtube.seasonNumber) == $seasonNumber] | order(_createdAt desc) {
  ...,
  "uuid":coalesce(uuid,youtube.uuid),
  pathname,
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
    // Include both transcript formats 
    transcript[] {
      ...,
      markDefs[] {
        ...,
        _type == "speaker" => {
          ...,
          "hostRef": hostRef->,
          "guestRef": guestRef->
        }
      }
    },
    transcriptSegments[] {
      ...,
      speaker {
        ...,
        hostRef->,
        guestRef->
      }
    },
    // Get all speakers - we'll filter in the component
    "allSpeakers": {
      "hosts": *[_type == "host"] {
        _id,
        name,
        slug
      },
      "guests": *[_type == "guest"] {
        _id,
        name,
        slug
      }
    },
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
  pathname,
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

// Other Articles Query
export const OTHER_ARTICLES_QUERY = groq`*[_type == "article"]`;

/**
 * Query to fetch episode documents for specific UUIDs
 * Returns episodes ordered by UUID
 */
export const RANDOM_RELATED_EPISODES = groq`*[_type == "episode" && coalesce(uuid,youtube.uuid) in $uuids] | order(coalesce(uuid,youtube.uuid) asc) [0...3]`;

// Get details for current Episode by UUID or pathname (dual-mode during migration)
export const EPISODE_BY_IDENTIFIER_QUERY = groq`*[_type == "episode" && (
  coalesce(uuid,youtube.uuid) == $identifier || 
  pathname.current == $identifier ||
  pathname.current == "/episode/" + $slug ||
  pathname.current == "/episodes/" + $slug ||
  slug.current == $slug
)][0] {
    ...,
    // Include both transcript formats 
    transcript[] {
      ...,
      markDefs[] {
        ...,
        _type == "speaker" => {
          ...,
          "hostRef": hostRef->,
          "guestRef": guestRef->
        }
      }
    },
    transcriptSegments[] {
      ...,
      speaker {
        ...,
        hostRef->,
        guestRef->
      }
    },
    // Get all speakers - we'll filter in the component
    "allSpeakers": {
      "hosts": *[_type == "host"] {
        _id,
        name,
        slug
      },
      "guests": *[_type == "guest"] {
        _id,
        name,
        slug
      }
    },
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
       "episodes": *[_type=="episode" && details.featuredGuests[].name match ^.name && !(coalesce(uuid,youtube.uuid) == $identifier || pathname.current == $identifier)] {
      ...,
      "episodeName": coalesce(youtube.title, episodeName),
      "episodeNumber": coalesce(youtube.episodeNumber, episodeNumber),
      "url": coalesce("https://www.youtube.com/" + youtube.id, url),
      
    }
      }
    },
    "allParts":*[_type == "episode" && uuid != $identifier && uuid match $epID] | order(uuid asc) 
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
       },
    },
    "sections": sections[]
}`;

// Episode template queries (deprecated - use EPISODE_TEMPLATE_QUERY instead)
export const DEFAULT_EPISODE_TEMPLATE_QUERY = groq`*[_type == "episodeTemplate"][0] {
  _id,
  title,
  description,
  sectionsBody[] {
    ...,
    _type
  }
}`;

export const EPISODE_TEMPLATE_BY_ID_QUERY = groq`*[_type == "episodeTemplate" && _id == $templateId][0] {
  _id,
  title,
  description,
  sectionsBody[] {
    ...,
    _type
  }
}`;

// Episode template singleton query
export const EPISODE_TEMPLATE_QUERY = groq`*[_type == "episodeTemplate"][0] {
  _id,
  title,
  description,
  usage,
  sectionsBody[] {
    ...,
    _type,
    _key
  }
}`;

// Enhanced episode query with page builder support
export const EPISODE_WITH_PAGE_BUILDER_QUERY = groq`*[_type == "episode" && (coalesce(uuid,youtube.uuid) == $identifier || pathname.current == $identifier)][0] {
    ...,
    customLayout,
    sectionsBody[] {
      ...,
      _type
    },
    // Include both transcript formats 
    transcript[] {
      ...,
      markDefs[] {
        ...,
        _type == "speaker" => {
          ...,
          "hostRef": hostRef->,
          "guestRef": guestRef->
        }
      }
    },
    transcriptSegments[] {
      ...,
      speaker {
        ...,
        hostRef->,
        guestRef->
      }
    },
    // Get all speakers - we'll filter in the component
    "allSpeakers": {
      "hosts": *[_type == "host"] {
        _id,
        name,
        slug
      },
      "guests": *[_type == "guest"] {
        _id,
        name,
        slug
      }
    },
    // Enhanced guest data
    guests[]-> {
      _id,
      name,
      title,
      bio,
      image,
      socialLinks,
      slug
    },
    // Enhanced sponsor data (from episode or season)
    sponsors[]-> {
      _id,
      name,
      logo,
      image,
      website,
      tier,
      slug,
      uuid
    },
    season-> {
      _id,
      title,
      sponsors[]-> {
        _id,
        name,
        logo,
        image,
        website,
        tier,
        slug,
        uuid
      }
    },
    relatedEpisodes[]-> {
      youtube {
        title,
        seasonNumber,
        episodeNumber,
        uuid,
        thumbnail,
      },
      pathname,
      _id
    },
    content {
      files[] {
        link,
        name,
        type,
        description
      }
    },
    // Navigation data
    "prevEpisode": *[_type == "episode" && _createdAt < ^._createdAt] | order(_createdAt desc)[0].pathname.current,
    "nextEpisode": *[_type == "episode" && _createdAt > ^._createdAt] | order(_createdAt asc)[0].pathname.current
}`;
