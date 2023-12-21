import { FunctionComponent, ReactElement } from "react";

import { Button, styled } from "@mui/material";

import Link from "next/link";

const BottomBar = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(4, 2)};
  gap: ${({ theme }) => theme.spacing(3)};

  margin: ${({ theme }) => theme.spacing(0, 4)};

  border-top-width: 0.5px;
  border-top-style: solid;
  border-top-color: #efefef;
`;

const PrimaryLinks = styled(Link)`
  font-family: "Roboto Slab";
  text-decoration: none;
  color: ${({ theme }) => theme.palette.primary.light};

  &:hover {
    color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

const ButtonLink = styled(Link)`
  font-family: "Roboto Slab";
  text-decoration: none;
  color: white;

  &:hover {
    color: white;
    text-decoration: none;
  }
`;

export const Footer: FunctionComponent = (): ReactElement => {
  return (
    <BottomBar>
      <PrimaryLinks href="/articles">Articles</PrimaryLinks>
      <Button variant="contained" disableElevation={true}>
        <ButtonLink href="/contact">Contact us</ButtonLink>
      </Button>
    </BottomBar>
  );
};
