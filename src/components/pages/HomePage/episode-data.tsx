// types
import {
  socialsType,
  sponsorUUIDs,
} from "@/src/components/pages/SponsorsPage/static-data";
import * as icons from "@/src/components/Socials/logos";

type guestsType = {
  name: string;
  about: string;
  title: string;
  url: string;
  imageUrl: string;
};

type linksType = {
  text: string;
  secondaryText?: string;
  linkText?: string;
  linkUrl: string;
};

export type episodeType = {
  seasonNumber?: number;
  episodeNumber: number;
  episodeName: string;
  episodeLinks?: socialsType[];
  sponsors: sponsorUUIDs[];
  uuid: string;
  pathname?: { current?: string };
  url: string;
  image: string;
  blurb: string;
  season?: string | number;
  _updatedAt?: string;
  _createdAt?: string;
  details?: {
    featuredGuests: guestsType[];
    description: string[];
    links?: linksType[];
    hashtags?: string[];
    highlights?: { title?: string; timestamp?: string }[];
    keyTakeaways?: string[];
    discussionTopics?: { title?: string; description?: string }[];
    transcript?: any;
  };
};

export type seasonType = {
  seasonNumber?: number;
  seasonName?: string;
  episodes?: episodeType[];
};

//
//
//
//
//
// ONLY TOUCH THINGS BELOW THIS LINE

export const SEASON_ONE: seasonType = {
  seasonNumber: 1,
  seasonName: "Season One",
  episodes: [
    // TRAILER
    {
      uuid: "100",
      episodeNumber: 0,
      episodeName: "Trailer",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/trailer-season-1/id1659743511?i=1000590093654",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/5iSxAboZCCRmCe8j7ZJPdA?si=9em9MLp8QKuA1mZu6DdHrg",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMTgwMjMzOQ?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/9f781ee3-317e-4b6e-af00-e521adacc7c7/growing-your-business-with-people-trailer-season-1",
          icon: icons.amazon.src,
        },
      ],
      sponsors: [],
      image: "https://img.youtube.com/vi/6yGhUsHHh2Y/sddefault.jpg",
      url: "https://youtu.be/6yGhUsHHh2Y",
      blurb:
        "Season 1 of the Growing Your Business with People podcast is coming soon!",
    },

    // EPISODE ONE
    {
      uuid: "101",
      season: 1,
      episodeNumber: 1,
      episodeName:
        "Mastering DE&I: Foster Inclusivity At Work With David Casey",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ep-1-better-de-i-practices-with-david-casey/id1659743511?i=1000590093229",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/4f1J7hxbQIjYNnCtk08rcz?si=LUJwOy9uTiyiCdsxpbSBHQ",
          icon: icons.spotify.src,
        },
        {
          name: "google",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMTg2MjEwNQ?sa=X&ved=0CAUQkfYCahcKEwjQoM7anoeAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/0a8290f5-d773-416f-8045-6aab8eae3cc0/growing-your-business-with-people-ep-1-better-de-i-practices-with-david-casey",
          icon: icons.amazon.src,
        },
        {
          name: "more",
          link: "https://www.buzzsprout.com/2057493/share",
          icon: icons.more.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/a9PbdlshJdc/sddefault.jpg",
      url: "https://youtu.be/a9PbdlshJdc",
      blurb:
        "In this episode, the host and CEO of JKL Advisors, Jeff Lackey, sits down with David Casey. David is a Chief Inclusion and Social Impact Officer with a career that spans over three decades, along with being invited to the White House on more than one occasion.",
      details: {
        featuredGuests: [
          {
            name: "David Casey",
            about:
              "David is a Chief Inclusion and Social Impact Officer with a career that spans over three decades, along with being invited to the White House on more than one occasion.",
            title: "Chief Inclusion and Social Impact Officer at Tapestry",
            url: "https://www.linkedin.com/in/caseydavid/",
            imageUrl:
              "https://media.licdn.com/dms/image/D4E03AQHhl85_HQk4TA/profile-displayphoto-shrink_400_400/0/1683470693299?e=1694649600&v=beta&t=oYA-tLTfc8lXGdpPW40KymTJKspOWtI-3XdZzsSOaCE",
          },
        ],
        description: [
          "Welcome to the first episode of Growing Your Business with People, a podcast dedicated to CEOs and other business leaders looking to win the war for talent. In this episode, the host and CEO of JKL Advisors, Jeff Lackey, sits down with David Casey.",
          "David is a Chief Inclusion and Social Impact Officer with a career that spans over three decades, along with being invited to the White House on more than one occasion. Tune in for David's tangible tactics to help you grow your business with people.",
          "This video is about Mastering DE&I, but it also covers Foster Inclusivity At Work, Diversity And Inclusion In The Workplace, and How To Create Inclusive Work Environments.",
        ],
        links: [],
      },
    },

    // EPISODE TWO
    {
      uuid: "102",
      episodeNumber: 2,
      season: 1,
      episodeName:
        "Revolutionise Recruitment: The Power Of Tech-Enabled Hiring Ft. Joshua Secrest",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ep-2-leveraging-technology-to-drive-hiring-volumes/id1659743511?i=1000590726350",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/1R0pJBkM3g6wbMT4V5eoks?si=p725NOWHTEGLu-6N31zgig",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMTkwMjQ1OQ?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/aec41d3e-12d0-4ade-a071-f86c950062f5/growing-your-business-with-people-ep-2-leveraging-technology-to-drive-hiring-volumes-with-joshua-secrest",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/vFFSYSGQh-0/sddefault.jpg",
      url: "https://youtu.be/vFFSYSGQh-0",
      blurb: "",
      details: {
        featuredGuests: [
          {
            name: "Joshua Secrest",
            about:
              "Joshua is the former Head of Global Talent Acquisition at McDonald's. Joshua, now at Paradox, describes how to leverage technology to drive hiring volumes while enhancing the candidate experience.",
            title: "Vice President at Paradox",
            url: "https://www.linkedin.com/in/joshua-secrest-44b0042/",
            imageUrl:
              "https://media.licdn.com/dms/image/D5603AQHFkuHvp3TcFA/profile-displayphoto-shrink_400_400/0/1675019070527?e=1694649600&v=beta&t=jmTvCLVr7w2weI8ny5A0Vh6x5BYpBEzXWtx0giHlxvg",
          },
        ],
        description: [],
      },
    },

    // EPISODE THREE
    {
      uuid: "103",
      episodeNumber: 3,
      episodeName: "CEO of ATI Physical Therapy: Sharon Vitti's Success Story",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ep-3-ceo-of-ati-physical-therapy-sharon-vitti/id1659743511?i=1000591376373",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/0V4Gvx6l8TurKpXeq5l3se?si=tVzhyCqeTc6fSd3msAJabA",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMTkzNTY5Mg?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/4108cb8d-299c-420c-97b2-bc0823b4b905/growing-your-business-with-people-ep-3-ceo-of-ati-physical-therapy-sharon-vitti",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/6eiLXbAaxrI/sddefault.jpg",
      url: "https://youtu.be/6eiLXbAaxrI",
      blurb: "",
    },

    // EPISODE FOUR
    {
      uuid: "104",
      episodeNumber: 4,
      season: 1,
      episodeName:
        "Leveraging Recruitment To Grow Business Ft. Dan Valavanis & Oliver Comstock",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ep-4-elevating-the-high-volume-hiring-experience-feat/id1659743511?i=1000592095878",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/6YWqsn7wMy43zn0Dku64x1?si=_GsAgiOWSmqeo2Ru2uiQCA",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMTk3MDA3Ng?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/17c998a1-66d4-4c2f-ac78-4c5741fae9f4/growing-your-business-with-people-ep-4-elevating-the-high-volume-hiring-experience-feat-dan-valavanis-oliver-comstock-of-bayard",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/h34hsQfmzYg/sddefault.jpg",
      url: "https://youtu.be/h34hsQfmzYg",
      blurb: "",
    },

    // EPISODE FIVE
    {
      uuid: "105",
      episodeNumber: 5,
      season: 1,
      episodeName:
        "Preventing Employee Burnout: Expert Tips From Dr. Michael Halasy",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ep-5-burnout-how-to-recognize-and-avoid-it-with-dr/id1659743511?i=1000593417417",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/1TaQkwCAuK06WurOjUHQ6I?si=noZ-IFLhTRWUgcarmJJbhQ",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjAxMzYyOQ?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/ebb1f18f-cba4-4725-8b40-3446f0b520ef/growing-your-business-with-people-ep-5-burnout---how-to-recognize-and-avoid-it-with-dr-mike-halasy-of-the-mayo-clinic",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/062Asb9Rsrc/sddefault.jpg",
      url: "https://youtu.be/062Asb9Rsrc",
      blurb: "",
    },

    // EPISODE SIX
    {
      uuid: "106",
      episodeNumber: 6,
      season: 1,
      episodeName:
        "Successful Talent Attraction: Recruitment Secrets Revealed Ft. Craig Fisher",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ep-6-attract-retain-talent-with-unmatched-recruitment/id1659743511?i=1000594868752",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/0daDM2QP7su9fExhyGEBiH?si=5hTK_0h2RBGNvFQawoJJJA",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjA1ODgwNQ?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/a1f58532-3518-4688-bfb6-1b92c20245d7/growing-your-business-with-people-ep-6-attract-retain-talent-with-unmatched-recruitment-strategies-with-craig-fisher",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/QKd9_UY80CE/sddefault.jpg",
      url: "https://youtu.be/QKd9_UY80CE",
      blurb: "",
    },

    // EPISODE SEVEN
    {
      uuid: "107",
      episodeNumber: 7,
      season: 1,
      episodeName: "Revive Workplace Morale: Expert Tips By Paul Neveu",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ep-7-bringing-fun-back-into-your-company-with-paul-neveu/id1659743511?i=1000596320209",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/2V1ZW6waKgFM5ubvUmySPH?si=sAhg9pBNQQmGpziw9m9BzA",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjEwODI0MA?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/27b2bf94-7ad0-4b7f-bb71-aa3efba7d479/growing-your-business-with-people-ep-7-bringing-fun-back-into-your-company-with-paul-neveu",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/CseLZJoQzlQ/sddefault.jpg",
      url: "https://youtu.be/CseLZJoQzlQ",
      blurb: "",
    },

    // EPISODE EIGHT
    {
      uuid: "108",
      episodeNumber: 8,
      season: 1,
      episodeName:
        "How Social Media Can Transform Your Recruiting Strategies ft. CEO Amit Parmar",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ep-8-uncovering-the-benefits-of-social-media/id1659743511?i=1000597381970",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/03sl2bkw3sFn2IMefgt7TY?si=OxBZNZudQdev_14mgnIl0A",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjE1MjM0Mw?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/e17e8ad2-4cbc-4e7a-b365-d30921494441/growing-your-business-with-people-ep-8-uncovering-the-benefits-of-social-media-in-recruiting-strategies-with-ceo-amit-parmar",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/3Uf6IgdFnOk/sddefault.jpg",
      url: "https://youtu.be/3Uf6IgdFnOk",
      blurb: "",
    },

    // EPISODE NINE
    {
      uuid: "109",
      episodeNumber: 9,
      season: 1,
      episodeName:
        "The Importance Of Balancing People And Profit In Business Ft. Susan LaMotte",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ep-9-intersection-of-people-and-profit-they-must/id1659743511?i=1000598431322",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/4eM6xYLa7W0bdNt0oCqQjY?si=Nk6WKQNbQEmtyV8Bs9kBEA",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjE5OTUyNw?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/4d250983-4913-4af3-a005-99e202fd1dac/growing-your-business-with-people-ep-9-intersection-of-people-and-profit-they-must-coexist-with-ceo-susan-lamotte",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/ZYgaUJ00q6Y/sddefault.jpg",
      url: "https://youtu.be/ZYgaUJ00q6Y",
      blurb: "",
    },

    // EPISODE TEN
    {
      uuid: "110",
      episodeNumber: 10,
      season: 1,
      episodeName:
        "Maximizing Your Hiring Success: Power Of Performance Metrics Ft. Jason Moreau",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ep-10-ceo-jason-moreau-on-measuring-performance-to/id1659743511?i=1000599494239",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/6aKmJxEM9Xrm4QihKFEJ7G?si=wtgexzZ5SUWYrVNcrWARfg",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjI0Nzk0Mw?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/e6c1ba64-57bb-4651-91df-ad71fd66cbf1/growing-your-business-with-people-ep-10-ceo-jason-moreau-on-measuring-performance-to-improve-recruitment-and-brand",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/CWcEm-23rtg/sddefault.jpg",
      url: "https://youtu.be/CWcEm-23rtg",
      blurb: "",
    },

    // EPISODE ELEVEN part 1
    {
      uuid: "111-1",
      episodeNumber: 11,
      season: 1,
      episodeName:
        "Art of Listening: Hairdresser in the Boardroom: Insights from Kim-Adele Randall | Part 1",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ep-11-part-1-kim-adele-randall-tedx-speaker-and-author/id1659743511?i=1000602181940",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/5ZfSgVVg9kUHpcuGAfpP0B?si=Hb0kZeVORWKw8djFedSsyQ",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjM0MzE3Mw?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/0cda0dbe-ffb9-4905-8c6c-050d71cdbbcc/growing-your-business-with-people-ep-11-part-1-kim-adele-randall-tedx-speaker-and-author",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/IEXa_qTyugo/sddefault.jpg",
      url: "https://youtu.be/IEXa_qTyugo",
      blurb: "",
    },

    // EPISODE ELEVEN part 2
    {
      uuid: "111-2",
      episodeNumber: 11,
      season: 1,
      episodeName:
        "Positive Self-Talk: Kim-Adele Randall Shares Her Story | Part 2",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ep-11-part-2-kim-adeles-story-about-improving-productivity/id1659743511?i=1000602017698",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/6DaCgoHgduOk7X4lR0WBKi?si=MA4BRNUsRiWZJ5IqqgwJQQ",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjM0MzE4OA?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/309d19bd-0ed9-4ef4-ba9e-76959451a9aa/growing-your-business-with-people-ep-11-part-2-kim-adele's-story-about-improving-productivity-with-tea",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/OPSBEPqhNow/sddefault.jpg",
      url: "https://youtu.be/OPSBEPqhNow",
      blurb: "",
    },

    // EPISODE ELEVEN part 3
    {
      uuid: "111-3",
      episodeNumber: 11,
      season: 1,
      episodeName:
        "Empowering Your Team's Strengths: Hairdresser in the Boardroom | Part 3",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ep-11-part-3-kim-adele-randalls-advice-for-leaders/id1659743511?i=1000602017728",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/0TypGO7SuZPqimvMDgx2uW?si=XSdiiSPmTEWRCfULymZhLw",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjM0MzIyMg?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/38ca0e0b-cf6f-4ee1-84cb-9f037f3594f2/growing-your-business-with-people-ep-11-part-3-kim-adele-randall's-advice-for-leaders-looking-to-build-successful-teams",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/l0mvpA062hY/sddefault.jpg",
      url: "https://youtu.be/l0mvpA062hY",
      blurb: "",
    },

    // EPISODE TWELVE
    {
      uuid: "112",
      episodeNumber: 12,
      season: 1,
      episodeName:
        "Transform Your Customer Service: Expert Leadership Training with Harry Travis",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/leadership-expert-harry-travis-delivering-better-customer/id1659743511?i=1000603446339",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/5M4R3ZViJNeqPoT2muDufe?si=CPsUJae3QHyjslkKpxx0MA",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjQwNjc3Mw?sa=X&ved=0CAUQkfYCahcKEwjIsoG_wZOAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/477a0611-a8dd-4981-bb05-8fefd74c151e/growing-your-business-with-people-leadership-expert-harry-travis-delivering-better-customer-service-through-supervisor-training-e-12",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/JpnRadfibWQ/sddefault.jpg",
      url: "https://youtu.be/JpnRadfibWQ",
      blurb: "",
    },

    // EPISODE TWELVE | Short
    {
      uuid: "112_1",
      episodeNumber: 12,
      episodeName: "Harry Travis on the Cost of Layoffs",
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/HJNCjktSgsc/sddefault.jpg",
      url: "https://youtu.be/HJNCjktSgsc",
      blurb: "",
    },
  ],
};

