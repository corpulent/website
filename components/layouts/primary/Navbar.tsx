import { AppBar, Box, Button, Icon, Toolbar, styled } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, ReactElement } from "react";

const StyledSvg = styled("svg")`
  width: 48px;
  height: 48px;
  margin-right: ${({ theme }) => theme.spacing(1)};
  margin-top: 24px;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin-left: 172px;
`;

const ButtonLink = styled(Link)`
  font-family: "Roboto Slab";
  text-decoration: none;
  color: white;

  &:hover {
    text-decoration: none;
    color: white;
  }
`;

const DarkModeToggle = styled(Button)`
  border-radius: ${({ theme }) => theme.spacing(1)};
  width: 40px;
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} color="inherit">
        <StyledToolbar>
          <StyledLink href="/">
            <StyledSvg
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
            </StyledSvg>
          </StyledLink>

          {router.pathname !== "/contact" && (
            <Button
              variant="contained"
              disableElevation={true}
              sx={{
                zIndex: 1,
                borderRadius: 0,
              }}
            >
              <ButtonLink href="/contact">Contact us</ButtonLink>
              <Icon sx={{ mt: -0.25, ml: 0.5 }} fontSize="small">
                chevron_right
              </Icon>
            </Button>
          )}
          {/* <DarkModeToggle
            onClick={onToggleDarkMode}
            size="small"
          >
            <Icon>{darkMode ? "light_mode" : "dark_mode"}</Icon>
          </DarkModeToggle> */}
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};
