import { styled } from "@mui/material";
import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { FunctionComponent, ReactElement } from "react";

const Root = styled("figure")`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  row-gap: ${({ theme }) => theme.spacing(1)};
  padding: 0px;
  margin: 0px;
`;

const StyledImage = styled("img")`
  max-width: 700px;
  height: auto;
`;

export interface IImageBlockProps {
  block: ImageBlockObjectResponse;
}

export const ImageBlock: FunctionComponent<IImageBlockProps> = (
  props: IImageBlockProps
): ReactElement => {
  const { block } = props;
  const caption = (block.image as any).caption
    .map((item: any) => item.plain_text)
    .join("");

  return (
    <Root>
      <StyledImage
        src={
          (block.image as any).file?.url ?? (block.image as any).external?.url
        }
        alt={caption || "Article image"}
      />
      <figcaption>{caption}</figcaption>
    </Root>
  );
};
