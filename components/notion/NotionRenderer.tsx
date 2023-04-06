import { Fragment, FunctionComponent, ReactElement } from "react";
import { styled } from "@mui/material";
import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { IParagraphBlockProps, ParagraphBlock } from "./ParagraphBlock";
import { CodeBlock, ICodeBlockProps } from "./CodeBlock";
import { Heading1Block, IHeading1BlockProps } from "./Heading1Block";
import { Heading2Block, IHeading2BlockProps } from "./Heading2Block";
import { Heading3Block, IHeading3BlockProps } from "./Heading3Block";
import {
  INumberedListItemBlockProps,
  NumberedListItemBlock,
} from "./NumberedListItemBlock";
import {
  BulletedListItemBlock,
  IBulletedListItemBlockProps,
} from "./BulletedListItemBlock";
import { IImageBlockProps, ImageBlock } from "./ImageBlock";

const Root = styled("div")`
  display: flex;
  flex-direction: column;

  font-size: 20px;
  line-height: 32px;
`;

export interface INotionRendererProps {
  page: ListBlockChildrenResponse;
}

const components: Record<
  string,
  | FunctionComponent<IParagraphBlockProps>
  | FunctionComponent<ICodeBlockProps>
  | FunctionComponent<IHeading1BlockProps>
  | FunctionComponent<IHeading2BlockProps>
  | FunctionComponent<IHeading3BlockProps>
  | FunctionComponent<INumberedListItemBlockProps>
  | FunctionComponent<IBulletedListItemBlockProps>
  | FunctionComponent<IImageBlockProps>
> = {
  paragraph: ParagraphBlock,
  code: CodeBlock,
  heading_1: Heading1Block,
  heading_2: Heading2Block,
  heading_3: Heading3Block,
  numbered_list_item: NumberedListItemBlock,
  bulleted_list_item: BulletedListItemBlock,
  image: ImageBlock,
};

interface IGroup {
  type: string;
  items: BlockObjectResponse[];
}

export const NotionRenderer: FunctionComponent<INotionRendererProps> = (
  props: INotionRendererProps
): ReactElement => {
  const { page } = props;

  console.log(page);

  const renderBlock = (block: BlockObjectResponse) => {
    const Component = components[block.type];
    if (!Component) {
      console.warn(`Unknown block type "${block.type} -- ignored"`);
      return <Fragment key={block.id} />;
    }
    // console.log(block);
    return <Component key={block.id} block={block as never} />;
  };

  const renderGroups = (blocks: BlockObjectResponse[]) => {
    /* Determine blocks that need to be grouped under a single parent. */
    const groups: IGroup[] = [];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (["numbered_list_item", "bulleted_list_item"].includes(block.type)) {
        if (
          groups.length > 0 &&
          groups[groups.length - 1].type === block.type
        ) {
          groups[groups.length - 1].items.push(block);
          continue;
        }
        groups.push({
          type: block.type,
          items: [block],
        });
      } else {
        groups.push({
          type: block.type,
          items: [block],
        });
      }
    }

    return (
      <Root>
        {groups.map((group, index) => (
          <Fragment key={index}>
            {group.type === "numbered_list_item" && (
              <ol>{group.items.map(renderBlock)}</ol>
            )}
            {group.type === "bulleted_list_item" && (
              <ul>{group.items.map(renderBlock)}</ul>
            )}
            {!["numbered_list_item", "bulleted_list_item"].includes(
              group.type
            ) && group.items.map(renderBlock)}
          </Fragment>
        ))}
      </Root>
    );
  };

  return <Root>{page.results && renderGroups(page.results as any)}</Root>;
};
