import page from './documents/page'
import person from './documents/person'
import episode from './documents/episode'
import sponsor from './documents/sponsor'
import { sections } from './sections'

const schemas = [
  // New page builder documents
  page,
  person,
  episode,
  sponsor,
  
  // Section schemas
  ...sections,
  
  // Note: Existing field types (episodeTranscriptField, transcriptSegment) 
  // will be included when they're converted to proper TypeScript exports
]

export default schemas
