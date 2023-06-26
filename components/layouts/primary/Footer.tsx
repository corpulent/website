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
  font-family: "Roboto Slab";
  text-decoration: none;
  color: ${({ theme }) => theme.palette.primary.light};

  &:hover {
    color: ${({ theme }) => theme.palette.primary.dark};
    text-decoration: underline;
  }
`;

export const Footer: FunctionComponent = (): ReactElement => {
  return (
    <BottomBar>
      <PrimaryLinks href="/articles">Articles</PrimaryLinks>
      <PrimaryLinks href="/contact">Contact us</PrimaryLinks>
    </BottomBar>
  );
};
