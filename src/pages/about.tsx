import React from "react";

// components
import Layout, { LayoutProps } from "components/Layout";
import AboutPageComponent from "components/Pages/AboutPage";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const AboutPage: React.FC & { Layout: React.FC<LayoutProps> } = () => {
  return <AboutPageComponent />;
};

AboutPage.Layout = Layout;

export default AboutPage;
