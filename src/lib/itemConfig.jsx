import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import BathtubIcon from "@mui/icons-material/Bathtub";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MessageIcon from "@mui/icons-material/Message";
import MedicationIcon from "@mui/icons-material/Medication";

export const getItemConfig = (type) => {
  switch (type) {
    case "couches":
      return {
        label: "Couche",
        icon: <BabyChangingStationIcon />,
        color: "success",
      };
    case "evenements":
      return { label: "Évènement", icon: <MessageIcon /> };
    case "biberons":
      return { label: "Biberon", icon: <FastfoodIcon /> };
    case "bains":
      return { label: "Bain", icon: <BathtubIcon /> };
    case "vitamines":
      return { label: "Vitamine", icon: <MedicationIcon /> };
    default:
      throw new Error("Pas de type dans getItemConfig");
  }
};
