import { Box, Grid, Stack } from "@mui/material";
import Head from "next/head";
import Bain from "../src/components/day/Bain";
import Repas from "../src/components/day/Repas";
import Couche from "../src/components/day/Couche";
import Evenement from "../src/components/day/Evenement";
import Vitamine from "../src/components/day/Vitamine";
import Lunettes from "../src/components/day/Lunettes";

export default function Home() {
  return (
    <>
      <Head>
        <title>Choupiflex</title>
      </Head>
      <Lunettes />
      <Stack direction="column" spacing={5} m={2}>
        <Repas />
        <Couche />
        <Vitamine />
        <Bain />
        <Evenement />
      </Stack>
    </>
  );
}
