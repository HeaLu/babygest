import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { format, formatDistance, subHours } from "date-fns";
import frLocale from "date-fns/locale/fr";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import { CheckBox } from "@mui/icons-material";

const Couche = () => {
  const [heure, setHeure] = useState(new Date());
  const [caca, setCaca] = useState(false);

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6" component="div">
        <BabyChangingStationIcon /> Couche
      </Typography>
      <Typography>
        Dernière couche il y a{" "}
        {formatDistance(new Date() - 15110000, new Date(), {
          locale: frLocale,
        })}{" "}
        ({format(new Date() - 15110000, "H:mm")})
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={frLocale}
        >
          <TimePicker
            label="Beeerk"
            value={heure}
            onChange={(newValue) => {
              setHeure(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
          />
        </LocalizationProvider>
        <FormControlLabel
          control={<Checkbox value={caca} onChange={() => setCaca(!caca)} />}
          label="💩"
        />
        <Button>Envoyer</Button>
      </Stack>
    </Stack>
  );
};

export default Couche;
