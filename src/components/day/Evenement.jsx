import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { differenceInHours } from "date-fns";
import MessageIcon from "@mui/icons-material/Message";
import TimePicker from "../utils/TimePicker";
import axiosInstance from "../../lib/axiosInstance";
import { useSnackbar } from "notistack";
import DateTimePicker from "../utils/DateTimePicker";

const Evenement = () => {
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [suspiciousDate, setSuspiciousDate] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isModifiedDate, setIsModifiedDate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (!isModifiedDate) setDate(new Date());
      setDate(new Date());
    }, 60000);
  }, [isModifiedDate]);

  const handleChangeDate = (newHour) => {
    if (differenceInHours(new Date(), newHour) !== 0 && !suspiciousDate) {
      setSuspiciousDate(true);
      enqueueSnackbar(
        "L'heure est lointaine, la date est maintenant modifiable"
      );
    }
    setIsModifiedDate(true);
    setDate(newHour);
  };

  const handleSubmit = async () => {
    await axiosInstance.post("/evenement/add", { date, message });
    setMessage("");
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <MessageIcon color="evenements" />
        <Typography variant="h6" component="div">
          Évènement
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        {suspiciousDate ? (
          <DateTimePicker
            label="Quand"
            value={date}
            onChange={handleChangeDate}
          />
        ) : (
          <TimePicker label="Quand" value={date} onChange={handleChangeDate} />
        )}
        <Button onClick={handleSubmit}>Envoyer</Button>
      </Stack>
      <TextField
        label="Quoi"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        multiline
      />
    </Stack>
  );
};

export default Evenement;
