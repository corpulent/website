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

const Root = styled(Container)``;

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
      <Title>{(page.properties as any).title.title[0].plain_text}</Title>
      <NotionRenderer page={blocks} />
    </Root>
  );
};

ViewArticle.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export async function getStaticPaths() {
  const slugs = await notion.getSlugs("f0cb2ac9f04c43468d9dae0aba17af01");
  return {
    paths: slugs.map((slug: string) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const props = await notion.getPage(
    "f0cb2ac9f04c43468d9dae0aba17af01",
    context.params.slug
  );
  return {
    props,
  };
}

export default ViewArticle;
