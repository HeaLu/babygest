import React from "react";
import { useSession } from "next-auth/react";
import Layout from "./layout/Index";
import Page403 from "./Page403";

const Main = ({ children }) => {
  const { data: session, status } = useSession({ required: true });
  if (status === "loading") {
    return <div>Chargement...</div>;
  }
  if (!session) {
    return (
      <Layout>
        <Page403 />
      </Layout>
    );
  }

  return <Layout>{children}</Layout>;
};

export default Main;
