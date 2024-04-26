// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";

// components
import Image from "next/image";
import { Section, SectionHeading } from "components/shared";
import heroImage from "../../../../public/images/main-page-hero.jpg";
import Button from "components/Button";
import FeaturedNews from "../../FeaturedNews/";
import Dropdown from "components/Dropdown";

// copy
import { HERO, PODCAST, CTA, useGetEpisodesBySeason } from "./static-data";
import Slider from "components/Slider";
import { BuzzSproutPlayer } from "components/BuzzSproutPlayer";

// SWR
import useSWR from "swr";
import { groq, createClient } from "next-sanity";
const client = createClient({
  projectId: "hxymd1na",
  dataset: "production",
  apiVersion: "2023-08-22",

  useCdn: false,
});
const HomePageComponent = () => {
  const [activeSeason, setActiveSeason] = useState();

  // This groq query returns all the seasons, in order.
  //  This needs to only return seasons with episodes in them
  //
  //   *[_type == "seasons"] | order(seasonNumber asc)
  // {
  //   seasonName,
  //     seasonNumber
  // }
  const { data, error, isLoading } = useSWR(
    groq`*[_type == "episode"] | order(uuid asc)
    {seasonName}`,
    (query) => client.fetch(query)
  );

  useEffect(() => {
    if (!isLoading) {
      // Create a new Set object to store the unique values.
      const set = new Set();

      // Iterate over the array of objects and add the value of the specified property to the Set.
      // @ts-ignore
      data.forEach((object) => {
        set.add(object["seasonName"]);
      });

      return setActiveSeason([...set].length);
    }
  }, [data]);

  return (
    <>
      {/* MAIN SECTION */}
      <Section className="overflow-hidden bg-main sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <SectionHeading className="font-bold text-gray-200 md:mt-4">
              {HERO.header}
            </SectionHeading>

            <p className="text-gray-300 mt-4 md:mt-6 md:block">{HERO.body}</p>

            <div className="md:ml-8 mt-8 md:mt-10 flex-col">
              <Button
                as="a"
                target="_blank"
                color="primary"
                href={HERO.buttonUrl}
                className="px-12 py-3 m-1"
              >
                {HERO.buttonText}
              </Button>
              <Button
                as="a"
                target="_blank"
                color="primary"
                href={HERO.secondButtonUrl}
                className="px-12 py-3 m-1"
              >
                {HERO.secondButtonText}
              </Button>
            </div>
          </div>
        </div>

        <Image
          priority
          loading="eager"
          alt="Main Page Hero"
          src={heroImage}
          className="h-full w-full object-cover  sm:h-auto sm:w-auto sm:max-h-[calc(100%-2rem)] sm:self-end sm:rounded-ss-[30px] md:h-auto md:w-auto md:max-h-[calc(100%-4rem)] md:rounded-ss-[60px]"
        />
      </Section>
      {/* Large Podcast Playa */}
      <Section className="">
        <BuzzSproutPlayer lg />
      </Section>
      {/* EPISODES */}
      <Section className="mt-8 mb-12 py-8 px-4 overflow-x-hidden h-[700px]">
        <div className="flex gap-8 justify-between mt-8 mx-8 md:mx-[10vw]">
          <div className="w-full mx-0">
            <h1 className="leading-normal text-lg">{`Season ${
              activeSeason || ""
            }`}</h1>
          </div>

          <Dropdown setActiveSeason={setActiveSeason} />
        </div>

        <Slider
          activeSeason={activeSeason}
          items={useGetEpisodesBySeason(activeSeason)}
        />
      </Section>

      {/* CTA */}
      <Section className={`bg-secondary`}>
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <SectionHeading className="text-white text-3xl md:text-3xl">
              {CTA.header}
            </SectionHeading>

            <p className="hidden font-extralight text-white sm:mt-4 sm:block">
              {CTA.body}
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl text-center ">
            <Button
              as="a"
              color={"bg-[#0A66C2]"}
              href={CTA.buttonUrl}
              className="px-12 py-3"
            >
              {CTA.buttonText}
            </Button>
          </div>
        </div>
      </Section>

      {/* IN THE NEWS */}
      <FeaturedNews color="light" />
    </>
  );
};

export default HomePageComponent;
