"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// components
import Button from "components/Button";
import { Section, SectionHeading } from "components/shared";
import Collection from "components/Collection";
import Image from "next/image";

// copy
import { SPONSORS_DETAILS_INFO, getSponsor } from "./static-data";
import { sponsorType } from "components/Pages/SponsorsPage/static-data";
import { getEpisodesBySponsor } from "components/Pages/HomePage/static-data";
import { episodeType } from "components/Pages/HomePage/episode-data";
import Socials from "components/Socials";
import routes from "routes";

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
  const router = useRouter();

  useEffect(() => {
    const id = window.location.pathname.split("/sponsors/")[1];
    const foundSponsor = getSponsor(id);
    const queriedSponsor = {
      ...foundSponsor,
      episodes: getEpisodesBySponsor(id),
    };

    if (foundSponsor) {
      setSponsor(queriedSponsor);
    } else {
      router.push(routes.internal.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                {sponsor.name}
              </SectionHeading>

              {sponsor.description.map((paragraph, idx) => (
                <div
                  key={`${sponsor.name} description paragraph ${idx}`}
                  className="xl:max-w-lg"
                >
                  <br />
                  {paragraph}
                </div>
              ))}

              {sponsor.socials && <Socials socials={sponsor.socials} />}
            </div>

            <div className="flex justify-center mt-8 md:mt-0">
              <div
                className={`${
                  sponsor.bgColor || ""
                } w-[80vw] h-[80vw] max-h-[25rem] max-w-[25rem] md:w-[25rem] md:h-[25rem] flex-shrink-0 overflow-hidden rounded-full`}
              >
                <Image
                  className="m-auto px-4 h-[80vw] max-h-[25rem]"
                  src={sponsor.imgUrl}
                  alt={sponsor.imgAlt}
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
