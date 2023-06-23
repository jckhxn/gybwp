import React from "react";

// components
import Layout, { LayoutProps } from "components/Layout";
import PrivacyPageComponent from "components/Pages/PrivacyPage";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const PrivacyPage: React.FC & { Layout: React.FC<LayoutProps> } = () => {
  return <PrivacyPageComponent />;
};

PrivacyPage.Layout = Layout;

export default PrivacyPage;
