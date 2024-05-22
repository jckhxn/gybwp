"use client"; // Error components must be Client Components

import { useEffect } from "react";
import ErrorPageComponent from "@/src/app/components/ErrorPage";
export default function Error(
  {
    // error,
    // reset,
  }: {
    // error: Error & { digest?: string };
    // reset: () => void;
  }
) {
  // useEffect(() => {
  //   console.error(error);
  // }, [error]);

  return (
    <>
      <ErrorPageComponent />
    </>
  );
}
