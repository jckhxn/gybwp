import React from "react";

import { draftMode } from "next/headers";
import Script from "next/script";
// components
import Footer from "./components/Footer";
import Header from "./components/Header";

// styling
import "tailwindcss/tailwind.css";
import "/dist/output.css";
import { Open_Sans } from "next/font/google";
const openSans = Open_Sans({ subsets: ["latin"], weight: "variable" });

// types
import { NextComponentType } from "next";
import type { AppProps } from "next/app";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV
import type { Metadata } from "next";
import LiveVisualEditing from "./sanity/components/LiveVisualEditing";
import JSONLD from "./components/SEO/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL("https://gybwp.com"),

  alternates: {
    canonical: "./",
  },
  title: {
    default: "Growing Your Business With People",
    template: `%s | Growing Your Business With People`,
  },
  description:
    "Listen to 'Growing Your Business with People!' – the podcast for CEOs and business leaders focusing on growth through investing in their teams.",

  openGraph: {
    title: "Growing Your Business With People",
    description:
      "Listen to 'Growing Your Business with People!' – the podcast for CEOs and business leaders focusing on growth through investing in their teams.",

    images: [
      {
        url: "https://gybwp.com/images/logo.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type Component = NextComponentType & {
  Layout?: React.FC & { background?: string };
};

export type ApplicationProps = AppProps & {
  Component: Component;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <Script
          src="https://chimpstatic.com/mcjs-connected/js/users/bc1727d945a3a3a609f35fc2b/1d0bfba9b96b61926de13410b.js"
          strategy="afterInteractive"
        />

        <body>
          <main className={openSans.className}>
            <Header />
            {children}
            {draftMode().isEnabled && <LiveVisualEditing />}
            <Footer />
          </main>
        </body>
      </html>
    </>
  );
}
