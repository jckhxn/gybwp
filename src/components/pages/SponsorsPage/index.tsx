// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";

// components
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/src/components/shared";
import { SponsorsList } from "@/src/components/features/sponsors";
import ContactModal from "@/src/components/features/ContactModal";
import { Heart, Star, Trophy, Award } from "lucide-react";

// copy
// import { SPONSORS, PARTNERS, SPONSORS_INFO } from "./static-data";

// sanity
import { client } from "@/src/lib/sanity-utils";
import { ALL_SPONSORS_QUERY } from "@/src/lib/queries";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const SponsorsPageComponent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .fetch(ALL_SPONSORS_QUERY)
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
            <p className="mt-4 text-slate-600">
              Loading our amazing sponsors...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <p className="text-red-600">
              Unable to load sponsors. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/5 to-slate-900/10"></div>
          <div className="relative container mx-auto px-6 py-20 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-slate-900 rounded-full">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Our Amazing{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Sponsors
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
                We&apos;re grateful to work with incredible organizations that
                make our podcast possible. These partners share our vision and
                support our mission.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  <span>Premium Partners</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>Trusted Brands</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="container mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Meet Our Sponsors
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Click on any sponsor to learn more about their story and what
                they offer
              </p>
            </div>

            {/* Sponsors Grid */}
            <div className="mb-20">
              <SponsorsList
                sponsors={data}
                layout="grid"
                size="large"
                title=""
                noContainer={true}
              />
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Interested in Sponsoring?
              </h3>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
                Join our family of amazing sponsors and reach our engaged
                audience. We&apos;d love to explore partnership opportunities
                with your brand.
              </p>
              <ContactModal
                trigger={
                  <button className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
                    <Heart className="h-5 w-5" />
                    Get in Touch
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SponsorsPageComponent;
