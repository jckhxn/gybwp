import { ComponentLinkData } from "@/src/components/ui/ComponentLink";

/**
 * Generate a component ID from a title or name
 */
export function generateComponentId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters except hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Build URL for component links
 */
export function buildComponentLinkUrl(linkData: ComponentLinkData): string {
  if (linkData.linkType === "external") {
    return linkData.externalUrl || "#";
  }

  if (linkData.linkType === "samePage") {
    return linkData.targetComponentId ? `#${linkData.targetComponentId}` : "#";
  }

  if (linkData.linkType === "differentPage" && linkData.targetPage) {
    const { _type, slug, pathname } = linkData.targetPage;
    let targetUrl = "";

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

    return targetUrl;
  }

  return "#";
}

/**
 * Check if a component link is valid
 */
export function isValidComponentLink(linkData: ComponentLinkData): boolean {
  switch (linkData.linkType) {
    case "samePage":
      return !!linkData.targetComponentId;
    case "differentPage":
      return !!linkData.targetPage;
    case "external":
      return !!linkData.externalUrl;
    default:
      return false;
  }
}

/**
 * Get the display text for a component link
 */
export function getComponentLinkText(linkData: ComponentLinkData): string {
  if (linkData.linkText) {
    return linkData.linkText;
  }

  switch (linkData.linkType) {
    case "samePage":
      return linkData.targetComponentId
        ? `Go to ${linkData.targetComponentId}`
        : "Go to section";
    case "differentPage":
      return linkData.targetPage ? `Visit page` : "Visit page";
    case "external":
      return "Visit link";
    default:
      return "Link";
  }
}

/**
 * Handle scrolling to component on page load (for hash links)
 */
export function handleHashScroll(
  hash: string,
  offset: number = 80,
  behavior: ScrollBehavior = "smooth"
) {
  if (!hash) return;

  // Remove the # from hash
  const elementId = hash.replace("#", "");

  const scrollToElement = () => {
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

  // Try immediately, then with a short delay for page rendering
  scrollToElement();
  setTimeout(scrollToElement, 100);
  setTimeout(scrollToElement, 500);
}

/**
 * Get all component IDs on the current page (useful for validation)
 */
export function getPageComponentIds(): string[] {
  const elements = document.querySelectorAll("[id]");
  return Array.from(elements)
    .map((el) => el.id)
    .filter((id) => id && !id.startsWith("__next")); // Filter out Next.js internal IDs
}

/**
 * Validate if a component ID exists on the current page
 */
export function validateComponentIdExists(componentId: string): boolean {
  return !!document.getElementById(componentId);
}
