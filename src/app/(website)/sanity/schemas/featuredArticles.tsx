import { deprecate } from "util";

const featuredArticle = {
  name: "featuredArticle",
  title: "Featured Articles",
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
      // Short Description of the Article
      name: "description",
      title: "Short Description from Article ",
      type: "text",
    },
    {
      // Link to the Article
      name: "link",
      title: "Link to Article ",
      type: "string",
    },
    {
      name: "image",
      title: "Article Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    // {
    //   // Image of the Article
    //   name: "image",
    //   title: "Image of Article ",
    //   type: "string",
    //   deprecated: true,
    //   description: "This field is deprecated. Use 'image' instead.",
    // },
    {
      // Date of the Article
      name: "date",
      title: "Date of Article ",
      type: "string",
    },
  ],
};
export default featuredArticle;
