import React from "react";
import GuestPage from "@/src/components/pages/GuestPage";

type PageProps = {
  params: Promise<{ guest: string | string[] }>;
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { guest } = resolvedParams;

  // Since GuestPage is an async component, we need to await it
  const guestPageContent = await GuestPage({ guest });
  return guestPageContent;
}
