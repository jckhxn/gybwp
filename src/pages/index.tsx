import React from "react";

// components
import Layout, { LayoutProps } from "components/Layout";
import HomePageComponent from "components/Pages/HomePage";

const HomePage: React.FC & { Layout: React.FC<LayoutProps> } = () => {
  return <HomePageComponent />;
};

HomePage.Layout = Layout;

export default HomePage;
