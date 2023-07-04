import { styled } from "@mui/material";
import { BulletedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { FunctionComponent, ReactElement } from "react";
import { RichText } from "./RichText";

const Root = styled("li")``;

export interface IBulletedListItemBlockProps {
  block: BulletedListItemBlockObjectResponse;
}

export const BulletedListItemBlock: FunctionComponent<
  IBulletedListItemBlockProps
> = (props: IBulletedListItemBlockProps): ReactElement => {
  const { block } = props;
  return (
    <Root>
      {block.bulleted_list_item.rich_text.map((richText, index) => (
        <RichText key={index} index={index} richText={richText} />
      ))}
    </Root>
  );
};
