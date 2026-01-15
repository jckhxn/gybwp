// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";

// components
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/src/components/shared";
import defaultImageSrc from "public/images/logo.webp";

import { ExternalLink, ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
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
  section?: {
    title?: string;
    subtitle?: string;
    maxItems?: number;
    showReadMore?: boolean;
    readMoreText?: string;
    readMoreLink?: string;
  };
  color?: "light" | "secondary";
  hideHeading?: boolean;
  hideBadge?: boolean;
}

const FeaturedNews = ({
  section,
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
      <div className="w-full py-12 bg-surface-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="h-6 w-32 bg-surface-200 rounded-full mb-4 animate-pulse"></div>
            <div className="h-8 w-64 bg-surface-200 rounded-xl mb-8 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-surface-200 rounded-2xl mb-4"></div>
                <div className="h-6 w-3/4 bg-surface-200 rounded mb-3"></div>
                <div className="h-4 bg-surface-100 rounded mb-2"></div>
                <div className="h-4 bg-surface-100 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
    <div className="bg-surface-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="space-y-2">
            {!hideBadge && (
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
                <Sparkles className="h-4 w-4" />
                Industry Recognition
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-surface-900">
              Featured In
            </h2>
            <p className="max-w-2xl text-surface-600 text-base md:text-lg mt-2">
              GYBWP has been recognized by leading publications and media outlets.
            </p>
          </div>

          {/* Decorative separator */}
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
        </motion.div>

      {featuredArticles.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
        >
          {/* Featured article (spans 7 columns) */}
          {featuredArticles[0] && (
            <div className="md:col-span-7 group">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative h-full overflow-hidden rounded-2xl shadow-medium border border-surface-200 bg-white hover:shadow-elevated transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-surface-900/40 to-transparent group-hover:from-surface-900/90 transition-all duration-300 z-10"></div>

                <div className="relative aspect-[16/9] md:aspect-[16/11] overflow-hidden">
                  <Image
                    src={getImageUrl(featuredArticles[0])}
                    alt={featuredArticles[0].title || "Featured article"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 max-w-full h-auto"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white z-20">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                    <div className="bg-primary px-3 py-1.5 text-xs font-medium rounded-full text-white">
                      {getPublicationName(featuredArticles[0])}
                    </div>
                    <div className="text-xs flex items-center text-white/80">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatArticleDate(featuredArticles[0].date)}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {featuredArticles[0].title}
                  </h3>

                  <p className="text-white/80 text-sm sm:text-base line-clamp-2 mb-4 hidden sm:block">
                    {featuredArticles[0].excerpt}
                  </p>

                  <Link
                    href={featuredArticles[0].link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm hover:bg-primary transition-all duration-300 rounded-xl px-4 py-2.5 text-sm font-medium"
                  >
                    Read Article
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          )}

          {/* Secondary articles (spans 5 columns) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {featuredArticles.slice(1, 3).map((article, idx) => (
              <motion.div
                key={article._id || `article-${idx}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.2 }}
                className="group relative overflow-hidden rounded-2xl shadow-soft border border-surface-200 bg-white hover:shadow-medium transition-all duration-300"
              >
                <Link
                  href={article.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="flex flex-col sm:flex-row h-full">
                    <div className="relative w-full sm:w-2/5 md:w-1/3 aspect-[16/9] sm:aspect-auto overflow-hidden">
                      <Image
                        src={getImageUrl(article)}
                        alt={article.title || "Article thumbnail"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 40vw, 33vw"
                      />
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                          {getPublicationName(article)}
                        </div>

                        <div className="flex items-center text-xs text-surface-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatArticleDate(article.date)}
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-surface-900 mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-sm text-surface-600 line-clamp-2 mb-3 flex-grow hidden sm:block">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-end mt-auto pt-2">
                        <span className="flex items-center text-sm text-primary font-medium group-hover:underline">
                          Read more <ArrowRight className="ml-1 h-4 w-4" />
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
        <div className="text-center py-12">
          <p className="text-surface-500">
            No featured articles available at this time.
          </p>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mt-12"
      >
        <Link
          href="/news"
          className="group inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300 font-medium"
        >
          View all news and articles
          <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
      </div>
    </div>
  );
};

export default FeaturedNews;
