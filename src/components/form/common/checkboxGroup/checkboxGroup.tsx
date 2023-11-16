import { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ICheckboxValue } from "../../../../data/categories";
import { ITarget } from "../../../sidebar/sidebar";

interface IMyCheckboxLabelsProps {
  values: ICheckboxValue[];
  multy?: boolean;
  name: string;
  onFilterChange: (target: ITarget) => void;
}

export default function MyCheckboxLabels({
  values,
  multy = false,
  name = "",
  onFilterChange,
}: IMyCheckboxLabelsProps) {
  const [value, setValue] = useState(values);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) =>
      prev.map((val) => {
        if (val.name === e.target.name) {
          return { name: e.target.name, state: e.target.checked };
        } else {
          return !multy ? { ...val, state: false } : val;
        }
      })
    );
  };

  useEffect(() => {
    onFilterChange({
      name,
      value: value.filter((item) => item.state).map((item) => item.name),
    });
  }, [value, name]);

  return (
    <FormGroup>
      {value.map((control) => (
        <FormControlLabel
          key={control.name}
          style={{ color: "gray" }}
          control={
            <Checkbox
              checked={control.state}
              onChange={(e) => handleChange(e)}
              name={control.name}
            />
          }
          label={control.name}
        />
      ))}
    </FormGroup>
  );
}
