import { handleHashScroll } from "@/src/lib/componentLink";

/**
 * Server-safe utilities for component linking
 * For client-side hash navigation, use ComponentLinksProvider instead
 */

/**
 * Navigate to a component by ID (client-side only)
 * Use this in client components for programmatic navigation
 */
export function navigateToComponent(
  componentId: string,
  scrollOffset: number = 80
) {
  if (typeof window === "undefined") {
    console.warn("navigateToComponent can only be used on the client side");
    return;
  }

  const hash = componentId.startsWith("#") ? componentId : `#${componentId}`;
  window.location.hash = hash;
  handleHashScroll(hash, scrollOffset);
}

/**
 * Check if we're on the client and handle initial hash
 * Use this in useEffect or client components
 */
export function handleInitialHash(scrollOffset: number = 80) {
  if (typeof window === "undefined") return;

  const hash = window.location.hash;
  if (hash) {
    // Wait for page to render before scrolling
    setTimeout(() => {
      handleHashScroll(hash, scrollOffset);
    }, 500);
  }
}

/**
 * Legacy hook for Pages Router (client components only)
 * @deprecated Use ComponentLinksProvider for App Router instead
 */
export function useComponentLinks(scrollOffset: number = 80) {
  if (typeof window === "undefined") {
    console.warn(
      "useComponentLinks hook can only be used in client components"
    );
    return;
  }

  // This will only work in Pages Router with useRouter from 'next/router'
  console.warn(
    "useComponentLinks is deprecated. Use ComponentLinksProvider for App Router."
  );
}

/**
 * Hook for App Router client components
 * @deprecated Use ComponentLinksProvider instead for better performance
 */
export function useAppRouterComponentLinks(scrollOffset: number = 80) {
  if (typeof window === "undefined") {
    console.warn(
      "useAppRouterComponentLinks can only be used in client components"
    );
    return;
  }

  handleInitialHash(scrollOffset);

  // Set up hash change listener
  const handleHashChange = () => {
    const newHash = window.location.hash;
    if (newHash) {
      handleHashScroll(newHash, scrollOffset);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup function
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }
}
