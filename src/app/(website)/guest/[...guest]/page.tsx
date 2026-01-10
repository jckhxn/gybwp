import React from "react";
import GuestPage from "@/src/components/pages/GuestPage";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

type PageProps = {
  params: Promise<{ guest: string | string[] }>;
};

export default async function Page({ params }: PageProps) {
  const { guest: rawGuest } = await params;

  // Decode the URL parameter to handle special characters
  const guest = Array.isArray(rawGuest)
    ? rawGuest.map((segment) => decodeURIComponent(segment))
    : decodeURIComponent(rawGuest);

  // Since GuestPage is an async component, we need to await it
  const guestPageContent = await GuestPage({ guest });
  return guestPageContent;
}
