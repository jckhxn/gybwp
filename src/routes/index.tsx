//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const routes = {
  internal: {
    home: "/",
    podcastDetails: (podcastId: string) => `/${podcastId}`,
    sponsors: "/sponsors",
    sponsorsDetails: (sponsorId: string) => `/sponsors/${sponsorId}`,
    consulting: "/consulting",
    news: "/news",
    tou: "/tou",
    privacy: "/privacy",
    error: "/error",
  },
  external: {
    jkl: "https://jkladvisors.ai/",
    listen: "https://www.buzzsprout.com/2057493/share",
    subscribe: "https://www.youtube.com/channel/UC-G0WIwjMApKoHVQ5QxsdZw",
    follow:
      "https://www.linkedin.com/company/growing-your-business-with-people ",
  },
};

export default routes;
