export type PagePayload = {
  _id: string;
  _type: string;
  pathname: string;
  title?: string;
  sectionsBody?: Section[];
};

export type EpisodePayload = {
  _id: string;
  _type: string;
  pathname: string;
  title?: string;
  sectionsBody?: Section[];
  youtube?: any;
  guests?: PersonPayload[];
  sponsors?: any[];
  transcript?: any;
};

export type PersonPayload = {
  _id: string;
  _type: string;
  pathname: string;
  name: string;
  slug: string;
  role: "host-consultant" | "guest" | "team";
  isMainHost?: boolean;
  sectionsBody?: Section[];
  consultingProfile?: {
    bio?: string;
    expertise?: string[];
    profileImage?: any;
    calendarLink?: string;
  };
  guestProfile?: {
    bio?: string;
    company?: string;
    title?: string;
    website?: string;
    socialLinks?: any;
    profileImage?: any;
  };
};

export type SponsorPayload = {
  _id: string;
  _type: string;
  pathname: string;
  name: string;
  sectionsBody?: Section[];
};

// Section type definitions
export interface BaseSection {
  _type: string;
  _key: string;
}

export interface HomeHeroSection extends BaseSection {
  _type: "homeHero";
  title: string;
  subtitle?: string;
  description?: string;

  // Top badge
  badgeText?: string;

  // Primary CTA button
  primaryButton?: {
    text: string;
    link: string;
  };

  // Secondary CTA button
  secondaryButton?: {
    text: string;
    link: string;
  };

  // Podcast platforms section
  platformsHeading?: string;
  platforms?: Array<{
    name: string;
    url: string;
    logoImage?: any;
  }> | null;

  // Host badge information
  hostBadge?: {
    label?: string;
    name?: string;
    title?: string;
  } | null;

  // Visual elements
  backgroundImage?: any;
  showLatestEpisode?: boolean;
}

export interface PersonHeroSection extends BaseSection {
  _type: "personHero";
  person: PersonPayload;
  showContactButton?: boolean;
  contactButtonText?: string;
  backgroundImage?: any;
}

export interface LatestEpisodeSection extends BaseSection {
  _type: "latestEpisode";
  title?: string;
  subtitle?: string;
  showTranscript?: boolean;
  showGuests?: boolean;
}

export interface BrowseEpisodesSection extends BaseSection {
  _type: "browseEpisodes";
  title?: string;
  subtitle?: string;
  showFeatured?: boolean;
  episodesPerPage?: number;
  showFilters?: boolean;
}

export interface PersonProfileSection extends BaseSection {
  _type: "personProfile";
  person: PersonPayload;
  showBio?: boolean;
  showSocialLinks?: boolean;
  showEpisodes?: boolean;
  maxEpisodes?: number;
}

export interface ConsultingServicesSection extends BaseSection {
  _type: "consultingServices";
  title?: string;
  subtitle?: string;
  services?: Array<{
    title: string;
    description: string;
    icon?: string;
    features?: string[];
  }>;
}

export interface ConsultingCTASection extends BaseSection {
  _type: "consultingCTA";
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: any;
  showContactForm?: boolean;
}

export interface NewsletterSection extends BaseSection {
  _type: "newsletter";
  title?: string;
  subtitle?: string;
  buttonText?: string;
  placeholderText?: string;
  successMessage?: string;
  backgroundColor?: "default" | "gray" | "dark" | "primary";
}

export interface FeaturedNewsSection extends BaseSection {
  _type: "featuredNews";
  title?: string;
  subtitle?: string;
  maxItems?: number;
  showReadMore?: boolean;
  readMoreText?: string;
  readMoreLink?: string;
}

export interface AboutHeroSection extends BaseSection {
  _type: "aboutHero";
  badgeText?: string;
  title?: string;
  subtitle?: string;
  platforms?: Array<{
    name: string;
    url: string;
    icon?: string;
  }>;
}

export interface AboutMissionSection extends BaseSection {
  _type: "aboutMission";
  heading?: string;
  text?: string;
  bullets?: string[];
  image?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
}

export interface AboutHostSection extends BaseSection {
  _type: "aboutHost";
  host?: string;
  hostImage?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
  hostBio?: string;
  heading?: string;
  subtext?: string;
  hostJourney?: string;
  socialLinks?: Array<{
    label: string;
    href: string;
    icon?: string;
  }>;
}

export interface AboutTestimonialsSection extends BaseSection {
  _type: "aboutTestimonials";
  heading?: string;
  testimonials?: Array<{
    name: string;
    text: string;
  }>;
}

export interface AboutListenConnectSection extends BaseSection {
  _type: "aboutListenConnect";
  heading?: string;
  text?: string;
  platforms?: Array<{
    name: string;
    url: string;
    icon?: string;
  }>;
}

export interface EpisodesPageBuilderSection extends BaseSection {
  _type: "episodesPageBuilder";
  heroSection?: {
    _type: "episodesHero";
    _key?: string;
    sectionId?: string;
    badgeText?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    showStats?: boolean;
    totalEpisodes?: number;
    totalSeasons?: number;
  };
  directorySection?: {
    _type: "episodesDirectory";
    _key?: string;
    sectionId?: string;
    enableSearch?: boolean;
    enableFilters?: boolean;
    enableViewModes?: boolean;
    defaultSort?: "newest" | "oldest" | "episode";
    itemsPerPageGrid?: number;
    itemsPerPageList?: number;
    showSeasonFilter?: boolean;
  };
}

export interface EpisodesHeroSection extends BaseSection {
  _type: "episodesHero";
  badgeText?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  showStats?: boolean;
  totalEpisodes?: number;
  totalSeasons?: number;
}

export interface EpisodesDirectorySection extends BaseSection {
  _type: "episodesDirectory";
  enableSearch?: boolean;
  enableFilters?: boolean;
  enableViewModes?: boolean;
  defaultSort?: "newest" | "oldest" | "episode";
  itemsPerPageGrid?: number;
  itemsPerPageList?: number;
  showSeasonFilter?: boolean;
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
  | AboutHeroSection
  | AboutMissionSection
  | AboutHostSection
  | AboutTestimonialsSection
  | AboutListenConnectSection
  | EpisodesPageBuilderSection
  | EpisodesHeroSection
  | EpisodesDirectorySection;

export interface SeasonType {
  _id: string;
  title: string;
  shortCode: string;
  sponsors?: any[];
}

export interface EpisodeType {
  _id: string;
  youtube?: { id: string };
  title: string;
  number: number;
  date: string;
  duration: string;
  description: string;
  uuid: string;
  audioUrl?: string;
  image?: string;
}
