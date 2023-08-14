// components
import logo from "images/logo.png";
import { StaticImageData } from "next/image";

export const footer: {
  companyLogo: StaticImageData;
  incorporatedDate: number;
  currentYear: number;
  linkedin: string;
  facebook: string;
  instagram: string;
  twitter: string;
  tiktok: string;
  youtube: string;
} = {
  companyLogo: logo,
  incorporatedDate: 2023,
  currentYear: new Date().getFullYear(),
  linkedin:
    "https://www.linkedin.com/company/growing-your-business-with-people",
  facebook: "https://www.facebook.com/GYBWPpodcast",
  instagram: "https://www.instagram.com/growingyourbusinesswithpeople/",
  twitter: "https://twitter.com/GYBWPpodcast",
  tiktok: "https://www.tiktok.com/@gybwp",
  youtube: "https://www.youtube.com/@jkladvisors",
};
