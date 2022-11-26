import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { differenceInHours, format, isAfter } from "date-fns";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import durationToString from "../../lib/durationToString";
import TimePicker from "../utils/TimePicker";
import axiosInstance from "../../lib/axiosInstance";
import { useSnackbar } from "notistack";
import DateTimePicker from "../utils/DateTimePicker";

const Couche = () => {
  const [date, setDate] = useState(new Date());
  const [caca, setCaca] = useState(false);
  const [now, setNow] = useState(new Date());
  const [last, setLast] = useState({ date: new Date(), caca: false });
  const [suspiciousDate, setSuspiciousDate] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setTimeout(() => {
      setNow(new Date());
    }, 60000);
  }, [now]);

  useEffect(() => {
    const fetchLast = async () => {
      const data = await axiosInstance.get("/couche/getlast");
      setLast({ date: new Date(data.date), caca: data.caca });
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
    setDate(newHour);
  };

  const handleSubmit = async () => {
    const data = await axiosInstance.post("/couche/add", { date, caca });
    if (isAfter(date, last.date)) setLast({ date: new Date(data.date), caca });
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <BabyChangingStationIcon />
        <Typography variant="h6" component="div">
          Couche
        </Typography>
      </Stack>
      <Typography>
        Dernière couche ({!last.caca && "pas"} 💩) il y a{" "}
        {durationToString({ start: last.date, end: now })} (
        {format(last.date, "H:mm")})
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        {suspiciousDate ? (
          <DateTimePicker
            label="Beerk"
            value={date}
            onChange={handleChangeDate}
          />
        ) : (
          <TimePicker label="Beerk" value={date} onChange={handleChangeDate} />
        )}
        <FormControlLabel
          control={<Checkbox value={caca} onChange={() => setCaca(!caca)} />}
          label="💩"
          labelPlacement="top"
        />
        <Button onClick={handleSubmit}>Envoyer</Button>
      </Stack>
    </Stack>
  );
};

export default Couche;
