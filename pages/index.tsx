import { ReactElement, useState } from "react";
import { PrimaryLayout } from "../components/layouts";
import { TNextPageWithLayout } from "../types";
import { Container, Typography, styled, useTheme } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import * as notion from "../utils/notion";
import { ViewArticles } from "../components/common";

const Root = styled("div")``;

const Hero = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  margin: ${({ theme }) => theme.spacing(2, 25, 0, 25)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    min-height: calc(100vh - 200px);
  }
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

const HeroTitle = styled(Typography)`
  max-width: 1000px;

  font-size: 50px;
  font-weight: 600;
  line-height: 80px;
  text-align: left;
  letter-spacing: 1px;
  font-family: "Roboto Slab";

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 28px;
    line-height: 42px;
  }
`;

const Design = styled("div")`
  width: 1200px;
  min-height: 1200px;
  border-radius: 50%;
  background-color: #3e187a;
  background-image: linear-gradient(316deg, #3e187a 0%, #994ecc 74%);
  position: absolute;
  right: -600px;
  top: -300px;
`;

const StyledTypeAnimation = styled(TypeAnimation)`
  font-size: 50px;
  display: inline-block;
  font-family: "Roboto Slab";
  font-weight: 700;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 28px;
  }
`;

const DetailsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  row-gap: ${({ theme }) => theme.spacing(2)};

  margin: ${({ theme }) => theme.spacing(10, 25, 0, 25)};

  text-align: left;
  color: ${({ theme }) => theme.palette.text.secondary};

  ${({ theme }) => theme.breakpoints.up("xl")} {
    max-width: 800px;
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    max-width: 800px;
  }
`;

const Details = styled(Typography)`
  font-size: 20px;
  letter-spacing: 1px;
  line-height: 36px;
  font-family: "Roboto Slab";
`;

const ViewArticlesContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(16)};

  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.up("xl")} {
    max-width: 1000px;
  }
`;

export interface IHomeProps {
  blocksBySlug: Record<string, any>;
}

const Home: TNextPageWithLayout<IHomeProps> = (props: IHomeProps) => {
  const { blocksBySlug } = props;
  const theme = useTheme();
  const [init, setInit] = useState(false);

  return (
    <Root>
      <Hero>
        <HeroTitle variant="h1">
          We help data-centric organizations <br />
          <StyledTypeAnimation
            sequence={[
              "reduce technical debt",
              5000,
              "optimize operations",
              5000,
              "reduce cloud costs",
              5000,
            ]}
            speed={89}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
          />
          <br />
          with modern, cloud native solutions
        </HeroTitle>
        <Design />
      </Hero>
      <DetailsContainer>
        <Details>
          We partner with data-centric organizations to help reduce technical
          debt, decrease cloud costs, identify technical bottlenecks, and
          optimize operations with modern, cloud native solutions.
        </Details>
        <Details>
          We are a team of data engineers, data scientists, and software
          engineers with experience in a variety of industries including
          healthcare, finance, and retail.
        </Details>
        <Details>
          Get <PrimaryLinks href="/contact">in touch</PrimaryLinks> with us
          today to learn how we can help.
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
