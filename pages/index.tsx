import { ReactElement } from "react";
import { PrimaryLayout } from "../components/layouts";
import { TNextPageWithLayout } from "../types";
import {
  Container,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import * as notion from "../utils/notion";
import { ViewArticles } from "../components/common";

const Root = styled("div")``;

const Hero = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 104px);
  row-gap: ${({ theme }) => theme.spacing(8)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    min-height: calc(100vh - 96px);
  }
`;

const HeroTitle = styled(Typography)`
  max-width: 1000px;
  font-size: 50px;
  font-weight: 600;
  line-height: 96px;
  text-align: center;
  font-family: "Josefin Sans";

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 24px;
    line-height: 48px;
  }
`;

const StyledTypeAnimation = styled(TypeAnimation)`
  font-size: 50px;
  display: inline-block;
  text-decoration: underline;
  text-underline-offset: 16px;
  font-family: "Josefin Sans";
  font-weight: 700;
  margin-top: 8px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 28px;
    margin: ${({ theme }) => theme.spacing(1, 0, 2, 0)};
  }
`;

const LogoContainer = styled("div")`
  display: flex;
  flex-direction: row;
  column-gap: ${({ theme }) => theme.spacing(8)};
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    column-gap: ${({ theme }) => theme.spacing(3)};
  }
`;

const DetailsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(4)};
`;

const Details = styled(Typography)`
  font-size: 24px;
  line-height: 40px;
  font-family: "Josefin Sans";
  font-weight: 400;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 20px;
  }
`;

const ViewArticlesContainer = styled("div")`
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

export interface IHomeProps {
  blocksBySlug: Record<string, any>;
}

const logos = [
  {
    url: "/argo-icon.svg",
    alt: "Argo icon",
    width: 100,
    height: 100,
  },
  {
    url: "/airflow-icon.svg",
    alt: "Airflow icon",
    width: 75,
    height: 75,
  },
  {
    url: "/dagster-icon.svg",
    alt: "Dagster icon",
    width: 120,
    height: 120,
  },
  {
    url: "/mulesoft-icon.svg",
    alt: "Mulesoft icon",
    width: 90,
    height: 90,
  },
];

const Home: TNextPageWithLayout<IHomeProps> = (props: IHomeProps) => {
  const { blocksBySlug } = props;
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Root>
      <Hero>
        <HeroTitle variant="h1">
          We help organizations build <br />
          <StyledTypeAnimation
            sequence={[
              "modern",
              2000,
              "cloud-native",
              2000,
              "AI optimized",
              2000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
          />
          <br />
          data pipelines
        </HeroTitle>
        <LogoContainer>
          {logos.map((logo) => (
            <Image
              key={logo.url}
              src={logo.url}
              alt={logo.alt}
              width={logo.width * (largeScreen ? 1 : 0.6)}
              height={logo.height * (largeScreen ? 1 : 0.6)}
            />
          ))}
        </LogoContainer>
      </Hero>
      <DetailsContainer>
        <Details>
          Our team of experts can assist organizations in streamlining their
          software development processes by implementing data ops solutions that
          are tailored to their specific needs. With our help, organizations can
          achieve faster deployment times, greater collaboration between teams,
          and improved overall efficiency.
        </Details>
        <Details>
          One of the key solutions we offer is the implementation of Airflow, an
          open-source platform used for creating, scheduling, and monitoring
          workflows. Airflow provides a scalable, extensible, and elegant
          solution for managing complex workflows. Our team can help
          organizations with the installation, configuration, and customization
          of Airflow to ensure it meets their unique requirements.
        </Details>
        <Details>
          Another solution we offer is the implementation of Argo Workflows, an
          open-source container-native workflow engine for orchestrating
          parallel jobs on Kubernetes. Argo Workflows provides a powerful
          platform for managing complex data pipelines and processing workflows.
          Our team can help organizations with the installation, configuration,
          and customization of Argo Workflows to ensure it meets their unique
          requirements.
        </Details>
        <Details>
          Contact us today to learn more about how we can help your
          organization.
        </Details>
      </DetailsContainer>
      <ViewArticlesContainer>
        <ViewArticles blocksBySlug={blocksBySlug} />
      </ViewArticlesContainer>
    </Root>
  );
};

Home.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export async function getStaticProps(context: any) {
  const blocksBySlug = await notion.getAllPages(process.env.ROOT_PAGE_ID!);
  return {
    props: {
      blocksBySlug,
    },
  };
}

export default Home;
