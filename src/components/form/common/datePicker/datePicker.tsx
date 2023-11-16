import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, Typography } from "@mui/material";
import { ITarget } from "../../../sidebar/sidebar";
import "dayjs/locale/ru";

interface IMyDatePicker {
  onMainFilterChange: (target: ITarget) => void;
}

const MyDatePicker = ({ onMainFilterChange }: IMyDatePicker) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(Date.now()));

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    const value = newValue?.toDate().toLocaleDateString() || "";
    onMainFilterChange({ name: "toDate", value });
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DatePicker
          format="DD/MM/YYYY"
          value={value}
          onChange={(newValue) => handleChange(newValue)}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default MyDatePicker;