export const SEASON_TWO: seasonType = {
  seasonNumber: 2,
  seasonName: "Season Two",
  episodes: [
    // EPISODE ONE
    {
      uuid: "201",
      episodeNumber: 1,
      season: 2,
      episodeName:
        "Investing in Chicago's Future: Connecting Talent from Underserved Communities",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/s2-e1-connecting-talent-from-underserved-communities/id1659743511?i=1000605127805",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/5kJO26XygLf8AhX3EYam0c?si=Pmn5qqZhR8-rRUCp50pH-A",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjQ4MjM2OQ?sa=X&ved=0CAUQkfYCahcKEwjgq6HRpo6AAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/05c94e2b-fdc4-40d0-b8c6-d0a94394cc6c/growing-your-business-with-people-s2-e1-connecting-talent-from-underserved-communities-through-skills-for-chicagoland's-future",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/ogLHwOJ2D3A/sddefault.jpg",
      url: "https://youtu.be/ogLHwOJ2D3A",
      blurb:
        "Jeff Lackey welcomes; Mark Hoplamazian, CEO of Hyatt and chair of Skills for Chicagoland's Future, Pam Tully, the chief program officer for Skills for Chicagoland's Future, and Daniel Cervantes, Senior Vice President, National Expansion and strategic Initiatives for Skills for Chicagoland's Future and the National Expansion Committee.",
      details: {
        featuredGuests: [
          {
            name: "Mark Hoplamazian",
            about:
              "Hyatt President & CEO since 2006, with a daily focus on realizing Hyatt's purpose – to care for people so they can be their best. Steadfast champion of diversity, equity and inclusion, and passionate about connecting unemployed youth with careers in hospitality. Wellbeing advocate and keen believer in the power of mindfulness and empathy. Current board chair of the American Hotel & Lodging Association and Skills for Chicagoland's Future.",
            title: "CEO of Hyatt and chair of Skills for Chicagoland's Future",
            url: "https://www.linkedin.com/in/mark-hoplamazian-96446b43/",
            imageUrl:
              "https://media.licdn.com/dms/image/C4D03AQFVu9gZ4Kn_Qg/profile-displayphoto-shrink_400_400/0/1617899868864?e=1694649600&v=beta&t=WkauhnXOmZZ1yAzQNaDiPBKExHMdMLa6vrIPboclyfo",
          },
          {
            name: "Pam Tully",
            about:
              "Experienced Chief Operating Officer with a demonstrated history of working in the civic & social organization industry. Strong operations professional skilled in Budgeting, Operations Management, Team Building, Six Sigma, and Manufacturing.",
            title: "Cheif Program Officer of Skills for Chicagoland's Future",
            url: "https://www.linkedin.com/in/pam-tully-5765b49/",
            imageUrl:
              "https://www.skillsforchicagolandsfuture.com/hs-fs/hubfs/SFC%20MJTW%20Assets/images/board-of-directors/pamela-tully-headshot.jpg?width=624&height=800&name=pamela-tully-headshot.jpg",
          },
          {
            name: "Daniel Cervantes",
            about:
              "Ron has had an unconventional career path, starting off as a Catholic priest before transitioning to a drug abuse counselor and eventually an intelligence officer for the government. He also served as the former CHRO of Tendergrass, a small successful company where he was able to recruit and grow his own team.",
            title:
              "Senior Vice President, National Expansion and Strategic Initiatives of Skills for Chicagoland's Future",
            url: "https://www.linkedin.com/in/daniel-cervantes-766b057",
            imageUrl:
              "https://www.skillsforchicagolandsfuture.com/hs-fs/hubfs/SFC%20MJTW%20Assets/images/board-of-directors/daniel-cervantes-headshot.jpg?width=624&height=800&name=daniel-cervantes-headshot.jpg",
          },
        ],
        description: [
          "Jeff Lackey welcomes; Mark Hoplamazian, CEO of Hyatt and chair of Skills for Chicagoland's Future, Pam Tully, the chief program officer for Skills for Chicagoland's Future, and Daniel Cervantes, Senior Vice President, National Expansion and strategic Initiatives for Skills for Chicagoland's Future and the National Expansion Committee.",
          "The conversation focused on how CEOs and business leaders can access talent from low opportunity neighborhoods, how to access talent outside of the Chicago, Rhode Island and Phoenix markets, and how to get involved more broadly.",
          "Mark H., Pam T., and Daniel C. are all involved with Skills for Chicago Future, an organization dedicated to closing the opportunity gap and connecting those who are unemployed or underemployed to job opportunities. Through their efforts, they were able to impact over 20,000 people in 2021 and connect them to jobs. Their ultimate goal is to expand to 25 cities over the next 10 years and provide everyone with equitable access to a quality job. The podcast is a platform for them to share their mission and to spread awareness of their efforts.",
        ],
        links: [
          {
            text: "For more information, visit:",
            linkUrl: "https://www.skillsforchicagolandsfuture.com/",
          },
        ],
      },
    },

    // EPISODE ONE | SHORT 1
    {
      uuid: "201_1",
      episodeNumber: 1,
      season: 2,
      episodeName: "CEO of Hyatt, Powerful Community Impact of Skills",
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/6q9bBrkEHRc/sddefault.jpg",
      url: "https://youtu.be/6q9bBrkEHRc",
      blurb:
        "Jeff Lackey welcomes; Mark Hoplamazian, CEO of Hyatt and chair of Skills for Chicagoland's Future, Pam Tully, the chief program officer for Skills for Chicagoland's Future, and Daniel Cervantes, Senior Vice President, National Expansion and strategic Initiatives for Skills for Chicagoland's Future and the National Expansion Committee.",
    },

    // EPISODE ONE | SHORT 2
    {
      uuid: "201_2",
      episodeNumber: 1,
      season: 2,
      episodeName: "Skills for Chicagoland's Future Services Offerings",
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/b087_zHhyy4/sddefault.jpg",
      url: "https://youtu.be/b087_zHhyy4",
      blurb:
        "Jeff Lackey welcomes; Mark Hoplamazian, CEO of Hyatt and chair of Skills for Chicagoland's Future, Pam Tully, the chief program officer for Skills for Chicagoland's Future, and Daniel Cervantes, Senior Vice President, National Expansion and strategic Initiatives for Skills for Chicagoland's Future and the National Expansion Committee.",
    },

    // EPISODE ONE | SHORT 3
    {
      uuid: "201_3",
      episodeNumber: 1,
      season: 2,
      episodeName: "Impact of the Second Chance Program on Communities",
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/UdgceGWASOw/sddefault.jpg",
      url: "https://youtu.be/UdgceGWASOw",
      blurb:
        "Jeff Lackey welcomes; Mark Hoplamazian, CEO of Hyatt and chair of Skills for Chicagoland's Future, Pam Tully, the chief program officer for Skills for Chicagoland's Future, and Daniel Cervantes, Senior Vice President, National Expansion and strategic Initiatives for Skills for Chicagoland's Future and the National Expansion Committee.",
    },

    // EPISODE TWO
    {
      uuid: "202",
      episodeNumber: 2,
      season: 2,
      episodeName: "Former CIA Head of Recruiting Shares Leadership Insight",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ron-patrick-former-cia-head-of-recruiting-shares/id1659743511?i=1000606227620",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/6tNf7IhlCPrJ9MukrnmnJp?si=1D1irYgMQGiO1FddjfiN7A",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjUzMDkyMA?sa=X&ved=0CAUQkfYCahcKEwjgq6HRpo6AAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/b51b7c6a-16a7-45e3-8ec0-57b7a55eaa36/growing-your-business-with-people-ron-patrick-former-cia-head-of-recruiting-shares-leadership-insight",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/t6r9BweCLGs/sddefault.jpg",
      url: "https://youtu.be/t6r9BweCLGs",
      blurb:
        "In episode 2 of Season 2, host Jeff Lackey welcomes Ron Patrick, former head of recruitment for the CIA.",
      details: {
        featuredGuests: [
          {
            name: "Ronald Patrick",
            about:
              "Ron has had an unconventional career path, starting off as a Catholic priest before transitioning to a drug abuse counselor and eventually an intelligence officer for the government. He also served as the former CHRO of Tendergrass, a small successful company where he was able to recruit and grow his own team.",
            title: "Former CHRO at Tendergrass and Head of Recruiting at CIA",
            url: "https://www.linkedin.com/in/ronald-patrick-2020/",
            imageUrl:
              "https://media.licdn.com/dms/image/D4E03AQG6TqZnyLawaQ/profile-displayphoto-shrink_800_800/0/1680520296925?e=1694649600&v=beta&t=FqmVbvifD40zSSbN3ZKkodiV96oPRgHhpDiC5DR8KQQ",
          },
        ],
        description: [
          "Advice to CEOs: if you have a head of HR or TA who you do not see as a business partner, replace them with someone who you do trust as a business partner.",
          "In episode 2 of Season 2, host Jeff Lackey welcomes Ron Patrick, former head of recruitment for the CIA.",
          "Ron Patrick had an unconventional career path, starting off as a Catholic priest before transitioning to a drug abuse counselor and eventually an intelligence officer for the government. He got the job after getting the right answer to a Trivial Pursuit question at a picnic with government employees. After that, the head of HR asked him to join the team.",
          "Ron Patrick also served as the former CHRO of Tendergrass, a small successful company where he was able to recruit and grow his own team. Once he joined, he quickly realized the strain the current employees were under, working 16-18 hours a day. He began assessing the company, understanding the business, and determining what needed to be done to grow sustainably. In 8 months, he more than doubled the company from 8 employees to 20, creating a mix of skills that was critical for the company's growth.",
        ],
        links: [],
      },
    },

    // EPISODE TWO | SHORT 1
    {
      uuid: "202_1",
      episodeNumber: 2,
      season: 2,
      episodeName: "How Versatility Can Help or Hurt Your Leadership",
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/GGFUQVPn1d0/sddefault.jpg",
      url: "https://youtu.be/GGFUQVPn1d0",
      blurb:
        "In episode 2 of Season 2, host Jeff Lackey welcomes Ron Patrick, former head of recruitment for the CIA.",
    },

    // EPISODE THREE
    {
      uuid: "203",
      episodeNumber: 3,
      season: 2,
      episodeName:
        "Leadership Insights from 50 Four-Star Generals and Admirals",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/dr-tom-collins-insights-from-50-four-star-generals/id1659743511?i=1000606250522",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/0aQxa53oGAFvfICxUyJSFz?si=lt8OuKmNS7e14Yaw07PPlw",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjUzMDg4NQ?sa=X&ved=0CAUQkfYCahcKEwjgq6HRpo6AAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/ef7433d7-7e8a-457d-9f6a-b221e37b6a34/growing-your-business-with-people-dr-tom-collins-insights-from-50-four-star-generals-admirals-on-leadership-in-new-book",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/vcwAENvxgq8/sddefault.jpg",
      url: "https://youtu.be/vcwAENvxgq8",
      blurb:
        "In this podcast episode of Growing Your Business with People, Jeff Lackey interviews Dr. Tom Collins, a pediatric cardiologist, professor of pediatrics, and author of a book on leadership.",
      details: {
        featuredGuests: [
          {
            name: "Dr. Tom Collins",
            about:
              "Dr. Tom Collins is the Vice Chair of Faculty Affairs, Department of Pediatrics, at the University of Kentucky College of Medicine. He is an international expert on the cardiovascular manifestations of genetically mediated connective tissue disorders with additional expertise in leadership in medicine and physician career development.",
            title:
              "Vice Chair of Faculty Affairs, Department of Pediatrics, at the University of Kentucky College of Medicine",
            url: "https://www.linkedin.com/in/tom-collins-20137614/",
            imageUrl:
              "https://media.licdn.com/dms/image/D5603AQH1cOIUUuUbFA/profile-displayphoto-shrink_800_800/0/1687275919672?e=1694649600&v=beta&t=Ly4cQM0VFsahxaWef6Sz-x9V1zHHtxiM5kssRgm6cVs",
          },
        ],
        description: [
          "In this podcast episode of Growing Your Business with People, Jeff Lackey interviews Dr. Tom Collins, a pediatric cardiologist, professor of pediatrics, and author of a book on leadership.",
          "The book is based on insights from almost 50 Four-Star Admirals and generals who offer their perspectives on great leadership from a military perspective. Tom Collins is a voracious reader and has read over 130 books on leadership.",
          "In the conversation, Tom emphasizes the importance of knowing the mission and one's role in it for making effective decisions. The podcast is a must-listen for anyone who wants to grow their business with people.",
        ],
        links: [
          {
            text: "Connect with Tom on LinkedIn:",
            linkUrl: "https://www.linkedin.com/in/tom-collins-20137614/",
          },
          {
            text: "For more information, visit:",
            linkUrl: "https://www.skillsforchicagolandsfuture.com/",
          },
        ],
      },
    },

    // EPISODE FOUR
    {
      uuid: "204",
      episodeNumber: 4,
      season: 2,
      episodeName:
        "HR Innovation and Business Growth With FutureSolve's COO Andy Najja",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ai-in-recruiting-and-engagement-andy-najjar-coo/id1659743511?i=1000607268644",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/7eQvojHAjtQ4AFtruJV4TP?si=ggTCDfsPSiK98PLxoZRf9Q",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjU4MzI3NA?sa=X&ved=0CAUQkfYCahcKEwjgq6HRpo6AAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/6a2d7187-b1b3-40e9-bcbc-144126512396/growing-your-business-with-people-ai-in-recruiting-and-engagement---andy-najjar-coo-futuresolve",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/QPowbQ0l-OU/sddefault.jpg",
      url: "https://youtu.be/QPowbQ0l-OU",
      blurb:
        "Today on the podcast, Jeff welcomes Andy Najjar, COO of FutureSolve, an HR advisory organization with decades of experience leading innovative HR technology companies. In this episode, we explore HR innovation, business growth, and the challenges faced by organizations in managing people.",
      details: {
        featuredGuests: [
          {
            name: "Andy Najjar",
            about:
              "Andy Najjar is responsible for leading FutureSolve's global operations with more than 15 years' experience in the talent and Human Resources space. Prior to joining FutureSolve, Andy was instrumental in growing companies like HRsmart and TalentGuard from upstart talent management software companies to acquisitions by Deltek and Venture Capital funding.",
            title: "Chief Operating Officer at FutureSolve",
            url: "https://www.linkedin.com/in/andynajjar/",
            imageUrl:
              "https://media.licdn.com/dms/image/D5603AQHhXlMdZ2AWrg/profile-displayphoto-shrink_800_800/0/1675869531232?e=1694649600&v=beta&t=QKIaGCMAwOi2L6526h-mdqK8tPYrFhLTo1GiNKf3f0A",
          },
        ],
        description: [
          "Today on the podcast, Jeff welcomes Andy Najjar, COO of FutureSolve.",
          "Andy and Jeff dive into How FutureSolve Helps Solve HR Problems for Small and Medium-Sized Businesses Impact of AI on Recruiting and Employee Engagement Unlocking Innovation and Inspiring People in the Workplace.",
        ],
        links: [
          {
            text: "Connect with Andy on LinkedIn:",
            linkUrl: "https://www.linkedin.com/in/andynajjar/",
          },
          {
            text: "For more information, visit:",
            linkUrl: "https://www.futuresolve.com/",
          },
        ],
      },
    },

    // EPISODE FIVE
    {
      uuid: "205",
      episodeNumber: 5,
      season: 2,
      episodeName:
        "HR Expert Ken Carrig on Building a Strong Succession Plan for Business Leaders",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ken-carrig-on-executive-succession-planning-leadership/id1659743511?i=1000608334069",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/4FvnqfRokOY8DY86IzkTbq?si=U8vIZvsbQI-ctUiEt_vZhQ",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjYyNTgxOA?sa=X&ved=0CAUQkfYCahcKEwjgq6HRpo6AAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/5a02d76b-1d11-4c4b-8331-4ea0f31d2bb6/growing-your-business-with-people-ken-carrig-on-executive-succession-planning-leadership-alignment-s2-e5",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/u4Bx4vSj5QQ/sddefault.jpg",
      url: "https://youtu.be/u4Bx4vSj5QQ",
      blurb:
        "In this podcast episode of Growing Your Business with People, Ken Carrig, co-founder of FutureSolve, shares his expert advice on leadership alignment and executive succession planning.",
      details: {
        featuredGuests: [
          {
            name: "Ken Carrig",
            about:
              "Ken Carrig is the Co-Founder of FutureSolve. He advises CEOs and founders to look ahead and prepare people in their organization for what's to come. He also emphasizes the importance of letting go and growing the business with other leaders.",
            title: "Co-Founder of FutureSolve",
            url: "https://www.linkedin.com/in/ken-carrig-0bb4251a7",
            imageUrl:
              "https://media.licdn.com/dms/image/D5610AQFMifuqUMh9wQ/image-shrink_800/0/1687571217272?e=1689307200&v=beta&t=1jzyXmE6Vj8KjIVs7SOQMFYzO5x-QPKFY9Xvr0c-zBk",
          },
        ],
        description: [
          "In this podcast episode of Growing Your Business with People, Ken Carrig, co-founder of FutureSolve, shares his expert advice on leadership alignment and executive succession planning.",
          "The conversation starts with Ken Carrig discussing the importance of bringing clarity and purpose to work in an organization to ensure leadership alignment.",
          "Carrig advises CEOs and founders to look ahead and prepare people in their organization for what's to come. He also emphasizes the importance of letting go and growing the business with other leaders. Jeff Lackey then asks Ken about his proudest moment in his career, to which Ken responds by encouraging people to take risks and have the courage to do something different.",
        ],
        links: [
          {
            text: "Connect with Ken on LinkedIn:",
            linkUrl: "https://www.linkedin.com/in/ken-carrig-0bb4251a7",
          },
          {
            text: "For more information, visit:",
            linkUrl: "https://www.futuresolve.com/",
          },
        ],
      },
    },

    // EPISODE SIX
    {
      uuid: "206",
      episodeNumber: 6,
      season: 2,
      episodeName: "Using Data to Improve Health Outcomes with CEO Bob Darin",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/ceo-bob-darin-harnessing-the-power-of-data-to/id1659743511?i=1000609445684",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/2uUAyQ0QS9ZsbVv6n7O9Fo?si=E1bBm8lkRr62dLtl6o7oyg",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjY3MTk1Mw?sa=X&ved=0CAUQkfYCahcKEwjgq6HRpo6AAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/aeae1f69-561c-4ace-bcda-c3db3acf0d7f/growing-your-business-with-people-ceo-bob-darin-harnessing-the-power-of-data-to-drive-improved-health-care-outcomes-s2e6",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/MXQwlTf34CE/sddefault.jpg",
      url: "https://youtu.be/MXQwlTf34CE",
      blurb:
        "On this podcast episode, host Jeff Lackey welcomes guest Bob Darin.",
      details: {
        featuredGuests: [
          {
            name: "Bob Darin",
            about:
              "Bob Darin is the CEO of Blue Health Intelligence, and has a background in health care analytics. He has been in the field for close to three decades, working with large datasets and coding.",
            title: "CEO of Blue Health Intelligence",
            url: "https://www.linkedin.com/in/bob-darin-2a3ab96/",
            imageUrl:
              "https://media.licdn.com/dms/image/D5603AQED1H7EgBR1SQ/profile-displayphoto-shrink_800_800/0/1666652600932?e=1694649600&v=beta&t=ZHbbuMK9AR_5FzZkC5dzbLyiLt1CIZyEpajehYB1hwA",
          },
        ],
        description: [
          "On this podcast episode, host Jeff Lackey welcomes guest Bob Darin.",
          "They discussed how to start changing how people think and work together by understanding how people process information. Bob also shared his insights and examples of how he has grown his organization with people. He and Jeff worked together at CVS, solving complex challenges in the hyper-competitive space of data engineering, analytics and science.",
          "Bob Darin discussed how data and analytics are essential to improving health care outcomes. He believes that with the right expertise, data can help address the foundational challenges that exist in the health care system.",
        ],
        links: [
          {
            text: "Connect with Bob on LinkedIn:",
            linkUrl: "https://www.linkedin.com/in/bob-darin-2a3ab96/",
          },
          {
            text: "Company LinkedIn:",
            linkUrl:
              "https://www.linkedin.com/company/blue-health-intelligence/",
          },
          {
            text: "For more information, visit:",
            linkUrl: "https://bluehealthintelligence.com/",
          },
        ],
      },
    },

    // EPISODE SEVEN
    {
      uuid: "207",
      episodeNumber: 7,
      season: 2,
      episodeName:
        "Strategic Talent Consulting & HR Value Creation in Business with Tom Corbitt",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/strategic-talent-consulting-hr-value-creation-in-business/id1659743511?i=1000611446037",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/38U71bizSt5CKgj1evMPnt?si=HEM-7cjLTzu2yEiIiBCnZQ",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjc2NzI4Ng?sa=X&ved=0CAUQkfYCahcKEwjgq6HRpo6AAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/cdb2908c-5888-4305-bc1d-0e5685e559d4/growing-your-business-with-people-strategic-talent-consulting-hr-value-creation-in-business-with-tom-corbitt-s2e7",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/Yj2Aq53mhY0/sddefault.jpg",
      url: "https://youtu.be/Yj2Aq53mhY0",
      blurb:
        "In this podcast episode, host Jeff Lackey welcomes Tom Corbitt, the founder and managing partner of Top Line Growth Partners. The two discuss the importance of identifying discrete problems and understanding the timetable for affecting change in skill level, behavior, and time to fill vacant roles.",
      details: {
        featuredGuests: [
          {
            name: "Tom Corbitt",
            about:
              "Tom is a skilled facilitator, coach, and leader who acts as an extension of his client's senior staff. In this capacity, he provides the expertise and incremental bandwidth to help them lead their organizations through major transformation. He understands how to align strategy, process, technology, talent and culture to help his clients achieve a sustainable step function increase in organizational capability.",
            title: "Founder and Managing Partner of Top Line Growth Partners",
            url: "https://www.linkedin.com/in/tom-corbitt-0b4b546/",
            imageUrl:
              "https://media.licdn.com/dms/image/C4D03AQHC-hjLncwNLg/profile-displayphoto-shrink_400_400/0/1632176543961?e=1694649600&v=beta&t=5fXVyf-0K30FfjiNSrUK4i1VKweNp-qrTDBsSEiFoWI",
          },
        ],
        description: [
          "In this podcast episode, host Jeff Lackey welcomes Tom Corbitt, the founder and managing partner of Top Line Growth Partners. The two discuss the importance of identifying discrete problems and understanding the timetable for affecting change in skill level, behavior, and time to fill vacant roles.",
          "Tom manages the Sales Consulting Practice, Talent Consulting Practice, and Coaching & Leadership Development Practice as well Top Line's Product Development, Business Development, and Operations functions.",
          "Jeff Lackey and Tom Corbitt continue their conversation as Tom emphasizes the importance of being strategic about talent optimization. He highlights the need to identify specific problems and understand the timetable for affecting change in skill level, human behavior, time to fill vacant roles, and path to proficiency.",
        ],
        links: [
          {
            text: "For more information, visit:",
            linkUrl: "https://www.toplinegp.com/",
          },
        ],
      },
    },

    // EPISODE EIGHT
    {
      uuid: "208",
      episodeNumber: 8,
      season: 2,
      episodeName:
        "College Recruiter Founder Steven Rothberg: Early Career Hiring & Talent Attraction Strategies",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/college-recruiter-founder-steven-rothberg-early-career/id1659743511?i=1000612311531",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/6htpgoDT9fdUqcQqIwt2nh?si=V3VMWtLtTU2Px7Y4vJmeiA",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjgxMzIyNQ?sa=X&ved=0CAUQkfYCahcKEwjgq6HRpo6AAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/37f59f3b-bfa4-480a-bc92-ff25d00f5357/growing-your-business-with-people-college-recruiter-founder-steven-rothberg-early-career-hiring-talent-attraction-strategies-s2e8",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/G2Jy5y_wXyU/sddefault.jpg",
      url: "https://youtu.be/G2Jy5y_wXyU",
      blurb:
        "In this podcast episode, Jeff Lackey welcomes Steven Rothberg, founder and chief visionary officer of College Recruiter.",
      details: {
        featuredGuests: [
          {
            name: "Steven Rothberg",
            about:
              'Steven Rothberg is a fully recovered lawyer who founded the business that morphed into College Recruiter and now, as its Chief Visionary Officer, helps create and refine the company\'s strategy. He was named named by Mashable as one of the 20 top people for job seekers to follow on Twitter, Fast Company magazine as a "Top 50 online influencer", LinkedIn as having a profile in the top one percent most viewed, and TAtech as one of the top 100 influencers in the talent acquisition industry.',
            title: "Founder and Chief Visionary Officer of College Recruiter",
            url: "https://www.linkedin.com/in/stevenrothberg/",
            imageUrl:
              "https://media.licdn.com/dms/image/D5603AQHYB0cX4rv7IA/profile-displayphoto-shrink_800_800/0/1669665517361?e=1694649600&v=beta&t=YccZtqa_Fij5kFHkYFGDutL7SBktF0tpEgYDn1bVvjg",
          },
        ],
        description: [
          "In this podcast episode, Jeff Lackey welcomes Steven Rothberg, founder and chief visionary officer of College Recruiter.",
          "College Recruiter, a job search site that aims to help students and recent graduates find better career opportunities, was founded by Steven Rothberg in 1991. In a podcast episode, Rothberg discusses the challenges of hiring early career professionals in a competitive market, the importance of leveraging different recruitment capabilities to improve ROI, and the outlook for college recruiting in 2023.",
          "Rothberg emphasizes that companies looking to hire entry-level employees will face stiff competition from employers like FedEx, who are hiring similar candidates for warehouse work at higher rates. The conversation then shifts to early career hiring and strategies for maximizing return on investment in college recruiting. Rothberg suggests that CEOs should plan for a highly competitive job market and focus on attracting top talent by offering good roles, pay, and organizational culture.",
          "The job market outlook for 2023 is positive, with twice as many job openings as candidates looking for jobs. However, there are still challenges in certain sectors and metro areas, such as the tech sector in San Francisco. College Recruiter primarily caters to Fortune 1000 companies, government agencies, and other high-growth employers. The company has expanded its services to more than 13 million candidates globally.",
          "Jeff and Steven's conversation continues with a discussion on the importance of speed in the recruitment process, with the prevailing wage being a crucial factor in attracting talent. They also touched on the issue of the company name, with some advocating for a change to reflect the focus on early career recruitment. The use of innovative technologies like AI and chatbots to create engaging and fast candidate experiences was also mentioned as a trend in the marketplace.",
        ],
        links: [
          {
            text: "For more information, visit:",
            linkUrl: "https://collegerecruiter.com/",
          },
          {
            text: "Connect with Steven on LinkedIn:",
            linkUrl: "https://www.linkedin.com/in/stevenrothberg",
          },
        ],
      },
    },

    // EPISODE NINE
    {
      uuid: "209",
      episodeNumber: 9,
      season: 2,
      episodeName:
        "Expert HR Insights: Talent Management & Leadership With Mark Griffin",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/hr-chief-mark-griffin-on-talent-management-leadership/id1659743511?i=1000613190539",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/0pjBEILNXctXvRPHWBFHiR?si=-v1oyo5RT8OXfzzKLKbMXg",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjg1NjY4NQ?sa=X&ved=0CAUQkfYCahcKEwjgq6HRpo6AAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/db6e600c-d2f0-47f1-8ce6-b98eb4cac432/growing-your-business-with-people-hr-chief-mark-griffin-on-talent-management-leadership-coaching-s2e9",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/9-Y9H1b5PwA/sddefault.jpg",
      url: "https://youtu.be/9-Y9H1b5PwA",
      blurb:
        "In this podcast episode, host Jeff Lackey interviews Mark Griffin, Executive Vice President, Chief Human Resources Officer at BJ's Wholesale Club and former Senior Vice President of HR at CVS Health.",
      details: {
        featuredGuests: [
          {
            name: "Mark Griffin",
            about:
              "Mark Griffin is a top HR executive with Fortune 10 experience leading large teams of human resources professionals. He has deep knowledge of all areas of HR and proven track record of driving business results through human capital strategies.",
            title:
              "Executive Vice President, Chief Human Resources Officer at BJ's Wholesale Club",
            url: "https://www.linkedin.com/in/mark-griffin-3096381/",
            imageUrl:
              "https://media.licdn.com/dms/image/C4D03AQHFQkDl3CHFiA/profile-displayphoto-shrink_800_800/0/1645884105228?e=1694649600&v=beta&t=Lc4OxVT1X6qqEY4icC6szYRYwfCuD3Pf_ItZ_jV_zjs",
          },
        ],
        description: [
          "In this podcast episode, host Jeff Lackey interviews Mark Griffin, Executive Vice President, Chief Human Resources Officer at BJ's Wholesale Club and former Senior Vice President of HR at CVS Health.",
          "Mark shares his insights on the best recruiting strategies, which include hiring great leaders who come with a Rolodex and people who want to work for them. Jeff highlights Mark's extensive experience in leading urbanization through mergers, acquisitions, public offerings, and divestitures. Mark's natural likability and strong voice of the customer have helped him grow businesses from a national drug chain with sales of $18 billion to $884 billion. Jeff asks Mark to share how his experiences have prepared him to be the Chief ADR Officer for a 16 plus billion dollar publicly traded company.",
          "The conversation between Jeff Lackey and Mark Griffin continues as they discuss the importance of HR professionals delivering tough feedback to business leaders. Mark shares a story about a leader who was loyal to their team but blind to their lack of talent, emphasizing the responsibility of HR professionals to have tough discussions. They also discuss their hobbies, including Mark's love for boating and off-road motorcycle riding.",
        ],
        links: [],
      },
    },

    // EPISODE TEN
    {
      uuid: "210",
      episodeNumber: 10,
      season: 2,
      episodeName:
        "Maximizing Business Growth with Data Analysis with Amy Bush",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/amy-bush-maximizing-business-growth-with-data-analysis/id1659743511?i=1000614112515",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/4fr7G1zEzT0qsZz67UvIF7?si=obuV_CWqSo26fCf1fLPIZA",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjkwMDcwNw?sa=X&ved=0CAUQkfYCahcKEwjgq6HRpo6AAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/6cccbd1f-6c0c-4a4b-9917-f60cf34e9a81/growing-your-business-with-people-amy-bush-maximizing-business-growth-with-data-analysis-s2e10",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/B3BQQmjK3nQ/sddefault.jpg",
      url: "https://youtu.be/B3BQQmjK3nQ",
      blurb:
        "In this episode of the Growing Your Business with People podcast, host Jeff Lackey welcomes the president of Sevenstep, Amy Bush. They discuss the importance of data-driven decision-making and how leaders can use data to guide their talent acquisition process.",
      details: {
        featuredGuests: [
          {
            name: "Amy Bush",
            about:
              "Amy Bush is an innovative leader, committed to empowering and mentoring young professionals as they build their careers and grow into the next generation. She is a dynamic leader of a global team delivering talent-focused client solutions in 75+ countries across the Americas, EMEA and APAC.",
            title: "President of Sevenstep",
            url: "https://www.linkedin.com/in/amybbush/",
            imageUrl:
              "https://media.licdn.com/dms/image/C4E03AQHi9Vu5u8BRzA/profile-displayphoto-shrink_800_800/0/1516220281240?e=1694649600&v=beta&t=u3hLFFk8t0GqQOPUqugTp5NzRFDuUz6XplH5MasYIYo",
          },
        ],
        description: [
          "Time to fill is crucial to business growth. But are you or your business leaders aware of the time to fill challenges within your organization?",
          "In this episode of the Growing Your Business with People podcast, host Jeff Lackey welcomes the president of Sevenstep, Amy Bush. They discuss the importance of data-driven decision-making and how leaders can use data to guide their talent acquisition process.",
          "Amy emphasizes the need for perspective and multiple perspectives when looking at data, cautioning against relying solely on averages. The conversation also touches on the importance of people strategies in business growth and the challenges of navigating the mountains of data that leaders are given every day.",
          "Amy shares her approach to passing through the mountains of data and using it to improve businesses. She emphasizes the need for having a framework around data analysis and personal growth in dealing with data. The two discuss major shifts in the market and the use of data in understanding retention rates, engagement scores, and time to fill. They note that averages can hide important outliers or subgroups that require specific attention and solutions.",
          "The conversation emphasizes the importance of using data to make informed decisions and take appropriate action, while also considering the satisfaction of employees and recruiters.",
        ],
        links: [
          {
            text: "For more information about Sevenstep, visit:",
            linkUrl: "https://www.sevensteptalent.com/",
          },
        ],
      },
    },

    // EPISODE ELEVEN
    {
      uuid: "211",
      episodeNumber: 11,
      season: 2,
      episodeName:
        "Revolutionizing Employee Referral Programs w/ Real Links CEO Sam Davies",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/revolutionizing-employee-referral-programs-w-real-links/id1659743511?i=1000614969536",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/18fk7XuRv2gGtxQggNAA4M?si=8wQoGy6KTOmdYSOeKm33TQ",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjkzMTA0MQ?sa=X&ved=0CAUQkfYCahcKEwjgq6HRpo6AAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/c4c3bf10-d43c-46f2-8e62-3d38af8654bb/growing-your-business-with-people-revolutionizing-employee-referral-programs-w-real-links-ceo-sam-davies-s2e11",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/qEAOVbQHs5A/sddefault.jpg",
      url: "https://youtu.be/qEAOVbQHs5A",
      blurb:
        "In this podcast episode, host Jeff Lackey and CEO of Real Links, Sam Davies, discuss the benefits of employee referrals in hiring. Jeff and Sam also talk about the importance of networking and employee brand activation as a critical aspect of successful hiring.",
      details: {
        featuredGuests: [
          {
            name: "Sam Davies",
            about:
              "Sam Davies is the CEO & Co-Founder of Real Links. He emphasizes the need for engagement strategies to support referral and advocacy efforts, targeting specific areas for referrals, such as tech hiring, to maximize cost savings and engagement.",
            title: "CEO & Co-Founder at Real Links",
            url: "https://www.linkedin.com/in/samgtdavies/",
            imageUrl:
              "https://www.inhouserecruitment.co.uk/wp-content/uploads/2019/12/Sam-real-links-e1595231963692.jpeg",
          },
        ],
        description: [
          "In this podcast episode, host Jeff Lackey and CEO of Real Links, Sam Davies, discuss the benefits of employee referrals in hiring. Jeff and Sam also talk about the importance of networking and employee brand activation as a critical aspect of successful hiring.",
          "Sam shares examples that highlight the potential cost savings of up to £100,000 in six months and the positive impact on productivity and retention levels compared to other recruitment channels.",
          "They emphasize the need for engagement strategies to support referral and advocacy efforts, targeting specific areas for referrals, such as tech hiring, to maximize cost savings and engagement.",
        ],
        links: [
          {
            text: "For more information, visit:",
            linkUrl: "https://www.reallinks.io/",
          },
        ],
      },
    },

    // EPISODE ELEVEN | SHORT 1
    {
      uuid: "211_1",
      episodeNumber: 11,
      season: 2,
      episodeName:
        "Tech Hiring as an Example to Improve Recruitment Strategies w/ Real Links CEO Sam Davies",
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/jg1rFIARKjA/sddefault.jpg",
      url: "https://youtu.be/jg1rFIARKjA",
      blurb:
        "In this podcast episode, host Jeff Lackey and CEO of Real Links, Sam Davies, discuss the benefits of employee referrals in hiring. Jeff and Sam also talk about the importance of networking and employee brand activation as a critical aspect of successful hiring.",
    },

    // EPISODE TWELVE
    {
      uuid: "212",
      episodeNumber: 12,
      season: 2,
      episodeName:
        "Thoughtful Leadership, Finding Organizational Purpose w/ Helena Foulkes",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/thoughtful-leadership-finding-organizational-purpose/id1659743511?i=1000615834837",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/6jDVWJkKeRDvaaEBWKMjZP?si=g7F_UqvJQMeJ2aSAyCpmxA",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMjk4NjM5NQ?sa=X&ved=0CAUQkfYCahcKEwjgq6HRpo6AAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/923246bb-b226-450e-8664-986e88ad2ba1/growing-your-business-with-people-thoughtful-leadership-finding-organizational-purpose-w-helena-foulkes-s2e12",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/JTb67vdrKSA/sddefault.jpg",
      url: "https://youtu.be/JTb67vdrKSA",
      blurb:
        "In this conversation, Jeff and Helena dive into how Helena practices thoughtful leadership, what she's learned from managing multiple teams over the years, and how employees inspired organizational purpose.",
      details: {
        featuredGuests: [
          {
            name: "Helena Foulkes",
            about:
              "Helena Foulkes is Executive Chair of Follett Higher Education Group. A former Democratic candidate for Governor of Rhode Island with decades of experience as a CEO and senior executive, spent 25 years at CVS Health, most recently as President of CVS Pharmacy and EVP of CVS Health, a position she held from January 2014 to January 2018. Known as a creative, purpose-driven leader, she was a critical part of CVS's decision to exit the tobacco business and to rebrand the company CVS Health. Prior to running for Governor, Foulkes was CEO and a board member of Hudson's Bay Company where she led a significant transformation of the business, ultimately creating a path to the successful privatization of the company.",
            title: "Executive Chair of Follett Higher Education Group",
            url: "https://www.linkedin.com/in/helena-foulkes-54316910/",
            imageUrl:
              "https://www.golocalprov.com/cache/images/remote/https_s3.amazonaws.com/media.golocalprov.com/Helena_Headshot_Foulkes_NEW_August_2022.png",
          },
        ],
        description: [
          "The final episode of the season is here with very special guest, Helena Foulkes.",
          "Helena Foulkes most recently sought the Democratic nomination for Governor of Rhode Island and is known as a purpose-driven leader who has led significant impact on organizations and industries. An experienced CEO with a track record of delivering results by building high performance teams, Helena now serves on several boards in the for-profit and not-for-profit sectors.",
          "In this conversation, Jeff and Helena dive into how Helena practices thoughtful leadership, what she's learned from managing multiple teams over the years, and how employees inspired organizational purpose.",
        ],
        links: [
          {
            text: "Helena's Website | ",
            linkUrl: "https://www.helenafoulkes.com/",
          },
          {
            text: "Helena's LinkedIn | ",
            linkUrl: "https://www.linkedin.com/in/helena-foulkes-54316910",
          },
          {
            text: "Helena's Twitter | ",
            linkUrl: "  ",
          },
        ],
      },
    },

    // EPISODE TWELVE | SHORT 1
    {
      uuid: "212_1",
      episodeNumber: 12,
      season: 2,
      episodeName:
        "Helena Foulkes Shares the Story Behind How CVS Quit Smoking",
      sponsors: ["sevenstep", "bayard", "paradox", "futureSolve"],
      image: "https://img.youtube.com/vi/p0SpjTzXHFc/sddefault.jpg",
      url: "https://youtu.be/p0SpjTzXHFc",
      blurb:
        "In this conversation, Jeff and Helena dive into how Helena practices thoughtful leadership, what she's learned from managing multiple teams over the years, and how employees inspired organizational purpose.",
    },
  ],
};

