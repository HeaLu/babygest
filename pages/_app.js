import React from "react";
import { SessionProvider } from "next-auth/react";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import Main from "../src/components/Main";
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  blue,
  brown,
  green,
  grey,
  lightBlue,
  orange,
  red,
} from "@mui/material/colors";
import { frFR as pickersFrFR } from "@mui/x-date-pickers";

const { palette } = createTheme();
const theme = createTheme(
  {
    palette: {
      primary: lightBlue,
      secondary: orange,
      couches: palette.augmentColor({ color: brown }),
      evenements: palette.augmentColor({ color: grey }),
      biberons: palette.augmentColor({ color: green }),
      bains: palette.augmentColor({ color: blue }),
      vitamines: palette.augmentColor({ color: red }),
    },
  },
  pickersFrFR
);

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {router.pathname === "/auth/signin" ? (
            <Component {...pageProps} />
          ) : (
            <Main>
              <Component {...pageProps} />
            </Main>
          )}
        </ThemeProvider>
      </SnackbarProvider>
    </SessionProvider>
  );
};

export default App;
