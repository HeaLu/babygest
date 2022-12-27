import { blue, brown, green, grey, red } from "@mui/material/colors";

export const eventTypesList = () => {
  const retour = [];
  eventTypes.forEach((e) => {
    retour.push(e.label);
  });
  return retour;
};

export const eventTypes = [
  {
    label: "bain",
    icon: "hot_tub",
    color: blue[500],
  },
  {
    label: "biberon",
    icon: "breakfast_dining",
    color: green[500],
  },
  {
    label: "couche",
    icon: "baby_changing_station",
    color: brown[500],
    payload: {
      caca: {
        type: "boolean",
        label: "💩",
      },
    },
  },
  {
    label: "évènement",
    icon: "comment",
    color: grey[500],
    payload: {
      message: {
        type: "string",
        label: "Message",
      },
    },
  },
  {
    label: "traitement",
    icon: "medication",
    color: red[500],
    payload: {
      label: {
        type: "string",
        label: "Médicament",
      },
    },
  },
];
