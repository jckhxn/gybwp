// Quick test to verify episode guest data structure
const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "hxymd1na",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-05-03",
});

async function testEpisodeGuestData() {
  try {
    console.log("Testing episode guest data structure...");

    // Use the same query structure as EPISODE_BY_IDENTIFIER_QUERY for David Thomas episode
    const query = `*[_type == "episode" && defined(guests) && count(guests[_ref == "LvY07ZzR7V2JDFPiSqkJTn"]) > 0][0] {
      _id,
      "episodeName": coalesce(youtube.title, episodeName),
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

    const result = await client.fetch(query);

    console.log("\n=== Episode Query Result ===");
    console.log("Episode:", result?.episodeName);

    if (result?.guests?.length > 0) {
      result.guests.forEach((guest, index) => {
        console.log(`\nGuest ${index + 1}:`);
        console.log("  Name:", guest.name);
        console.log("  Mapped title:", guest.title);
        console.log(
          "  Mapped about:",
          guest.about ? guest.about.substring(0, 50) + "..." : "No bio"
        );
        console.log("  Mapped image:", guest.image ? "Has image" : "No image");
        console.log("  Has guestProfile:", !!guest.guestProfile);

        if (guest.guestProfile) {
          console.log("  guestProfile.title:", guest.guestProfile.title);
          console.log(
            "  guestProfile.bio:",
            guest.guestProfile.bio
              ? guest.guestProfile.bio.substring(0, 50) + "..."
              : "No bio"
          );
          console.log(
            "  guestProfile.profileImage:",
            guest.guestProfile.profileImage ? "Has image" : "No image"
          );
        }

        console.log("  Slug:", guest.slug?.current);
      });
    } else {
      console.log("No guests found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

testEpisodeGuestData();
