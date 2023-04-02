import { Typography, styled } from "@mui/material";
import { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { FunctionComponent, ReactElement } from "react";

const Root = styled("div")``;

const Paragraph = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
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
        <Paragraph key={index}>{richText.plain_text}</Paragraph>
      ))}
    </Root>
  );
};
