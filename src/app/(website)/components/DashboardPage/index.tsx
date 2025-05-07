"use client";
import React from "react";
import config from "../../../../../sanity.config";
import { NextStudio } from "next-sanity/studio";

export const DashComponent = () => {
  // The disableTransition prop is not supported on DOM elements in React
  // It should only be used with specific Sanity components that support it
  return <NextStudio config={config} />;
};

export default DashComponent;
