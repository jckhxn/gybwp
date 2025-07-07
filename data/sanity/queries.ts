import { groq } from "next-sanity";

// Base page query for any page type with full data expansion
export const PAGE_QUERY = groq`
  *[_type in ["page", "episode", "person", "sponsor"] && pathname.current == $pathname][0] {
    _id,
    _type,
    "pathname": pathname.current,
    title,
    sectionsBody[] {
      _key,
      _type,
      ...,
      // Expand images properly
      backgroundImage {
        asset-> {
          _id,
          url
        },
        alt
      },
      // Expand platform logos in homeHero sections
      platforms[] {
        name,
        url,
        logoImage {
          asset-> {
            _id,
            url
          },
          alt
        }
      },
      // Expand person references in sections
      person-> {
        _id,
        name,
        "slug": slug.current,
        role,
        isMainHost,
        consultingProfile,
        guestProfile
      },
      // Expand other references as needed
      episodes[]-> {
        _id,
        title,
        "pathname": pathname.current,
        youtube
      }
    },
    // Episode-specific fields
    _type == "episode" => {
      youtube,
      guests[]-> {
        _id,
        name,
        "slug": slug.current,
        role,
        guestProfile
      },
      sponsors[]-> {
        _id,
        name,
        "slug": slug.current
      },
      transcript
    },
    // Person-specific fields  
    _type == "person" => {
      name,
      "slug": slug.current,
      role,
      isMainHost,
      consultingProfile,
      guestProfile,
      "episodes": *[_type == "episode" && references(^._id)] {
        _id,
        title,
        "pathname": pathname.current,
        youtube,
        _createdAt
      } | order(_createdAt desc)
    }
  }
`;

// Query for all pages (for sitemap generation)
export const ALL_PAGES_QUERY = groq`
  *[_type in ["page", "episode", "person", "sponsor"] && defined(pathname.current)] {
    _id,
    _type,
    "pathname": pathname.current,
    _updatedAt
  }
`;

// Query for all episodes (for homepage, etc.)
export const ALL_EPISODES_QUERY = groq`
  *[_type == "episode"] | order(_createdAt desc) {
    _id,
    title,
    "pathname": pathname.current,
    youtube,
    guests[]-> {
      name,
      "slug": slug.current
    },
    _createdAt
  }
`;

// Query for all people
export const ALL_PEOPLE_QUERY = groq`
  *[_type == "person"] {
    _id,
    name,
    "slug": slug.current,
    role,
    isMainHost
  }
`;

// Query for a single episode by various identifiers
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
    },
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
    "allParts":*[_type == "episode" && uuid != $identifier && uuid match $epID] | order(uuid asc),
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

export const ALL_ARTICLES_QUERY = groq`
  *[_type == "article"] | order(_createdAt desc) {
    _id,
    company,
    title,
    link,
    date
  }
`;

export const OTHER_ARTICLES_QUERY = groq`
  *[_type == "article" && !(_id in $excludeIds)] | order(_createdAt desc) {
    _id,
    company,
    title,
    link,
    date
  }
`;

export const ALL_ARTICLES_WITH_FEATURED_QUERY = groq`
  *[_type == "article"] | order(_createdAt desc) {
    _id,
    company,
    title,
    link,
    date,
    featured,
    image,
    excerpt,
    description,
    publication
  }
`;

export const FEATURED_ARTICLES_QUERY = groq`
  *[_type == "article" && featured == true] | order(_createdAt desc) {
    _id,
    company,
    title,
    link,
    date,
    image,
    excerpt,
    description,
    publication
  }
`;
