import React from "react";
import { SessionProvider } from "next-auth/react";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import UserProvider from "../src/contexts/UserProvider";
import Main from "../src/components/Main";
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightBlue, orange } from "@mui/material/colors";
import { frFR as pickersFrFR } from "@mui/x-date-pickers";

const theme = createTheme(
  {
    palette: {
      primary: lightBlue,
      secondary: orange,
    },
  },
  pickersFrFR
);

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <SnackbarProvider maxSnack={3}>
        <UserProvider>
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
        </UserProvider>
      </SnackbarProvider>
    </SessionProvider>
  );
};

export default App;
