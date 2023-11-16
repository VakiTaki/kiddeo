import React from "react";
import MySelect from "../form/common/select/mySelect";
import "./mainFilters.scss";
import MyDatePicker from "../form/common/datePicker/myDataPicker";
import { ITarget } from "../sidebar/sidebar";

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

const MyMainFilter = ({ onMainFilterChange }: IMainFilterProps) => {
  return (
    <div className="mainFilter">
      <MyDatePicker onMainFilterChange={onMainFilterChange} />
      <div className="hourschange">
        <div className="hourschange__item">
          <MySelect
            label="Начнем в"
            options={times}
            defultValue="10:00"
            onMainFilterChange={onMainFilterChange}
            name="start"
          />
        </div>
        <div className="hourschange__item">
          <MySelect
            label="Закончим в"
            options={times}
            defultValue="12:00"
            onMainFilterChange={onMainFilterChange}
            name="end"
          />
        </div>
      </div>
      <div className="locationchange">
        <MySelect
          label="Район"
          options={location}
          defultValue="Любой"
          onMainFilterChange={onMainFilterChange}
          name="location"
        />
      </div>
    </div>
  );
};

export default MyMainFilter;
