import React from "react";

// components
import Layout, { LayoutProps } from "components/Layout";
import NewsPageComponent from "components/Pages/News";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const NewsPage: React.FC & { Layout: React.FC<LayoutProps> } = () => {
  return <NewsPageComponent />;
};

NewsPage.Layout = Layout;

export default NewsPage;
