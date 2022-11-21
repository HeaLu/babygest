import React, { createContext, useReducer, useEffect } from "react";
import axios from "../lib/axiosInstance";
import jourReducer, { initialJour } from "./jourReducer";

export const JourContext = createContext(initialJour);

const JourProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jourReducer, initialJour);

  useEffect(() => {
    const fetchData = async () => {
      const today = await axios.get("/jour/getjour", {
        params: new Date().toISOString(),
      });
      const derniers = await axios.get("/jour/getderniers");
      today.derniers = derniers;
      reducerDispatch({ type: "INITIALIZE", action: today });
    };
    fetchData();
  }, []);

  return (
    <JourContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </JourContext.Provider>
  );
};

export default JourProvider;
