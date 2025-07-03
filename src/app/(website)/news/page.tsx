// @ts-nocheck
"use client";
import React from "react";
// components
import Articles from "@/src/components/features/Articles";
import FeaturedNews from "@/src/components/features/FeaturedNews";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const NewsPageComponent = () => {
  return (
    <>
      <FeaturedNews color="secondary" />
      <Articles />
    </>
  );
};

export default NewsPageComponent;
