const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "n2fqhpbi",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-01-01",
});

const EPISODE_BY_IDENTIFIER_QUERY = `*[_type == "episode" && (
  coalesce(uuid,youtube.uuid) == $identifier || 
  pathname.current == $identifier ||
  pathname.current == "/episode/" + $slug ||
  pathname.current == "/episodes/" + $slug ||
  slug.current == $slug
)][0] {
    ...,
    guests[]-> {
      _id,
      name,
      slug,
      role,
      "title": guestProfile.title,
      "about": guestProfile.bio,
      "bio": guestProfile.bio,
      "image": guestProfile.profileImage,
      "company": guestProfile.company,
      "website": guestProfile.website,
      guestProfile
    }
}`;

async function testGuestData() {
  try {
    // Test with a known episode identifier
    const result = await client.fetch(EPISODE_BY_IDENTIFIER_QUERY, {
      identifier: "405", // You can replace this with a known episode ID
    });

    console.log("Episode found:", !!result);
    if (result) {
      console.log("Episode title:", result.youtube?.title || result.title);
      console.log("Number of guests:", result.guests?.length || 0);

      if (result.guests && result.guests.length > 0) {
        console.log("\nGuest details:");
        result.guests.forEach((guest, index) => {
          console.log(`Guest ${index + 1}:`);
          console.log("  Name:", guest.name);
          console.log("  Title:", guest.title);
          console.log(
            "  About:",
            guest.about ? guest.about.substring(0, 100) + "..." : "No bio"
          );
          console.log("  Image:", !!guest.image);
          console.log("  Company:", guest.company);
          console.log("  Slug:", guest.slug?.current);
          console.log("");
        });
      } else {
        console.log("No guests found for this episode");
      }
    } else {
      console.log("Episode not found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

testGuestData();
