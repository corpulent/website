import {
  AppBar,
  Button,
  Container,
  Icon,
  IconButton,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, ReactElement } from "react";

const Shell = styled(AppBar)`
  background: transparent;
  backdrop-filter: blur(18px);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 88px;
  padding: ${({ theme }) => theme.spacing(0, 0.5)};
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  text-decoration: none;
  color: inherit;
`;

const BrandMark = styled("svg")`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
`;

const BrandText = styled(Typography)`
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Actions = styled("div")`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
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
            <BrandMark
              width="220"
              height="220"
              viewBox="0 0 220 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M110 220C170.751 220 220 170.751 220 110C220 49.2487 170.751 0 110 0C49.2487 0 0 49.2487 0 110C0 170.751 49.2487 220 110 220ZM110 198.524C158.89 198.524 198.524 158.89 198.524 110C198.524 61.1097 158.89 21.4762 110 21.4762C61.1097 21.4762 21.4762 61.1097 21.4762 110C21.4762 158.89 61.1097 198.524 110 198.524Z"
                fill="url(#paint0_linear_303_14)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_303_14"
                  x1="142.289"
                  y1="66.2189"
                  x2="-28.4577"
                  y2="283.483"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0047FF" />
                  <stop
                    offset="0.213542"
                    stopColor="#0055FF"
                    stopOpacity="0.911458"
                  />
                  <stop offset="1" stopColor="#00E0FF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </BrandMark>
            <BrandText>Outermeasure</BrandText>
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

            {router.pathname !== "/contact" && (
              <Button
                component={Link}
                href="/contact"
                variant="contained"
                disableElevation={true}
                endIcon={<Icon fontSize="small">north_east</Icon>}
              >
                Contact
              </Button>
            )}
          </Actions>
        </StyledToolbar>
      </Container>
    </Shell>
  );
};
