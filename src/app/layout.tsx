import React from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
// components
import DefaultLayout from "components/Layout";
import Footer from "components/Footer";
import Header from "components/Header";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://gybwp.com"),
  title: {
    default: "Growing Your Business With People",
    template: `%s | Growing Your Business With People`,
  },
  description: "",
  openGraph: {
    title: "Growing Your Business With People",
    description: "",
    images: [
      {
        url: "",
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
  const Layout = DefaultLayout;

  return (
    <>
      <html lang="en">
        <Script src="https://chimpstatic.com/mcjs-connected/js/users/bc1727d945a3a3a609f35fc2b/97fc58cd3b18466f1358e4025.js" />
        <Script src="https://chimpstatic.com/mcjs-connected/js/users/bc1727d945a3a3a609f35fc2b/482c42cb0968b253648e098e1.j" />
        <body>
          <Layout>
            <main className={openSans.className}>
              <Header />
              {children}

              <Footer />
            </main>
          </Layout>
        </body>
      </html>
    </>
  );
}
