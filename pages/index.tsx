import { ReactElement } from "react";
import { Container, Divider, Typography, styled } from "@mui/material";
import Link from "next/link";
import { PrimaryLayout } from "../components/layouts";
import { TNextPageWithLayout } from "../types";

const Page = styled("div")`
  display: flex;
  flex-direction: column;
  padding-bottom: ${({ theme }) => theme.spacing(20)};
`;

const Hero = styled(Container)`
  padding-top: ${({ theme }) => theme.spacing(14)};
  padding-bottom: ${({ theme }) => theme.spacing(14)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding-top: ${({ theme }) => theme.spacing(9)};
    padding-bottom: ${({ theme }) => theme.spacing(9)};
  }
`;

const HeroInner = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  max-width: 820px;
`;

const HeroEyebrow = styled(Typography)`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.primary.main};
` as typeof Typography;

const HeroTitle = styled(Typography)`
  font-family: "DM Serif Display", Georgia, serif;
  font-size: clamp(2.8rem, 7vw, 5.4rem);
  font-weight: 400;
  font-style: normal;
  line-height: 1.1;
  letter-spacing: 0em;
  max-width: 20ch;
` as typeof Typography;

const HeroLead = styled(Typography)`
  font-size: clamp(1rem, 1.8vw, 1.13rem);
  line-height: 1.9;
  color: ${({ theme }) => theme.palette.text.secondary};
  max-width: 58ch;
` as typeof Typography;

const Sections = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const Section = styled("section")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
  padding: ${({ theme }) => theme.spacing(7.5, 0)};
  max-width: 720px;
`;

const SectionLabel = styled(Typography)`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.primary.main};
` as typeof Typography;

const SectionTitle = styled(Typography)`
  font-family: "DM Serif Display", Georgia, serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: 0em;
` as typeof Typography;

const SectionText = styled(Typography)`
  font-size: 1rem;
  line-height: 1.9;
  color: ${({ theme }) => theme.palette.text.secondary};
  max-width: 64ch;
` as typeof Typography;

const StyledDivider = styled(Divider)`
  max-width: 720px;
`;

const InlineLink = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const Home: TNextPageWithLayout = () => {
  return (
    <Page>
      <Hero maxWidth="lg">
        <HeroInner>
          <HeroTitle variant="h1">
            Analytical data solutions built for the organizations that rely on
            them.
          </HeroTitle>
          <HeroLead>
            We research, design, and implement custom data infrastructure and
            analytics products, working directly with organizations to turn
            complex data landscapes into systems that drive clear, reliable
            decisions.
          </HeroLead>
        </HeroInner>
      </Hero>

      <Sections maxWidth="lg">
        <StyledDivider />

        <Section>
          <SectionLabel>Research &amp; Discovery</SectionLabel>
          <SectionTitle variant="h2">
            Starting with the right questions.
          </SectionTitle>
          <SectionText>
            Every engagement begins with a thorough investigation. We study
            existing data flows, infrastructure, reporting workflows, and
            decision-making processes to understand what an organization
            actually needs, not what it thinks it needs. The goal is precision:
            identifying gaps, redundancies, and opportunities before a single
            recommendation is made.
          </SectionText>
        </Section>

        <StyledDivider />

        <Section>
          <SectionLabel>Strategy &amp; Architecture</SectionLabel>
          <SectionTitle variant="h2">
            A clear path before the first line of code.
          </SectionTitle>
          <SectionText>
            Strategy precedes execution. After the discovery phase, we produce a
            concrete architectural blueprint, covering data modeling, pipeline
            design, tooling selection, and integration planning. Some
            organizations bring us in at this stage specifically, to act as an
            independent strategist: a technically informed voice that can
            evaluate options without vendor bias and align the data roadmap with
            broader business objectives.
          </SectionText>
        </Section>

        <StyledDivider />

        <Section>
          <SectionLabel>Build &amp; Implementation</SectionLabel>
          <SectionTitle variant="h2">
            Production-grade solutions, not proofs of concept.
          </SectionTitle>
          <SectionText>
            We design and implement analytical data systems built for
            reliability, maintainability, and scale. This includes data
            pipelines, orchestration infrastructure, transformation layers, and
            purpose-built analytics products tailored to each
            organization&apos;s workflows and tooling. The emphasis is always on
            delivering something that works in production, not just in a
            presentation.
          </SectionText>
        </Section>

        <StyledDivider />

        <Section>
          <SectionLabel>Advisory &amp; Partnership</SectionLabel>
          <SectionTitle variant="h2">
            Embedded expertise, without the overhead.
          </SectionTitle>
          <SectionText>
            Not every engagement requires a full build. Some organizations need
            a trusted technical partner to guide internal teams, review
            architectural decisions, evaluate vendors, or provide ongoing
            strategic insight as their data practice matures. We offer that
            continuity, acting as a fractional data strategist without the cost
            or complexity of a large consulting firm.
          </SectionText>
        </Section>

        <StyledDivider />

        <Section>
          <SectionLabel>Work Together</SectionLabel>
          <SectionTitle variant="h2">
            Ready to explore what&apos;s possible?
          </SectionTitle>
          <SectionText>
            Whether you are building from scratch or need to make sense of what
            you already have, we&apos;d like to hear about your situation.{" "}
            <InlineLink href="/contact">Get in touch</InlineLink> and we will
            take it from there.
          </SectionText>
        </Section>
      </Sections>
    </Page>
  );
};

Home.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export default Home;
