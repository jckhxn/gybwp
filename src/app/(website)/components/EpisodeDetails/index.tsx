// @ts-nocheck
"use client";
import { Badge } from "@/src/app/(website)/components/ui/badge";
import { Button } from "@/src/app/(website)/components/ui/button";
import React, { useState } from "react";
import Link from "next/link";

import Image from "next/image";

import { Share2, X, Facebook, Twitter, Linkedin, Mail } from "lucide-react";

// Sanity client

import { SanityDocument } from "next-sanity";
import { urlFor } from "@/src/app/(website)/lib/utils";
import JSONLD from "../SEO/jsonld";
type YoutubeData = {
  title?: string;
  blurb?: string;
  description?: string;
  uuid?: string;
  seasonNumber?: number;
  episodeNumber: number;
  thumbnail?: string;
};

type Props = {
  draftMode: boolean;
  data: SanityDocument;
  image?: string;
  uuid?: string;
  youtube?: YoutubeData;
  seasonNumber?: number;
  episodeNumber?: number;
};

const EpisodeCard = ({
  data,
  youtube = {
    title: "No title presented",
    description: "No description provided",
    blurb: "No description provided",
    uuid: "100",
    seasonNumber: 0,
    episodeNumber: 0,
    thumbnail: "/api/placeholder/600/400",
  },
  draftMode,
}: Props) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const shareLinks = [
    {
      name: "Facebook",
      icon: <Facebook size={24} />,
      color: "bg-blue-600",
      getShareUrl: (url) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Twitter",
      icon: <Twitter size={24} />,
      color: "bg-sky-500",
      getShareUrl: (url) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={24} />,
      color: "bg-blue-700",
      getShareUrl: (url) =>
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
    },
    {
      name: "Email",
      icon: <Mail size={24} />,
      color: "bg-red-500",
      getShareUrl: (url) =>
        `mailto:?subject=Check%20out%20this%20episode&body=${encodeURIComponent(url)}`,
    },
  ];

  const ShareModal = () => {
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : ``;

    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${isShareModalOpen ? "" : "hidden"}`}
        onClick={() => setIsShareModalOpen(false)}
      >
        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Share this episode</h3>
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex justify-center space-x-4">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.getShareUrl(currentUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link.color} text-white p-2 rounded-full hover:opacity-80 transition-opacity`}
                aria-label={`Share on ${link.name}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };
  if (data.length === 0 && !draftMode) throw new Error("No episode found.");
  if (data.length === 0 && draftMode)
    return <h1>Add more data to preview changes.</h1>;

  const structuredData = {
    "@context": "https://schema.org",

    "@type": "VideoObject",

    name: data[0]?.youtube?.title,

    description: data[0]?.blurb,

    url: data[0].url,
    thumbnailUrl: `https://i.ytimg.com/vi/${data[0]?.url?.split("/")[3]}/hqdefault.jpg`,

    uploadDate: "2024-03-23T00:00:00.000Z",

    contentUrl: `https://www.youtube.com/watch?v=${data[0]?.url?.split("/")[3]}`,

    embedUrl: `https://www.youtube.com/embed/${data[0]?.url?.split("/")[3]}`,
  };

  return (
    <>
      {/* Pass along rich data */}
      <JSONLD data={structuredData} />
      <div className="bg-light min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="lg:flex lg:space-x-8">
            <div className="lg:w-2/3">
              <h1 className="text-3xl font-bold mb-4 text-[#293243]">
                {data[0] ? data[0]?.youtube?.title : "No title presented"}
              </h1>
              {/* Video Player  */}
              <div className="relative aspect-video mb-6 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="block sm:hidden rounded-lg w-full h-full"
                  width="360"
                  height="240"
                  src={`https://www.youtube.com/embed/${data[0]?.url?.split("/")[3]}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
                {/* Full version of youtube embed */}
                <iframe
                  className="hidden sm:block rounded-lg w-full h-full"
                  width="560"
                  height="515"
                  src={`https://www.youtube.com/embed/${data[0]?.url?.split("/")[3]}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mb-2">
                {data[0]?.prevEpisode ? (
                  <Link href={`${data[0]?.prevEpisode}`}>
                    <Button size="sm" variant="default">
                      <ChevronLeftIcon className="h-4 w-4" />
                      Previous
                    </Button>
                  </Link>
                ) : null}

                {data[0]?.nextEpisode ? (
                  <Link href={`${data[0]?.nextEpisode}`}>
                    <Button size="sm" variant="default">
                      Next
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : null}
              </div>
              {/* Podcast Links */}

              <div className="font-bold mb-2">Podcast Links</div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {data[0]?.podcastLinks?.length > 0
                  ? data[0]?.podcastLinks?.map((podcast: any, idx: number) => (
                      <Link key={idx} href={podcast?.link || "#"}>
                        <Badge className="text-white" variant="default">
                          {podcast?.name}
                        </Badge>
                      </Link>
                    ))
                  : null}
              </div>
              {/* Short Description */}
              {data[0]?.blurb ? (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    Short Description
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {data[0]?.blurb}
                  </p>
                </div>
              ) : null}

              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Featured Guests</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data
                    ? data[0]?.guests?.map(
                        ({ image, name, title, slug }, idx) => (
                          <div key={idx} className="flex items-center gap-4 ">
                            <Image
                              alt="Guest Avatar"
                              className="rounded-full"
                              src={
                                image
                                  ? urlFor(image).url()
                                  : "./placeholder.svg"
                              }
                              style={{
                                aspectRatio: "64/64",
                                objectFit: "cover",
                              }}
                              width={100}
                              height={100}
                            />
                            <div>
                              <h4 className="text-lg font-bold">{name}</h4>
                              <p className="text-gray-700 dark:text-gray-600">
                                {title}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-600 hover:underline">
                                <PodcastIcon className="w-4 h-4" />
                                <Link href={`/guest/${slug?.current || ""}`}>
                                  <span>More info.</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    : "No guests added to this episode"}
                </div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Full Episode Description
                </h2>
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 whitespace-pre-wrap">
                  {data[0]?.youtube?.description}
                </p>
                {data[0]?.youtube?.takeaways && (
                  <>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                      Key Takeaways:
                    </h3>
                    <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700">
                      {data[0]?.youtube?.takeaways.map((item, idx) => (
                        <li key={idx} className="pl-1">
                          <span className="absolute -ml-5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
            <aside className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Sponsors</h2>
                <div className="grid grid-cols-2 gap-4">
                  {data &&
                    data[0]?.season.sponsors?.map(
                      ({ uuid, image, bgColor }, idx) => (
                        <div
                          key={idx}
                          className="flex justify-center mt-8 md:mt-0"
                        >
                          <div
                            className={`${
                              bgColor || "bg-black"
                            } overflow-hidden rounded-full shadow-lg`}
                          >
                            <Link href={`/sponsors/${uuid}`}>
                              <Image
                                className="aspect-[2/2]  object-contain "
                                src={image}
                                alt=""
                                height={120}
                                width={120}
                              />
                            </Link>
                          </div>
                        </div>
                      )
                    )}
                </div>
                <Button className="w-full" variant="primary">
                  Support Our Sponsors!
                </Button>
              </div>
              <div className="bg-[#293243] text-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">
                  Subscribe to our podcast
                </h2>
                <p className="mb-4">
                  Subscribe today and embark on a transformative journey towards
                  driving business success through strategic people management.
                </p>
                <button className="bg-light text-[#293243] px-4 py-2 rounded-full hover:bg-opacity-90 transition w-full">
                  Subscribe on LinkedIn
                </button>
              </div>
              {/* Replace the existing share button with this new one */}
              <div className="mt-6 flex justify-center">
                <button
                  className="flex items-center text-[#293243] hover:underline"
                  onClick={() => setIsShareModalOpen(true)}
                >
                  <Share2 size={20} className="mr-2" />
                  Share this episode
                </button>
              </div>
              <ShareModal />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default EpisodeCard;

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function PodcastIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.85 18.58a9 9 0 1 0-9.7 0" />
      <path d="M8 14a5 5 0 1 1 8 0" />
      <circle cx="12" cy="11" r="1" />
      <path d="M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z" />
    </svg>
  );
}
