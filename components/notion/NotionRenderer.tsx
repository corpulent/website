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

const Root = styled("div")``;

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
> = {
  paragraph: ParagraphBlock,
  code: CodeBlock,
  heading_1: Heading1Block,
  heading_2: Heading2Block,
  heading_3: Heading3Block,
};

export const NotionRenderer: FunctionComponent<INotionRendererProps> = (
  props: INotionRendererProps
): ReactElement => {
  const { page } = props;

  const renderBlock = (block: BlockObjectResponse) => {
    const Component = components[block.type];
    if (!Component) {
      console.warn(`Unknown block type "${block.type} -- ignored"`);
      return <Fragment key={block.id} />;
    }
    return <Component key={block.id} block={block as never} />;
  };

  return <Root>{page.results.map(renderBlock as any)}</Root>;
};
