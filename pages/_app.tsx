import { ReactElement } from "react";

import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TGetLayoutFunction, TNextPageWithLayout } from "../types";
import Script from "next/script";
import Head from "next/head";
import "./app.css";

const queryClient = new QueryClient();

export type TCustomAppProps = AppProps & {
  Component: TNextPageWithLayout;
};

const CustomApp = (props: TCustomAppProps): ReactElement => {
  const { Component, pageProps } = props;

  /* Use the layout defined at the page level, if available. */
  const getLayout: TGetLayoutFunction = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="afterInteractive" id="ga">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
            });
        `}
      </Script>

      <Head>
        <title>Outermeasure</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Outermeasure researches, designs, and implements custom analytical data solutions, working with organizations to turn complex data into reliable, decision-ready systems."
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:site_name" content="Outermeasure" />
        <meta property="og:title" content="Outermeasure" />
        <meta
          property="og:description"
          content="Custom analytical data solutions for organizations that need clear, reliable insight from complex data."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://outermeasure.com/" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Outermeasure" />
        <meta
          name="twitter:description"
          content="Custom analytical data solutions for organizations that need clear, reliable insight from complex data."
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </>
  );
};

export default CustomApp;
