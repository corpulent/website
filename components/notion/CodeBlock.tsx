import { FunctionComponent, ReactElement, useMemo } from "react";
import { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { styled } from "@mui/material";

const Root = styled("pre")`
  margin-top: ${({ theme }) => theme.spacing(1.5)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2.5)};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 14px;
  line-height: 1.7;
  overflow-x: auto;
  white-space: pre-wrap;
`;

export interface ICodeBlockProps {
  block: CodeBlockObjectResponse;
}

export const CodeBlock: FunctionComponent<ICodeBlockProps> = (
  props: ICodeBlockProps
): ReactElement => {
  const { block } = props;
  const code = useMemo(
    () => block.code.rich_text.map((text) => text.plain_text).join("\n"),
    [block.code.rich_text]
  );

  return <Root>{code}</Root>;
};
