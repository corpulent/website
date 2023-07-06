import CodeMirror from "@uiw/react-codemirror";
import { FunctionComponent, ReactElement, useMemo } from "react";
import { python } from "@codemirror/lang-python";
import { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { styled } from "@mui/material";
import "./CodeBlock.module.css";
import { EditorView } from "@codemirror/view";

const Root = styled("div")`
  margin-top: ${({ theme }) => theme.spacing(1)};
  font-size: 16px;
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
  return (
    <Root>
      <CodeMirror
        value={code}
        extensions={[python(), EditorView.lineWrapping]}
        theme="dark"
        readOnly={true}
        basicSetup={{
          lineNumbers: false,
        }}
      />
    </Root>
  );
};
