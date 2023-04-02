import { Typography, styled } from "@mui/material";
import { Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { FunctionComponent, ReactElement } from "react";

const Root = styled("div")``;

const Heading = styled(Typography)`
  font-size: 20px;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

export interface IHeading3BlockProps {
  block: Heading3BlockObjectResponse;
}

export const Heading3Block: FunctionComponent<IHeading3BlockProps> = (
  props: IHeading3BlockProps
): ReactElement => {
  const { block } = props;
  return (
    <Root>
      {block.heading_3.rich_text.map((richText, index) => (
        <Heading key={index} variant="h3">
          {richText.plain_text}
        </Heading>
      ))}
    </Root>
  );
};
