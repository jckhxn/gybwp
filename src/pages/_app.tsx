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

// types
import { NextComponentType } from "next";
import type { AppProps } from "next/app";

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
        <title>Next.js Web Template</title>
        <link rel="canonical" href={`https://www.template.com${pathname}`} />
      </Head>
      <Layout>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </>
  );
};

export default App;
