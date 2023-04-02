import { FunctionComponent, ReactElement } from "react";

import { styled } from "@mui/material";

import Link from "next/link";

const Root = styled("div")`
  background: #f8f9fa;
  background-size: 100% 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: ${({ theme }) => theme.spacing(9, 15, 9, 15)};
  ${({ theme }) => theme.breakpoints.down("md")} {
    padding: ${({ theme }) => theme.spacing(5)};
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: ${({ theme }) => theme.spacing(3)};
  }
`;

const BottomBar = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(4)};

  margin-top: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100%;
    padding: ${({ theme }) => theme.spacing(0, 3)};
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: ${({ theme }) => theme.spacing(0, 1)};
    font-size: 12px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing(2)};
  }
`;

const PrimaryLinks = styled(Link)`
  color: #8388a2;
  text-decoration: none;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-column: span 2;
    &:nth-last-child(1):nth-child(odd) {
      grid-column: 2 / span 2;
    }
    text-align: center;
  }
`;

const PoweredBy = styled("div")`
  display: flex;
  color: #8388a2;
  justify-content: center;
  align-items: center;
  gap: 5px;

  width: 100%;
  font-size: 18px;

  margin: ${({ theme }) => theme.spacing(4, 0)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 14px;
  }
`;

export const Footer: FunctionComponent = (): ReactElement => {
  return (
    <Root>
      <BottomBar>
        <PrimaryLinks href="/privacy-policy">PRIVACY POLICY</PrimaryLinks>
        <PrimaryLinks href="terms-of-use">TERMS OF USE</PrimaryLinks>
      </BottomBar>
      <PoweredBy>
        Powered by
        <PrimaryLinks href="https://outermeasure.com">OuterMeasure</PrimaryLinks>
      </PoweredBy>
    </Root>
  );
};
