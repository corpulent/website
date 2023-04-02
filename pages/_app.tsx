import { ReactElement } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";

import { TGetLayoutFunction, TNextPageWithLayout } from "../types";

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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
};

export default CustomApp;
