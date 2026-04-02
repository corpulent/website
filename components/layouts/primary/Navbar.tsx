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
  padding-top: ${({ theme }) => theme.spacing(2.5)};
  padding-bottom: ${({ theme }) => theme.spacing(1.5)};
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 124px;
  padding: ${({ theme }) => theme.spacing(0, 0.5)};
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  text-decoration: none;
  color: inherit;
`;

const Actions = styled("div")`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const ContactLink = styled(Link)`
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.text.primary};

  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export interface INavbarProps {
  onToggleDarkMode: () => void;
  darkMode: boolean;
}

export const Navbar: FunctionComponent<INavbarProps> = (
  props: INavbarProps
): ReactElement => {
  const { onToggleDarkMode, darkMode } = props;

  const router = useRouter();

  return (
    <Shell position="sticky" elevation={0} color="inherit">
      <Container maxWidth="lg">
        <StyledToolbar>
          <Brand href="/">
            <Image
              src={darkMode ? "/logo-white.svg" : "/logo-dark.svg"}
              alt="Outermeasure logo"
              width={106}
              height={119}
              priority={true}
              style={{ width: "auto", height: 34 }}
            />
          </Brand>

          <Actions>
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
          </Actions>
        </StyledToolbar>
      </Container>
    </Shell>
  );
};
