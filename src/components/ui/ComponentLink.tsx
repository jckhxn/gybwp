"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface ComponentLinkData {
  linkType: "samePage" | "differentPage" | "external";
  targetComponentId?: string;
  targetPage?: {
    _type: string;
    slug?: { current: string };
    pathname?: { current: string };
  };
  targetPageComponentId?: string;
  externalUrl?: string;
  linkText?: string;
  openInNewTab?: boolean;
  scrollBehavior?: "smooth" | "auto" | "instant";
  scrollOffset?: number;
}

interface ComponentLinkProps {
  data: ComponentLinkData;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function ComponentLink({
  data,
  children,
  className,
  onClick,
}: ComponentLinkProps) {
  const router = useRouter();

  const scrollToElement = (
    elementId: string,
    behavior: ScrollBehavior = "smooth",
    offset: number = 80
  ) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior,
      });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }

    if (data.linkType === "samePage") {
      e.preventDefault();
      if (data.targetComponentId) {
        scrollToElement(
          data.targetComponentId,
          data.scrollBehavior as ScrollBehavior,
          data.scrollOffset
        );
      }
    } else if (data.linkType === "differentPage") {
      e.preventDefault();

      // Build the URL for the target page
      let targetUrl = "";

      if (data.targetPage) {
        const { _type, slug, pathname } = data.targetPage;

        switch (_type) {
          case "page":
            targetUrl = pathname?.current || `/${slug?.current}`;
            break;
          case "episode":
            targetUrl = pathname?.current || `/episode/${slug?.current}`;
            break;
          case "person":
            targetUrl = `/guest/${slug?.current}`;
            break;
          default:
            targetUrl = `/${slug?.current}`;
        }
      }

      // Add component ID as hash if specified
      if (data.targetPageComponentId) {
        targetUrl += `#${data.targetPageComponentId}`;
      }

      if (data.openInNewTab) {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      } else {
        // Navigate to the page
        router.push(targetUrl);

        // If there's a component ID to scroll to, do it after navigation
        if (data.targetPageComponentId) {
          // Wait for navigation to complete, then scroll
          setTimeout(() => {
            scrollToElement(
              data.targetPageComponentId!,
              data.scrollBehavior as ScrollBehavior,
              data.scrollOffset
            );
          }, 100);
        }
      }
    }
    // For external links, let the default behavior handle it
  };

  // Render based on link type
  if (data.linkType === "external" && data.externalUrl) {
    return (
      <a
        href={data.externalUrl}
        target={data.openInNewTab ? "_blank" : "_self"}
        rel={data.openInNewTab ? "noopener noreferrer" : undefined}
        className={className}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  if (data.linkType === "samePage") {
    return (
      <button type="button" className={className} onClick={handleClick}>
        {children}
      </button>
    );
  }

  if (data.linkType === "differentPage" && data.targetPage) {
    // For different page links, we'll handle the navigation in onClick
    return (
      <button type="button" className={className} onClick={handleClick}>
        {children}
      </button>
    );
  }

  // Fallback - just render the children without any link behavior
  return <span className={className}>{children}</span>;
}

// Hook for programmatic navigation to components
export function useComponentNavigation() {
  const router = useRouter();

  const navigateToComponent = (linkData: ComponentLinkData) => {
    if (linkData.linkType === "samePage" && linkData.targetComponentId) {
      const element = document.getElementById(linkData.targetComponentId);
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - (linkData.scrollOffset || 80);

        window.scrollTo({
          top: offsetPosition,
          behavior: (linkData.scrollBehavior as ScrollBehavior) || "smooth",
        });
      }
    } else if (linkData.linkType === "differentPage" && linkData.targetPage) {
      let targetUrl = "";

      const { _type, slug, pathname } = linkData.targetPage;

      switch (_type) {
        case "page":
          targetUrl = pathname?.current || `/${slug?.current}`;
          break;
        case "episode":
          targetUrl = pathname?.current || `/episode/${slug?.current}`;
          break;
        case "person":
          targetUrl = `/guest/${slug?.current}`;
          break;
        default:
          targetUrl = `/${slug?.current}`;
      }

      if (linkData.targetPageComponentId) {
        targetUrl += `#${linkData.targetPageComponentId}`;
      }

      router.push(targetUrl);

      if (linkData.targetPageComponentId) {
        setTimeout(() => {
          const element = document.getElementById(
            linkData.targetPageComponentId!
          );
          if (element) {
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition =
              elementPosition - (linkData.scrollOffset || 80);

            window.scrollTo({
              top: offsetPosition,
              behavior: (linkData.scrollBehavior as ScrollBehavior) || "smooth",
            });
          }
        }, 100);
      }
    } else if (linkData.linkType === "external" && linkData.externalUrl) {
      if (linkData.openInNewTab) {
        window.open(linkData.externalUrl, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = linkData.externalUrl;
      }
    }
  };

  return { navigateToComponent };
}
