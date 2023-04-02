import CodeMirror from "@uiw/react-codemirror";
import { FunctionComponent, ReactElement, useMemo } from "react";
import { python } from "@codemirror/lang-python";
import { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { styled } from "@mui/material";

const Root = styled("div")`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export interface ICodeBlockProps {
  block: CodeBlockObjectResponse;
}

export const CodeBlock: FunctionComponent<ICodeBlockProps> = (
  props: ICodeBlockProps
): ReactElement => {
  const { block } = props;
  const code = useMemo(() => block.code.rich_text.map((text) => text.plain_text).join("\n"), []);
  return (
    <Root>
      <CodeMirror value={code} extensions={[python()]} theme="dark" readOnly={true} />
    </Root>
  );
};
