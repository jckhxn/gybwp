"use client";
import React, { useState } from "react";

// components
import Image from "next/image";
import { Section, SectionHeading } from "components/shared";
import heroImage from "../../../../public/images/main-page-hero.jpg";
import Button from "components/Button";
import FeaturedNews from "components/FeaturedNews";
import Dropdown from "components/Dropdown";

// State
import { login, logOut } from "../../../redux/reducers/episodesSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/store";
// copy
import { HERO, PODCAST, CTA, getEpisodesBySeason } from "./static-data";
import Slider from "components/Slider";
import { AppDispatch } from "../../../redux/store";

const HomePageComponent = () => {
  const [activeSeason, setActiveSeason] = useState(PODCAST.length);
  const dispatch = useDispatch<AppDispatch>();
  dispatch(login("jack"));
  const episodes = useAppSelector((state) => state.authReducer);
  console.log(episodes);

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
          className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:w-auto sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:w-auto md:rounded-ss-[60px]"
        />
      </Section>

      {/* EPISODES */}
      <Section className="mt-8 mb-12 py-8 px-4 overflow-x-hidden h-[700px]">
        <div className="flex gap-8 justify-between mt-8 mx-8 md:mx-[10vw]">
          <div className="w-full mx-0">
            <h1 className="leading-normal text-lg">{`Season ${activeSeason}`}</h1>
          </div>

          <Dropdown setActiveSeason={setActiveSeason} />
        </div>

        <Slider
          activeSeason={activeSeason}
          items={getEpisodesBySeason(activeSeason)}
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

          <div className="mx-auto mt-8 max-w-xl text-center">
            <Button
              as="a"
              color={"white"}
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
