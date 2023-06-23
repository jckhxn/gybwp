import React from "react";
import { useRouter } from "next/router";

// components
import Head from "next/head";
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

const App = ({ Component, pageProps }: ApplicationProps): JSX.Element => {
  const Layout = Component.Layout || DefaultLayout;
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>Growing Your Business With People</title>
        <link rel="canonical" href={`https://www.gybwp.com/${pathname}`} />
      </Head>
      <Layout>
        <main className={openSans.className}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </main>
      </Layout>
    </>
  );
};

export default App;
