import { FunctionComponent, ReactElement, useMemo } from "react";
// import { python } from "@codemirror/lang-python";
import { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { styled } from "@mui/material";
import "./CodeBlock.module.css";
import { CodeEditor } from "../code-editor";
import { useWindowDimensions } from "../../hooks";

const Root = styled("div")`
  margin-top: ${({ theme }) => theme.spacing(2)};
  font-size: 12px;
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
  const { height } = useWindowDimensions();

  return (
    <Root>
      <CodeEditor
        data={code}
        language={"yaml"}
        onChange={() => undefined}
        disabled={true}
        lineWrapping={false}
        height="fit-content"
      />
    </Root>
  );
};
