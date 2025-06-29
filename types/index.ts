export type PagePayload = {
  _id: string
  _type: string
  pathname: string
  title?: string
  sectionsBody?: Section[]
}

export type EpisodePayload = {
  _id: string
  _type: string
  pathname: string
  title?: string
  sectionsBody?: Section[]
  youtube?: any
  guests?: PersonPayload[]
  sponsors?: any[]
  transcript?: any
}

export type PersonPayload = {
  _id: string
  _type: string
  pathname: string
  name: string
  slug: string
  role: 'host-consultant' | 'guest' | 'team'
  isMainHost?: boolean
  sectionsBody?: Section[]
  consultingProfile?: {
    bio?: string
    expertise?: string[]
    profileImage?: any
    calendarLink?: string
  }
  guestProfile?: {
    bio?: string
    company?: string
    title?: string
    website?: string
    socialLinks?: any
    profileImage?: any
  }
}

export type SponsorPayload = {
  _id: string
  _type: string
  pathname: string
  name: string
  sectionsBody?: Section[]
}

// Section type definitions
export interface BaseSection {
  _type: string
  _key: string
}

export interface HomeHeroSection extends BaseSection {
  _type: 'homeHero'
  title: string
  subtitle?: string
  description?: string
  primaryButton?: {
    text: string
    link: string
  }
  secondaryButton?: {
    text: string
    link: string
  }
  backgroundImage?: any
  showLatestEpisode?: boolean
}

export interface PersonHeroSection extends BaseSection {
  _type: 'personHero'
  person: PersonPayload
  showContactButton?: boolean
  contactButtonText?: string
  backgroundImage?: any
}

export interface LatestEpisodeSection extends BaseSection {
  _type: 'latestEpisode'
  title?: string
  subtitle?: string
  showTranscript?: boolean
  showGuests?: boolean
}

export interface BrowseEpisodesSection extends BaseSection {
  _type: 'browseEpisodes'
  title?: string
  subtitle?: string
  showFeatured?: boolean
  episodesPerPage?: number
  showFilters?: boolean
}

export interface PersonProfileSection extends BaseSection {
  _type: 'personProfile'
  person: PersonPayload
  showBio?: boolean
  showSocialLinks?: boolean
  showEpisodes?: boolean
  maxEpisodes?: number
}

export interface ConsultingServicesSection extends BaseSection {
  _type: 'consultingServices'
  title?: string
  subtitle?: string
  services?: Array<{
    title: string
    description: string
    icon?: string
    features?: string[]
  }>
}

export interface ConsultingCTASection extends BaseSection {
  _type: 'consultingCTA'
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  backgroundImage?: any
  showContactForm?: boolean
}

export interface NewsletterSection extends BaseSection {
  _type: 'newsletter'
  title?: string
  subtitle?: string
  buttonText?: string
  placeholderText?: string
  successMessage?: string
  backgroundColor?: 'default' | 'gray' | 'dark' | 'primary'
}

export interface FeaturedNewsSection extends BaseSection {
  _type: 'featuredNews'
  title?: string
  subtitle?: string
  maxItems?: number
  showReadMore?: boolean
  readMoreText?: string
  readMoreLink?: string
}

export type Section = 
  | HomeHeroSection 
  | PersonHeroSection 
  | LatestEpisodeSection
  | BrowseEpisodesSection
  | PersonProfileSection
  | ConsultingServicesSection
  | ConsultingCTASection
  | NewsletterSection
  | FeaturedNewsSection
