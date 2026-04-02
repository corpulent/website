import {
  FunctionComponent,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from "react";

import { CssBaseline, ThemeProvider, createTheme, styled } from "@mui/material";

import { Navbar } from "./Navbar";

const Root = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled("main")`
  flex: 1;
`;

export interface IPrimaryLayoutProps {
  children: ReactNode;
}

const SYSTEM_FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';

const sharedTheme = {
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: SYSTEM_FONT_STACK,
    button: {
      textTransform: "none" as const,
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundAttachment: "fixed",
        },
        "::selection": {
          backgroundColor: "rgba(96, 165, 250, 0.28)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
          minHeight: 42,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid",
        },
      },
    },
  },
};

const darkTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#7dd3fc",
      light: "#bae6fd",
      dark: "#38bdf8",
    },
    background: {
      default: "#09111f",
      paper: "#111a2b",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
    divider: "rgba(148, 163, 184, 0.18)",
  },
  components: {
    ...sharedTheme.components,
    MuiCssBaseline: {
      styleOverrides: {
        ...sharedTheme.components.MuiCssBaseline.styleOverrides,
        body: {
          backgroundColor: "#09111f",
          backgroundImage:
            "radial-gradient(circle at top, rgba(125, 211, 252, 0.12), transparent 38%)",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
});

const lightTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#0f172a",
      light: "#1e293b",
      dark: "#020617",
    },
    background: {
      default: "#f4f7fb",
      paper: "rgba(255, 255, 255, 0.8)",
    },
    text: {
      primary: "#000000",
      secondary: "#000000",
    },
    divider: "rgba(15, 23, 42, 0.12)",
  },
  components: {
    ...sharedTheme.components,
    MuiCssBaseline: {
      styleOverrides: {
        ...sharedTheme.components.MuiCssBaseline.styleOverrides,
        body: {
          backgroundColor: "#f4f7fb",
          backgroundImage:
            "radial-gradient(circle at top, rgba(15, 23, 42, 0.08), transparent 36%)",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
});

const getInitialDarkMode = () => {
  if (typeof window === "undefined") {
    return true;
  }

  const storedValue = localStorage.getItem("darkMode");
  if (storedValue !== null) {
    return storedValue === "true";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const PrimaryLayout: FunctionComponent<IPrimaryLayoutProps> = (
  props: IPrimaryLayoutProps
): ReactElement => {
  const { children } = props;

  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);

  const handleToggleDarkMode = useCallback(() => {
    setDarkMode((currentDarkMode) => {
      const nextDarkMode = !currentDarkMode;
      localStorage.setItem("darkMode", nextDarkMode.toString());
      return nextDarkMode;
    });
  }, []);

  return (
    <Root>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Navbar onToggleDarkMode={handleToggleDarkMode} darkMode={darkMode} />
        <Main>{children}</Main>
      </ThemeProvider>
    </Root>
  );
};
