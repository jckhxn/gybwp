import React from "react";
import { usePathname } from "next/navigation";

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
  title: "Growing Your Business With People",
  description: "Growing Your Business With People Podcast",
  openGraph: {
    title: "Growing Your Business With People",
    description: "Growing Your Business With People Podcast",
    // images: [
    //   {
    //     url: "https://gybwp.com/_next/image?url=/_next/static/media/main-page-hero.jpg",
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
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
