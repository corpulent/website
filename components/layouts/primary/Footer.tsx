import { FunctionComponent, ReactElement } from "react";

import { styled } from "@mui/material";

import Link from "next/link";

const BottomBar = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(3)};

  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const PrimaryLinks = styled(Link)`
  color: #8388a2;
  text-decoration: none;
  font-size: 12px;
`;

export const Footer: FunctionComponent = (): ReactElement => {
  return (
    <BottomBar>
      <PrimaryLinks href="/articles">Articles</PrimaryLinks>
      <PrimaryLinks href="/contact">Contact us</PrimaryLinks>
    </BottomBar>
  );
};
