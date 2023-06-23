// components
import logo from "images/logo.png";
import { StaticImageData } from "next/image";

export const footer: {
  companyLogo: StaticImageData;
  incorporatedDate: number;
  currentYear: number;
} = {
  companyLogo: logo,
  incorporatedDate: 2023,
  currentYear: new Date().getFullYear(),
};
