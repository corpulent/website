import { ReactElement } from "react";
import { Container, Typography, styled } from "@mui/material";
import Link from "next/link";
import { PrimaryLayout } from "../components/layouts";
import { TNextPageWithLayout } from "../types";

const Page = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
  padding-top: ${({ theme }) => theme.spacing(10)};
  padding-bottom: ${({ theme }) => theme.spacing(12)};
`;

const Header = styled("section")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  max-width: 760px;
`;

const Title = styled(Typography)`
  font-family: "Roboto Slab", Georgia, serif;
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.04em;
`;

const Lead = styled(Typography)`
  max-width: 60ch;
  font-size: 1.05rem;
  line-height: 1.9;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const Section = styled("section")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.25)};
  max-width: 760px;
`;

const SectionTitle = styled(Typography)`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

const Body = styled(Typography)`
  font-size: 1rem;
  line-height: 1.9;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const InlineLink = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-decoration-thickness: 1px;
  text-underline-offset: 0.18em;
`;

const PrivacyPage: TNextPageWithLayout = () => {
  return (
    <Page maxWidth="lg">
      <Header>
        <Title variant="h1">Privacy</Title>
        <Lead>
          Last updated April 2, 2026.
        </Lead>
        <Lead>
          This page explains how I handle information connected to this website,
          my apps, and marketplace listings, including Snowflake Marketplace
          products such as RiskAware.
        </Lead>
      </Header>

      <Section>
        <SectionTitle>Website information</SectionTitle>
        <Body>
          If you contact me through this site, I may collect the information you
          choose to send, such as your name, company, email address, and
          message. I use that information to respond to inquiries, discuss
          projects, and keep basic records of conversations.
        </Body>
      </Section>

      <Section>
        <SectionTitle>Analytics and site services</SectionTitle>
        <Body>
          This site uses standard analytics and security tooling, including
          Google Analytics and reCAPTCHA, to understand site usage, protect the
          contact flow, and keep the site operational. Those providers may
          process technical information such as IP address, browser details,
          device data, and interaction data according to their own terms and
          policies.
        </Body>
      </Section>

      <Section>
        <SectionTitle>Marketplace apps, including RiskAware</SectionTitle>
        <Body>
          I build and publish data analysis tools through marketplaces and other
          platforms. For Snowflake Marketplace apps, including RiskAware, the
          information I receive depends on the app, the permissions granted, and
          the platform features used. In many cases, customer data stays inside
          the customer-controlled environment, while I may receive more limited
          information such as account or business contact details, support
          requests, installation context, operational logs, usage signals, or
          other information the customer or platform chooses to share.
        </Body>
      </Section>

      <Section>
        <SectionTitle>How I use information</SectionTitle>
        <Body>
          I use information to operate and improve the site and my apps, respond
          to support and business requests, troubleshoot issues, understand how
          tools are being used, and meet legal, security, or contractual
          obligations.
        </Body>
      </Section>

      <Section>
        <SectionTitle>Sharing</SectionTitle>
        <Body>
          I may share information with service providers and platforms that are
          needed to run the site, publish apps, process marketplace activity,
          provide analytics, or support security and reliability. I may also
          disclose information when required by law or when reasonably necessary
          to protect the site, my users, or my business.
        </Body>
      </Section>

      <Section>
        <SectionTitle>Retention</SectionTitle>
        <Body>
          I keep information for as long as it is reasonably needed for the
          purposes described above, including support, recordkeeping, security,
          compliance, and product improvement.
        </Body>
      </Section>

      <Section>
        <SectionTitle>Product-specific notices</SectionTitle>
        <Body>
          This is my general privacy notice. If a specific app or marketplace
          listing has materially different data practices, I may publish a
          product-specific notice and link to it from that product or listing.
        </Body>
      </Section>

      <Section>
        <SectionTitle>Contact</SectionTitle>
        <Body>
          If you have a privacy question about this site, RiskAware, or another
          app I publish, please use the <InlineLink href="/contact">contact page</InlineLink>.
        </Body>
      </Section>
    </Page>
  );
};

PrivacyPage.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export default PrivacyPage;
