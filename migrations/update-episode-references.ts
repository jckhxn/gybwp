/**
 * Migration Script: Update Episode References from Guest/Host to Person
 *
 * This script updates all episode documents to reference the new person documents
 * instead of the old guest and host documents.
 */

import { config } from "dotenv";
import { createClient } from "@sanity/client";
import { SanityDocument } from "@sanity/types";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

// Load environment variables
config();

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2023-01-01",
  useCdn: false,
});

interface EpisodeDocument extends SanityDocument {
  _type: "episode";
  guests?: Array<{
    _ref: string;
    _type: "reference";
  }>;
  transcript?: {
    enhancedTranscript?: Array<{
      _type: "transcriptSegment";
      type?: "host" | "guest" | "other";
      hostRef?: {
        _ref: string;
        _type: "reference";
      };
      guestRef?: {
        _ref: string;
        _type: "reference";
      };
    }>;
  };
}

// Load mapping files
function loadMappings() {
  const guestMappingPath = join(
    process.cwd(),
    "migrations",
    "guest-to-person-mapping.json"
  );
  const hostMappingPath = join(
    process.cwd(),
    "migrations",
    "host-to-person-mapping.json"
  );

  let guestMapping: Record<string, string> = {};
  let hostMapping: Record<string, string> = {};

  if (existsSync(guestMappingPath)) {
    guestMapping = JSON.parse(readFileSync(guestMappingPath, "utf8"));
    console.log(
      `📄 Loaded guest mapping: ${Object.keys(guestMapping).length} entries`
    );
  } else {
    console.log("⚠️  Guest mapping file not found");
  }

  if (existsSync(hostMappingPath)) {
    hostMapping = JSON.parse(readFileSync(hostMappingPath, "utf8"));
    console.log(
      `📄 Loaded host mapping: ${Object.keys(hostMapping).length} entries`
    );
  } else {
    console.log("⚠️  Host mapping file not found");
  }

  return { guestMapping, hostMapping };
}

async function updateEpisodeReferences() {
  try {
    console.log("🚀 Starting episode reference updates...");

    const { guestMapping, hostMapping } = loadMappings();

    if (
      Object.keys(guestMapping).length === 0 &&
      Object.keys(hostMapping).length === 0
    ) {
      console.log(
        "❌ No mapping files found. Please run guest and host migrations first."
      );
      return;
    }

    // 1. Fetch all episodes with guest/host references
    const episodes = await client.fetch<EpisodeDocument[]>(`
      *[_type == "episode"] {
        _id,
        _rev,
        guests[]-> {
          _id,
          _type
        },
        transcript {
          enhancedTranscript[] {
            _type,
            type,
            hostRef-> {
              _id,
              _type
            },
            guestRef-> {
              _id,
              _type
            }
          }
        }
      }
    `);

    console.log(`📋 Found ${episodes.length} episodes to check for updates`);

    let episodesUpdated = 0;
    const transaction = client.transaction();

    for (const episode of episodes) {
      let episodeNeedsUpdate = false;
      const updates: any = {};

      // 2. Update guest references
      if (episode.guests && episode.guests.length > 0) {
        const updatedGuests = episode.guests.map((guest) => {
          if (guest._ref && guestMapping[guest._ref]) {
            episodeNeedsUpdate = true;
            console.log(
              `🔄 Updating guest reference: ${guest._ref} -> ${guestMapping[guest._ref]}`
            );
            return {
              _ref: guestMapping[guest._ref],
              _type: "reference",
            };
          }
          return guest;
        });

        if (episodeNeedsUpdate) {
          updates.guests = updatedGuests;
        }
      }

      // 3. Update transcript references
      if (episode.transcript?.enhancedTranscript) {
        const updatedTranscript = episode.transcript.enhancedTranscript.map(
          (segment) => {
            let segmentUpdated = false;
            const updatedSegment = { ...segment };

            // Update host references
            if (segment.hostRef?._ref && hostMapping[segment.hostRef._ref]) {
              updatedSegment.hostRef = {
                _ref: hostMapping[segment.hostRef._ref],
                _type: "reference",
              };
              segmentUpdated = true;
              episodeNeedsUpdate = true;
              console.log(
                `🔄 Updating transcript host reference: ${segment.hostRef._ref} -> ${hostMapping[segment.hostRef._ref]}`
              );
            }

            // Update guest references
            if (segment.guestRef?._ref && guestMapping[segment.guestRef._ref]) {
              updatedSegment.guestRef = {
                _ref: guestMapping[segment.guestRef._ref],
                _type: "reference",
              };
              segmentUpdated = true;
              episodeNeedsUpdate = true;
              console.log(
                `🔄 Updating transcript guest reference: ${segment.guestRef._ref} -> ${guestMapping[segment.guestRef._ref]}`
              );
            }

            return updatedSegment;
          }
        );

        if (episodeNeedsUpdate) {
          updates["transcript.enhancedTranscript"] = updatedTranscript;
        }
      }

      // 4. Add episode to transaction if it needs updates
      if (episodeNeedsUpdate) {
        transaction.patch(episode._id, { set: updates });
        episodesUpdated++;
        console.log(`📝 Queued episode "${episode._id}" for update`);
      }
    }

    // 5. Execute the transaction
    if (episodesUpdated > 0) {
      console.log(`💾 Updating ${episodesUpdated} episodes...`);
      await transaction.commit();
      console.log(`✅ Successfully updated ${episodesUpdated} episodes`);
    } else {
      console.log("✅ No episodes needed updates");
    }

    console.log("🎉 Episode reference update completed successfully!");
  } catch (error) {
    console.error("❌ Episode reference update failed:", error);
    throw error;
  }
}

