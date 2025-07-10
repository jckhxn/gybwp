// Debug script to test guest data in episode details
const { createClient } = require("@sanity/client");

// Test the actual image URL generation
const imageUrlBuilder = require("@sanity/image-url");

const client = createClient({
  projectId: "hxymd1na",
  dataset: "production", // try this first, then production-v1, development, etc.
  useCdn: false,
  apiVersion: "2023-05-03",
});

const builder = imageUrlBuilder({
  projectId: "hxymd1na",
  dataset: "production",
});

function urlFor(source) {
  return builder.image(source);
}

async function testGuestData() {
  try {
    console.log("Testing guest data fetch...");

    // Test query for episodes with David Thomas specifically
    const query = `*[_type == "episode" && defined(guests) && count(guests[_ref == "LvY07ZzR7V2JDFPiSqkJTn"]) > 0] {
      _id,
      title,
      "episodeName": coalesce(youtube.title, episodeName),
      pathname,
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
        "hasGuestProfile": defined(guestProfile),
        guestProfile
      }
    }[0..2]`; // Get first 2 episodes with David Thomas

    const result = await client.fetch(query);

    console.log("Episodes found:", result?.length || 0);

    if (result?.length > 0) {
      result.forEach((episode, epIndex) => {
        console.log(
          `\n=== Episode ${epIndex + 1}: ${episode?.episodeName || episode?.title} ===`
        );
        console.log("Number of guests:", episode?.guests?.length || 0);

        if (episode?.guests?.length > 0) {
          episode.guests.forEach((guest, index) => {
            console.log(`\nGuest ${index + 1}:`);
            console.log("  Name:", guest.name);
            console.log("  Title:", guest.title);
            console.log("  Has guestProfile:", guest.hasGuestProfile);
            console.log(
              "  About:",
              guest.about ? guest.about.substring(0, 100) + "..." : "No bio"
            );
            console.log("  Image:", guest.image ? "Has image" : "No image");
            if (guest.image) {
              console.log(
                "  Image object:",
                JSON.stringify(guest.image, null, 2)
              );
              try {
                const imageUrl = urlFor(guest.image)
                  .width(160)
                  .height(160)
                  .url();
                console.log("  Generated image URL:", imageUrl);
              } catch (error) {
                console.log("  Error generating image URL:", error.message);
              }
            }
            console.log("  Slug:", guest.slug?.current);
            if (guest.guestProfile) {
              console.log(
                "  Raw guestProfile:",
                JSON.stringify(guest.guestProfile, null, 2)
              );
            }
          });
        } else {
          console.log("No guests found in this episode");
        }
      });
    } else {
      console.log("No episodes with guests found");
    }

    // Also test the raw guest document structure
    console.log("\n--- Testing raw guest document structure ---");
    const guestQuery = `*[_type == "person" && role == "guest"][0] {
      _id,
      name,
      slug,
      role,
      guestProfile
    }`;

    const guestResult = await client.fetch(guestQuery);
    console.log("Raw guest document:");
    console.log(JSON.stringify(guestResult, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

testGuestData();
