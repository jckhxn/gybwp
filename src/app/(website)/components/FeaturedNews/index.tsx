// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";

// components
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "../shared";
import defaultImageSrc from "public/images/logo.webp";

// copy
import { NEWS_INFO } from "./static-data";
import { FEATURED_ARTICLES } from "../News/static-data";

import { ExternalLink } from "lucide-react";
import Button from "../ui/button";
// SWR
import useSWR from "swr";

import { FEATURED_ARTICLES_QUERY } from "../../lib/queries";
import { client } from "../../sanity/sanity-utils";
import {
  fetchOpenGraphImage,
  testImageLink,
  validateAndFetchImage,
} from "../../lib/utils";
import { SanityImage } from "../../lib/utils";
interface FeaturedNewsProps {
  color: "light" | "secondary";
}

const FeaturedNews = ({ color = "light" }: FeaturedNewsProps) => {
  const [featuredArticles, setFeaturedArticles] = useState([]);

  const { data, error, isLoading } = useSWR(FEATURED_ARTICLES_QUERY, (query) =>
    client.fetch(query)
  );

  useEffect(() => {
    if (!isLoading && data) {
      const articles = Object.keys(data).map((key) => data[key]);
      setFeaturedArticles(articles);
    }
  }, [data, isLoading]);

  // Image with fallback component
  const ImageWithFallback = ({ src, alt, ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
      console.log("Image failed to load, using default image");
      setImgSrc("/placeholder.svg");
    };

    useEffect(() => {
      setImgSrc(src);
    }, [src]);

    return <Image {...props} src={imgSrc} alt={alt} onError={handleError} />;
  };

  if (error) {
    return <div>Error loading featured articles.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const fontColor = color === "light" ? "black" : "white";

  return (
    <section
      className={`w-full py-12 md:py-24 lg:py-32 ${
        color === "secondary" ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div
              className={`inline-block rounded-lg px-3 py-1 text-sm ${
                color === "light"
                  ? "bg-primary text-white"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              In The News
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Featured In
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              GYBWP has been recognized by leading publications and media
              outlets.
            </p>
          </div>
          {/* Decorative separator */}
          <div className="w-16 h-1 bg-primary rounded-full my-4"></div>
        </div>

        <div className="mx-auto max-w-4xl py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {featuredArticles.map(
              ({ company, title, description, link, image }, idx) => (
                <div
                  key={`article-${idx}`}
                  className={`rounded-lg border p-6 shadow-sm ${
                    color === "light"
                      ? "bg-white hover:bg-gray-50"
                      : "bg-gray-50 hover:bg-white"
                  } transition-colors duration-200`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-28 h-28">
                      <SanityImage
                        data={image}
                        sizes="120px"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "contain",
                        }}
                        className="rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold">{company}</h3>
                      <p className="text-sm text-muted-foreground">
                        {description}
                      </p>
                      <Button
                        asChild
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-primary"
                      >
                        <Link
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <span>Read Article</span>
                          <ExternalLink className="ml-1 h-3 w-3 inline-flex" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
