import React from "react";

// components
import Layout, { LayoutProps } from "components/Layout";
import ConsultingPageComponent from "components/Pages/ConsultingPage";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const ConsultingPage: React.FC & { Layout: React.FC<LayoutProps> } = () => {
  return <ConsultingPageComponent />;
};

ConsultingPage.Layout = Layout;

export default ConsultingPage;
