import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { differenceInHours, format, isAfter, isSameDay } from "date-fns";
import TimePicker from "../utils/TimePicker";
import axiosInstance from "../../lib/axiosInstance";
import { useSnackbar } from "notistack";
import DateTimePicker from "../utils/DateTimePicker";
import MedicationIcon from "@mui/icons-material/Medication";

const Vitamine = () => {
  const [date, setDate] = useState(new Date());
  const [last, setLast] = useState({ date: new Date() });
  const [suspiciousDate, setSuspiciousDate] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchLast = async () => {
      const data = await axiosInstance.get("/vitamine/getlast");
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
    setDate(newHour);
  };

  const handleSubmit = async () => {
    const data = await axiosInstance.post("/vitamine/add", { date });
    if (isAfter(date, last.date)) setLast({ date: new Date(data.date) });
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <MedicationIcon />
        <Typography variant="h6" component="div">
          Vitamine D
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        {isSameDay(new Date(), last.date) ? (
          <Typography
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            ✔️ fait à {format(last.date, "H")}h
          </Typography>
        ) : (
          <>
            {suspiciousDate ? (
              <DateTimePicker
                label="Comme le soleil"
                value={date}
                onChange={handleChangeDate}
              />
            ) : (
              <TimePicker
                label="Comme le soleil"
                value={date}
                onChange={handleChangeDate}
              />
            )}
            <Button onClick={handleSubmit}>{"C'est fait"}</Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Vitamine;
