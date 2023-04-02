import { FunctionComponent, ReactElement, ReactNode } from "react";

import { CssBaseline, styled } from "@mui/material";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const Root = styled("div")`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(4)};
`;

const Main = styled("main")`
  min-height: 100vh;
`;

export interface IPrimaryLayoutProps {
  children: ReactNode;
}

export const PrimaryLayout: FunctionComponent<IPrimaryLayoutProps> = (
  props: IPrimaryLayoutProps
): ReactElement => {
  const { children } = props;

  return (
    <Root>
      <CssBaseline />
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </Root>
  );
};
