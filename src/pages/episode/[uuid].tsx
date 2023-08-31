import React from "react";

// components
import Layout, { LayoutProps } from "components/Layout";
import PodcastDetailsPageComponent from "components/Pages/PodcastDetailsPage";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const PodcastDetailsPage: React.FC & { Layout: React.FC<LayoutProps> } = () => {
  return <PodcastDetailsPageComponent />;
};

PodcastDetailsPage.Layout = Layout;

export default PodcastDetailsPage;
