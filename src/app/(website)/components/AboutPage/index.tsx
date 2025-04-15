/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uIc1pdBHifp
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import Link from "next/link";
import Image from "next/image";
// Static Images
import logo from "@/public/images/logo.webp";
import hero from "@/public/images/blueprint.webp";
import host from "@/public/images/consulting1.webp";
import { SVGProps } from "react";

export default function AboutPage() {
  return (
    <>
      <section className="bg-light w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center lg:items-start lg:text-left">
            <Image
              alt="Podcast Logo"
              className="rounded-full"
              src={logo}
              style={{
                height: "100px",
                width: "100px",
                aspectRatio: "100/100",
                objectFit: "cover",
              }}
            />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Growing Your Business With People
              </h1>
              <h1 className="text-2xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
                Our Mission
              </h1>
              <p className="max-w-[600px] text-gray-700 md:text-xl dark:text-gray-600">
                Our aim is to explore a range of subjects, supporting CEOs and
                leaders in advancing their businesses through their foremost
                asset - their people. With interviews featuring Fortune 100
                CEOs, startup trailblazers, bestselling authors, TEDx speakers,
                and industry pioneers, we provide actionable insights for
                optimizing Return on People in an engaging fireside chat format.
              </p>
            </div>
          </div>
          <Image
            alt="Podcast Hero"
            className="mx-auto rounded-lg object-cover object-center sm:w-full"
            height={600}
            src={hero}
            style={{
              aspectRatio: "800/600",
              objectFit: "cover",
            }}
            width={800}
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-100">
        <div className="container grid items-start justify-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Meet the Host
            </h2>
            <p className="max-w-[600px] text-gray-700 md:text-xl dark:text-gray-600">
              Get to know the passionate host behind Growing Your Business With
              People
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center space-y-3">
              <Image
                alt="Hero"
                className="relative flex   object-cover aspect-square shrink-0 overflow-hidden rounded-full"
                src={host}
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Jeff Lackey</h3>
                <p className="text-gray-500 dark:text-gray-400">Host, GYBWP</p>
              </div>
              <p className="text-mdm text-gray-700 dark:text-gray-600">
                I firmly believe people aren&apos;t just a company&apos;s most
                vital asset; they&apos;re an investment primed for growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-start justify-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              About the Podcast
            </h2>
            <p className="max-w-[600px] text-gray-700 md:text-xl dark:text-gray-600">
              Learn more about the podcast and how you can connect with us.
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">
                Episode Release Schedule
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                New episodes are released every Tuesday.
              </p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">Topics Covered</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Business Leadership, Talent Aquisition, and more.
              </p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">Follow and Subscribe</h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  className="inline-flex items-center gap-2"
                  href="https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511"
                >
                  <PodcastIcon className="h-5 w-5" />
                  Apple
                </Link>
                <Link
                  className="inline-flex items-center gap-2"
                  href="https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH"
                >
                  <PodcastIcon className="h-5 w-5" />
                  Spotify
                </Link>
                {/* <Link className="inline-flex items-center gap-2" href="#">
                  <PodcastIcon className="h-5 w-5" />
                  Google Podcasts
                </Link> */}
                <Link
                  className="inline-flex items-center gap-2"
                  href="https://www.buzzsprout.com/2057493/share"
                >
                  <PodcastIcon className="h-5 w-5" />
                  BuzzSprout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PodcastIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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

function RssIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );
}
