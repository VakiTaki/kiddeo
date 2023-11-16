import React, { useState, ChangeEvent, useRef } from "react";
import { format } from "date-fns";
import Calendar from "../calendar/myCalendar";
import useClickOutside from "use-click-outside";
import { ITarget } from "../../../sidebar/mySidebar";

interface IMyDatePicker {
  onMainFilterChange: (target: ITarget) => void;
}

const openCalendar = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 16.2V3.6C18 2.61 17.1 1.8 16 1.8H15V0H13V1.8H5V0H3V1.8H2C0.89 1.8 0.01 2.61 0.01 3.6L0 16.2C0 17.19 0.89 18 2 18H16C17.1 18 18 17.19 18 16.2ZM6 8.10028H4V9.90028H6V8.10028ZM2 5.40028H16V3.60028H2V5.40028ZM16 7.20009V16.2001H2V7.20009H16ZM12 9.90028H14V8.10028H12V9.90028ZM10 9.90028H8V8.10028H10V9.90028Z"
      fill="#F2766A"
    />
  </svg>
);

const closedCalendar = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 16.2V3.6C18 2.61 17.1 1.8 16 1.8H15V0H13V1.8H5V0H3V1.8H2C0.89 1.8 0.01 2.61 0.01 3.6L0 16.2C0 17.19 0.89 18 2 18H16C17.1 18 18 17.19 18 16.2ZM6 8.10028H4V9.90028H6V8.10028ZM2 5.40028H16V3.60028H2V5.40028ZM16 7.20009V16.2001H2V7.20009H16ZM12 9.90028H14V8.10028H12V9.90028ZM10 9.90028H8V8.10028H10V9.90028Z"
      fill="#858585"
    />
  </svg>
);

const DatePicker: React.FC<IMyDatePicker> = ({ onMainFilterChange }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(elementRef, () => setShowCalendar(false));

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div
      className=" flex flex-col gap-[10px]  bg-white rounded-md relative "
      ref={elementRef}
    >
      <label
        htmlFor="datepicker"
        className=" text-base font-medium text-[#2B2B2B]"
      >
        Дата и время праздника
      </label>
      <div className="mt-2 relative">
        <input
          type="text"
          id="datepicker"
          value={format(selectedDate, "dd/MM/yyyy")}
          onClick={handleCalendarToggle}
          className={
            ` !text-xs cursor-pointer font-normal leading-[3%] h-[34px] px-[10px] form-input block w-full rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 border outline-none focus:outline-none ` +
            (showCalendar
              ? " border-[#F2766A] text-[#414141]"
              : " border-[#C4C4C4] text-[#C4C4C4]")
          }
          readOnly
        />
        <span
          className="absolute inset-y-0 right-[10px]  flex items-center pointer-events-none"
          onClick={handleCalendarToggle}
        >
          {showCalendar ? openCalendar : closedCalendar}
        </span>
        {showCalendar && (
          <Calendar
            selectedDate={selectedDate}
            onDateClick={(date: Date) => {
              setSelectedDate(date);
              onMainFilterChange({
                name: "toDate",
                value: date.toDateString(),
              });
            }}
            onClose={() => setShowCalendar(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DatePicker;
