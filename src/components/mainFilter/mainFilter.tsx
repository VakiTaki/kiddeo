import React from "react";
import MySelect from "../form/common/select/select";
import "./mainFilters.scss";
import MyDatePicker from "../form/common/datePicker/datePicker";
import { ITarget } from "../sidebar/sidebar";
import { Typography } from "@mui/material";

interface IMainFilterProps {
  onMainFilterChange: (target: ITarget) => void;
}

const times = [
  { name: "10:00", value: "10:00" },
  { name: "11:00", value: "11:00" },
  { name: "12:00", value: "12:00" },
  { name: "13:00", value: "13:00" },
  { name: "14:00", value: "14:00" },
  { name: "15:00", value: "15:00" },
  { name: "16:00", value: "16:00" },
  { name: "17:00", value: "17:00" },
  { name: "18:00", value: "18:00" },
];

const location = [
  { name: "Адмиралтейский", value: "Адмиралтейский" },
  { name: "Василеостровский", value: "Василеостровский" },
  { name: "Выборгский", value: "Выборгский" },
];

const MainFilter = ({ onMainFilterChange }: IMainFilterProps) => {
  return (
    <div className="mainFilter">
      <Typography className="main__header">Дата и время праздника</Typography>
      <MyDatePicker onMainFilterChange={onMainFilterChange} />
      <div className="hourschange">
        <div className="hourschange__item">
          <MySelect
            label="Начнем в"
            options={times}
            onMainFilterChange={onMainFilterChange}
            name="start"
          />
        </div>
        <div className="hourschange__item">
          <MySelect
            label="Закончим в"
            options={times}
            onMainFilterChange={onMainFilterChange}
            name="end"
          />
        </div>
      </div>
      <div className="locationchange">
        <MySelect
          label="Район"
          options={location}
          onMainFilterChange={onMainFilterChange}
          name="location"
        />
      </div>
    </div>
  );
};

export default MainFilter;
