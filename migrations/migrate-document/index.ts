import { defineMigration, createIfNotExists, create } from "sanity/migrate";
import slugify from "slugify";

export default defineMigration({
  title: "migrate-guests",
  documentTypes: ["episode"],

  async *migrate(documents, context) {
    const existingGuestNames = [];

    for await (const episode of documents()) {
      if (episode.details && episode.details.featuredGuests) {
        for (const guest of episode.details.featuredGuests) {
          const newGuestDoc = {
            _type: "guest",
            image: guest.image,
            name: guest.name,
            title: guest.title,
            links: {
              website: guest.url,
            },
            about: guest.about,
            slug: {
              _type: "slug",
              current: slugify(guest.name, {
                lower: true,
                strict: true,
                remove: /[$*_+~.()'"!\-:@]/g,
              }),
            },
          };

          // Check if the guest name is already in the array
          if (!existingGuestNames.includes(newGuestDoc.name)) {
            existingGuestNames.push(newGuestDoc.name);
            yield create(newGuestDoc);
          }
        }
      }
    }
  },
});
