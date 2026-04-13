import {
  AppBar,
  Container,
  Icon,
  IconButton,
  Toolbar,
  styled,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, ReactElement } from "react";

const Shell = styled(AppBar)`
  background: transparent;
  backdrop-filter: blur(18px);
  padding-top: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 72px;
  padding: ${({ theme }) => theme.spacing(0, 0.5)};
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  text-decoration: none;
  color: inherit;
`;

const Nav = styled("nav")`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

const NavLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.text.secondary};
  padding: ${({ theme }) => theme.spacing(0.75, 1.5)};
  border-radius: ${({ theme }) => theme.spacing(1)};
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export interface INavbarProps {
  onToggleDarkMode: () => void;
  darkMode: boolean;
}

export const Navbar: FunctionComponent<INavbarProps> = (
  props: INavbarProps,
): ReactElement => {
  const { onToggleDarkMode, darkMode } = props;

  const router = useRouter();

  return (
    <Shell position="sticky" elevation={0} color="inherit">
      <Container maxWidth="lg">
        <StyledToolbar disableGutters>
          <Brand href="/">
            <Image
              src={darkMode ? "/logo-white.svg" : "/logo-dark.svg"}
              alt="Outermeasure logo"
              width={106}
              height={119}
              priority={true}
              style={{ width: "auto", height: 30 }}
            />
          </Brand>

          <Nav>
            <NavLink href="/contact">Contact</NavLink>
            <IconButton
              onClick={onToggleDarkMode}
              size="small"
              color="inherit"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <Icon fontSize="small">
                {darkMode ? "light_mode" : "dark_mode"}
              </Icon>
            </IconButton>
          </Nav>
        </StyledToolbar>
      </Container>
    </Shell>
  );
};
