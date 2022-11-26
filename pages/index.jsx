import { Stack } from "@mui/material";
import Head from "next/head";
import Bain from "../src/components/day/Bain";
import Biberon from "../src/components/day/Biberon";
import Couche from "../src/components/day/Couche";
import Evenement from "../src/components/day/Evenement";
import Vitamine from "../src/components/day/Vitamine";

export default function Home() {
  return (
    <>
      <Head>
        <title>Choupiflex</title>
      </Head>
      <Stack direction="column" spacing={5} m={2}>
        <Biberon />
        <Couche />
        <Vitamine />
        <Bain />
        <Evenement />
      </Stack>
    </>
  );
}
