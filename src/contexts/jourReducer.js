import { isAfter, startOfDay } from "date-fns";
import axios from "../lib/axiosInstance";

export const initialJour = {
  _id: "",
  date: startOfDay(new Date()),
  biberons: [],
  couches: [],
  vitamineD: false,
  evenements: [],
  derniers: { biberon: new Date(), couche: { date: new Date(), caca: false } },
};

const jourReducer = async (state, action) => {
  const { type, payload } = action;
  let newState = { ...state };
  switch (type) {
    case "INITIALIZE":
      return payload;
    case "ADD_BIBERON":
      try {
        await axios.post("/biberon", { date: payload.date });
        if (isAfter(payload.date, newState.derniers.biberon))
          newState.derniers.biberon = payload.date;
        newState.biberon.push(payload);
        return newState;
      } catch (e) {
        throw new Error(e);
      }
    case "ADD_COUCHE":
      try {
        await axios.post("/couche", { date: payload.date, caca: payload.caca });
        if (isAfter(payload.date, newState.derniers.couche.date))
          newState.derniers.couche = { date: payload.date, caca: payload.caca };
        newState.couche.push(payload);
        return newState;
      } catch (e) {
        throw new Error(e);
      }
    case "SET_VITAMINE":
      try {
        await axios.post("/vitamineD");
        newState.vitamineD = true;
        return newState;
      } catch (e) {
        throw new Error(e);
      }
    case "ADD_MESSAGE":
      try {
        await axios.post("/evenement", {
          date: payload.date,
          message: payload.message,
        });
        newState.messages.push(payload);
        return newState;
      } catch (e) {
        throw new Error(e);
      }
    default:
      throw new Error(`Action "${type}" n'est pas valide`);
  }
};

export default jourReducer;
