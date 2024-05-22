"use client";
import React from "react";
import config from "../../../../sanity.config";
import { NextStudio } from "next-sanity/studio";

export const DashComponent = () => {
  return <NextStudio config={config} />;
};

export default DashComponent;
