"use client";
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
  const pathname = usePathname();

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
