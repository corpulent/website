import { LinkProps, styled } from "@mui/material";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { FunctionComponent, ReactElement } from "react";

const Code = styled("code")``;

const Span = styled("span")`
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
`;

const StyledLink = styled("a")`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.primary.light};

  &:hover {
    color: ${({ theme }) => theme.palette.primary.dark};
    text-decoration: underline;
  }
`;

const colorMapping = {
  default: "black",
  gray: "grey",
  brown: "brown",
  orange: "orange",
  yellow: "yellow",
  green: "green",
  blue: "blue",
  purple: "purple",
  pink: "pink",
  red: "red",
  gray_background: "grey",
  brown_background: "brown",
  orange_background: "orange",
  yellow_background: "yellow",
  green_background: "green",
  blue_background: "blue",
  purple_background: "purple",
  pink_background: "pink",
  red_background: "red",
};

const DummyLink: FunctionComponent<LinkProps> = (
  props: LinkProps
): ReactElement => {
  const { children } = props;

  return <>{children}</>;
};

export interface IRichTextProps {
  richText: RichTextItemResponse;
  index: number;
}

export const RichText: FunctionComponent<IRichTextProps> = (
  props: IRichTextProps
): ReactElement => {
  const { richText, index } = props;

  const { bold, italic, strikethrough, underline, code, color } =
    richText.annotations;

  const Wrapper = richText.href ? StyledLink : DummyLink;
  const Component = code ? Code : Span;

  return (
    <Wrapper key={index} href={richText.href ?? undefined}>
      <Component
        style={{
          fontFamily: "Roboto Slab",
          fontWeight: bold ? "bold" : "normal",
          fontStyle: italic ? "italic" : "normal",
          textDecoration: [
            strikethrough ? "strikethrough" : "",
            underline ? "underline" : "",
          ].join(" "),
          // color: color.endsWith("_background")
          //   ? undefined
          //   : color === "default" && richText.href
          //   ? undefined
          //   : colorMapping[color],
          // backgroundColor: color.endsWith("_background")
          //   ? colorMapping[color]
          //   : undefined,
        }}
      >
        {richText.plain_text}
      </Component>
    </Wrapper>
  );
};
