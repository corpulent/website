import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { FunctionComponent } from "react";

import { List, ListItem, Typography, styled } from "@mui/material";
import { ParagraphBlock } from "../../components/notion/ParagraphBlock";
import Link from "next/link";

const MaxWidth = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledListItem = styled(ListItem)`
  border-bottom-width: 0.5px;
  border-bottom-style: solid;
  border-bottom-color: #efefef;
  padding: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  row-gap: ${({ theme }) => theme.spacing(2)};
  align-items: flex-start;
`;

const Title = styled(Typography)`
  align-items: left;
  font-family: "Roboto Slab";
  font-size: 18px;
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
`;

const Action = styled(Link)`
  font-family: "Roboto Slab";
  text-decoration: none;
  color: ${({ theme }) => theme.palette.primary.light};

  &:hover {
    color: ${({ theme }) => theme.palette.primary.dark};
    text-decoration: underline;
  }
`;

export interface IViewArticlesProps {
  blocksBySlug: Record<string, any>;
}

export const ViewArticles: FunctionComponent<IViewArticlesProps> = (
  props: IViewArticlesProps
) => {
  const { blocksBySlug } = props;

  const renderItem = (
    slug: string,
    page: { meta: any; blocks: ListBlockChildrenResponse }
  ) => {
    const { blocks, meta } = page;
    return (
      <StyledListItem key={slug}>
        <Title>{(meta.properties as any).title.title[0].plain_text}</Title>
        <Content>
          <ParagraphBlock block={blocks.results[0] as any} />
        </Content>
        <Actions>
          <Action href={`/articles/${slug}`}>Read more</Action>
        </Actions>
      </StyledListItem>
    );
  };

  return (
    <>
      <MaxWidth>
        <List>
          {Object.entries(blocksBySlug).map(([key, value]) =>
            renderItem(key, value)
          )}
        </List>
      </MaxWidth>
    </>
  );
};
