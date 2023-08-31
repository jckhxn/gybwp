import React from "react";

// components
import Layout, { LayoutProps } from "components/Layout";
import SponsorsDetailPageComponent from "components/Pages/SponsorsDetailPage";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const SponsorsDetailPage: React.FC & { Layout: React.FC<LayoutProps> } = () => {
  return <SponsorsDetailPageComponent />;
};

SponsorsDetailPage.Layout = Layout;

export default SponsorsDetailPage;
