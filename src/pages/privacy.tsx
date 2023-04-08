import React from "react";

// components
import Layout, { LayoutProps } from "components/Layout";
import PrivacyPageComponent from "components/Pages/PrivacyPage";

const Privacy: React.FC & { Layout: React.FC<LayoutProps> } = () => {
  return <PrivacyPageComponent />;
};

Privacy.Layout = Layout;

export default Privacy;
