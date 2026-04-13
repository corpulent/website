import { FunctionComponent, ReactElement } from "react";

import { Container, Typography, styled } from "@mui/material";

import Link from "next/link";

const BottomBar = styled("footer")`
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  padding: ${({ theme }) => theme.spacing(5, 0)};
  margin-top: auto;
`;

const FooterInner = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  flex-wrap: wrap;
`;

const FooterCopy = styled(Typography)`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.palette.text.secondary};
` as typeof Typography;

const FooterNav = styled("nav")`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const FooterLink = styled(Link)`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export const Footer: FunctionComponent = (): ReactElement => {
  const year = new Date().getFullYear();

  return (
    <BottomBar>
      <FooterInner maxWidth="lg">
        <FooterCopy>
          &copy; {year} Outermeasure. All rights reserved.
        </FooterCopy>
        <FooterNav>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/privacy">Privacy</FooterLink>
        </FooterNav>
      </FooterInner>
    </BottomBar>
  );
};
