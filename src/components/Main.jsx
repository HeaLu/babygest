import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Main = ({ children }) => {
  const { user, auth } = useContext(UserContext);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      auth(session.user);
    }
  }, [session, auth]);

  useEffect(() => {
    if (router.isReady && !session)
      router.push("/auth/signin?origin=" + router.asPath);
  });

  if (user.email)
    return <>{children}</>

};

export default Main;
