import React from "react";
import Image from "next/image";
import Link from "next/link";

export const LatestEpisode = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-start gap-4 md:gap-8">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Featured
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Latest Episode
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Listen to our most recent conversation with industry leaders.
            </p>
          </div>
          <div className="w-full overflow-hidden rounded-xl border bg-background shadow-lg transition-all hover:shadow-xl">
            <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:gap-8">
              <div className="relative group aspect-video overflow-hidden rounded-l-xl">
                {/* react-youtube here */}
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Episode Cover"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="rounded-full bg-primary/90 p-4 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-foreground h-8 w-8"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    Episode 42: Building Sustainable Business Models
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Released April 10, 2025
                  </p>
                </div>
                <p className="text-muted-foreground">
                  In this episode, we talk with Jane Smith, founder of EcoTech
                  Solutions, about how she built a profitable business while
                  maintaining a strong commitment to environmental
                  sustainability. Learn practical strategies for balancing
                  purpose and profit in your own business journey.
                </p>
                <div className="pt-4">
                  <Link
                    href="/episodes/42"
                    className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
                  >
                    View Episode Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-4 w-4"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <Link
              href="/#episodes"
              scroll={true}
              className="inline-flex items-center text-primary hover:underline"
            >
              Browse all episodes
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 h-4 w-4"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
