import React from "react";

// components
import Layout, { LayoutProps } from "components/Layout";
import TOUPageComponent from "components/Pages/TOUPage";

const TOU: React.FC & { Layout: React.FC<LayoutProps> } = () => {
  return <TOUPageComponent />;
};

TOU.Layout = Layout;

export default TOU;