// Validation function to check update results
async function validateEpisodeUpdates() {
  try {
    console.log("🔍 Validating episode updates...");

    const { guestMapping, hostMapping } = loadMappings();

    // Check for any remaining old references
    const episodesWithOldGuestRefs = await client.fetch(
      `
      *[_type == "episode" && count(guests[_ref in $oldGuestIds]) > 0] {
        _id,
        "oldGuestRefs": guests[_ref in $oldGuestIds]._ref
      }
    `,
      { oldGuestIds: Object.keys(guestMapping) }
    );

    const episodesWithOldHostRefs = await client.fetch(
      `
      *[_type == "episode" && count(transcript.enhancedTranscript[hostRef._ref in $oldHostIds]) > 0] {
        _id,
        "oldHostRefs": transcript.enhancedTranscript[hostRef._ref in $oldHostIds].hostRef._ref
      }
    `,
      { oldHostIds: Object.keys(hostMapping) }
    );

    const episodesWithOldTranscriptGuestRefs = await client.fetch(
      `
      *[_type == "episode" && count(transcript.enhancedTranscript[guestRef._ref in $oldGuestIds]) > 0] {
        _id,
        "oldGuestRefs": transcript.enhancedTranscript[guestRef._ref in $oldGuestIds].guestRef._ref
      }
    `,
      { oldGuestIds: Object.keys(guestMapping) }
    );

    console.log(
      `📊 Episodes with old guest references: ${episodesWithOldGuestRefs.length}`
    );
    console.log(
      `📊 Episodes with old host references: ${episodesWithOldHostRefs.length}`
    );
    console.log(
      `📊 Episodes with old transcript guest references: ${episodesWithOldTranscriptGuestRefs.length}`
    );

    if (
      episodesWithOldGuestRefs.length === 0 &&
      episodesWithOldHostRefs.length === 0 &&
      episodesWithOldTranscriptGuestRefs.length === 0
    ) {
      console.log("✅ All episode references successfully updated");
    } else {
      console.log("⚠️  Some old references still remain:");
      episodesWithOldGuestRefs.forEach((ep: any) =>
        console.log(
          `  - Episode ${ep._id}: old guest refs ${ep.oldGuestRefs.join(", ")}`
        )
      );
      episodesWithOldHostRefs.forEach((ep: any) =>
        console.log(
          `  - Episode ${ep._id}: old host refs ${ep.oldHostRefs.join(", ")}`
        )
      );
      episodesWithOldTranscriptGuestRefs.forEach((ep: any) =>
        console.log(
          `  - Episode ${ep._id}: old transcript guest refs ${ep.oldGuestRefs.join(", ")}`
        )
      );
    }
  } catch (error) {
    console.error("❌ Validation failed:", error);
  }
}

