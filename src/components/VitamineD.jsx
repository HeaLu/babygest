import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import MedicationIcon from "@mui/icons-material/Medication";

const VitamineD = ({ done, setDone }) => {
  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6" component="div">
        <MedicationIcon /> Vitamine D
      </Typography>
      <Button fullWidth disabled={!done} onClick={setDone}>
        {done ? "C'est déjà fait" : "Je viens de le faire"}
      </Button>
    </Stack>
  );
};

export default VitamineD;
