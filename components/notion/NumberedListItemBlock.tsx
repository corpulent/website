import { styled } from "@mui/material";
import { NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { FunctionComponent, ReactElement } from "react";

const Root = styled("div")``;

export interface INumberedListItemBlockProps {
  block: NumberedListItemBlockObjectResponse;
}

export const NumberedListItemBlock: FunctionComponent<
  INumberedListItemBlockProps
> = (props: INumberedListItemBlockProps): ReactElement => {
  const { block } = props;
  return (
    <Root>
      {block.numbered_list_item.rich_text.map((richText, index) => (
        <li key={index}>{richText.plain_text}</li>
      ))}
    </Root>
  );
};
