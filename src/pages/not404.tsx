import React from "react";

// components
import Layout, { LayoutProps } from "components/Layout";
import ErrorPageComponent from "components/Pages/ErrorPage";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const ErrorPage: React.FC & { Layout: React.FC<LayoutProps> } = () => {
  return <ErrorPageComponent />;
};

ErrorPage.Layout = Layout;

export default ErrorPage;
