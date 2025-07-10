"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { handleHashScroll } from "@/src/lib/componentLink";

interface ComponentLinksProviderProps {
  scrollOffset?: number;
  children: React.ReactNode;
}

/**
 * Client component that handles hash-based component linking
 * Must be used in app router layouts or pages as a client component
 */
export function ComponentLinksProvider({
  scrollOffset = 80,
  children,
}: ComponentLinksProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Handle hash on initial page load and route changes
    const hash = window.location.hash;
    if (hash) {
      // Wait for page to render before scrolling
      setTimeout(() => {
        handleHashScroll(hash, scrollOffset);
      }, 500);
    }

    // Listen for hashchange events
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash) {
        handleHashScroll(newHash, scrollOffset);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname, searchParams, scrollOffset]);

  return <>{children}</>;
}

/**
 * Hook for client components that need to trigger hash navigation
 */
export function useHashNavigation(scrollOffset: number = 80) {
  const navigateToComponent = (componentId: string) => {
    const hash = componentId.startsWith("#") ? componentId : `#${componentId}`;
    window.location.hash = hash;
    handleHashScroll(hash, scrollOffset);
  };

  return { navigateToComponent };
}
