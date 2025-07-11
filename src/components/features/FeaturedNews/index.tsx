// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";

// components
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/src/components/shared";
import defaultImageSrc from "public/images/logo.webp";

import { ExternalLink, ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
// SWR
import { client } from "@/data/sanity/client";
import { FEATURED_ARTICLES_QUERY } from "@/data/sanity/queries";
import {
  fetchOpenGraphImage,
  testImageLink,
  validateAndFetchImage,
  urlFor,
  formatDate,
} from "@/src/lib/utils";
import { SanityImage } from "@/src/lib/utils";
import { motion } from "framer-motion";

interface FeaturedNewsProps {
  color: "light" | "secondary";
  hideHeading: boolean;
  hideBadge: boolean;
}

const FeaturedNews = ({
  color = "light",
  hideHeading = false,
  hideBadge = false,
}: FeaturedNewsProps) => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .fetch(FEATURED_ARTICLES_QUERY)
      .then((res) => {
        if (res) {
          // Process the featured articles
          const articlesWithDefaults = res.map((article) => {
            const excerpt =
              article.excerpt ||
              article.description ||
              `Read more about this featured article from ${article.publication || article.company || "our media partners"}`;
            return {
              ...article,
              excerpt,
            };
          });
          setFeaturedArticles(articlesWithDefaults);
        }
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 w-64 bg-gray-300 rounded mb-8"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const bgColor = color === "secondary" ? "bg-gray-50" : "bg-off-white";
  const textColor = color === "light" ? "text-gray-800" : "text-gray-100";

  // Helper function to get image URL from a Sanity image object
  const getImageUrl = (article) => {
    // If the image is a Sanity image object
    if (article.image && article.image.asset) {
      return urlFor(article.image).url();
    }
    // If the image is a URL string (from older data)
    else if (article.image && typeof article.image === "string") {
      return article.image;
    }
    // Fallback to default image
    return defaultImageSrc;
  };

  // Helper function to format dates properly - just use the string directly
  const formatArticleDate = (dateString) => {
    if (!dateString) return "Recent";

    try {
      // Just pass the string directly to formatDate
      return formatDate(dateString);
    } catch (e) {
      console.error("Error formatting article date:", e);
      return "Recent";
    }
  };

  // Helper to get publication name
  const getPublicationName = (article) => {
    return article.publication || article.company || "Featured";
  };

  return (
    <div className="container mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center mb-8 sm:mb-12"
      >
        <div className="space-y-2">
          {!hideBadge && (
            <div className="inline-flex items-center rounded-full bg-primary/20 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-primary">
              Industry Recognition
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Featured In
          </h2>
          <p className="max-w-[800px] text-gray-600 text-sm sm:text-base md:text-lg mt-1 sm:mt-2">
            GYBWP has been recognized by leading publications and media outlets.
          </p>
        </div>

        {/* Decorative separator */}
        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full my-1 sm:my-2"></div>
      </motion.div>

      {featuredArticles.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8"
        >
          {/* Featured article (spans 7 columns) */}
          {featuredArticles[0] && (
            <div className="md:col-span-7 group">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative h-full overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 group-hover:via-black/60 transition-opacity duration-300 z-10"></div>

                <div className="relative aspect-[16/9] md:aspect-[16/11] overflow-hidden">
                  <Image
                    src={getImageUrl(featuredArticles[0])}
                    alt={featuredArticles[0].title || "Featured article"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white z-20">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="bg-primary/90 px-2 sm:px-3 py-1 text-xs font-medium rounded-full">
                      {getPublicationName(featuredArticles[0])}
                    </div>
                    <div className="text-xs flex items-center opacity-90 text-white">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatArticleDate(featuredArticles[0].date)}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-white group-hover:text-primary-light transition-colors duration-300 line-clamp-3 sm:line-clamp-2">
                    {featuredArticles[0].title}
                  </h3>

                  <p className="text-gray-50 text-sm sm:text-base line-clamp-2 mb-4 sm:mb-6 hidden sm:block">
                    {featuredArticles[0].excerpt}
                  </p>

                  <Link
                    href={featuredArticles[0].link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base"
                  >
                    Read Article
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          )}

          {/* Secondary articles (spans 5 columns) */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-8">
            {featuredArticles.slice(1, 3).map((article, idx) => (
              <motion.div
                key={article._id || `article-${idx}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.2 }}
                className="group relative overflow-hidden rounded-xl shadow-md border border-gray-100 bg-white hover:shadow-lg transition-all duration-300"
              >
                <Link
                  href={article.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="flex flex-col sm:flex-row h-full">
                    <div className="relative w-full sm:w-2/5 md:w-1/3 aspect-[16/9] sm:aspect-auto">
                      <Image
                        src={getImageUrl(article)}
                        alt={article.title || "Article thumbnail"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 40vw, 33vw"
                      />
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs text-primary font-medium">
                          {getPublicationName(article)}
                        </div>

                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatArticleDate(article.date)}
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2 sm:mb-3 flex-grow hidden sm:block">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-end mt-auto pt-1 sm:pt-2">
                        <span className="flex items-center text-xs sm:text-sm text-primary group-hover:underline">
                          Read more <ArrowRight className="ml-1 h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-6 sm:py-10">
          <p className="text-muted-foreground text-sm sm:text-base">
            No featured articles available at this time.
          </p>
        </div>
      )}

      <div className="flex justify-center mt-8 sm:mt-12">
        <Link
          href="/news"
          className="group inline-flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-primary hover:text-primary-light transition-colors duration-300"
        >
          View all news and articles
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedNews;
