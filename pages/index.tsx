import { ReactElement } from "react";
import { Button, Container, Typography, styled } from "@mui/material";
import Link from "next/link";
import { PrimaryLayout } from "../components/layouts";
import { TNextPageWithLayout } from "../types";

const Hero = styled(Container)`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 120px);
  padding-top: ${({ theme }) => theme.spacing(10)};
  padding-bottom: ${({ theme }) => theme.spacing(10)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    min-height: calc(100vh - 96px);
    padding-top: ${({ theme }) => theme.spacing(7)};
    padding-bottom: ${({ theme }) => theme.spacing(7)};
  }
`;

const HeroInner = styled("section")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  max-width: 760px;
`;

const Eyebrow = styled(Typography)`
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const HeroTitle = styled(Typography)`
  max-width: 12ch;
  font-size: clamp(3.4rem, 8vw, 6.5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.05em;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    max-width: 11ch;
  }
`;

const Accent = styled("span")`
  color: ${({ theme }) => theme.palette.primary.light};
`;

const Details = styled(Typography)`
  max-width: 56ch;
  font-size: 1.1rem;
  line-height: 1.9;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const FocusChip = styled("div")`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.25)};
  padding: ${({ theme }) => theme.spacing(1.1, 1.6)};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: 999px;
  color: ${({ theme }) => theme.palette.text.secondary};
  background: ${({ theme }) => theme.palette.background.paper};
`;

const FocusDot = styled("span")`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0 0 0 6px rgba(125, 211, 252, 0.12);
`;

const Actions = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const TextLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const Home: TNextPageWithLayout = () => {
  return (
    <Hero maxWidth="lg">
      <HeroInner>
        <Eyebrow>Cloud-native data systems</Eyebrow>
        <HeroTitle variant="h1">
          We help data teams <Accent>reduce technical debt.</Accent>
        </HeroTitle>
        <Details>
          Outermeasure partners with data-centric organizations to modernize the
          systems behind analytics, operations, and platform delivery without
          the noise of an over-designed marketing site.
        </Details>
        <FocusChip>
          <FocusDot />
          Current focus: reduce technical debt
        </FocusChip>
        <Actions>
          <Button
            component={Link}
            href="/contact"
            variant="contained"
            disableElevation={true}
          >
            Start a conversation
          </Button>
          <TextLink href="/articles">Browse articles</TextLink>
        </Actions>
        <Details>
          The next pass can go further into a full rewrite. For now, the site is
          stripped back, dark-mode ready, and centered on a single clear
          message.
        </Details>
      </HeroInner>
    </Hero>
  );
};

Home.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export default Home;
