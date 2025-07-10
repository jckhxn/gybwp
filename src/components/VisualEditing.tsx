"use client";

import { VisualEditing } from "next-sanity";
import { useEffect } from "react";

export default function VisualEditingComponent() {
  useEffect(() => {
    // Only enable visual editing in development or preview mode
    if (process.env.NODE_ENV === "development") {
      import("@sanity/visual-editing/refresh").catch(() => {
        // Ignore import errors in case the package is not available
      });
    }
  }, []);

  // Only render visual editing overlay in draft mode
  if (typeof window !== "undefined" && window.parent === window) {
    return null;
  }

  return <VisualEditing />;
}
