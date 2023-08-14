import React, { useState } from "react";

// components
import { Section, SectionHeading } from "components/shared";

// copy
import { ABOUT_INFO } from "./static-data";
import Image from "next/image";
import Link from "next/link";
//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV
  // Design Ideas
  //  Section One About The Podcast, width of page
  //  Section Two CEO Msg, Article on the right 
const AboutPageComponent = () => {
  return (
    <>
      {/* INFORMATION */}
      <Section className="px-6 md:px-20">
        <div className="max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-light sm:text-4xl">
              {ABOUT_INFO.header}
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12">
            {ABOUT_INFO.features.map(({ title, description, article }, idx) => (
              <div
                key={`about-feature-${idx}`}
                className="flex items-start gap-4"
              >
                <div>
                  <h2 className="text-lg font-bold">{title}</h2>
                  {article ? (
                    <>
                      <Link href={article.link}>
                        <Image
                          className="h-56 w-full rounded-sm object-cover"
                          src={article.img}
                          alt={article.title}
                          height={224}
                          width={450}
                        />
                      </Link>

                      <h1 className="flex items-center justify-center">
                        {article.title}
                      </h1>
                    </>
                  ) : null}
                  <div className="mt-1 text-sm text-gray-700">
                    {description.map((d, idx) => (
                      <p key={`description-${idx}`}>{d}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* HERO */}
      {/* <Section className="mt-12">
        <section className="relative h-[500px] bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r" />
          <div className="relative h-[500px] justify-center mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:items-center">
            <div className="max-w-[50vw] m-auto sm:text-left">
              <h1 className="text-3xl text-center font-light sm:text-5xl">
                {CONSULTING_INFO.featuredImageText}
              </h1>
            </div>
          </div>
        </section>
      </Section> */}
    </>
  );
};

export default AboutPageComponent;
