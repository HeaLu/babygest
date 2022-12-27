import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { differenceInHours, isAfter } from "date-fns";
import BathtubIcon from "@mui/icons-material/Bathtub";
import durationToString from "../../lib/durationToString";
import TimePicker from "../utils/TimePicker";
import axiosInstance from "../../lib/axiosInstance";
import { useSnackbar } from "notistack";
import DateTimePicker from "../utils/DateTimePicker";

const Bain = () => {
  const [date, setDate] = useState(new Date());
  const [now, setNow] = useState(new Date());
  const [last, setLast] = useState({ date: new Date() });
  const [suspiciousDate, setSuspiciousDate] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isModifiedDate, setIsModifiedDate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (!isModifiedDate) setDate(new Date());
      setNow(new Date());
    }, 60000);
  }, [now, isModifiedDate]);
  useEffect(() => {
    const fetchLast = async () => {
      const data = await axiosInstance.get("/bain/getlast");
      setLast({ date: new Date(data.date) });
    };

    fetchLast();
  }, []);

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
    const data = await axiosInstance.post("/bain/add", { date });
    if (isAfter(date, last.date)) setLast({ date: new Date(data.date) });
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <BathtubIcon color="bains" />
        <Typography variant="h6" component="div">
          Bain
        </Typography>
      </Stack>
      <Typography>
        Dernier bain il y a{" "}
        {durationToString({
          start: last.date,
          end: now,
          format: ["days", "hours"],
        })}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        {suspiciousDate ? (
          <DateTimePicker
            label="Glou glou"
            value={date}
            onChange={handleChangeDate}
          />
        ) : (
          <TimePicker
            label="Glou glou"
            value={date}
            onChange={handleChangeDate}
          />
        )}
        <Button onClick={handleSubmit}>Envoyer</Button>
      </Stack>
    </Stack>
  );
};

export default Bain;
