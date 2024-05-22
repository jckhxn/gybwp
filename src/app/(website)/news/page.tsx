// @ts-nocheck
"use client";
import React from "react";
// components
import Articles from "../components/Articles";
import FeaturedNews from "../components/FeaturedNews/index";

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
