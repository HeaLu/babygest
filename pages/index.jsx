import { Divider, Stack } from "@mui/material";
import Head from "next/head";
import Bain from "../src/components/Bain";
import Bar from "../src/components/Bar";
import Biberon from "../src/components/Biberon";
import Couche from "../src/components/Couche";
import Evenement from "../src/components/Evenement";
import Vitamine from "../src/components/Vitamine";

export default function Home() {
  return (
    <>
      <Head>
        <title>Choupiflex</title>
      </Head>
      <Bar />
      <Stack direction="column" spacing={3} m={2}>
        <Biberon />
        <Couche />
        <Vitamine />
        <Bain />
        <Evenement />
      </Stack>
    </>
  );
}
