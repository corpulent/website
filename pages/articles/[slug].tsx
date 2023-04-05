import type { NextPage } from "next";
import * as notion from "../../utils/notion";
import { NotionRenderer } from "../../components/notion";
import {
  ListBlockChildrenResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Container, Typography, styled } from "@mui/material";
import { TNextPageWithLayout } from "../../types";
import { ReactElement } from "react";
import { PrimaryLayout } from "../../components/layouts";

const Root = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MaxWidth = styled("div")`
  max-width: 700px;
`;

const Title = styled(Typography)`
  font-size: 45px;
  font-weight: 800;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

export interface IViewArticleProps {
  blocks: ListBlockChildrenResponse;
  page: PageObjectResponse;
}

const ViewArticle: TNextPageWithLayout<IViewArticleProps> = (
  props: IViewArticleProps
) => {
  const { blocks, page } = props;
  return (
    <Root>
      <MaxWidth>
        <Title>{(page.properties as any).title.title[0].plain_text}</Title>
        <NotionRenderer page={blocks} />
      </MaxWidth>
    </Root>
  );
};

ViewArticle.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export async function getStaticPaths() {
  const slugs = await notion.getSlugs(process.env.ROOT_PAGE_ID!);
  console.log("Loaded slugs:", slugs);
  return {
    paths: slugs.map((slug: string) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const props = await notion.getPage(
    process.env.ROOT_PAGE_ID!,
    context.params.slug
  );
  return {
    props,
  };
}

export default ViewArticle;
