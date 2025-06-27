"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  className?: string;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
  totalItems,
  startIndex,
  endIndex,
  className = "",
}: PaginationControlsProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show around current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    // Remove duplicates and return
    return rangeWithDots.filter(
      (item, index, arr) => index === 0 || item !== arr[index - 1]
    );
  };

  if (totalPages <= 1) {
    return (
      <div className={`flex items-center justify-center mt-8 ${className}`}>
        <p className="text-sm text-gray-600">
          Showing {totalItems} {totalItems === 1 ? "result" : "results"}
        </p>
      </div>
    );
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex flex-col items-center gap-4 mt-8 ${className}`}>
      {/* Results info */}
      <p className="text-sm text-gray-600 text-center">
        Showing <span className="font-medium">{startIndex}</span> to{" "}
        <span className="font-medium">{endIndex}</span> of{" "}
        <span className="font-medium">{totalItems}</span> results
      </p>

      {/* Pagination */}
      <Pagination>
        <PaginationContent className="flex-wrap justify-center gap-1">
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (hasPreviousPage) {
                  onPageChange(currentPage - 1);
                }
              }}
              className={`transition-all duration-200 ${
                !hasPreviousPage
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-primary/10"
              }`}
              aria-disabled={!hasPreviousPage}
              size="default"
            />
          </PaginationItem>

          {pageNumbers.map((pageNumber, index) => (
            <PaginationItem key={index} className="hidden sm:block">
              {pageNumber === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(pageNumber as number);
                  }}
                  isActive={pageNumber === currentPage}
                  className={`cursor-pointer transition-all duration-200 ${
                    pageNumber === currentPage
                      ? "bg-primary text-white border-primary"
                      : "hover:bg-primary/10 hover:text-primary"
                  }`}
                  size="icon"
                  aria-label={`Go to page ${pageNumber}`}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Mobile: Show current page info instead of all page numbers */}
          <div className="sm:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                if (hasNextPage) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={`transition-all duration-200 ${
                !hasNextPage
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-primary/10"
              }`}
              aria-disabled={!hasNextPage}
              size="default"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Quick jump input for large datasets */}
      {totalPages > 10 && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Go to page:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value, 10);
              if (page >= 1 && page <= totalPages) {
                onPageChange(page);
              }
            }}
            className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-primary/20 focus:border-primary"
            aria-label="Jump to page"
          />
          <span className="text-gray-600">of {totalPages}</span>
        </div>
      )}
    </div>
  );
}
