import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { IRangeValue } from "../../../../data/categories";
import { ITarget } from "../../../sidebar/sidebar";

interface IMyTrackFalseSlider {
  values: IRangeValue[];
  onFilterChange: (target: ITarget) => void;
  name: string;
}

const test = [
  {
    min: 30,
    max: 225,
    from: 123,
    step: 5,
    state: 123,
  },
];

export default function MyTrackFalseSlider({
  values,
  onFilterChange,
  name,
}: IMyTrackFalseSlider) {
  const marks = [
    {
      value: values[0].min,
      label: values[0].min,
    },

    {
      value: values[0].max,
      label: values[0].max,
    },
  ];
  const [value, setValue] = useState<number>(test[0].from);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    onFilterChange({ name, value: newValue.toString() });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        track={false}
        min={values[0].min}
        max={values[0].max}
        step={values[0].step}
        aria-labelledby="track-false-slider"
        defaultValue={test[0].from}
        marks={marks}
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
