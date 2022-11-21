import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { format, formatDistance } from "date-fns";
import frLocale from "date-fns/locale/fr";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { JourContext } from "../contexts/JourProvider";

const Biberon = () => {
  const { state, dispatch } = useContext(JourContext);
  const [heure, setHeure] = useState(new Date());

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6" component="div">
        <FastfoodIcon /> Biberon
      </Typography>
      <Typography>
        Dernier biberon il y a{" "}
        {formatDistance(new Date(state.derniers.biberon), new Date(), {
          locale: frLocale,
        })}{" "}
        ({format(new Date(state.derniers.biberon), "H:mm")})
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
            label="Miam miam"
            value={heure}
            onChange={(e) => setHeure(e)}
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
          />
        </LocalizationProvider>
        <Button
          onClick={() => dispatch({ type: "ADD_BIBERON", action: heure })}
        >
          Envoyer
        </Button>
      </Stack>
    </Stack>
  );
};

export default Biberon;
