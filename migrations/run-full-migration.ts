/**
 * Full Migration Runner
 *
 * This script runs all necessary migrations in the correct order.
 * It includes comprehensive validation and rollback capabilities.
 */

import { config } from "dotenv";
import {
  migrateGuestsToPersons,
  validateGuestMigration,
  rollbackGuestMigration,
} from "./migrate-guests-to-persons";
import {
  migrateHostsToPersons,
  validateHostMigration,
  rollbackHostMigration,
} from "./migrate-host-to-person";
import {
  updateEpisodeReferences,
  validateEpisodeUpdates,
  rollbackEpisodeUpdates,
} from "./update-episode-references";

// Load environment variables
config();

interface MigrationStep {
  name: string;
  description: string;
  migrate: () => Promise<any>;
  validate: () => Promise<void>;
  rollback: () => Promise<void>;
}

const migrationSteps: MigrationStep[] = [
  {
    name: "guests-to-persons",
    description:
      'Migrate guest documents to person documents with role="guest"',
    migrate: migrateGuestsToPersons,
    validate: validateGuestMigration,
    rollback: rollbackGuestMigration,
  },
  {
    name: "hosts-to-persons",
    description:
      'Migrate host documents to person documents with role="host-consultant"',
    migrate: migrateHostsToPersons,
    validate: validateHostMigration,
    rollback: rollbackHostMigration,
  },
  {
    name: "update-episode-references",
    description:
      "Update episode references from guest/host to person documents",
    migrate: updateEpisodeReferences,
    validate: validateEpisodeUpdates,
    rollback: rollbackEpisodeUpdates,
  },
];

async function runFullMigration() {
  console.log("🚀 Starting full guest/host to person migration...");
  console.log(`📋 Will run ${migrationSteps.length} migration steps\n`);

  const completedSteps: string[] = [];

  try {
    for (const step of migrationSteps) {
      console.log(`\n🔄 Step: ${step.name}`);
      console.log(`📝 ${step.description}`);

      // Run the migration
      await step.migrate();
      completedSteps.push(step.name);

      // Validate the migration
      console.log(`🔍 Validating ${step.name}...`);
      await step.validate();

      console.log(`✅ Step ${step.name} completed successfully`);
    }

    console.log("\n🎉 Full migration completed successfully!");
    console.log("\n📋 Summary:");
    completedSteps.forEach((step) => console.log(`  ✅ ${step}`));

    console.log("\n🔍 Running final validation...");
    await validateFullMigration();
  } catch (error) {
    console.error(
      `\n❌ Migration failed at step: ${completedSteps[completedSteps.length] || "unknown"}`
    );
    console.error("Error:", error);

    console.log("\n🔄 Rolling back completed steps...");
    await rollbackMigration(completedSteps);

    throw error;
  }
}

async function validateFullMigration() {
  console.log("🔍 Running comprehensive validation...");

  try {
    // Run all individual validations
    console.log("📊 Validating guest migration...");
    await validateGuestMigration();

    console.log("📊 Validating host migration...");
    await validateHostMigration();

    console.log("📊 Validating episode updates...");
    await validateEpisodeUpdates();

    console.log("✅ All validations passed!");
  } catch (error) {
    console.error("❌ Validation failed:", error);
    throw error;
  }
}

async function rollbackMigration(completedSteps?: string[]) {
  console.log("🔄 Starting migration rollback...");

  const stepsToRollback = completedSteps || migrationSteps.map((s) => s.name);

  // Rollback in reverse order
  for (let i = stepsToRollback.length - 1; i >= 0; i--) {
    const stepName = stepsToRollback[i];
    const step = migrationSteps.find((s) => s.name === stepName);

    if (step) {
      console.log(`🔄 Rolling back ${step.name}...`);
      try {
        await step.rollback();
        console.log(`✅ Rolled back ${step.name}`);
      } catch (error) {
        console.error(`❌ Failed to rollback ${step.name}:`, error);
      }
    }
  }

  console.log("🔄 Rollback completed");
}

async function runValidationOnly() {
  console.log("🔍 Running validation only...");

  try {
    await validateFullMigration();
    console.log("✅ All validations passed!");
  } catch (error) {
    console.error("❌ Validation failed:", error);
    process.exit(1);
  }
}

// Export functions for use in other scripts
export { runFullMigration, validateFullMigration, rollbackMigration };

// Run script if executed directly
if (require.main === module) {
  const action = process.argv[2];

  switch (action) {
    case "migrate":
      runFullMigration()
        .then(() => {
          console.log("\n🎊 Migration completed successfully!");
          console.log("\n📋 Next steps:");
          console.log(
            "  1. Update schema exports (remove guest/host, keep person)"
          );
          console.log(
            "  2. Update GROQ queries to use person instead of guest/host"
          );
          console.log("  3. Update components to use person data structure");
          console.log("  4. Update TypeScript types");
          console.log("  5. Test all functionality");
          console.log("  6. Remove old schema files after testing");
          process.exit(0);
        })
        .catch(() => {
          console.log("\n💥 Migration failed!");
          process.exit(1);
        });
      break;

    case "validate":
      runValidationOnly();
      break;

    case "rollback":
      rollbackMigration()
        .then(() => {
          console.log("\n✅ Rollback completed!");
          process.exit(0);
        })
        .catch(() => {
          console.log("\n❌ Rollback failed!");
          process.exit(1);
        });
      break;

    default:
      console.log(`
Usage: npx tsx migrations/run-full-migration.ts [action]

Actions:
  migrate   - Run the full guest/host to person migration
  validate  - Validate all migration results without running migrations
  rollback  - Rollback all migrations

Examples:
  npx tsx migrations/run-full-migration.ts migrate
  npx tsx migrations/run-full-migration.ts validate
  npx tsx migrations/run-full-migration.ts rollback

Individual step commands:
  npx tsx migrations/migrate-guests-to-persons.ts migrate
  npx tsx migrations/migrate-host-to-person.ts migrate
  npx tsx migrations/update-episode-references.ts update
      `);
  }
}
