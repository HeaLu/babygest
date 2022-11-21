import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Main = ({ children }) => {
  const { auth } = useContext(UserContext);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      auth(session.user);
    }
  }, [session, auth]);

  useEffect(() => {});

  if (!router.isReady) {
    return <></>;
  } else if (!session) {
    router.push("/auth/signin?origin=" + router.asPath);
  } else {
    return <>{children}</>;
  }
};

export default Main;
