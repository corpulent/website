import { ReactElement } from "react";
import { Container, Typography, styled } from "@mui/material";
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

const HeroTitle = styled(Typography)`
  max-width: 12ch;
  font-family: "Roboto Slab", Georgia, serif;
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

const Home: TNextPageWithLayout = () => {
  return (
    <Hero maxWidth="lg">
      <HeroInner>
        <HeroTitle variant="h1">
          We help data teams <Accent>reduce technical debt.</Accent>
        </HeroTitle>
        <Details>
          Outermeasure partners with data-centric organizations to modernize the
          systems behind analytics, operations, and platform delivery without
          the noise of an over-designed marketing site.
        </Details>
      </HeroInner>
    </Hero>
  );
};

Home.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export default Home;
