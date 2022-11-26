import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import frLocale from "date-fns/locale/fr";
import TextField from "@mui/material/TextField";

const DateTimePicker = ({ value, onChange, label, variant = "standard" }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
      <MuiDateTimePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} variant={variant} />}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
