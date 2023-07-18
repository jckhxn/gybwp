// images
import * as logos from "components/Socials/logos";

export type sponsorUUIDs =
  | "bayard"
  | "sevenstep"
  | "paradox"
  | "survale"
  | "futureSolve";

export type socialsType = {
  name: string;
  link: string;
  icon: string;
};

export type sponsorType = {
  name: string;
  uuid: sponsorUUIDs;
  imgUrl: string;
  bgColor?: string;
  imgAlt: string;
  description: string[];
  socials: socialsType[];
};

//
//
//
//
//
//
//
//
// ONLY TOUCH THINGS BELOW THIS LINE

export const SPONSORS: sponsorType[] = [
  {
    name: "Bayard Advertising Agency, Inc",
    uuid: "bayard",
    imgUrl:
      "https://mma.prnewswire.com/media/1758516/BYD_Icon_BayBlue_2_Logo.jpg",
    bgColor: "bg-[#0071f5]",
    imgAlt: "Bayard logo",
    description: [
      "Since 1923, Bayard has been a pioneer in the recruitment marketing space. With a focus on innovation, Bayard partners with employers across multiple industries, including transportation and logistics, healthcare, retail, and food service, to engage and acquire the most qualified and diverse candidates. As a full-service agency, Bayard helps companies achieve their hiring goals through proven, cost-effective methods that deliver high ROI.",
      "Bayard's suite of services is broken down into five main categories: insights, creative, media, recruitment process outsourcing, and recruitment automation. Led by a team of industry veterans, Bayard’s adaptable solutions are based on aggregated industry best practices and innumerable case studies. With nearly 100 years of business acumen, Bayard understands the array of challenges facing talent acquisition leaders and works efficiently — and collaboratively — to deliver results.",
      "At Bayard, We Get Talent.",
    ],
    socials: [
      {
        name: "home",
        link: "https://bayardad.com",
        icon: logos.home.src,
      },
      {
        name: "facebook",
        link: "https://www.facebook.com/wearebayard/",
        icon: logos.facebook.src,
      },
      {
        name: "linkedin",
        link: "https://www.linkedin.com/company/wearebayard/",
        icon: logos.linkedin.src,
      },
      {
        name: "instagram",
        link: "https://www.instagram.com/wearebayard/",
        icon: logos.instagram.src,
      },
    ],
  },
  {
    name: "Sevenstep",
    uuid: "sevenstep",
    imgUrl: "https://www.sevensteptalent.com/hubfs/Ironpaper/Sevenstep.svg",
    bgColor: "bg-[#0f3d51]",
    imgAlt: "Sevenstep logo",
    description: [
      "Sevenstep provides the technology, expertise, and support to navigate today's complex, evolving talent market. Clients rely on us for our ecosystem of capabilities, deep experience, and unique workforce intelligence technology to deliver the right mix of talent. Our capabilities span all facets of talent acquisition, including:",
      "Total Talent Solutions: Empowering organizations to draw from flexible and permanent workforces to achieve business outcomes and gain competitive advantage in challenging labour markets",
      "Recruitment Process Outsourcing (RPO): Experienced team, proprietary workforce intelligence platform, and record of success delivering on hard-to-fill roles, project recruitment, and tech-enabled high-volume workforce needs",
      "Managed Services Provider (MSP) Solutions: Managing contingent workforce suppliers and channels for better access to talent, workforce visibility, cost control, and ability to directly source candidates",
      "Sevayo® Insights Workforce Intelligence: Proprietary platform applying predictive intelligence aggregated from all data sources with a level of detail and flexibility other solutions cannot meet, enabling clients to navigate complex and changing market conditions",
    ],
    socials: [
      {
        name: "home",
        link: "www.sevensteptalent.com",
        icon: logos.home.src,
      },
      {
        name: "facebook",
        link: "https://www.facebook.com/SevenstepTalent",
        icon: logos.facebook.src,
      },
      {
        name: "linkedin",
        link: "https://www.linkedin.com/company/sevenstep",
        icon: logos.linkedin.src,
      },
      {
        name: "twitter",
        link: "https://twitter.com/SevenstepTalent",
        icon: logos.twitter.src,
      },
    ],
  },
  {
    name: "Paradox",
    uuid: "paradox",
    imgUrl:
      "https://assets-global.website-files.com/611dc730a416cbf8f5934ebc/6259ba6bc764193e06a8f146_paradox-logo-color.svg",
    bgColor: "bg-white",
    imgAlt: "Paradox logo",
    description: [
      "Every great hire starts with hello. Meet the conversational recruiting software that automates the work your teams don't have time for — taking candidates from hello to hired faster than ever.",
      "Our conversational software was built with one purpose: to make your job easier. Recruiting teams are the heart of every great organization — and we don't want to see them wasted toiling away with cumbersome technology that only slows them down. Honestly, we're the software company that doesn't want you to use our software. Let us handle the things you don't have time to do, so you can do more of what you love.",
    ],
    socials: [
      {
        name: "home",
        link: "https://www.paradox.ai/",
        icon: logos.home.src,
      },
      {
        name: "facebook",
        link: "https://www.facebook.com/paradoxolivia",
        icon: logos.facebook.src,
      },
      {
        name: "linkedin",
        link: "https://www.linkedin.com/company/paradoxolivia/",
        icon: logos.linkedin.src,
      },
      {
        name: "instagram",
        link: "https://www.instagram.com/paradoxolivia/",
        icon: logos.instagram.src,
      },
    ],
  },
];

export const PARTNERS = [
  {
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
  },
  {
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
  },
  {
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
  },
  {
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
  },
  {
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
  },
  {
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
  },
  {
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
  },
  {
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
  },
  {
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
  },
  {
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
  },
  {
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
  },
  {
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
  },
];

export const SPONSORS_INFO = {
  sponsorsHeader: "Our Sponsors",
  partnerHeader: "Our Partners",
};
