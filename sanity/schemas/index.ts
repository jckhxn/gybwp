// Import schemas from local documents folder
import article from "./documents/article";
import episode from "./documents/episode";
import episodeTemplate from "./documents/episodeTemplate";
import sponsor from "./documents/sponsor";
import guest from "./documents/guest";
import season from "./documents/season";
import host from "./documents/host";

// Import new page builder schemas
import page from "./documents/page";
import { sections } from "./sections";
import person from "./documents/person";

// Import field types
import episodeTranscriptField from "./episodeTranscriptField";
import transcriptSegment from "./transcriptSegment";

const schemas = [
  // Core document types (migrated from legacy)
  season,
  episode,
  episodeTemplate,
  guest,
  person,
  host,
  sponsor,
  article,

  // New page builder documents
  page,

  // Section schemas for page builder
  ...sections,

  // Field types
  episodeTranscriptField,
  transcriptSegment,
];

export default schemas;
