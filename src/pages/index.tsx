import React from "react";

// components
import Layout, { LayoutProps } from "components/Layout";
import HomePageComponent from "components/Pages/HomePage";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const HomePage: React.FC & { Layout: React.FC<LayoutProps> } = () => {
  return <HomePageComponent />;
};

HomePage.Layout = Layout;

export default HomePage;
//
