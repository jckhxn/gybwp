// @ts-nocheck
import { defineMigration, at, setIfMissing } from "sanity/migrate";

// Run this for adding fields & values
export default defineMigration({
  title: "Set pathname.current to episode/doc.uuid",
  documentTypes: ["episode"],
  migrate: {
    document(doc, context) {
      const fieldsToAdd = [
        { add: "pathname.current", value: `/episode/${doc?.uuid}` }, // Use template literal with backticks
        { add: "pathname._type", value: "slug" },
      ];

      const updates = fieldsToAdd.map(({ add, value }) => {
        return at(add, setIfMissing(value));
      });

      return updates; // Return the accumulated updates array
    },
  },
});
