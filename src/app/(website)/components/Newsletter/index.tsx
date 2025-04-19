import React from "react";
import Button from "../ui/button";
import { CTA } from "../HomePage/static-data";
import Link from "next/link";

export const Newsletter = () => {
  return (
    <>
      <section className="relative w-full py-16 md:py-24 lg:py-32 flex items-center justify-center overflow-hidden">
        {/* Background styling */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-80"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute -left-4 top-1/4 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
        <div className="absolute -right-4 bottom-1/4 w-32 h-32 bg-secondary/5 rounded-full blur-xl"></div>

        <div className="container relative px-4 md:px-6 max-w-4xl mx-auto z-10">
          <div className="grid gap-10 sm:grid-cols-2 md:gap-16 p-6 md:p-10 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100">
            {/* Left column */}
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-white">
                Stay Updated
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Subscribe to our newsletter
              </h2>
              <div className="w-16 h-1 bg-secondary/70 rounded-full my-4"></div>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                Get the latest episodes, exclusive content, and business growth
                tips delivered straight to your inbox. Our newsletter is hosted
                on LinkedIn for easy access and networking opportunities.
              </p>
            </div>

            {/* Right column */}
            <div className="flex flex-col items-center justify-center gap-6 sm:items-start">
              <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                <p className="text-lg font-medium">
                  Join our community of purpose-driven entrepreneurs
                </p>
                <p className="text-muted-foreground">
                  Connect with like-minded business owners and get weekly
                  insights directly on LinkedIn.
                </p>
              </div>
              <Link
                href={CTA.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-8 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-secondary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
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
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                Subscribe on LinkedIn
              </Link>
              <p className="text-xs text-muted-foreground max-w-[400px] text-center sm:text-left">
                By subscribing, you&apos;ll receive our weekly newsletter and
                can easily engage with our content and community on the LinkedIn
                platform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
