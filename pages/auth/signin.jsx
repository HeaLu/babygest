import React from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GoogleIcon from "@mui/icons-material/Google";
import { useSession, signIn } from "next-auth/react";
import Stack from "@mui/material/Stack";
import Head from "next/head";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";

const DisplayError = ({ error }) => {
  switch (error) {
    case "SessionRequired":
      return <></>;
    case "AccessDenied":
      return <Alert severity="error">Accès non autorisé</Alert>;
    case "Disconnected":
      return <Alert severity="info">Vous avez été déconnecté(e)</Alert>;
    case "Verification":
      return (
        <Alert severity="error">
          {"Cet accès n'est plus valide, merci de renouveler l'opération"}
        </Alert>
      );
    default:
      return <Alert severity="warning">Erreur lors de la connexion</Alert>;
  }
};
export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push(router.query.origin || "/");
  } else {
    return (
      <>
        <Head>
          <title>Connexion</title>
        </Head>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Stack
                direction="column"
                justifyContent="space-between"
                sx={{ height: "90vh", mt: 8 }}
              >
                <Stack spacing={3} alignItems="center">
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Choupiflex
                  </Typography>
                  <Button
                    onClick={() => signIn("google")}
                    variant="contained"
                    type="submit"
                    endIcon={<GoogleIcon />}
                  >
                    Se connecter
                  </Button>
                </Stack>
                <Box sx={{ justifyContent: "center", display: "flex" }}>
                  {router.query.error && (
                    <DisplayError error={router.query.error} />
                  )}
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}
