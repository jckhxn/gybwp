// @ts-nocheck
import { Badge } from "@/src/app/components/ui/badge";
import { Button } from "@/src/app/components/ui/button";

import Image from "next/image";
import Link from "next/link";

// Sanity client

import { CTA } from "../HomePage/static-data";
import EpisodeCard from "../EpisodeCard";
import { SanityDocument } from "next-sanity";
import { urlFor } from "@/src/app/lib/utils";

export default function EpisodeDetails({
  data,
  draftMode,
}: {
  data: SanityDocument;
  draftMode: boolean;
}) {
  if (data.length === 0 && !draftMode) throw new Error("No episode found.");
  if (data.length === 0 && draftMode)
    return <h1>Add more data to preview changes.</h1>;

  return (
    <div className="bg-light flex flex-col items-center overflow-hidden">
      <section>
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
            <div className="space-y-8">
              <div className="m-auto" />
              {/* Mobile version of youtube embed.  */}
              <iframe
                className="block sm:hidden rounded-lg w-full"
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
                className="hidden sm:block rounded-lg w-full"
                width="560"
                height="515"
                src={`https://www.youtube.com/embed/${data[0]?.url?.split("/")[3]}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              ></iframe>
              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                {data[0]?.prevEpisode ? (
                  <Link href={`/episode/${data[0]?.prevEpisode}`}>
                    <Button size="sm" variant="default">
                      <ChevronLeftIcon className="h-4 w-4" />
                      Previous
                    </Button>
                  </Link>
                ) : null}

                {data[0]?.nextEpisode ? (
                  <Link href={`/episode/${data[0]?.nextEpisode}`}>
                    <Button size="sm" variant="default">
                      Next
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : null}
              </div>
              <div className="px-4 sm:px-0 space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  {data[0] ? data[0]?.youtube?.title : "No title presented"}
                </h2>
                {/* Podcast Links */}
                <div className="flex flex-wrap items-center gap-2">
                  {data[0]?.podcastLinks?.length > 0
                    ? data[0]?.podcastLinks?.map(
                        (podcast: any, idx: number) => (
                          <Link key={idx} href={podcast?.link || "#"}>
                            <Badge className="text-white" variant="default">
                              {podcast?.name}
                            </Badge>
                          </Link>
                        )
                      )
                    : null}
                </div>
              </div>
              {/* Episode Parts */}
              {data[0]?.allParts && data[0]?.allParts?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Episode Parts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {data[0]?.allParts?.map(
                      (
                        {
                          youtube: { title, blurb },
                          image,
                          seasonNumber,
                          episodeNumber,
                          uuid,
                        },
                        index
                      ) => (
                        <EpisodeCard
                          key={index}
                          youtube={{ title, blurb }}
                          image={image}
                          seasonNumber={seasonNumber}
                          episodeNumber={episodeNumber}
                          uuid={uuid}
                        />
                      )
                    )}
                  </div>
                </div>
              )}
              {/* Episode Description */}
              <div className="px-4 sm:px-0 space-y-4">
                <h3 className="text-2xl font-bold">Short Description</h3>
                <p className="text-gray-700 dark:text-gray-600">
                  {data ? data[0]?.blurb : "No description provided"}
                </p>
              </div>
              <div className="px-4 sm:px-0 space-y-4">
                <h3 className="text-2xl font-bold">Featured Guests</h3>
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
                              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-600">
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
              <div className="space-y-4">
                <h3 className=" px-5 sm:px-0 text-2xl font-bold">
                  Full Episode Description
                </h3>
                {/* Text pre-wrap does some goddamn awful things to the rest of the CSS */}
                {/* But only on mobile chrome and safari. */}
                <p className=" w-screen sm:w-full px-5 sm:px-0 whitespace-pre-wrap text-gray-700">
                  {data ? data[0]?.youtube?.description : null}
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className=" px-5 sm:px-0 space-y-4">
                <h3 className="text-2xl font-bold mt-4">Sponsors</h3>
                <div className="grid grid-cols-2 gap-4">
                  {data &&
                    data[0]?.sponsors?.map(({ uuid, image, bgColor }, idx) => (
                      <div
                        key={idx}
                        className="flex justify-center mt-8 md:mt-0"
                      >
                        <div
                          className={`${
                            bgColor || "bg-black"
                          } overflow-hidden rounded-full`}
                        >
                          <Link href={`/sponsors/${uuid}`}>
                            <Image
                              className="aspect-[2/2]  object-contain"
                              src={image}
                              alt=""
                              height={120}
                              width={120}
                            />
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
                <Button className="w-full" variant="primary">
                  Support Our Sponsors
                </Button>
              </div>
              {data[0]?.content ? (
                <>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Additional Content</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {data[0]?.content?.files?.map(
                        ({ name, image, type }, idx) => {
                          switch (type) {
                            case "image":
                              return (
                                <div key={idx}>
                                  <Image
                                    alt="Related Image"
                                    className="w-full rounded-md"
                                    height={260}
                                    src={image}
                                    style={{
                                      objectFit: "cover",
                                    }}
                                    width={260}
                                  />
                                </div>
                              );
                            case "link":
                              return <></>;
                            default:
                              return null;
                          }
                        }
                      )}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 rounded-md w-full flex justify-center items-center">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Subscribe to our podcast
            </h2>
            <p className="text-gray-700 dark:text-gray-600">
              Subscribe today and embark on a transformative journey towards
              driving business success through strategic people management.
            </p>
            <Button asChild>
              <Link href={CTA.buttonUrl}>{CTA.buttonText}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

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
