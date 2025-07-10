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

// Legacy button data structure
export interface LegacyButtonData {
  text?: string;
  link?: string;
}

// Combined button data that can handle both new and legacy formats
export interface SmartButtonData extends Partial<ComponentLinkData> {
  // Legacy fields
  text?: string;
  link?: string;

  // New componentLink field
  componentLink?: ComponentLinkData;
}

interface SmartButtonProps {
  data?: SmartButtonData;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  fallbackText?: string; // Default text if no text is provided
  fallbackLink?: string; // Default link if no link is provided
}

/**
 * Smart button component that handles both legacy button format and new componentLink format
 * Priority order:
 * 1. componentLink data (if present)
 * 2. Legacy text/link data
 * 3. Fallback props
 * 4. Children content
 */
export function SmartButton({
  data,
  children,
  className,
  onClick,
  fallbackText,
  fallbackLink,
}: SmartButtonProps) {
  const router = useRouter();

  // Determine what data to use
  const linkData = data?.componentLink;
  const hasComponentLink = linkData && linkData.linkType;

  // Get text content - priority: componentLink.linkText > data.text > fallbackText > children
  const buttonText = hasComponentLink
    ? linkData.linkText || children
    : data?.text || fallbackText || children;

  // Get link - priority: componentLink > data.link > fallbackLink
  const legacyLink = !hasComponentLink ? data?.link || fallbackLink : null;

  const scrollToElement = (
    elementId: string,
    behavior: "smooth" | "auto" | "instant" = "smooth",
    offset: number = 80
  ) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      // Map scroll behavior values
      let scrollBehavior: ScrollBehavior = "smooth";
      if (behavior === "auto") scrollBehavior = "auto";
      if (behavior === "instant") scrollBehavior = "instant";
      if (behavior === "smooth") scrollBehavior = "smooth";

      window.scrollTo({
        top: offsetPosition,
        behavior: scrollBehavior,
      });
    } else {
      console.warn(`Element with ID "${elementId}" not found for scrolling`);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }

    // Handle componentLink navigation
    if (hasComponentLink) {
      if (linkData.linkType === "samePage") {
        e.preventDefault();
        if (linkData.targetComponentId) {
          scrollToElement(
            linkData.targetComponentId,
            linkData.scrollBehavior || "smooth",
            linkData.scrollOffset || 80
          );
        }
      } else if (linkData.linkType === "differentPage") {
        e.preventDefault();

        // Build the URL for the target page
        let targetUrl = "";

        if (linkData.targetPage) {
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
        }

        // Add component ID as hash if specified
        if (linkData.targetPageComponentId) {
          targetUrl += `#${linkData.targetPageComponentId}`;
        }

        if (linkData.openInNewTab) {
          window.open(targetUrl, "_blank", "noopener,noreferrer");
        } else {
          router.push(targetUrl);

          // If there's a component ID to scroll to, do it after navigation
          if (linkData.targetPageComponentId) {
            setTimeout(() => {
              scrollToElement(
                linkData.targetPageComponentId!,
                linkData.scrollBehavior || "smooth",
                linkData.scrollOffset || 80
              );
            }, 500); // Increased timeout to allow page to load
          }
        }
      }
      // For external componentLinks, let the default behavior handle it
    }
    // For legacy links, let the default Link behavior handle it
  };

  // Render based on available data

  // 1. ComponentLink external URL
  if (
    hasComponentLink &&
    linkData.linkType === "external" &&
    linkData.externalUrl
  ) {
    return (
      <a
        href={linkData.externalUrl}
        target={linkData.openInNewTab ? "_blank" : "_self"}
        rel={linkData.openInNewTab ? "noopener noreferrer" : undefined}
        className={className}
        onClick={handleClick}
      >
        {buttonText}
      </a>
    );
  }

  // 2. ComponentLink same page
  if (hasComponentLink && linkData.linkType === "samePage") {
    return (
      <button type="button" className={className} onClick={handleClick}>
        {buttonText}
      </button>
    );
  }

  // 3. ComponentLink different page
  if (
    hasComponentLink &&
    linkData.linkType === "differentPage" &&
    linkData.targetPage
  ) {
    return (
      <button type="button" className={className} onClick={handleClick}>
        {buttonText}
      </button>
    );
  }

  // 4. Legacy link
  if (legacyLink) {
    return (
      <Link href={legacyLink} className={className} onClick={handleClick}>
        {buttonText}
      </Link>
    );
  }

  // 5. Fallback - just a button with onClick
  if (onClick) {
    return (
      <button type="button" className={className} onClick={handleClick}>
        {buttonText}
      </button>
    );
  }

  // 6. Final fallback - just render the content
  return <span className={className}>{buttonText}</span>;
}

/**
 * Legacy ComponentLink component for backward compatibility
 */
interface ComponentLinkProps {
  data: ComponentLinkData;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function ComponentLink(props: ComponentLinkProps) {
  return (
    <SmartButton
      data={{ componentLink: props.data }}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </SmartButton>
  );
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

        // Map scroll behavior values
        const behavior = linkData.scrollBehavior || "smooth";
        let scrollBehavior: ScrollBehavior = "smooth";
        if (behavior === "auto") scrollBehavior = "auto";
        if (behavior === "instant") scrollBehavior = "instant";
        if (behavior === "smooth") scrollBehavior = "smooth";

        window.scrollTo({
          top: offsetPosition,
          behavior: scrollBehavior,
        });
      } else {
        console.warn(
          `Element with ID "${linkData.targetComponentId}" not found for scrolling`
        );
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

            // Map scroll behavior values
            const behavior = linkData.scrollBehavior || "smooth";
            let scrollBehavior: ScrollBehavior = "smooth";
            if (behavior === "auto") scrollBehavior = "auto";
            if (behavior === "instant") scrollBehavior = "instant";
            if (behavior === "smooth") scrollBehavior = "smooth";

            window.scrollTo({
              top: offsetPosition,
              behavior: scrollBehavior,
            });
          } else {
            console.warn(
              `Element with ID "${linkData.targetPageComponentId}" not found for scrolling`
            );
          }
        }, 500); // Increased timeout to allow page to load
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
