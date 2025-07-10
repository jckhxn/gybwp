import { loadQuery } from "./data/sanity/loadQuery.js";

async function testGuestQuery() {
  console.log("Testing guest queries...");

  try {
    // First, check if any person documents exist
    const allPersons = await loadQuery({
      query: `*[_type == "person"] { _id, name, role, slug }`,
      params: {},
    });
    console.log("All person documents:", allPersons);

    // Check specifically for guests
    const allGuests = await loadQuery({
      query: `*[_type == "person" && role == "guest"] { _id, name, slug }`,
      params: {},
    });
    console.log("All guest documents:", allGuests);

    // Check the old guest type
    const oldGuests = await loadQuery({
      query: `*[_type == "guest"] { _id, name, slug }`,
      params: {},
    });
    console.log("Old guest documents:", oldGuests);

    // If we have guests, test a specific slug
    if (allGuests.length > 0) {
      const testSlug = allGuests[0].slug?.current;
      console.log(`Testing with slug: ${testSlug}`);

      const guestDetail = await loadQuery({
        query: `*[_type == "person" && role == "guest" && slug.current == $slug][0] {
          _id,
          name,
          slug,
          guestProfile
        }`,
        params: { slug: testSlug },
      });
      console.log("Guest detail result:", guestDetail);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

testGuestQuery();
