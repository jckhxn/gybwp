# Fixes

- Episodes out of order : (401-2,3 come after 402,403 because of \_createdAt)
- UUIDs -> Clean Slugs -> Redirect from old UUIDs
  Episode Page Style

  Why embed transcript no work on sanity dashboard

  ✅ Figure out Resend (New email?) Formspre or Cal.com - COMPLETED (Added Cal.com booking)
  ✅ Handle if data isnt provided to episode page with ? chaining - COMPLETED
  ✅ Season dropdown in sponsors detail should only show sponsored seasons - COMPLETED
  ✅ Browse Episodes Button links to /episodes it should link to episode - COMPLETED
  ✅ Browse all episodes button scrolls to Browse Episodes section - COMPLETED
  ✅ Explore all episodes button links to /episode - COMPLETED

# Improvements

Don't rely on UUIDs or episodeNumber field as it can be incorrectly applied from the title of the youtube video (two videos with the same episode number caused BIG bug lol)
Redirect existing UUIDS to slug based on title, use title as pathname slug

Move to site builder
Move to Vercel (Don't mess up the MX server stuff by changing the nameserver lol)
