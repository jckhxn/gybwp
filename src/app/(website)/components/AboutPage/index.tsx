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
import JSONLD from "../SEO/jsonld";
import { generateAboutPageStructuredData } from "../../lib/structured-data";

export default function AboutPage() {
  const aboutStructuredData = generateAboutPageStructuredData();

  return (
    <>
      <JSONLD data={aboutStructuredData} id="organization-jsonld" />
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50/70 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 px-4 py-2 text-sm font-medium text-primary border border-primary/30 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
                <line x1="8" x2="16" y1="22" y2="22" />
              </svg>
              About Us
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-[1.1]">
              Growing Your Business With People
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              Our Mission
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Our aim is to explore a range of subjects, supporting CEOs and
              leaders in advancing their businesses through their foremost
              asset - their people. With interviews featuring Fortune 100
              CEOs, startup trailblazers, bestselling authors, TEDx speakers,
              and industry pioneers, we provide actionable insights for
              optimizing Return on People in an engaging fireside chat format.
            </p>
          </div>

          {/* Logo and Hero Image */}
          <div className="flex flex-col items-center gap-12 mb-16">
            {/* Logo Section */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 rounded-full blur-lg opacity-30"></div>
                <Image
                  alt="Growing Your Business With People Podcast Logo"
                  className="relative rounded-full border-4 border-white shadow-xl"
                  src={logo}
                  style={{
                    height: "160px",
                    width: "160px",
                    aspectRatio: "160/160",
                    objectFit: "cover",
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Growing Your Business With People
              </h3>
              <p className="text-gray-600">
                Maximizing Return on People through Leadership Excellence
              </p>
            </div>
            
            {/* Blueprint Image */}
            <div className="relative max-w-4xl w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 rounded-2xl blur-2xl opacity-30"></div>
              <Image
                alt="Business Blueprint - Strategic Framework"
                className="relative rounded-2xl object-cover shadow-2xl border border-gray-200/50 w-full"
                height={400}
                src={hero}
                style={{
                  aspectRatio: "16/9",
                  objectFit: "cover",
                }}
                width={800}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 px-4 py-2 text-sm font-medium text-primary border border-primary/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Meet the Host
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Meet the Host
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Get to know the passionate host behind Growing Your Business With
                People
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200/70 shadow-lg">
              <div className="relative mb-6">
                <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 rounded-full blur-lg opacity-30"></div>
                <Image
                  alt="Jeff Lackey - Host"
                  className="relative rounded-full border-4 border-white shadow-xl object-cover"
                  src={host}
                  style={{
                    height: "160px",
                    width: "160px",
                    aspectRatio: "160/160",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Jeff Lackey</h3>
                  <p className="text-primary font-medium">Host, GYBWP</p>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  I firmly believe people aren&apos;t just a company&apos;s most
                  vital asset; they&apos;re an investment primed for growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50/70 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 px-4 py-2 text-sm font-medium text-primary border border-primary/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                  <line x1="8" x2="16" y1="22" y2="22" />
                </svg>
                Podcast Info
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                About the Podcast
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Learn more about the podcast and how you can connect with us.
              </p>
            </div>
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Episode Release Schedule
                </h3>
                <p className="text-gray-600">
                  New episodes are released every Tuesday.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Topics Covered</h3>
                <p className="text-gray-600">
                  Business Leadership, Talent Acquisition, and more.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow and Subscribe</h3>
                <div className="flex flex-wrap gap-3">
                  <Link
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-primary hover:text-primary/80 rounded-lg border border-primary/20 hover:border-primary/30 transition-all duration-200"
                    href="https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511"
                  >
                    <PodcastIcon className="h-4 w-4" />
                    Apple
                  </Link>
                  <Link
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-primary hover:text-primary/80 rounded-lg border border-primary/20 hover:border-primary/30 transition-all duration-200"
                    href="https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH"
                  >
                    <PodcastIcon className="h-4 w-4" />
                    Spotify
                  </Link>
                  <Link
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-primary hover:text-primary/80 rounded-lg border border-primary/20 hover:border-primary/30 transition-all duration-200"
                    href="https://www.buzzsprout.com/2057493/share"
                  >
                    <PodcastIcon className="h-4 w-4" />
                    BuzzSprout
                  </Link>
                </div>
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
