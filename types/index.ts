import { ReactElement } from "react";

import { NextPage } from "next";

export type TGetLayoutFunction = (page: ReactElement) => ReactElement;

export type TNextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: TGetLayoutFunction;
};