// Function to rollback episode updates (restore old references)
async function rollbackEpisodeUpdates() {
  try {
    console.log("🔄 Rolling back episode updates...");

    const { guestMapping, hostMapping } = loadMappings();

    // Create reverse mappings
    const reverseGuestMapping: Record<string, string> = {};
    const reverseHostMapping: Record<string, string> = {};

    Object.entries(guestMapping).forEach(([oldId, newId]) => {
      reverseGuestMapping[newId] = oldId;
    });

    Object.entries(hostMapping).forEach(([oldId, newId]) => {
      reverseHostMapping[newId] = oldId;
    });

    // Fetch episodes with new references
    const episodes = await client.fetch<EpisodeDocument[]>(`
      *[_type == "episode"] {
        _id,
        guests[]-> {
          _id,
          _type
        },
        transcript {
          enhancedTranscript[] {
            _type,
            type,
            hostRef-> {
              _id,
              _type
            },
            guestRef-> {
              _id,
              _type
            }
          }
        }
      }
    `);

    let episodesUpdated = 0;
    const transaction = client.transaction();

    for (const episode of episodes) {
      let episodeNeedsUpdate = false;
      const updates: any = {};

      // Rollback guest references
      if (episode.guests && episode.guests.length > 0) {
        const rolledBackGuests = episode.guests.map((guest) => {
          if (guest._ref && reverseGuestMapping[guest._ref]) {
            episodeNeedsUpdate = true;
            return {
              _ref: reverseGuestMapping[guest._ref],
              _type: "reference",
            };
          }
          return guest;
        });

        if (episodeNeedsUpdate) {
          updates.guests = rolledBackGuests;
        }
      }

      // Rollback transcript references
      if (episode.transcript?.enhancedTranscript) {
        const rolledBackTranscript = episode.transcript.enhancedTranscript.map(
          (segment) => {
            const updatedSegment = { ...segment };

            if (
              segment.hostRef?._ref &&
              reverseHostMapping[segment.hostRef._ref]
            ) {
              updatedSegment.hostRef = {
                _ref: reverseHostMapping[segment.hostRef._ref],
                _type: "reference",
              };
              episodeNeedsUpdate = true;
            }

            if (
              segment.guestRef?._ref &&
              reverseGuestMapping[segment.guestRef._ref]
            ) {
              updatedSegment.guestRef = {
                _ref: reverseGuestMapping[segment.guestRef._ref],
                _type: "reference",
              };
              episodeNeedsUpdate = true;
            }

            return updatedSegment;
          }
        );

        if (episodeNeedsUpdate) {
          updates["transcript.enhancedTranscript"] = rolledBackTranscript;
        }
      }

      if (episodeNeedsUpdate) {
        transaction.patch(episode._id, { set: updates });
        episodesUpdated++;
      }
    }

    if (episodesUpdated > 0) {
      await transaction.commit();
      console.log(`✅ Rolled back ${episodesUpdated} episodes`);
    } else {
      console.log("✅ No episodes needed rollback");
    }
  } catch (error) {
    console.error("❌ Rollback failed:", error);
  }
}

// Export functions for use in other scripts
export {
  updateEpisodeReferences,
  validateEpisodeUpdates,
  rollbackEpisodeUpdates,
};

// Run script if executed directly
if (require.main === module) {
  const action = process.argv[2];

  switch (action) {
    case "update":
      updateEpisodeReferences();
      break;
    case "validate":
      validateEpisodeUpdates();
      break;
    case "rollback":
      rollbackEpisodeUpdates();
      break;
    default:
      console.log(`
Usage: npx tsx migrations/update-episode-references.ts [action]

Actions:
  update    - Update all episode references from guest/host to person
  validate  - Validate the reference updates
  rollback  - Rollback the reference updates

Example:
  npx tsx migrations/update-episode-references.ts update
      `);
  }
}
