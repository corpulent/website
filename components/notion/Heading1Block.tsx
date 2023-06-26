import { Typography, styled } from "@mui/material";
import { Heading1BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { FunctionComponent, ReactElement } from "react";

const Root = styled("div")``;

const Heading = styled(Typography)`
  font-family: "Roboto Slab";
  font-size: 25px;
  font-weight: 500;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

export interface IHeading1BlockProps {
  block: Heading1BlockObjectResponse;
}

export const Heading1Block: FunctionComponent<IHeading1BlockProps> = (
  props: IHeading1BlockProps
): ReactElement => {
  const { block } = props;
  return (
    <Root>
      {block.heading_1.rich_text.map((richText, index) => (
        <Heading key={index} variant="h1">
          {richText.plain_text}
        </Heading>
      ))}
    </Root>
  );
};
