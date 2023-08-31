import React from "react";

// components
import Layout, { LayoutProps } from "components/Layout";
import SponsorsPageComponent from "components/Pages/SponsorsPage";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const SponsorsPage: React.FC & { Layout: React.FC<LayoutProps> } = () => {
  return <SponsorsPageComponent />;
};

SponsorsPage.Layout = Layout;

export default SponsorsPage;
