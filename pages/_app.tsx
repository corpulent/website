import { ReactElement } from "react";

import type { AppProps } from "next/app";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { TGetLayoutFunction, TNextPageWithLayout } from "../types";
import Head from "next/head";

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
      <Head>
        <title>OuterMeasure</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="OuterMeasure helps organizations build modern, cloud-native, and machine learning optimized data pipelines."
        />
        <meta property="og:title" content="OuterMeasure" />
        <meta
          property="og:description"
          content="OuterMeasure helps organizations build modern, cloud-native, and machine learning optimized data pipelines."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://outermeasure.com/" />
        <meta property="og:image" content="/logo.svg" />
      </Head>

      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </>
  );
};

export default CustomApp;
