import React from "react";

// components
import Image from "next/image";
import { Section, SectionHeading } from "components/shared";
import defaultImageSrc from "public/images/logo.png";

// copy
import { NEWS_INFO } from "./static-data";
import { FEATURED_ARTICLES } from "components/Pages/News/static-data";

interface FeaturedNewsProps {
  color: "light" | "secondary";
}

const FeaturedNews = ({ color = "light" }: FeaturedNewsProps) => {
  if (FEATURED_ARTICLES.length) {
    const fontColor = color === "light" ? "black" : "white";

    return (
      <Section className={`${color === "light" ? "bg-light" : "bg-secondary"}`}>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <SectionHeading
              className={`text-3xl font-thin sm:text-4xl text-${fontColor}`}
            >
              {NEWS_INFO.header}
            </SectionHeading>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_ARTICLES.map(
              ({ company, title, description, linkUrl, imgSrc }, idx) => (
                <div key={`article-${idx}`}>
                  <a
                    href={linkUrl}
                    target="_blank"
                    className="block rounded-md p-4 text-center group"
                  >
                    <Image
                      height={224}
                      width={450}
                      alt={`featured article by ${company}`}
                      src={imgSrc || defaultImageSrc}
                      className="h-56 w-full rounded-sm object-cover"
                    />

                    <div className="mt-8">
                      <dl>
                        <div>
                          <dt className="sr-only">Title</dt>
                          <dd
                            className={`font-bold pb-2 text-${fontColor} group-hover:text-${
                              color === "light" ? "black" : "white"
                            }`}
                          >
                            {title}
                          </dd>
                        </div>

                        <div>
                          <dt className="sr-only">Description</dt>
                          <dd
                            className={`text-sm text-gray-${
                              color === "light" ? "500" : "300"
                            } group-hover:text-${
                              color === "light" ? "black" : "white"
                            }`}
                          >
                            {description}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </a>
                </div>
              )
            )}
          </div>
        </div>
      </Section>
    );
  }

  return null;
};

export default FeaturedNews;
