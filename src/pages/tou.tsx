import React from "react";

// components
import Layout, { LayoutProps } from "components/Layout";
import TOUPageComponent from "components/Pages/TOUPage";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const TOUPage: React.FC & { Layout: React.FC<LayoutProps> } = () => {
  return <TOUPageComponent />;
};

TOUPage.Layout = Layout;

export default TOUPage;
