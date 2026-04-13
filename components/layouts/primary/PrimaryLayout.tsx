import {
  FunctionComponent,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from "react";

import { CssBaseline, ThemeProvider, createTheme, styled } from "@mui/material";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

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

const BODY_FONT =
  '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const sharedTheme = {
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: BODY_FONT,
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
      primary: "#e2e8f0",
      secondary: "#94a3b8",
    },
    divider: "rgba(148, 163, 184, 0.15)",
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
      main: "#1d4ed8",
      light: "#2563eb",
      dark: "#1e40af",
    },
    background: {
      default: "#f7f8fc",
      paper: "rgba(255, 255, 255, 0.9)",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
    divider: "rgba(15, 23, 42, 0.1)",
  },
  components: {
    ...sharedTheme.components,
    MuiCssBaseline: {
      styleOverrides: {
        ...sharedTheme.components.MuiCssBaseline.styleOverrides,
        body: {
          backgroundColor: "#f7f8fc",
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(29, 78, 216, 0.05), transparent 50%)",
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
  props: IPrimaryLayoutProps,
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
        <Footer />
      </ThemeProvider>
    </Root>
  );
};
