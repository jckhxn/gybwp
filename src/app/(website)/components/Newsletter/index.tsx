import React from "react";
import { CTA } from "../HomePage/static-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Newsletter = () => {
  return (
    <>
      <section className="relative w-full py-16 md:py-20 flex items-center justify-center overflow-hidden">
        {/* Subtle top and bottom borders */}
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

        {/* Simplified decorative elements */}
        <div className="absolute -left-8 top-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
        <div className="absolute -right-8 bottom-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-xl"></div>

        {/* Simple background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-primary/10 blur-xl opacity-30"></div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div className="flex flex-col items-center gap-6 md:gap-8 text-center">
            <div className="space-y-4 max-w-3xl">
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
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Never Miss an Episode
              </div>
              <div className="space-y-3">
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Subscribe to our newsletter
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Be first to know when new episodes drop! Get notified about
                  our latest podcast releases, exclusive guest interviews, and
                  behind-the-scenes content.
                </p>
              </div>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 p-8 md:p-10 bg-white rounded-xl shadow-lg border border-gray-100 relative z-10 w-full max-w-6xl">
              {/* Left column with improved styling */}
              <div className="space-y-6 text-left">
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                <p className="max-w-[600px] text-gray-600 text-lg leading-relaxed">
                  Connect with like-minded business leaders and get weekly
                  insights delivered straight to your inbox.
                </p>

                {/* Testimonial/Social proof */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-gray-500 text-sm font-medium mb-2">
                    Joined by business leaders from:
                  </p>
                  <div className="flex flex-wrap gap-6 items-center opacity-70">
                    <div className="text-gray-700 text-sm font-semibold">
                      LinkedIn
                    </div>
                    <div className="text-gray-700 text-sm font-semibold">
                      Wall Street Journal
                    </div>
                    <div className="text-gray-700 text-sm font-semibold">
                      CEO Weekly
                    </div>
                    <div className="text-gray-700 text-sm font-semibold">
                      + 100s more
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column with enhanced CTA */}
              <div className="flex flex-col justify-center items-center lg:items-start gap-8">
                <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left w-full max-w-md">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Join our community of purpose-driven entrepreneurs
                  </h3>
                  <p className="text-gray-600">
                    Connect with like-minded business owners and get weekly
                    insights directly on LinkedIn.
                  </p>
                </div>

                {/* Enhanced CTA button */}
                <Link
                  href={CTA.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-light px-8 py-4 text-base font-medium text-white shadow-lg transition-colors duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <span className="relative z-10 flex items-center gap-3">
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
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>

                <p className="text-xs text-gray-500 max-w-[400px] text-center lg:text-left">
                  By subscribing, you&apos;ll receive our weekly newsletter and
                  can easily engage with our content and community on the
                  LinkedIn platform.
                </p>

                {/* Privacy notice */}
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-2">
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
                    className="text-primary w-4 h-4"
                  >
                    <rect
                      width="18"
                      height="11"
                      x="3"
                      y="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span className="text-xs text-gray-500">
                    Your data is secure. We never share your information.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
