import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { FunctionComponent } from "react";

import {
  Button,
  List,
  ListItem,
  Skeleton,
  Typography,
  styled,
} from "@mui/material";
import { ParagraphBlock } from "../../components/notion/ParagraphBlock";
import Link from "next/link";

const MaxWidth = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  max-width: 800px;
`;

const StyledList = styled(List)`
  width: 100%;
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

  &:last-child {
    border-bottom-style: none;
  }
`;

const ItemTop = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  column-gap: ${({ theme }) => theme.spacing(3)};
`;

const ItemRight = styled("div")`
  display: flex;
  flex-direction: column;
  max-width: 650px;
`;

const Title = styled(Typography)`
  align-items: left;
  font-family: "Roboto Slab";
  font-size: 20px;
  font-weight: 600;
`;

const Content = styled("div")`
  font-family: "Roboto Slab";
  color: ${({ theme }) => theme.palette.text.secondary};

  position: relative;
  max-height: calc(36px * 4);
  overflow: hidden;

  width: 100%;

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
        <ItemTop>
          <Skeleton sx={{ width: 140, height: 200 }} animation="wave" />

          <ItemRight>
            <Title>{(meta.properties as any).title.title[0].plain_text}</Title>
            <Content>
              <ParagraphBlock block={blocks.results[0] as any} />
            </Content>
          </ItemRight>
        </ItemTop>

        <Actions>
          <Button variant="outlined" size="small" sx={{ mr: 2 }}>
            <Action href={`/articles/${slug}`}>Read more</Action>
          </Button>
        </Actions>
      </StyledListItem>
    );
  };

  return (
    <>
      <MaxWidth>
        <StyledList>
          {Object.entries(blocksBySlug).map(([key, value]) =>
            renderItem(key, value)
          )}
        </StyledList>
      </MaxWidth>
    </>
  );
};
