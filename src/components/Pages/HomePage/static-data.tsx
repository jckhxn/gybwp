import routes from "routes";

import { sponsorUUIDs } from "../SponsorsPage/static-data";

export type episodeType = {
  episodeNumber: number;
  episodeName: string;
  sponsors: sponsorUUIDs[];
  uuid: string;
  url: string;
  image?: string;
  description?: string;
};

type seasonType = {
  seasonNumber: number;
  seasonName: string;
  episodes: episodeType[];
};

//
//
//
//
// ONLY TOUCH THINGS BELOW THIS LINE

export const HERO = {
  header: "Lorem ipsum dolor sit amet consectetur",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Consectetur adipiscing elit. Et, egestas tempus dolor sit amet tellus etiam sed.",
  buttonText: "Watch Now",
  buttonUrl: routes.external.subscribe,
  secondButtonText: "Listen Now",
  secondButtonUrl: routes.external.listen,
};

export const CTA = {
  header: "Sed Quia Consequuntur Magni",
  body: "Lorem ipsum dolor",
  buttonText: "Subscribe",
  buttonUrl: routes.external.subscribe,
};

export const PODCAST: seasonType[] = [
  /****** SEASON ONE ******/
  {
    seasonNumber: 1,
    seasonName: "Season One",
    episodes: [
      // TRAILER
      {
        uuid: "100",
        episodeNumber: 0,
        episodeName: "Trailer",
        sponsors: [],
        image: "https://img.youtube.com/vi/6yGhUsHHh2Y/sddefault.jpg",
        url: "https://youtu.be/6yGhUsHHh2Y",
      },

      // EPISODE ONE
      {
        uuid: "101",
        episodeNumber: 1,
        episodeName:
          "Mastering DE&I: Foster Inclusivity At Work With David Casey",
        sponsors: [],
        image: "https://img.youtube.com/vi/a9PbdlshJdc/sddefault.jpg",
        url: "https://youtu.be/a9PbdlshJdc",
      },

      // EPISODE TWO
      {
        uuid: "102",
        episodeNumber: 2,
        episodeName:
          "Revolutionise Recruitment: The Power Of Tech-Enabled Hiring Ft. Joshua Secrest",
        sponsors: [],
        image: "https://img.youtube.com/vi/vFFSYSGQh-0/sddefault.jpg",
        url: "https://youtu.be/vFFSYSGQh-0",
      },

      // EPISODE THREE
      {
        uuid: "103",
        episodeNumber: 3,
        episodeName:
          "CEO of ATI Physical Therapy: Sharon Vitti's Success Story",
        sponsors: [],
        image: "https://img.youtube.com/vi/6eiLXbAaxrI/sddefault.jpg",
        url: "https://youtu.be/6eiLXbAaxrI",
      },

      // EPISODE FOUR
      {
        uuid: "104",
        episodeNumber: 4,
        episodeName:
          "Leveraging Recruitment To Grow Business Ft. Dan Valavanis & Oliver Comstock",
        sponsors: [],
        image: "https://img.youtube.com/vi/h34hsQfmzYg/sddefault.jpg",
        url: "https://youtu.be/h34hsQfmzYg",
      },

      // EPISODE FIVE
      {
        uuid: "105",
        episodeNumber: 5,
        episodeName:
          "Preventing Employee Burnout: Expert Tips From Dr. Michael Halasy",
        sponsors: [],
        image: "https://img.youtube.com/vi/062Asb9Rsrc/sddefault.jpg",
        url: "https://youtu.be/062Asb9Rsrc",
      },

      // EPISODE SIX
      {
        uuid: "106",
        episodeNumber: 6,
        episodeName:
          "Successful Talent Attraction: Recruitment Secrets Revealed Ft. Craig Fisher",
        sponsors: [],
        image: "https://img.youtube.com/vi/QKd9_UY80CE/sddefault.jpg",
        url: "https://youtu.be/QKd9_UY80CE",
      },

      // EPISODE SEVEN
      {
        uuid: "107",
        episodeNumber: 7,
        episodeName: "Revive Workplace Morale: Expert Tips By Paul Neveu",
        sponsors: [],
        image: "https://img.youtube.com/vi/CseLZJoQzlQ/sddefault.jpg",
        url: "https://youtu.be/CseLZJoQzlQ",
      },

      // EPISODE EIGHT
      {
        uuid: "108",
        episodeNumber: 8,
        episodeName:
          "How Social Media Can Transform Your Recruiting Strategies ft. CEO Amit Parmar",
        sponsors: [],
        image: "https://img.youtube.com/vi/3Uf6IgdFnOk/sddefault.jpg",
        url: "https://youtu.be/3Uf6IgdFnOk",
      },

      // EPISODE NINE
      {
        uuid: "109",
        episodeNumber: 9,
        episodeName:
          "The Importance Of Balancing People And Profit In Business Ft. Susan LaMotte",
        sponsors: [],
        image: "https://img.youtube.com/vi/ZYgaUJ00q6Y/sddefault.jpg",
        url: "https://youtu.be/ZYgaUJ00q6Y",
      },

      // EPISODE TEN
      {
        uuid: "110",
        episodeNumber: 10,
        episodeName:
          "Maximizing Your Hiring Success: Power Of Performance Metrics Ft. Jason Moreau",
        sponsors: [],
        image: "https://img.youtube.com/vi/CWcEm-23rtg/sddefault.jpg",
        url: "https://youtu.be/CWcEm-23rtg",
      },

      // EPISODE ELEVEN part 1
      {
        uuid: "111-1",
        episodeNumber: 11,
        episodeName:
          "Art of Listening: Hairdresser in the Boardroom: Insights from Kim-Adele Randall | Part 1",
        sponsors: [],
        image: "https://img.youtube.com/vi/IEXa_qTyugo/sddefault.jpg",
        url: "https://youtu.be/IEXa_qTyugo",
      },

      // EPISODE ELEVEN part 2
      {
        uuid: "111-2",
        episodeNumber: 11,
        episodeName:
          "Positive Self-Talk: Kim-Adele Randall Shares Her Story | Part 2",
        sponsors: [],
        image: "https://img.youtube.com/vi/OPSBEPqhNow/sddefault.jpg",
        url: "https://youtu.be/OPSBEPqhNow",
      },

      // EPISODE ELEVEN part 3
      {
        uuid: "111-3",
        episodeNumber: 11,
        episodeName:
          "Empowering Your Team's Strengths: Hairdresser in the Boardroom | Part 3",
        sponsors: [],
        image: "https://img.youtube.com/vi/l0mvpA062hY/sddefault.jpg",
        url: "https://youtu.be/l0mvpA062hY",
      },

      // EPISODE TWELVE
      {
        uuid: "112",
        episodeNumber: 12,
        episodeName:
          "Transform Your Customer Service: Expert Leadership Training with Harry Travis",
        sponsors: [],
        image: "https://img.youtube.com/vi/JpnRadfibWQ/sddefault.jpg",
        url: "https://youtu.be/JpnRadfibWQ",
      },

      // EPISODE TWELVE | Short
      {
        uuid: "112_1",
        episodeNumber: 12,
        episodeName: "Harry Travis on the Cost of Layoffs",
        sponsors: [],
        image: "https://img.youtube.com/vi/HJNCjktSgsc/sddefault.jpg",
        url: "https://youtu.be/HJNCjktSgsc",
      },
    ],
  },

  /****** SEASON TWO ******/
  {
    seasonNumber: 2,
    seasonName: "Season Two",
    episodes: [
      // EPISODE ONE
      {
        uuid: "201",
        episodeNumber: 1,
        episodeName:
          "Investing in Chicago's Future: Connecting Talent from Underserved Communities",
        sponsors: [],
        image: "https://img.youtube.com/vi/ogLHwOJ2D3A/sddefault.jpg",
        url: "https://youtu.be/ogLHwOJ2D3A",
      },

      // EPISODE ONE | SHORT 1
      {
        uuid: "201_1",
        episodeNumber: 1,
        episodeName: "CEO of Hyatt, Powerful Community Impact of Skills",
        sponsors: [],
        image: "https://img.youtube.com/vi/6q9bBrkEHRc/sddefault.jpg",
        url: "https://youtu.be/6q9bBrkEHRc",
      },

      // EPISODE ONE | SHORT 2
      {
        uuid: "201_2",
        episodeNumber: 1,
        episodeName: "Skills for Chicagoland's Future Services Offerings",
        sponsors: [],
        image: "https://img.youtube.com/vi/b087_zHhyy4/sddefault.jpg",
        url: "https://youtu.be/b087_zHhyy4",
      },

      // EPISODE ONE | SHORT 3
      {
        uuid: "201_3",
        episodeNumber: 1,
        episodeName: "Impact of the Second Chance Program on Communities",
        sponsors: [],
        image: "https://img.youtube.com/vi/UdgceGWASOw/sddefault.jpg",
        url: "https://youtu.be/UdgceGWASOw",
      },

      // EPISODE TWO
      {
        uuid: "202",
        episodeNumber: 2,
        episodeName: "Former CIA Head of Recruiting Shares Leadership Insight",
        sponsors: [],
        image: "https://img.youtube.com/vi/t6r9BweCLGs/sddefault.jpg",
        url: "https://youtu.be/t6r9BweCLGs",
      },

      // EPISODE TWO | SHORT 1
      {
        uuid: "202_1",
        episodeNumber: 2,
        episodeName: "How Versatility Can Help or Hurt Your Leadership",
        sponsors: [],
        image: "https://img.youtube.com/vi/GGFUQVPn1d0/sddefault.jpg",
        url: "https://youtu.be/GGFUQVPn1d0",
      },

      // EPISODE THREE
      {
        uuid: "203",
        episodeNumber: 3,
        episodeName:
          "Leadership Insights from 50 Four-Star Generals & Admirals",
        sponsors: [],
        image: "https://img.youtube.com/vi/vcwAENvxgq8/sddefault.jpg",
        url: "https://youtu.be/vcwAENvxgq8",
      },

      // EPISODE FOUR
      {
        uuid: "204",
        episodeNumber: 4,
        episodeName:
          "HR Innovation and Business Growth With FutureSolve's COO Andy Najja",
        sponsors: [],
        image: "https://img.youtube.com/vi/QPowbQ0l-OU/sddefault.jpg",
        url: "https://youtu.be/QPowbQ0l-OU",
      },

      // EPISODE FIVE
      {
        uuid: "205",
        episodeNumber: 5,
        episodeName:
          "HR Expert Ken Carrig on Building a Strong Succession Plan for Business Leaders",
        sponsors: [],
        image: "https://img.youtube.com/vi/u4Bx4vSj5QQ/sddefault.jpg",
        url: "https://youtu.be/u4Bx4vSj5QQ",
      },

      // EPISODE SIX
      {
        uuid: "206",
        episodeNumber: 6,
        episodeName: "Using Data to Improve Health Outcomes with CEO Bob Darin",
        sponsors: [],
        image: "https://img.youtube.com/vi/MXQwlTf34CE/sddefault.jpg",
        url: "https://youtu.be/MXQwlTf34CE",
      },

      // EPISODE SEVEN
      {
        uuid: "207",
        episodeNumber: 7,
        episodeName:
          "Strategic Talent Consulting & HR Value Creation in Business with Tom Corbitt",
        sponsors: [],
        image: "https://img.youtube.com/vi/Yj2Aq53mhY0/sddefault.jpg",
        url: "https://youtu.be/Yj2Aq53mhY0",
      },

      // EPISODE EIGHT
      {
        uuid: "208",
        episodeNumber: 8,
        episodeName:
          "College Recruiter Founder Steven Rothberg: Early Career Hiring & Talent Attraction Strategies",
        sponsors: [],
        image: "https://img.youtube.com/vi/G2Jy5y_wXyU/sddefault.jpg",
        url: "https://youtu.be/G2Jy5y_wXyU",
      },

      // EPISODE NINE
      {
        uuid: "209",
        episodeNumber: 9,
        episodeName:
          "Expert HR Insights: Talent Management & Leadership With Mark Griffin",
        sponsors: [],
        image: "https://img.youtube.com/vi/9-Y9H1b5PwA/sddefault.jpg",
        url: "https://youtu.be/9-Y9H1b5PwA",
      },

      // EPISODE TEN
      {
        uuid: "210",
        episodeNumber: 10,
        episodeName:
          "Maximizing Business Growth with Data Analysis with Amy Bush",
        sponsors: [],
        image: "https://img.youtube.com/vi/B3BQQmjK3nQ/sddefault.jpg",
        url: "https://youtu.be/B3BQQmjK3nQ",
      },

      // EPISODE ELEVEN
      {
        uuid: "211",
        episodeNumber: 11,
        episodeName:
          "Revolutionizing Employee Referral Programs w/ Real Links CEO Sam Davies",
        sponsors: [],
        image: "https://img.youtube.com/vi/qEAOVbQHs5A/sddefault.jpg",
        url: "https://youtu.be/qEAOVbQHs5A",
      },

      // EPISODE ELEVEN | SHORT 1
      {
        uuid: "211_1",
        episodeNumber: 11,
        episodeName:
          "Tech Hiring as an Example to Improve Recruitment Strategies w/ Real Links CEO Sam Davies",
        sponsors: [],
        image: "https://img.youtube.com/vi/jg1rFIARKjA/sddefault.jpg",
        url: "https://youtu.be/jg1rFIARKjA",
      },

      // EPISODE TWELVE
      {
        uuid: "212",
        episodeNumber: 12,
        episodeName:
          "Thoughtful Leadership, Finding Organizational Purpose w/ Helena Foulkes",
        sponsors: [],
        image: "https://img.youtube.com/vi/JTb67vdrKSA/sddefault.jpg",
        url: "https://youtu.be/JTb67vdrKSA",
      },

      // EPISODE TWELVE | SHORT 1
      {
        uuid: "212_1",
        episodeNumber: 12,
        episodeName:
          "Helena Foulkes Shares the Story Behind How CVS Quit Smoking",
        sponsors: [],
        image: "https://img.youtube.com/vi/p0SpjTzXHFc/sddefault.jpg",
        url: "https://youtu.be/p0SpjTzXHFc",
      },
    ],
  },
];

//
//
//
//
//
//
//
//
//
//
//
//
// DO NOT TOUCH ANYTHING BELOW THIS LINE

export const getEpisodesBySeason = (seasonToFind: number) => {
  const foundSeason = PODCAST.filter(
    (season) => season.seasonNumber === seasonToFind
  )[0];

  return [...foundSeason.episodes].reverse();
};

export const getEpisodesBySponsor = (uuid: string) => {
  const sponsoredEpisodes: episodeType[] = [];

  PODCAST.forEach((season) => {
    season.episodes.forEach((episode) => {
      episode.sponsors.forEach((id) => {
        if (id === uuid) {
          sponsoredEpisodes.push(episode);
        }
      });
    });
  });

  return sponsoredEpisodes;
};
