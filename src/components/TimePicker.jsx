import React from 'react'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers/TimePicker";
import frLocale from "date-fns/locale/fr";
import TextField from '@mui/material/TextField';

const TimePicker = ({ value, onChange, label, variant = "standard" }) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={frLocale}
    >
      <MuiTimePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} variant={variant} />
        )}
      />
    </LocalizationProvider>
  )
}

export default TimePicker