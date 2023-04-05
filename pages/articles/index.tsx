import * as notion from "../../utils/notion";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { Container, List, ListItem, Typography, styled } from "@mui/material";
import { TNextPageWithLayout } from "../../types";
import { ReactElement } from "react";
import { PrimaryLayout } from "../../components/layouts";
import { ParagraphBlock } from "../../components/notion/ParagraphBlock";
import Link from "next/link";

const Root = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MaxWidth = styled("div")`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledListItem = styled(ListItem)`
  border-bottom-width: 0.5px;
  border-bottom-style: solid;
  border-bottom-color: #dadada;
  height: 256px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemContent = styled("div")`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  row-gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const Title = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
`;

const Content = styled("div")`
  position: relative;
  max-height: calc(36px * 4);
  overflow: hidden;
  padding-right: 1rem; /* space for ellipsis */

  &::before {
    position: absolute;
    inset-block-end: 0; /* "bottom" */
    inset-inline-end: 0; /* "right" */
  }

  &::after {
    content: "...";
    position: absolute;
    inset-inline-end: 0; /* "right" */
    width: 1rem;
    height: 1rem;
    background: white;
  }
`;

const Actions = styled("div")`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Action = styled(Link)`
    text-decoration: none;
    color: #aaaaaa;
`;

export interface IViewArticlesProps {
  blocksBySlug: Record<string, any>;
}

const ViewArticles: TNextPageWithLayout<IViewArticlesProps> = (
  props: IViewArticlesProps
) => {
  const { blocksBySlug } = props;

  const renderItem = (
    slug: string,
    page: { meta: any; blocks: ListBlockChildrenResponse }
  ) => {
    const { blocks, meta } = page;
    console.log(blocks);
    return (
      <StyledListItem key={slug}>
        <ItemContent>
          <Title>{(meta.properties as any).title.title[0].plain_text}</Title>
          <Content>
            <ParagraphBlock block={blocks.results[0] as any} />
          </Content>
        </ItemContent>
        <Actions>
          <Action href={`/articles/${slug}`}>Read more</Action>
        </Actions>
      </StyledListItem>
    );
  };

  return (
    <Root>
      <MaxWidth>
        <List>
          {Object.entries(blocksBySlug).map(([key, value]) =>
            renderItem(key, value)
          )}
        </List>
      </MaxWidth>
    </Root>
  );
};

ViewArticles.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export async function getStaticProps(context: any) {
  const blocksBySlug = await notion.getAllPages(process.env.ROOT_PAGE_ID!);
  console.log(blocksBySlug);
  return {
    props: {
      blocksBySlug,
    },
  };
}

export default ViewArticles;
