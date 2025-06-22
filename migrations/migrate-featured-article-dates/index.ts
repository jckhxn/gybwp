// @ts-nocheck
import { defineMigration, at, setIfMissing, set } from "sanity/migrate";

// Function to convert string date to ISO date format
function parseDate(dateString) {
  // Handle common date formats
  const date = new Date(dateString);

  // Check if the date is valid
  if (!isNaN(date.getTime())) {
    return date.toISOString().split("T")[0]; // Return YYYY-MM-DD
  }

  // If can't parse, return today's date
  return new Date().toISOString().split("T")[0];
}

export default defineMigration({
  title: "Convert string dates to date type in featuredArticle documents",
  documentTypes: ["featuredArticle"],

  migrate: {
    document(doc, context) {
      const updates = [];

      // Check if the document has a date field that's a string
      if (doc.date && typeof doc.date === "string") {
        const isoDate = parseDate(doc.date);
        console.log(
          `Converting date for "${doc.title}": ${doc.date} -> ${isoDate}`
        );

        // Add the update operation
        updates.push(at("date", set(isoDate)));
      }

      // Return the updates if there are any, otherwise null
      return updates.length ? updates : null;
    },
  },
});
