import React from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GoogleIcon from "@mui/icons-material/Google";
import {
  useSession,
  getProviders,
  signIn,
  getCsrfToken,
} from "next-auth/react";
import Stack from "@mui/material/Stack";
import Head from "next/head";
import { useRouter } from "next/router";

export default function SignIn({ csrfToken, providers }) {
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
                    Connexion
                  </Typography>
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <div key={provider.name} style={{ marginBottom: 0 }}>
                        <input
                          name="csrfToken"
                          type="hidden"
                          defaultValue={csrfToken}
                        />
                        <input
                          name="callbackUrl"
                          type="hidden"
                          defaultValue={router.query.origin}
                        />
                        <Button
                          onClick={() => signIn(provider.id)}
                          variant="contained"
                          type="submit"
                          endIcon={<GoogleIcon />}
                        >
                          Se connecter
                        </Button>
                      </div>
                    ))}
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
}
