// images
import facebook from "public/social-logos/facebook.png";

export type sponsorUUIDs =
  | "abcd-typed"
  | "efgh-typed"
  | "ijkl-typed"
  | "mnop-typed"
  | "qrst-typed";

export type socialsType = {
  name: string;
  link: string;
  icon: string;
};

export type sponsorType = {
  name: string;
  uuid: sponsorUUIDs;
  imgUrl: string;
  imgAlt: string;
  description: string;
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
    name: "abcd",
    uuid: "abcd-typed",
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras fermentum odio eu feugiat pretium nibh ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper.",
    socials: [
      {
        name: "facebook",
        link: "http://www.facebook.com/abcd-typed",
        icon: facebook.src,
      },
      {
        name: "facebook",
        link: "http://www.facebook.com/abcd-typed",
        icon: facebook.src,
      },
      {
        name: "facebook",
        link: "http://www.facebook.com/abcd-typed",
        icon: facebook.src,
      },
      {
        name: "facebook",
        link: "http://www.facebook.com/abcd-typed",
        icon: facebook.src,
      },
      {
        name: "facebook",
        link: "http://www.facebook.com/abcd-typed",
        icon: facebook.src,
      },
      {
        name: "facebook",
        link: "http://www.facebook.com/abcd-typed",
        icon: facebook.src,
      },
    ],
  },
  {
    name: "efgh",
    uuid: "efgh-typed",
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
    description: "",
    socials: [],
  },
  {
    name: "ijkl",
    uuid: "ijkl-typed",
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
    description: "",
    socials: [],
  },
  {
    name: "mnop",
    uuid: "mnop-typed",
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
    description: "",
    socials: [],
  },
  {
    name: "qrst",
    uuid: "qrst-typed",
    imgUrl:
      "https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png",
    imgAlt: "",
    description: "",
    socials: [],
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
