import { ReactElement } from "react";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  Container,
  Divider,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { PrimaryLayout } from "../../components/layouts";
import { TNextPageWithLayout } from "../../types";

interface IProps {
  content: string;
}

const Root = styled(Container)`
  padding-top: ${({ theme }) => theme.spacing(12)};
  padding-bottom: ${({ theme }) => theme.spacing(16)};
  max-width: 860px !important;
`;

const Prose = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0)};

  h1 {
    font-family: "DM Serif Display", Georgia, serif;
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 400;
    line-height: 1.15;
    margin: 0 0 ${({ theme }) => theme.spacing(4)};
    color: ${({ theme }) => theme.palette.text.primary};
  }

  h2 {
    font-family: "DM Serif Display", Georgia, serif;
    font-size: clamp(1.35rem, 2.5vw, 1.7rem);
    font-weight: 400;
    line-height: 1.25;
    margin: ${({ theme }) => theme.spacing(5)} 0
      ${({ theme }) => theme.spacing(1.5)};
    color: ${({ theme }) => theme.palette.text.primary};
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    margin: ${({ theme }) => theme.spacing(3.5)} 0
      ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.palette.text.primary};
  }

  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    margin: ${({ theme }) => theme.spacing(2.5)} 0
      ${({ theme }) => theme.spacing(0.75)};
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  p {
    font-size: 0.975rem;
    line-height: 1.9;
    margin: 0 0 ${({ theme }) => theme.spacing(2)};
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  ul,
  ol {
    margin: 0 0 ${({ theme }) => theme.spacing(2)};
    padding-left: ${({ theme }) => theme.spacing(3)};
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  li {
    font-size: 0.975rem;
    line-height: 1.85;
    margin-bottom: ${({ theme }) => theme.spacing(0.5)};
  }

  a {
    color: ${({ theme }) => theme.palette.primary.main};
    text-underline-offset: 0.2em;
    text-decoration-thickness: 1px;
  }

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.palette.divider};
    margin: ${({ theme }) => theme.spacing(5)} 0;
  }

  code {
    font-size: 0.82em;
    font-family: "JetBrains Mono", "Fira Code", "Cascadia Code", monospace;
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.07)"
        : "rgba(0,0,0,0.06)"};
    padding: 0.15em 0.4em;
    border-radius: 3px;
  }

  pre code {
    background: none;
    padding: 0;
  }

  pre {
    margin: 0 0 ${({ theme }) => theme.spacing(2.5)};
    border-radius: 4px;
    overflow-x: auto;
  }

  blockquote {
    border-left: 3px solid ${({ theme }) => theme.palette.divider};
    margin: 0 0 ${({ theme }) => theme.spacing(2)};
    padding-left: ${({ theme }) => theme.spacing(2)};
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${({ theme }) => theme.spacing(3)};
    font-size: 0.9rem;
  }

  th,
  td {
    text-align: left;
    padding: ${({ theme }) => theme.spacing(1, 2)};
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  th {
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const RisklensDocsPage: TNextPageWithLayout<IProps> = ({
  content,
}: IProps): ReactElement => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Root>
      <Prose>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              const isBlock = match !== null;
              return isBlock ? (
                <SyntaxHighlighter
                  style={isDark ? oneDark : oneLight}
                  language={match[1]}
                  PreTag="pre"
                  customStyle={{
                    margin: 0,
                    borderRadius: 4,
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </Prose>
    </Root>
  );
};

RisklensDocsPage.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const filePath = path.join(process.cwd(), "DOCS.md");
  const content = fs.readFileSync(filePath, "utf8");
  return { props: { content } };
};

export default RisklensDocsPage;
