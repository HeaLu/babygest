import React, { createContext, useCallback, useState } from "react";
import { signOut } from "next-auth/react";

export const UserContext = createContext();

const emptyUser = {
  email: "",
  name: "",
  prenom: "",
  image: "",
  _id: "",
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(emptyUser);

  const auth = useCallback(({ email, name, prenom, image, _id }) => {
    setUser({ _id, email, name, prenom, image });
    return true;
  }, []);

  const disconnect = () => {
    signOut();
    setUser(emptyUser);
  };

  return (
    <UserContext.Provider value={{ user, auth, disconnect }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
