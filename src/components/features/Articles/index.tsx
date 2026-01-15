// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";

// components
import { Section, SectionHeading } from "@/src/components/shared";
import {
  usePagination,
  DOTS,
} from "@/src/components/features/Articles/usePagination";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

// // copy
// import { ARTICLES } from "@/src/components/News/static-data";
// import { ARTICLES_INFO } from "@/src/components/features/Articles/static-data";
import Link from "next/link";

// // SWR
// import useSWR from "swr";
import { client } from "@/data/sanity/client";
import { OTHER_ARTICLES_QUERY } from "../../../../data/sanity/queries";

const Articles = ({ excludeIds = [] }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState();

  useEffect(() => {
    client
      .fetch(OTHER_ARTICLES_QUERY, { excludeIds })
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [excludeIds]);

  useEffect(() => {
    if (!isLoading) {
      setArticles(data);
    }
  }, [data, isLoading]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalCount: number = articles ? articles.length : 0;
  const pageSize: number = 5;
  const totalPageCount: number = Math.ceil(totalCount / pageSize);
  const pageSlice: number = currentPage * 5;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePaginationClick = (num: string | number) => {
    if (num !== DOTS) {
      setCurrentPage(num as number);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-surface-200 rounded-xl mb-8"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-4 p-6 bg-surface-100 rounded-2xl">
                <div className="h-6 w-3/4 bg-surface-200 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-surface-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-500">Error loading articles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12 lg:py-16">
      <div className="container mx-auto px-6">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-surface-900">More News</h2>
        </motion.div>

        {/* ARTICLES */}
        <div className="space-y-4">
          {articles &&
            articles
              .slice(pageSlice - 5, pageSlice)
              .map(({ company, date, title, link }, idx) => (
                <motion.div
                  key={`article-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link href={link} target="_blank" className="block group">
                    <div className="p-5 bg-surface-50 hover:bg-surface-100 rounded-2xl border border-surface-200 hover:border-primary/20 transition-all duration-300 hover:shadow-soft">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-surface-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
                            {title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-surface-500">
                            <span className="font-medium">{company}</span>
                            <span>•</span>
                            <span>{date}</span>
                          </div>
                        </div>
                        <ExternalLink className="h-5 w-5 text-surface-400 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>

        {/* PAGINATION */}
        {totalPageCount > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mt-8"
          >
            <div className="flex items-center gap-1">
              {/* BACK BUTTON */}
              {currentPage !== 1 && (
                <button
                  onClick={onPrevious}
                  className="flex items-center justify-center px-3 py-2 text-surface-600 rounded-xl border border-surface-200 bg-white hover:bg-surface-50 hover:border-primary/20 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* PAGINATION NUMBERS AND DOTS */}
              {paginationRange?.map((pageNum, idx) => {
                const isActive = pageNum === currentPage;
                const isDot = pageNum === DOTS;

                return (
                  <button
                    onClick={() => handlePaginationClick(pageNum)}
                    key={`pagination-num-${pageNum}-${idx}`}
                    disabled={isDot}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-xl transition-all
                      ${isDot ? "cursor-default text-surface-400" : "cursor-pointer"}
                      ${isActive 
                        ? "bg-primary text-white shadow-soft" 
                        : isDot 
                          ? "" 
                          : "text-surface-600 border border-surface-200 bg-white hover:bg-surface-50 hover:border-primary/20"
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* FORWARD BUTTON */}
              {currentPage !== totalPageCount && (
                <button
                  onClick={onNext}
                  className="flex items-center justify-center px-3 py-2 text-surface-600 rounded-xl border border-surface-200 bg-white hover:bg-surface-50 hover:border-primary/20 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Articles;
