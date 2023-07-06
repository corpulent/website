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
  max-width: 680px;
`;

const Title = styled(Typography)`
  font-family: "Roboto Slab";
  font-size: 25px;
  font-weight: 800;
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
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
