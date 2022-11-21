import { Divider, Stack } from "@mui/material";
import Head from "next/head";
import Bar from "../src/components/Bar";
import Biberon from "../src/components/Biberon";
import Couche from "../src/components/Couche";
import VitamineD from "../src/components/VitamineD";
import JourProvider from "../src/contexts/JourProvider";

export default function Home() {
  return (
    <>
      <Head>
        <title>Choupiflex</title>
      </Head>
      <Bar />
      <JourProvider>
        <Stack direction="column" spacing={3} m={2}>
          <Biberon />
          <Divider />
          <Couche />
          <Divider />
          <VitamineD />
        </Stack>
      </JourProvider>
    </>
  );
}
