/**
 * Person Migration Validation Script
 *
 * This script validates the current state of guest/host to person migration
 * and provides a comprehensive report of what needs to be done.
 */

import { config } from "dotenv";
import { createClient } from "@sanity/client";

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

interface ValidationResult {
  guests: {
    total: number;
    migrated: number;
    remaining: number;
    sampleNames: string[];
  };
  hosts: {
    total: number;
    migrated: number;
    remaining: number;
    sampleNames: string[];
  };
  persons: {
    total: number;
    guests: number;
    hosts: number;
    mainHosts: number;
  };
  episodes: {
    total: number;
    withGuestRefs: number;
    withHostRefs: number;
    withTranscriptRefs: number;
  };
  readyToMigrate: boolean;
  recommendations: string[];
}

async function validatePersonMigration(): Promise<ValidationResult> {
  try {
    console.log("🔍 Analyzing current migration state...\n");

    // 1. Check guests
    const guests = await client.fetch(`
      *[_type == "guest"] {
        _id,
        name
      }
    `);

    const guestPersons = await client.fetch(`
      *[_type == "person" && role == "guest"] {
        _id,
        name
      }
    `);

    // 2. Check hosts
    const hosts = await client.fetch(`
      *[_type == "host"] {
        _id,
        name
      }
    `);

    const hostPersons = await client.fetch(`
      *[_type == "person" && role == "host-consultant"] {
        _id,
        name,
        isMainHost
      }
    `);

    // 3. Check total persons
    const allPersons = await client.fetch(`
      *[_type == "person"] {
        _id,
        name,
        role,
        isMainHost
      }
    `);

    // 4. Check episodes with references
    const episodesWithGuestRefs = await client.fetch(`
      count(*[_type == "episode" && count(guests) > 0])
    `);

    const episodesWithHostTranscriptRefs = await client.fetch(`
      count(*[_type == "episode" && count(transcript.enhancedTranscript[defined(hostRef)]) > 0])
    `);

    const episodesWithGuestTranscriptRefs = await client.fetch(`
      count(*[_type == "episode" && count(transcript.enhancedTranscript[defined(guestRef)]) > 0])
    `);

    const totalEpisodes = await client.fetch(`count(*[_type == "episode"])`);

    // 5. Analyze results
    const result: ValidationResult = {
      guests: {
        total: guests.length,
        migrated: guestPersons.length,
        remaining: guests.length - guestPersons.length,
        sampleNames: guests.slice(0, 5).map((g: any) => g.name || "Unnamed"),
      },
      hosts: {
        total: hosts.length,
        migrated: hostPersons.length,
        remaining: hosts.length - hostPersons.length,
        sampleNames: hosts.slice(0, 5).map((h: any) => h.name || "Unnamed"),
      },
      persons: {
        total: allPersons.length,
        guests: guestPersons.length,
        hosts: hostPersons.length,
        mainHosts: hostPersons.filter((p: any) => p.isMainHost).length,
      },
      episodes: {
        total: totalEpisodes,
        withGuestRefs: episodesWithGuestRefs,
        withHostRefs: episodesWithHostTranscriptRefs,
        withTranscriptRefs:
          episodesWithGuestTranscriptRefs + episodesWithHostTranscriptRefs,
      },
      readyToMigrate: true,
      recommendations: [],
    };

    // 6. Generate recommendations
    if (result.guests.remaining > 0) {
      result.recommendations.push(
        `Migrate ${result.guests.remaining} guest documents to person documents`
      );
    }

    if (result.hosts.remaining > 0) {
      result.recommendations.push(
        `Migrate ${result.hosts.remaining} host documents to person documents`
      );
    }

    if (result.episodes.withGuestRefs > 0 || result.episodes.withHostRefs > 0) {
      result.recommendations.push(
        `Update episode references in ${Math.max(result.episodes.withGuestRefs, result.episodes.withHostRefs)} episodes`
      );
    }

    if (result.persons.mainHosts === 0 && result.hosts.total > 0) {
      result.recommendations.push("Designate a main host after migration");
    }

    if (result.persons.mainHosts > 1) {
      result.recommendations.push(
        `Review ${result.persons.mainHosts} main hosts - should typically be only one`
      );
    }

    // 7. Check if ready to migrate
    result.readyToMigrate = result.guests.total > 0 || result.hosts.total > 0;

    return result;
  } catch (error) {
    console.error("❌ Validation failed:", error);
    throw error;
  }
}

