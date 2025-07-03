"use client";

import React from "react";

interface ScrollToSectionProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  offset?: number; // offset in pixels from the top
}

export const ScrollToSection: React.FC<ScrollToSectionProps> = ({
  targetId,
  children,
  className = "",
  offset = 80, // default offset to account for fixed headers
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = targetPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL without page reload
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <a href={`#${targetId}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
