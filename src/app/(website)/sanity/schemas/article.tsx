const article = {
  name: "article",
  title: "Articles",
  type: "document",
  fields: [
    {
      // Name of the Article
      name: "company",
      title: "Company",
      type: "string",
    },
    {
      // Title of the Article
      name: "title",
      title: "Title from Article ",
      type: "string",
    },

    {
      // Link to the Article
      name: "link",
      title: "Link to Article ",
      type: "string",
    },
    {
      // Date of the Article
      name: "date",
      title: "Date of Article ",
      type: "string",
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description:
        "Mark this article as featured to include it in the Featured Articles section.",
      initialValue: false,
    },
  ],
};
export default article;
