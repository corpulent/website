import { ReactElement } from "react";
import { Container, Typography, styled } from "@mui/material";
import Link from "next/link";
import { PrimaryLayout } from "../components/layouts";
import { TNextPageWithLayout } from "../types";

const Page = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  padding-bottom: ${({ theme }) => theme.spacing(12)};
`;

const Hero = styled(Container)`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing(10)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding-top: ${({ theme }) => theme.spacing(7)};
  }
`;

const HeroInner = styled("section")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  max-width: 860px;
`;

const HeroTitle = styled(Typography)`
  max-width: 13ch;
  font-family: "Roboto Slab", Georgia, serif;
  font-size: clamp(3.2rem, 8vw, 6.4rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.05em;
`;

const Accent = styled("span")`
  color: ${({ theme }) => theme.palette.primary.light};
`;

const Lead = styled(Typography)`
  max-width: 60ch;
  font-size: 1.16rem;
  line-height: 1.95;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const Sections = styled(Container)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(5, 6)};

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: 1fr;
  }
`;

const Section = styled("section")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const SectionTitle = styled(Typography)`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const SectionText = styled(Typography)`
  max-width: 56ch;
  font-size: 1rem;
  line-height: 1.9;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const InlineLink = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-decoration-thickness: 1px;
  text-underline-offset: 0.18em;
`;

const Home: TNextPageWithLayout = () => {
  return (
    <Page>
      <Hero maxWidth="lg">
        <HeroInner>
          <HeroTitle variant="h1">
            Data Systems, <Accent>Smarter Analysis</Accent>
          </HeroTitle>
          <Lead>
            Data and infrastructure engineer focused on pipelines,
            orchestration, reliability, and production systems that make data
            useful at scale.
          </Lead>
          <Lead>
            Outside of work, AI becomes a research partner for analysis:
            building workflows that inspect data, automate investigation,
            surface patterns, and turn good questions into practical tools.
          </Lead>
          <Lead>
            Ready to work together? <InlineLink href="/contact">Let's in touch.</InlineLink>
          </Lead>
        </HeroInner>
      </Hero>
    </Page>
  );
};

Home.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export default Home;