function printValidationReport(result: ValidationResult) {
  console.log("📊 PERSON MIGRATION VALIDATION REPORT");
  console.log("=====================================\n");

  // Current State
  console.log("📋 CURRENT STATE:");
  console.log(`  👥 Guests: ${result.guests.total} documents`);
  if (result.guests.total > 0) {
    console.log(`      Sample: ${result.guests.sampleNames.join(", ")}`);
  }

  console.log(`  🎤 Hosts: ${result.hosts.total} documents`);
  if (result.hosts.total > 0) {
    console.log(`      Sample: ${result.hosts.sampleNames.join(", ")}`);
  }

  console.log(`  👤 Persons: ${result.persons.total} documents`);
  console.log(`      - Guests: ${result.persons.guests}`);
  console.log(`      - Host-Consultants: ${result.persons.hosts}`);
  console.log(`      - Main Hosts: ${result.persons.mainHosts}`);

  console.log(`  🎬 Episodes: ${result.episodes.total} documents`);
  console.log(
    `      - With guest references: ${result.episodes.withGuestRefs}`
  );
  console.log(
    `      - With host transcript references: ${result.episodes.withHostRefs}`
  );
  console.log(
    `      - With transcript references: ${result.episodes.withTranscriptRefs}`
  );

  // Migration Status
  console.log("\n🔄 MIGRATION STATUS:");

  if (result.guests.remaining === 0 && result.hosts.remaining === 0) {
    console.log(
      "  ✅ All guests and hosts have been migrated to person documents"
    );
  } else {
    console.log(`  🔄 Migration needed:`);
    if (result.guests.remaining > 0) {
      console.log(`      - ${result.guests.remaining} guests remaining`);
    }
    if (result.hosts.remaining > 0) {
      console.log(`      - ${result.hosts.remaining} hosts remaining`);
    }
  }

  // Recommendations
  console.log("\n💡 RECOMMENDATIONS:");
  if (result.recommendations.length === 0) {
    console.log("  ✅ No actions needed - migration appears complete!");
  } else {
    result.recommendations.forEach((rec, i) => {
      console.log(`  ${i + 1}. ${rec}`);
    });
  }

  // Migration Readiness
  console.log("\n🚀 MIGRATION READINESS:");
  if (result.readyToMigrate) {
    console.log("  ✅ Ready to run migration scripts");
    console.log("\n📋 MIGRATION COMMANDS:");
    console.log("  # Run full migration:");
    console.log("  npx tsx migrations/run-full-migration.ts migrate");
    console.log("\n  # Or run individual steps:");
    console.log("  npx tsx migrations/migrate-guests-to-persons.ts migrate");
    console.log("  npx tsx migrations/migrate-host-to-person.ts migrate");
    console.log("  npx tsx migrations/update-episode-references.ts update");
  } else {
    console.log(
      "  ⚠️  No guest or host documents found - migration may not be needed"
    );
  }

  console.log("\n=====================================");
}

async function checkMigrationProgress() {
  try {
    const result = await validatePersonMigration();
    printValidationReport(result);

    // Return exit code based on migration status
    if (result.recommendations.length === 0) {
      console.log("\n🎉 Migration validation completed - no issues found!");
      return 0;
    } else {
      console.log("\n⚠️  Migration validation completed - actions recommended");
      return 1;
    }
  } catch (error) {
    console.error("\n❌ Migration validation failed:", error);
    return 2;
  }
}

// Export for use in other scripts
export {
  validatePersonMigration,
  printValidationReport,
  checkMigrationProgress,
};

// Run if executed directly
if (require.main === module) {
  checkMigrationProgress().then((exitCode) => {
    process.exit(exitCode);
  });
}
