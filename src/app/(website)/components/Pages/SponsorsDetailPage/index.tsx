// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// components
import Button from "../../Button";
import { Section, SectionHeading } from "../../shared";
import Collection from "../../Collection";
import Image from "next/image";

// copy
import { SPONSORS_DETAILS_INFO, getSponsor } from "./static-data";
import { sponsorType } from "../SponsorsPage/static-data";
import { getEpisodesBySponsor } from "../HomePage/static-data";
import { episodeType } from "../HomePage/episode-data";
import Socials from "../../Socials";
import routes from "routes";

// SWR
import useSWR from "swr";
import { client } from "../../../sanity/sanity-utils";

import { SPONSOR_DETAILS_QUERY } from "../../../lib/queries";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

export interface compiledSponsorType extends sponsorType {
  episodes: episodeType[];
}

const SponsorsDetailPageComponent = () => {
  const [sponsor, setSponsor] = useState<compiledSponsorType>();

  const pathname = usePathname();
  const id = pathname.split("/sponsors/")[1];

  // Return sponsor details and episodes for sponsor ID
  // sponsors array has sponsor details
  //  episodes where sponsors[] = id
  // setSponsor is an object with {...foundSponsor (details),episodes:(sponsored episodes)}

  const { data, error, isLoading } = useSWR(SPONSOR_DETAILS_QUERY, (query) =>
    client.fetch(query, { id })
  );

  useEffect(() => {
    if (!isLoading) {
      const { sponsors, episodes } = data;

      setSponsor({
        ...sponsors,
        episodes,
      });
    }
  }, [data, id, isLoading]);

  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading) {
  //     const foundSponsor = getSponsor(id, data);

  //     const queriedSponsor = {
  //       ...foundSponsor,
  //       episodes: getEpisodesBySponsor(id, data),
  //     };

  //     if (foundSponsor) {
  //       setSponsor(queriedSponsor);
  //     } else {
  //       // router.push(routes.internal.error);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (!sponsor) {
    return null;
  }

  return (
    <>
      <Section flex className="bg-main">
        <div className="md:px-20 py-6 w-full">
          <Button
            as="a"
            href={SPONSORS_DETAILS_INFO.buttonUrl}
            className="ml-8 md:ml-0 px-10 py-2 mt-4"
            color="primary"
          >
            {SPONSORS_DETAILS_INFO.buttonText}
          </Button>

          <div className="flex flex-col-reverse xl:flex-row flex-wrap justify-around mx-10 mb-10">
            <div className="flex flex-col mt-12 text-white">
              <SectionHeading className="text-3xl mb-3">
                {sponsor[0].name}
              </SectionHeading>
              <div className="xl:max-w-lg">{sponsor[0].description}</div>

              {/* {sponsor.description.map((paragraph, idx) => (
                <div
                  key={`${sponsor.name} description paragraph ${idx}`}
                  className="xl:max-w-lg"
                >
                  <br />
                  {paragraph}
                </div>
              ))} */}

              {sponsor[0].social && <Socials socials={sponsor[0].social} />}
            </div>

            <div className="flex justify-center mt-8 md:mt-0">
              <div
                className={`${
                  sponsor[0].bgColor || ""
                } w-[80vw] h-[80vw] max-h-[25rem] max-w-[25rem] md:w-[25rem] md:h-[25rem] flex-shrink-0 overflow-hidden rounded-full`}
              >
                <Image
                  className="m-auto px-4 h-[80vw] max-h-[25rem]"
                  src={sponsor[0].image}
                  alt=""
                  height={400}
                  width={400}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {sponsor.episodes.length ? (
        <Collection
          header={SPONSORS_DETAILS_INFO.collectionHeader}
          items={sponsor.episodes}
        />
      ) : null}
    </>
  );
};

export default SponsorsDetailPageComponent;
