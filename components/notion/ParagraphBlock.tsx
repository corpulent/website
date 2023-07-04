import { Typography, styled } from "@mui/material";
import { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { FunctionComponent, ReactElement } from "react";
import { RichText } from "./RichText";

const Root = styled(Typography)`
  font-size: 18px;
  line-height: 32px;
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

export interface IParagraphBlockProps {
  block: ParagraphBlockObjectResponse;
}

export const ParagraphBlock: FunctionComponent<IParagraphBlockProps> = (
  props: IParagraphBlockProps
): ReactElement => {
  const { block } = props;

  return (
    <Root>
      {block.paragraph.rich_text.map((richText, index) => (
        <RichText key={index} richText={richText} index={index} />
      ))}
    </Root>
  );
};
