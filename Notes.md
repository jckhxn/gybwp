# Fixes

- Episodes out of order : (401-2,3 come after 402,403 because of \_createdAt)
  Episode SeekTo Broke
  Episode Page Style
  sponsors sanity img upload
  Fix JSON-LD
  Fix OpenGraph/Metadata for Episodes/homepage
 Figure out Resend (New email?)
# Improvements

TINY MINI YOUTUBE PLAYER YOU STARTED.

Don't rely on UUIDs or episodeNumber field as it can be incorrectly applied from the title of the youtube video (two videos with the same episode number caused BIG bug lol)
Redirect existing UUIDS to slug based on title, use title as pathname slug

Move to site builder
Move to Vercel (Don't mess up the MX server stuff by changing the nameserver lol)