export const SEASON_THREE: seasonType = {
  seasonNumber: 3,
  seasonName: "Season Three",
  episodes: [
    // EPISODE ONE
    {
      uuid: "301",
      episodeNumber: 1,
      season: 3,
      episodeName:
        "Prioritizing People & Managing Attrition with Former CVS Executive, Dr. Alan Lotvin",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/prioritizing-people-managing-attrition-with-former-cvs/id1659743511?i=1000619239781",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/6qOdMl1k6RSTvmn4EeCNcA?si=iziXI55UQkCGDkQbgJ0UJg",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMzE1Nzg2NA?sa=X&ved=0CAUQkfYCahcKEwjgq6HRpo6AAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/6bba2fa7-66e1-4e03-96df-8c524c3ae455/growing-your-business-with-people-prioritizing-people-managing-attrition-with-former-cvs-executive-dr-alan-lotvin",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "paradox", "survale", "futureSolve"],
      image: "https://img.youtube.com/vi/xjP--UBAtmk/sddefault.jpg",
      url: "https://youtu.be/xjP--UBAtmk",
      blurb:
        "Dr. Alan Lotvin shares his insights on leadership and growing a business with people. He emphasizes the importance of taking a chance on people and recognizing patterns of success. He discusses the need to prioritize talent and culture as a leader and shares his approach to reducing attrition. Dr. Lotvin also highlights the importance of honest conversations and developing individuals' talents.",
      details: {
        featuredGuests: [
          {
            name: "Dr. Alan Lotvin",
            about:
              "Dr. Alan Lotvin is a renowned cardiologist, author, and executive leader. He has had a diverse and exciting career, including serving as the president of CVS Caremark, where he helped transform the company into a formidable healthcare organization. He is known for his expertise in healthcare management and his ability to lead high-performing teams.",
            title:
              "Former Executive Vice President of CVS Health and Former President of CVS Caremark",
            url: "https://www.linkedin.com/in/alanlotvin/",
            imageUrl:
              "https://pbs.twimg.com/profile_images/1583170525928558592/gh35Fzj3_400x400.jpg",
          },
        ],
        description: [
          "Dr. Alan Lotvin shares his insights on leadership and growing a business with people. He emphasizes the importance of taking a chance on people and recognizing patterns of success. He discusses the need to prioritize talent and culture as a leader and shares his approach to reducing attrition. Dr. Lotvin also highlights the importance of honest conversations and developing individuals' talents.",
          "Taking a chance on people and recognizing patterns of success are crucial for effective leadership. Prioritizing talent and culture is essential for growing a business with people. Reducing attrition requires creating a culture of transparency, trust, and safety. Honest conversations about performance and career growth are necessary for individual development. Developing individuals' talents involves assessing their potential and providing the necessary support and resources.",
          '"Sometimes you have to take a chance on people."',
          '"The higher you get in an organization, the more time you should spend on talent and culture."',
          '"Treat people with dignity and respect, and make them feel important in their roles."',
          '"Tough conversations and bad news do not get better with age.""',
          '"Honest conversations about performance and career growth are crucial for individual development."',
        ],
        links: [],
      },
    },

    // EPISODE TWO
    {
      uuid: "302",
      episodeNumber: 2,
      season: 3,
      episodeName:
        "Creating a Culture of Belonging is Good Business w/ William Arruda & Sondra Dryer",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/the-importance-of-belonging-in-the-workplace/id1659743511?i=1000620676106",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/3ZP95jLYIMdouyg6tPYTfR",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMzE5OTExMA?sa=X&ved=0CAUQkfYCahcKEwiYx4-lg5mAAxUAAAAAHQAAAAAQCg",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/7af83cb9-85a8-49ec-9e30-b7a4da4cd281/growing-your-business-with-people-the-importance-of-belonging-in-the-workplace-w-william-arruda-sondra-dryer-s3e2",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "paradox", "survale", "futureSolve"],
      image: "https://img.youtube.com/vi/Q2Mh9bX-5ng/sddefault.jpg",
      url: "https://youtu.be/Q2Mh9bX-5ng",

      blurb:
        "In our recent episode, guest William Arruda highlighted the data that supports the need to emphasize belonging in the workplace.",
      details: {
        featuredGuests: [
          {
            name: "William Arruda",
            about:
              "William Arruda is a personal branding pioneer and the founder of CareerBlast.TV. He has written nearly 700 articles for Forbes and other publications and is an expert in personal branding.",
            title: "Co-Founder of CareerBlast and Motivational Speaker",
            url: "https://www.linkedin.com/in/williamarruda/",
            imageUrl:
              "https://williamarruda.com/wp-content/uploads/2021/03/PORTRAIT3.jpg",
          },
          {
            name: "Sondra Dryer",
            about:
              "Sondra helps companies articulate their unique employee value proposition (EVP) to attract key talent while simultaneously activating their own employees to become their brand ambassadors. Her specialties include: employer brand strategy, recruitment marketing, employee communications and engagement, public relations, cultural integration, public speaking, leadership development and team building.",
            title:
              "President and Senior Employer Brand Strategist at Spark Employer Brand Consulting",
            url: "https://www.linkedin.com/in/sondradryer/",
            imageUrl:
              "https://media.licdn.com/dms/image/C4E03AQExI-TztV2Ohw/profile-displayphoto-shrink_800_800/0/1613094682102?e=1695254400&v=beta&t=sNDbyjdoqciXdJgHYHHrLTg5VNMXwLEwntdCs8ASweI",
          },
        ],
        description: [
          "William Arruda discusses the importance of belonging in the workplace and how it can impact employee engagement and performance. He emphasizes the need for organizations to measure and prioritize belonging and shares insights on how to create a culture of belonging that embraces individuality while still conforming to the organization's values.",
          "Key Takeaways:",
          "- Belonging is a shared value that is important for individuals and organizations.",
          "- Creating a culture of belonging can lead to increased engagement, productivity, and retention.",
          "- Trust is a key component of belonging and can be built by creating an environment where individuals feel heard and valued.",
          "- Onboarding is a critical time to establish a sense of belonging and should focus on both the organization's brand and the individual's personal brand.",
        ],
        hashtags: ["culture", "success", "retention"],
        links: [
          {
            text: "For more information about William, visit:",
            linkUrl: "https://williamarruda.com/",
          },
        ],
      },
    },

    // EPISODE THREE
    {
      uuid: "303",
      episodeNumber: 3,
      season: 3,
      episodeName:
        "Harnessing Strengths to Drive Employee Engagement & Retention",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/harnessing-strengths-to-drive-employee-engagement-retention/id1659743511?i=1000621488991",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/7GrAWV5FVWIhzKzlSvEjEY",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMzI0MjUyOQ?sa=X&ved=0CAUQkfYCahcKEwjY55vFhpmAAxUAAAAAHQAAAAAQCg",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/80a1f33e-acda-46f8-86ca-2af9d33ca3d0/growing-your-business-with-people-harnessing-strengths-to-drive-employee-engagement-retention-s3e3",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "paradox", "survale", "futureSolve"],
      image: "https://img.youtube.com/vi/3FhWsREY2WY/sddefault.jpg",
      url: "https://youtu.be/3FhWsREY2WY",
      blurb:
        "This week on the Growing Your Business with People podcast, LeAnne Lagasse discusses the importance of playing to your team's strengths and developing your people managers. She emphasizes the need for leaders to set the tone for owning strengths and weaknesses and creating a culture of continuous improvement.",
      details: {
        featuredGuests: [
          {
            name: "LeAnne Lagasse",
            about:
              "CEO of LeAnne Lagasse Coaching and Consulting LLC. She is an HR consultant and keynote speaker who helps leaders and organizations improve employee engagement and retention.",
            title:
              "HR and People Ops Consulting at LeAnne Lagasse Coaching and Consulting",
            url: "https://www.linkedin.com/in/leannelagasse/",
            imageUrl:
              "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/2150450831/settings_images/VWKZGgToQt6I2WvK8AnC_file.jpg",
          },
        ],
        description: [
          "LeAnne highlights the power of the Clifton Strengths assessment in understanding individual talents and leveraging them for better performance. She also explains the correlation between employee engagement and business outcomes, such as productivity, retention, and financial performance.",
          "Key Takeaways:",
          "- Leaders should set the tone for owning strengths and weaknesses in their teams.",
          "- The Clifton Strengths assessment can help identify individual talents and leverage them for better performance.",
          "- Employee engagement is linked to positive business outcomes, such as productivity, retention, and financial performance.",
          "- Praise and recognition should be individualized and focused on specific talents and strengths.",
          "- Equipping people managers with self-awareness, communication skills, and engagement strategies is crucial for improving employee engagement and retention.",
        ],
        hashtags: ["strengths", "productivity", "retention"],
        links: [
          {
            text: "For more about LeAnne, visit:",
            linkUrl: "https://www.leannelagasse.com/",
          },
          {
            text: "External Article:",
            linkUrl:
              "https://hbr.org/2023/03/it-takes-versatility-to-lead-in-a-volatile-world",
            linkText: "It Takes Versatility to Lead in a Volatile World",
          },
        ],
      },
    },

    // EPISODE FOUR
    {
      uuid: "304",
      episodeNumber: 4,
      season: 3,
      episodeName:
        "Matt Alder, Future of Talent Acquisition: AI & Recruiter-less Hiring",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/harnessing-strengths-to-drive-employee-engagement-retention/id1659743511?i=1000621488991",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/7GrAWV5FVWIhzKzlSvEjEY",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMzI0MjUyOQ?sa=X&ved=0CAUQkfYCahcKEwjY55vFhpmAAxUAAAAAHQAAAAAQCg",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/80a1f33e-acda-46f8-86ca-2af9d33ca3d0/growing-your-business-with-people-harnessing-strengths-to-drive-employee-engagement-retention-s3e3",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "paradox", "survale", "futureSolve"],
      image: "https://img.youtube.com/vi/XvtCAgwZBPQ/sddefault.jpg",
      url: "https://youtu.be/XvtCAgwZBPQ",
      blurb:
        "In this episode of the Growing Your Business with People Podcast, host Jeff Lackey sits down with Matt Alder.",
      details: {
        featuredGuests: [
          {
            name: "Matt Alder",
            about:
              "Matt Alder, host of The Recruiting Future Podcast, discusses the future of talent acquisition and the role of AI in recruiting. He explores the concept of 'recruiter-less recruiting' and how AI can make the process more efficient. Alder emphasizes the importance of differentiation and human creativity in a world where everyone is using AI.",
            title: "Producer & Host",
            url: "https://www.linkedin.com/in/mattalder",
            imageUrl:
              "https://media.licdn.com/dms/image/C4D03AQHj62BirzhWlA/profile-displayphoto-shrink_800_800/0/1634123057580?e=1696464000&v=beta&t=quoN5W5KoS-Jr7V1JiGQM5v7wCdTq45Ohh0adYEUwyY",
          },
        ],
        description: [
          "In this episode of the Growing Your Business with People Podcast, host Jeff Lackey sits down with Matt Alder.",
          "Matt Alder, host of The Recruiting Future Podcast, discusses the future of talent acquisition and the role of AI in recruiting. He explores the concept of 'recruiter-less recruiting' and how AI can make the process more efficient. Alder emphasizes the importance of differentiation and human creativity in a world where everyone is using AI.",
          "He also highlights the potential of AI in analyzing HR data and its implications for talent management. Overall, Alder believes that AI will create new job opportunities and change the way organizations think about talent.",
        ],
        links: [
          {
            text: "For more about Matt, visit:",
            linkUrl: "https://www.linkedin.com/in/mattalder",
          },
          {
            text: "For more information on Matt and his podcast, go to:",
            linkUrl: "https://recruitingfuture.com/",
          },
        ],
      },
    },
    {
      // Episode 5
      uuid: "305",
      episodeNumber: 5,
      season: 3,
      episodeName: "Driving Performance Through Purpose w/ COO, Chris Cox",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/driving-performance-through-purpose-w-coo-chris-cox-s3e5/id1659743511?i=1000623781892",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/39x8WAzNbC95rXrFK60j6L?si=YdduKBBjSnKPlklbAZSlGg",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMzM2NzI3MQ?sa=X&ved=0CAUQkfYCahcKEwiAyqjU7PCAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/3cada892-399e-4f46-8711-031aabf095ff/growing-your-business-with-people-driving-performance-through-purpose-w-coo-chris-cox-s3e5",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "paradox", "survale", "futureSolve"],
      image: "https://img.youtube.com/vi/AxkLlADB-3w/sddefault.jpg",
      url: "https://youtu.be/AxkLlADB-3w",
      blurb:
        "In this episode of the Growing Your Business with People podcast, Chris Cox, the COO of ATI Physical Therapy, discusses the importance of tying work back to a purpose and how it can drive performance. He emphasizes the need for leaders to inspire and engage their teams by communicating the why behind their work.",
      details: {
        featuredGuests: [
          {
            name: "Chris Cox",
            about:
              "Chris Cox is the Chief Operating Officer (COO) at ATI Physical Therapy, a leading national physical therapy organization. He has over 15 years of experience in the healthcare industry, including various roles at CVS Health, where he served as the Senior Vice President of Pharmacy. Chris holds an MBA and is passionate about the intersection of healthcare and business.  ",
            title: "Producer & Host",
            url: "https://www.linkedin.com/in/chris-cox-808a569/",
            imageUrl:
              "https://media.licdn.com/dms/image/C5603AQFJJJqp3RV9Dg/profile-displayphoto-shrink_400_400/0/1517673692032?e=1698278400&v=beta&t=ptr4qTx-X6w5XzLPYmrPjU-LbM9mQ9_TH2QcfAp1lCs",
          },
        ],
        description: [
          "Chris Cox, COO of ATI Physical Therapy, highlights the significance of connecting work to a purpose to enhance performance.",
          "He stresses leaders' role in motivating teams by explaining the rationale behind tasks. Drawing from his CVS Health and ATI Physical Therapy experiences, he illustrates how purpose-driven leadership boosts employee engagement and business results.",
        ],
        links: [
          {
            text: "",
            linkUrl: "",
          },
          {
            text: "",
            linkUrl: "",
          },
        ],
      },
    },
    {
      // Episode 6
      uuid: "306",
      episodeNumber: 6,
      season: 3,
      episodeName: "Why HR Business Partners Are Crucial For Company Growth",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/toby-barnes-talent-acquisition-expert-on-the/id1659743511?i=1000624498347",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/28R9NxvTTUitWvmJZlIrcm?si=Md0DbppgRRCsYUrOrOiRSQ",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMzQwNzYzMg?sa=X&ved=0CAUQkfYCahcKEwiAyqjU7PCAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/799a6388-e5b9-45a3-ab51-f05290214b67/growing-your-business-with-people-toby-barnes-talent-acquisition-expert-on-the-importance-of-hr-business-partners-s3e6",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "paradox", "survale", "futureSolve"],
      image: "https://img.youtube.com/vi/0wK02Eh03Ek/sddefault.jpg",
      url: "https://youtu.be/0wK02Eh03Ek",
      blurb:
        "Dive into the transformative world of HR with Toby Barnes as he sheds light on the pivotal role of HR Business Partners. A must-watch for CEOs, HR leaders, and anyone passionate about organizational success.",
      details: {
        featuredGuests: [
          {
            name: "Toby Barnes",
            about:
              "Experienced talent acquisition and recruitment professional. Toby has worked in various roles in talent acquisition and resourcing for companies such as Rolls-Royce, TFL Transport for London, Google, and Travis Perkins.",
            title: "Producer & Host",
            url: "https://www.linkedin.com/in/tobyjbarnes/",
            imageUrl:
              "https://media.licdn.com/dms/image/D4E03AQEWw4-CRYtm9A/profile-displayphoto-shrink_800_800/0/1690304320810?e=1698278400&v=beta&t=1sHj3dX098oJHTOkHGCsLDbwQVw8OU1hy5eOAasVeJQ",
          },
        ],
        description: [
          "Toby Barnes emphasizes the importance of bringing talent acquisition and HR partners to the table when making major business decisions. ",
          " He discusses the need for CEOs to understand the value of their employees and how to grow their business with people.",
          "Toby also highlights the role of automation, specifically robotic process automation (RPA), in enhancing efficiency and driving profits and revenue growth.",
        ],
        links: [
          {
            text: "LEGO® Rolls-Royce Trent 1000 Jet Engine - Bright Bricks Timelapse",
            linkUrl: "https://www.youtube.com/watch?v=UgP1PLc4wTo",
          },
          {
            text: "WIRED Article - Rolls-Royce Unveils New Jet Engine ... Made of Legos",
            linkUrl: "https://www.wired.com/2012/07/rolls-royce-engine-legos/",
          },
        ],
      },
    },
    {
      // Episode 7
      uuid: "307",
      episodeNumber: 7,
      season: 3,
      episodeName:
        "The Future of Work: Embracing AI and the Gig Economy w/ Mark Judd",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/the-future-of-work-embracing-ai-and-the-gig-economy/id1659743511?i=1000625240530",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/3N6kWrVZWQrGI9U7P7hPKL?si=eL6AF_KvQt-oOKKotQgsLA",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMzQ0ODAxOA?sa=X&ved=0CAUQkfYCahcKEwiAyqjU7PCAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/6df87bbf-20e7-4bf7-a501-2d493960aa9d/growing-your-business-with-people-the-future-of-work-embracing-ai-and-the-gig-economy-w-mark-judd-s3e7",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "paradox", "survale", "futureSolve"],
      image: "https://img.youtube.com/vi/A1fXfiKG46A/sddefault.jpg",
      url: "https://youtu.be/A1fXfiKG46A",
      blurb:
        "Jeff Lackey has a conversation with Mark Judd about impact of advanced technology, such as artificial intelligence (AI), on human capital management (HCM) and the future of work.",
      details: {
        featuredGuests: [
          {
            name: "Mark Judd",
            about:
              "Mark Judd is an experienced business leader with a background in human resources. He has worked for companies such as Toyota, P.W. See, Rolls-Royce, and Workday. He is currently a visiting researcher at Lancaster University, where he focuses on artificial intelligence, human capital management, and the ethics surrounding these areas.",
            title: "Producer & Host",
            url: "https://www.linkedin.com/in/mark-judd-74a6b89/",
            imageUrl:
              "https://media.licdn.com/dms/image/C4E03AQHyc2bdYuXPvg/profile-displayphoto-shrink_800_800/0/1643327289946?e=1698278400&v=beta&t=VquiN1JVCyZLzGMCQ_hpY34Z0NIT1VjYD_Dul2xqesQ",
          },
        ],
        description: [
          "In this episode of the Growing Your Business with People, Mark Judd emphasizes the need for organizations to adapt to a global workforce and the benefits of integrating technology to create a more holistic approach to managing employees",
          "He also highlights the ethical considerations of AI and the challenges of finding the right balance between its positive and negative implications.",
        ],
        links: [
          {
            text: "Change At The Speed Of AI: The Latest Human Capital Disrupter.",
            linkUrl:
              "https://www.forbes.com/sites/forbeshumanresourcescouncil/2023/05/04/change-at-the-speed-of-ai-the-latest-human-capital-disrupter/?sh=5449f7e22fb2",
          },
          {
            text: "AI in the workplace.",
            linkUrl:
              "https://www.kornferry.com/insights/featured-topics/gen-ai-in-the-workplace?utm_source=google&utm_medium=ppc&utm_campaign=23-08-gbl-misc&utm_term=ai_in_the_workplace&utm_content=capability-page&gad=1",
          },
          {
            text: "Artifical Intelligence in Human Capital Management",
            linkUrl:
              "https://www.oracle.com/a/ocom/docs/dc/lpd100770849-capstoneinsightsaiinhcm.pdf",
          },
        ],
      },
    },
    {
      // Episode 8
      uuid: "308",
      episodeNumber: 8,
      season: 3,
      episodeName: "Using Talent Acquisition Data to Drive Business Growth",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/the-future-of-work-embracing-ai-and-the-gig-economy/id1659743511?i=1000625240530",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/3N6kWrVZWQrGI9U7P7hPKL?si=eL6AF_KvQt-oOKKotQgsLA",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMzQ0ODAxOA?sa=X&ved=0CAUQkfYCahcKEwiAyqjU7PCAAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/6df87bbf-20e7-4bf7-a501-2d493960aa9d/growing-your-business-with-people-the-future-of-work-embracing-ai-and-the-gig-economy-w-mark-judd-s3e7",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "paradox", "survale", "futureSolve"],
      image: "https://img.youtube.com/vi/6gfth-xsztM/sddefault.jpg",
      url: "https://youtu.be/6gfth-xsztM",
      blurb:
        "In this episode of the Growing Your Business with People podcast, Rob McIntosh shares his passion for talent acquisition data and how it can drive business growth.",
      details: {
        featuredGuests: [
          {
            name: "Rob Mcintosh",
            about:
              "Rob McIntosh is an industry analyst and former talent acquisition leader for companies such as Microsoft, Deloitte, and McKesson. He is the co-founder of SourceCon, the industry's preeminent sourcing community, and is currently the VP of Recruiting Solutions at PSG Global Solutions.",
            title: "Industry Analyst",
            url: "https://www.linkedin.com/in/robmcintosh/",
            imageUrl:
              "https://media.licdn.com/dms/image/C4E03AQGiDvnhneg1eA/profile-displayphoto-shrink_800_800/0/1558385926308?e=1698883200&v=beta&t=IQ9dUQEvvMytnTs1ur_v_1Djp2B6KfS-15fEhvVsQTU",
          },
        ],
        description: [
          "Rob recounts a story from his time at Deloitte, where he used data to challenge assumptions and gain credibility with the executive leadership team.",
          "He emphasizes the importance of understanding how talent acquisition can contribute to the company's bottom line and suggests using simple, actionable metrics to track progress and engage executives.",
        ],
        links: [
          {
            text: "Change At The Speed Of AI: The Latest Human Capital Disrupter.",
            linkUrl:
              "https://www.forbes.com/sites/forbeshumanresourcescouncil/2023/05/04/change-at-the-speed-of-ai-the-latest-human-capital-disrupter/?sh=5449f7e22fb2",
          },
          {
            text: "AI in the workplace.",
            linkUrl:
              "https://www.kornferry.com/insights/featured-topics/gen-ai-in-the-workplace?utm_source=google&utm_medium=ppc&utm_campaign=23-08-gbl-misc&utm_term=ai_in_the_workplace&utm_content=capability-page&gad=1",
          },
          {
            text: "Artifical Intelligence in Human Capital Management",
            linkUrl:
              "https://www.oracle.com/a/ocom/docs/dc/lpd100770849-capstoneinsightsaiinhcm.pdf",
          },
        ],
      },
    },
    {
      // Episode 9
      uuid: "309",
      episodeNumber: 9,
      season: 3,
      episodeName:
        "Design Thinking and Employee Experience: Creating a Competitive Advantage",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/design-thinking-and-employee-experience-w-jon/id1659743511?i=1000626785787",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/0sqwcCiIxnmXOWsZX9xY5f?si=oiOPalAmTmquzsWyBjt30g",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw/episode/QnV6enNwcm91dC0xMzUxNjc1OA?sa=X&ved=0CAUQkfYCahcKEwjg_5zYjpaBAxUAAAAAHQAAAAAQAQ",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/24fed62e-13e2-4848-b490-f2c84727dd83/growing-your-business-with-people-design-thinking-and-employee-experience-w-jon-brickner-steelcase-s3e9",
          icon: icons.amazon.src,
        },
      ],
      sponsors: ["sevenstep", "paradox", "survale", "futureSolve"],
      image: "https://img.youtube.com/vi/Iw-axsct-y0/sddefault.jpg",
      url: "https://youtu.be/Iw-axsct-y0",
      blurb:
        "Jon Brickner, the leader of the Employee Experience Design Practice at Steelcase, joins host Jeff Lackey to discuss the importance of employee experience and how it can help businesses grow.",
      details: {
        featuredGuests: [
          {
            name: "Jon Brickner",
            about:
              "Jon Brickner is the leader of the Employee Experience Design Practice at Steelcase. With over 17 years of experience in strategic HR and design thinking, Jon brings a unique perspective to workplace challenges. He is passionate about creating engaging experiences for employees and helping businesses grow.",
            title: "Employee Experience Design Practice at Steelcase",
            url: "https://www.linkedin.com/in/jonbrickner/",
            imageUrl:
              "https://media.licdn.com/dms/image/D5603AQHSNPMiRKm0uA/profile-displayphoto-shrink_800_800/0/1681744770204?e=1699488000&v=beta&t=5rtvKXYAO-e4cP5j2yXFX7194M0C3JZ6CFnup3cZEFY",
          },
        ],
        description: [
          "Jon explores the concept of design thinking and its application in HR, as well as the impact of employee experience on engagement and retention.",
          "Jon shares examples of companies that have successfully curated their environments to get the most out of their teams.",
          "He emphasizes the need for leaders to invest in their people and create a culture of prototyping, testing, and scaling.",
        ],
        links: [
          {
            text: "Jon Brickner - LinkedIn.",
            linkUrl:
              "He emphasizes the need for leaders to invest in their people and create a culture of prototyping, testing, and scaling.",
          },
        ],
      },
    },
    {
      // Episode 10
      uuid: "310",
      season: 3,
      episodeNumber: 10,
      episodeName: "Lessons in Frontline Leadership",
      episodeLinks: [
        {
          name: "apple",
          link: "https://podcasts.apple.com/us/podcast/prioritizing-people-the-key-to-frontline-leadership/id1659743511?i=1000627574431",
          icon: icons.apple.src,
        },
        {
          name: "spotify",
          link: "https://open.spotify.com/episode/6WvDoUN0exqEvdr4ZNJ6Wx?si=bmnOZI5CSx223Mshxl-d0Q",
          icon: icons.spotify.src,
        },
        {
          name: "google podcasts",
          link: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yMDU3NDkzLnJzcw==",
          icon: icons.google.src,
        },
        {
          name: "amazon music",
          link: "https://music.amazon.com/podcasts/dbf81855-67a9-4500-bdec-c45ace015170/episodes/24fed62e-13e2-4848-b490-f2c84727dd83/growing-your-business-with-people-design-thinking-and-employee-experience-w-jon-brickner-steelcase-s3e9",
          icon: icons.amazon.src,
        },
        {
          name: "more",
          link: "https://www.buzzsprout.com/2057493/share",
          icon: icons.more.src,
        },
      ],
      sponsors: ["sevenstep", "bayard", "paradox"],
      image: "https://img.youtube.com/vi/fCGYrHhlG_w/sddefault.jpg",
      url: "https://youtu.be/fCGYrHhlG_w?si=c760uEAHcoEEvGmN",
      blurb: "",
      details: {
        featuredGuests: [
          {
            name: "Dennis Berger",
            about:
              "Dennis Berger is an experienced HR executive who has held leadership positions at companies such as Pepsi, CDW, AutoNation, and Suffolk. With over 34 years of experience in HR, Dennis has a deep understanding of the importance of frontline leadership and the impact it can have on an organization's success.",
            title: "Experienced CHRO | CDW, AutoNation, Suffolk",
            url: "https://www.linkedin.com/in/dennis-g-berger/",
            imageUrl:
              "https://media.licdn.com/dms/image/C4D03AQG8GwQcNOrvnQ/profile-displayphoto-shrink_400_400/0/1591893899126?e=1700092800&v=beta&t=0bj5B7L7bkQ8TwsIhOOmFBuw9WCuFfaCARZK8VtJmkM",
          },
        ],
        description: [
          "Discover the key to frontline leadership and how it can make a difference in your organization.",
          "Dennis Berger shares his expertise with us",
          "New Podcast Highlights",
          "🔸Frontline leaders should not defer their pick when it comes to building their teams.",
          "🔸Values match is more important than cultural fit when selecting team members.",
          "🔸Recognition and appreciation, such as saying hello in the morning and thank you in the evening, go a long way in motivating employees.",
          "🔸Happy coworkers lead to happy customers.",
        ],
        links: [
          {
            text: "Listen to your employees if you want to take care of them.",
            linkUrl:
              "https://www.forbes.com/sites/brucetulgan/2021/03/05/listen-to-your-employees-if-you-want-to-take-care-of-them/?sh=70dabaf140d5",
          },
        ],
      },
    },
  ],
};
