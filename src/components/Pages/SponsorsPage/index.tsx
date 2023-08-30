import React, { useEffect } from "react";

// components
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "components/shared";

// copy
import { SPONSORS, PARTNERS, SPONSORS_INFO } from "./static-data";
// State
import { getAllSponsors } from "../../../app/sanity/sanity-utils";
import { store } from "../../../redux/store";
//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const SponsorsPageComponent = () => {
  useEffect(() => {
    getAllSponsors();
  }, []);
  const sponsors = store.getState();
  if (sponsors) console.log(sponsors);
  return (
    <div className="bg-light my-4 mx-6 md:mx-12 py-16">
      {/* SPONSORS */}
      {SPONSORS.length && (
        <Section flex className="mx-6 lg:mx-24">
          <SectionHeading>{SPONSORS_INFO.sponsorsHeader}</SectionHeading>

          <div className="flex flex-wrap justify-center mt-12">
            {SPONSORS.map(({ name, uuid, imgUrl, imgAlt, bgColor }) => (
              <Link
                key={`sponsor-${name}`}
                href={`/sponsors/${uuid}`}
                className="m-3 lg:m-6"
              >
                <div
                  className={`${
                    bgColor || ""
                  } w-[250px] max-h-[150px] overflow-hidden`}
                >
                  <Image
                    src={imgUrl}
                    alt={imgAlt}
                    className="h-[150px] w-auto m-auto px-4"
                    width={250}
                    height={150}
                  />
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {SPONSORS.length && PARTNERS.length ? (
        <div className="mt-20"></div>
      ) : null}

      {/* PARTNERS */}
      {PARTNERS.length ? (
        <Section flex className="mx-1 lg:mx-12">
          <SectionHeading>{SPONSORS_INFO.partnerHeader}</SectionHeading>

          <div className="flex flex-wrap justify-center mt-12">
            {PARTNERS.map(({ imgAlt, imgUrl }, idx) => (
              <Image
                key={`partner-${idx}`}
                src={imgUrl}
                alt={imgAlt}
                className="m-2 lg:m-4"
                width={175}
                height={90}
              />
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
};

export default SponsorsPageComponent;
