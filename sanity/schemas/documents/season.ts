import { defineField, defineType } from "sanity";

// Helper function to convert season title to shortCode
function generateShortCode(title: string): string {
  if (!title) return "";
  
  const wordToNumber: { [key: string]: number } = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
    "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
    "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14, "fifteen": 15,
    "sixteen": 16, "seventeen": 17, "eighteen": 18, "nineteen": 19, "twenty": 20
  };
  
  // Extract season number from title (e.g., "Season One" -> "one")
  const match = title.toLowerCase().match(/season\s+(\w+)/);
  if (match) {
    const word = match[1];
    const number = wordToNumber[word];
    if (number) {
      return `s${number}`;
    }
  }
  
  // Fallback: extract any number from title
  const numberMatch = title.match(/(\d+)/);
  if (numberMatch) {
    return `s${numberMatch[1]}`;
  }
  
  return "";
}

export default defineType({
  name: "season",
  title: "Seasons",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Season Title",
      type: "string",
      description: "The title of the season e.g Season One",
    }),
    defineField({
      name: "shortCode",
      title: "URL Short Code",
      type: "string",
      description: "Short code for URLs (e.g., s1, s2, s8) - auto-generated from title",
      initialValue: (doc, context) => {
        const title = (doc as any)?.title || context.parent?.title;
        return title ? generateShortCode(title) : "";
      },
      readOnly: false,
      validation: (Rule) => Rule.required().regex(/^s\d+$/, {
        name: "shortCode",
        invert: false,
      }).error("Short code must be in format 's1', 's2', etc."),
    }),
    {
      name: "sponsors",
      title: "List of Sponsors for the Season",
      type: "array",
      of: [{ type: "reference", to: [{ type: "sponsor" }] }],
    },
  ],
});
