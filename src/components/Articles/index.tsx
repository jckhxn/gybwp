// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";

// components
import { Section, SectionHeading } from "components/shared";
import { usePagination, DOTS } from "./usePagination";

// copy
import { ARTICLES } from "components/Pages/News/static-data";
import { ARTICLES_INFO } from "./static-data";
import Link from "next/link";
// State
import { getArticles } from "../../app/sanity/sanity-utils";
import { store } from "../../redux/store";

// // SWR
import useSWR from "swr";
import { client } from "../../app/sanity/sanity-utils";
import { OTHER_ARTICLES_QUERY } from "../../app/lib/queries";

const Articles = () => {
  const [articles, setArticles] = useState();
  const { data, error, isLoading } = useSWR(OTHER_ARTICLES_QUERY, (query) =>
    client.fetch(query)
  );
  useEffect(() => {
    if (!isLoading) {
      setArticles(data);
    }
  }, [data, isLoading]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalCount: number = ARTICLES.length;
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

  const HOVER_STYLES = "hover:bg-gray-500 hover:text-white";

  return (
    <Section className="max-w-[80%] mt-12 m-auto">
      {/* HEADING */}
      <div className="mx-auto text-left mb-6">
        <SectionHeading className="!text-xl font-thin sm:!text-2xl text-black">
          {ARTICLES_INFO.header}
        </SectionHeading>
      </div>
      {/* ARTICLES */}

      {articles
        ?.slice(pageSlice - 5, pageSlice)
        .map(({ company, date, title, link }, idx) => (
          <Link key={`article-${idx}`} href={link} target="_blank">
            <div className="mb-5 px-8 py-4 bg-light text-black">
              <div className="mt-2">
                <span className="text-xl font-medium">{title}</span>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-light">{company}</span>

                <span className="text-sm font-light">{date}</span>
              </div>
            </div>
          </Link>
        ))}
      {/* PAGINATION */}
      {totalPageCount > 1 && (
        <div className="flex justify-end mr-6 mt-4">
          {/* BACK BUTTON */}
          {currentPage !== 1 && (
            <div
              onClick={onPrevious}
              className={`flex items-center justify-center px-4 py-2 text-black rounded-l-md border-gray-400 border capitalize cursor-pointer bg-white ${HOVER_STYLES}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}

          {/* PAGINATION NUMBERS AND DOTS */}
          {paginationRange?.map((pageNum, idx) => {
            const defaultStyles =
              "hidden px-4 py-2 -ml-[1px] text-black transition-colors border-gray-400 border";

            let roundedStyles = "";
            if (currentPage === 1 && currentPage === pageNum) {
              roundedStyles = "rounded-l-md";
            }
            if (currentPage === totalPageCount && currentPage === pageNum) {
              roundedStyles = "rounded-r-md";
            }

            const activePageStyles =
              pageNum === currentPage ? "!bg-gray-300" : "";

            const dotStyles =
              pageNum !== DOTS ? "cursor-pointer" : "cursor-default";

            const hoverStyles =
              pageNum !== DOTS && pageNum !== currentPage ? HOVER_STYLES : "";

            return (
              <div
                onClick={() => handlePaginationClick(pageNum)}
                key={`pagination-num-${pageNum}-${idx}`}
                className={`${defaultStyles} duration-300 transform bg-white sm:inline ${roundedStyles} ${hoverStyles} ${activePageStyles} ${dotStyles}`}
              >
                {pageNum}
              </div>
            );
          })}

          {/* FORWARD BUTTON */}
          {currentPage !== totalPageCount && (
            <div
              onClick={onNext}
              className={`flex items-center justify-center px-4 py-2 -ml-[1px] text-black transition-colors duration-300 cursor-pointer transform bg-white rounded-r-md border-gray-400 border ${HOVER_STYLES}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      )}
    </Section>
  );
};

export default Articles;
