#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const sectionsDir = path.join(__dirname, "..", "sanity", "schemas", "sections");

// Schemas that already have sectionId field
const updatedSchemas = [
  "homeHero.ts",
  "episodePlayer.ts",
  "consultingServices.ts",
  "episodeTranscript.ts",
  "episodeOverview.ts",
];

const sectionIdField = `    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),`;

function addSectionIdToSchema(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // Skip if already has sectionId
  if (content.includes('name: "sectionId"')) {
    console.log(`Skipping ${path.basename(filePath)} - already has sectionId`);
    return;
  }

  // Skip if it's the index file
  if (path.basename(filePath) === "index.ts") {
    return;
  }

  // Find the first defineField after the opening fields array
  const fieldsMatch = content.match(/fields:\s*\[([^]*)defineField\(/);
  if (!fieldsMatch) {
    console.log(
      `Skipping ${path.basename(filePath)} - couldn't find fields pattern`
    );
    return;
  }

  // Insert sectionId field as the first field
  const updatedContent = content.replace(
    /fields:\s*\[/,
    `fields: [
${sectionIdField}`
  );

  fs.writeFileSync(filePath, updatedContent);
  console.log(`Updated ${path.basename(filePath)} with sectionId field`);
}

// Read all files in sections directory
fs.readdirSync(sectionsDir).forEach((file) => {
  if (file.endsWith(".ts") && !updatedSchemas.includes(file)) {
    const filePath = path.join(sectionsDir, file);
    addSectionIdToSchema(filePath);
  }
});

console.log("Finished updating section schemas with sectionId fields");
