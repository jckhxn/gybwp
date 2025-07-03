import { useState, useMemo, useEffect, useCallback } from "react";

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
  initialPage?: number;
  scrollToTop?: boolean;
  scrollOffset?: number;
}

export function usePagination<T>({
  data,
  itemsPerPage = 12,
  initialPage = 1,
  scrollToTop = true,
  scrollOffset = 80,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const paginationData = useMemo(() => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    return {
      currentItems,
      totalItems,
      totalPages,
      currentPage,
      itemsPerPage,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, totalItems),
    };
  }, [data, currentPage, itemsPerPage]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= paginationData.totalPages) {
        setCurrentPage(page);

        // Scroll to top when page changes
        if (scrollToTop && typeof window !== "undefined") {
          const scrollTarget = document.querySelector("main") || document.body;
          const targetPosition =
            scrollTarget.getBoundingClientRect().top +
            window.pageYOffset -
            scrollOffset;

          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: "smooth",
          });
        }
      }
    },
    [paginationData.totalPages, scrollToTop, scrollOffset]
  );

  const goToNextPage = useCallback(() => {
    if (paginationData.hasNextPage) {
      goToPage(currentPage + 1);
    }
  }, [paginationData.hasNextPage, goToPage, currentPage]);

  const goToPreviousPage = useCallback(() => {
    if (paginationData.hasPreviousPage) {
      goToPage(currentPage - 1);
    }
  }, [paginationData.hasPreviousPage, goToPage, currentPage]);

  const reset = useCallback(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  // Reset to page 1 when data changes significantly
  useEffect(() => {
    if (currentPage > Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(1);
    }
  }, [data.length, itemsPerPage, currentPage]);

  return {
    ...paginationData,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    reset,
  };
}
