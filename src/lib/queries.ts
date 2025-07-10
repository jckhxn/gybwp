// PUT ALL QUERIES HERE EVENTUALLY
// ./sanity/lib/queries.ts

import { groq } from "next-sanity";

// Guest Details query (by URL param -> slug)
export const GUEST_QUERY = groq`*[_type == "person" && role == "guest" && slug.current == $slug][0] {
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

// Detailed Guest query with episodes array
export const GUEST_DETAIL_QUERY = groq`*[_type == "person" && role == "guest" && slug.current == $slug][0] {
  _id,
  name,
  guestProfile {
    title,
    bio,
    company,
    website,
    profileImage,
    socialLinks
  },
  "episodes": *[_type == "episode" && ^._id in guests[]._ref] 
    | order(coalesce(youtube.publishedAt, publishedAt) desc) {
      _id,
      youtube { id },
      "title": coalesce(youtube.title, title),
      "number": coalesce(youtube.episodeNumber, episodeNumber),
      "date": coalesce(youtube.publishedAt, publishedAt),
      "duration": coalesce(youtube.duration, duration, "45 minutes"),
      "description": coalesce(youtube.blurb, blurb),
      "uuid": coalesce(youtube.uuid, uuid),
      "audioUrl": coalesce(youtube.url, url),
      "image": coalesce(youtube.thumbnail, image)
    }
}`;

// Host Detail query with page reference
export const HOST_DETAIL_QUERY = groq`*[_type == "person" && role == "host-consultant" && slug.current == $slug][0] {
  _id,
  name,
  pageReference {
    linkType,
    targetComponentId,
    targetPage-> {
      _type,
      slug,
      pathname
    },
    targetPageComponentId,
    externalUrl,
    scrollBehavior,
    scrollOffset
  },
  consultingProfile {
    bio,
    expertise,
    profileImage,
    calendarLink
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
      "hosts": *[_type == "person" && role == "host-consultant"] {
        _id,
        name,
        slug
      },
      "guests": *[_type == "person" && role == "guest"] {
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
    guests[]-> {
      _id,
      name,
      slug,
      role,
      "title": guestProfile.title,
      "about": guestProfile.bio,
      "bio": guestProfile.bio,
      "image": guestProfile.profileImage,
      "company": guestProfile.company,
      "website": guestProfile.website,
      guestProfile
    },
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
export const FEATURED_ARTICLES_QUERY = groq`*[_type == "article" && featured == true] | order(_createdAt desc) {
  _id,
  company,
  title,
  link,
  date,
  image,
  excerpt,
  description,
  publication
}`;

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
      "hosts": *[_type == "person" && role == "host-consultant"] {
        _id,
        name,
        slug
      },
      "guests": *[_type == "person" && role == "guest"] {
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
    guests[]-> {
      _id,
      name,
      slug,
      role,
      "title": guestProfile.title,
      "about": guestProfile.bio,
      "bio": guestProfile.bio,
      "image": guestProfile.profileImage,
      "company": guestProfile.company,
      "website": guestProfile.website,
      guestProfile
    },
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
      "hosts": *[_type == "person" && role == "host-consultant"] {
        _id,
        name,
        slug
      },
      "guests": *[_type == "person" && role == "guest"] {
        _id,
        name,
        slug
      }
    },
    // Enhanced guest data
    guests[]-> {
      _id,
      name,
      slug,
      role,
      "title": guestProfile.title,
      "bio": guestProfile.bio,
      "about": guestProfile.bio,
      "image": guestProfile.profileImage,
      "company": guestProfile.company,
      "website": guestProfile.website,
      socialLinks: guestProfile.socialLinks,
      guestProfile
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
