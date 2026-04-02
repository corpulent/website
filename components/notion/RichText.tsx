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
  color: ${({ theme }) => theme.palette.text.primary};

  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
    text-decoration: underline;
  }
`;

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

  const { bold, italic, strikethrough, underline, code } = richText.annotations;

  const Wrapper = richText.href ? StyledLink : DummyLink;
  const Component = code ? Code : Span;

  return (
    <Wrapper key={index} href={richText.href ?? undefined}>
      <Component
        style={{
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
