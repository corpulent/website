import Head from "next/head";
import { FunctionComponent, ReactElement } from "react";

const Recaptcha: FunctionComponent = (): ReactElement => (
  <Head>
    <script
      src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      async
      defer
    ></script>
  </Head>
);

export default Recaptcha;
