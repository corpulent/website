import {
  FunctionComponent,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { CssBaseline, ThemeProvider, createTheme, styled } from "@mui/material";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const Root = styled("div")`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(4)};
`;

const Main = styled("main")`
  min-height: 100vh;
`;

export interface IPrimaryLayoutProps {
  children: ReactNode;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const PrimaryLayout: FunctionComponent<IPrimaryLayoutProps> = (
  props: IPrimaryLayoutProps
): ReactElement => {
  const { children } = props;

  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const oldItem = localStorage.getItem("darkMode");
    setDarkMode(oldItem === "true");
  }, []);

  const handleToggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
  }, [darkMode, setDarkMode]);

  return (
    <Root>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Navbar onToggleDarkMode={handleToggleDarkMode} darkMode={darkMode} />
        <Main>{children}</Main>
        <Footer />
      </ThemeProvider>
    </Root>
  );
};
