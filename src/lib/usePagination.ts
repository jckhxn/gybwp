import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
  initialPage?: number;
  scrollToTop?: boolean;
  scrollOffset?: number;
  // Controlled pagination
  currentPage?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
}

export function usePagination<T>({
  data,
  itemsPerPage = 12,
  initialPage = 1,
  scrollToTop = true,
  scrollOffset = 80,
  currentPage: controlledPage,
  setCurrentPage: controlledSetPage,
}: UsePaginationProps<T>) {
  // If controlled, use props; otherwise, use internal state
  const [internalPage, setInternalPage] = useState(initialPage);
  const isControlled =
    controlledPage !== undefined && controlledSetPage !== undefined;
  const currentPage = isControlled ? controlledPage : internalPage;
  const setCurrentPage = isControlled ? controlledSetPage : setInternalPage;

  const paginationData = useMemo(() => {
    const totalItems = data.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const safePage = Math.min(Math.max(currentPage, 1), totalPages);
    const startIndex = (safePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    return {
      currentItems,
      totalItems,
      totalPages,
      currentPage: safePage,
      itemsPerPage,
      hasNextPage: safePage < totalPages,
      hasPreviousPage: safePage > 1,
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
    [paginationData.totalPages, scrollToTop, scrollOffset, setCurrentPage]
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
    setCurrentPage(1);
  }, [setCurrentPage]);

  // If data shrinks and currentPage is out of bounds, reset to 1
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [data.length, itemsPerPage, currentPage, setCurrentPage]);

  return {
    ...paginationData,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    reset,
  };
}
