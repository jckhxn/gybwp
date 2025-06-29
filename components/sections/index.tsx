import { Section } from '@/types'

// Import all section components
import { HomeHero } from './hero/HomeHero'
import { AboutHero } from './hero/AboutHero'
import { EpisodeHero } from './hero/EpisodeHero'
import { PersonHero } from './hero/PersonHero'
import { ConsultingHero } from './hero/ConsultingHero'

import { LatestEpisode } from './episodes/LatestEpisode'
import { BrowseEpisodes } from './episodes/BrowseEpisodes'
import { EpisodeGrid } from './episodes/EpisodeGrid'
import { EpisodePlayer } from './episodes/EpisodePlayer'

import { PersonProfile } from './person/PersonProfile'
import { PersonBio } from './person/PersonBio'
import { PersonEpisodes } from './person/PersonEpisodes'

import { ConsultingServices } from './consulting/ConsultingServices'
import { ConsultingCTA } from './consulting/ConsultingCTA'

import { Newsletter } from './shared/Newsletter'
import { FeaturedNews } from './shared/FeaturedNews'

// Section registry - maps Sanity section types to React components
export const sections = {
  // Hero sections
  homeHero: HomeHero,
  aboutHero: AboutHero,
  episodeHero: EpisodeHero,
  personHero: PersonHero,
  consultingHero: ConsultingHero,
  
  // Episode sections
  latestEpisode: LatestEpisode,
  browseEpisodes: BrowseEpisodes,
  episodeGrid: EpisodeGrid,
  episodePlayer: EpisodePlayer,
  
  // Person sections
  personProfile: PersonProfile,
  personBio: PersonBio,
  personEpisodes: PersonEpisodes,
  
  // Consulting sections
  consultingServices: ConsultingServices,
  consultingCTA: ConsultingCTA,
  
  // Shared sections
  newsletter: Newsletter,
  featuredNews: FeaturedNews,
}

export function SectionRenderer(props: { section: Section }) {
  const Section = sections[props.section._type as keyof typeof sections]

  if (!Section) {
    console.warn(`Section type "${props.section._type}" not found in registry`)
    return null
  }

  return <Section {...props.section} />
}
