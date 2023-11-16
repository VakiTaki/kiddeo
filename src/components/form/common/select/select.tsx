import * as React from "react";
import { ISelectValue } from "../../../../data/categories";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ITarget } from "../../../sidebar/sidebar";
import { Typography } from "@mui/material";

interface IMySelectProps {
  label?: string;
  options: ISelectValue[];
  onMainFilterChange: (target: ITarget) => void;
  name?: string;
}

export default function MySelect({
  label = "",
  options = [],
  onMainFilterChange,
  name = "",
}: IMySelectProps) {
  const [value, setValue] = React.useState(options[0].value);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    onMainFilterChange({ name, value: event.target.value as string });
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <Typography className="main__header">{label}</Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        {options.map((item) => (
          <MenuItem key={item.name} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
