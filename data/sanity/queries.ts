import { groq } from 'next-sanity'

// Base page query for any page type
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
`

// Query for all pages (for sitemap generation)
export const ALL_PAGES_QUERY = groq`
  *[_type in ["page", "episode", "person", "sponsor"] && defined(pathname.current)] {
    _id,
    _type,
    "pathname": pathname.current,
    _updatedAt
  }
`

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
`

// Query for all people
export const ALL_PEOPLE_QUERY = groq`
  *[_type == "person"] {
    _id,
    name,
    "slug": slug.current,
    role,
    isMainHost
  }
`

// Page by path query - specific for the new page builder
export const pageByPathQuery = groq`
  *[_type == "page" && pathname.current == $pathname][0] {
    _id,
    _type,
    "pathname": pathname.current,
    title,
    sectionsBody[] {
      _key,
      _type,
      ...,
      // Expand person references in sections
      person-> {
        _id,
        name,
        "slug": slug.current,
        role,
        isMainHost,
        consultingProfile,
        guestProfile
      }
    }
  }
`
