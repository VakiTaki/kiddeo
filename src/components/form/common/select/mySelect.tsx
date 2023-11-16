import React, { useRef, useState } from "react";
import { ISelectValue } from "../../../../data/categories";
import useClickOutside from "use-click-outside";
import { ITarget } from "../../../sidebar/mySidebar";

interface ICustomSelectProps {
  options?: ISelectValue[];
  onMainFilterChange: (target: ITarget) => void;
  label?: string;
  defultValue?: string;
  name?: string;
}

const closedArrow = (
  <svg
    width="11"
    height="6"
    viewBox="0 0 11 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.34654e-05 5.00446C-0.000345172 4.87639 0.0255585 4.74984 0.075862 4.63412C0.126165 4.51841 0.199591 4.41646 0.290741 4.33577L5.00458 0.195025C5.14516 0.0689321 5.32149 6.77156e-08 5.50346 6.55455e-08C5.68544 6.33755e-08 5.86177 0.0689321 6.00235 0.195025L10.7162 4.48151C10.8766 4.62703 10.9775 4.83613 10.9967 5.06282C11.0158 5.28952 10.9517 5.51523 10.8183 5.6903C10.685 5.86537 10.4933 5.97547 10.2856 5.99637C10.0779 6.01727 9.87101 5.94726 9.71057 5.80175L5.49954 1.96963L1.2885 5.67315C1.17318 5.77799 1.03276 5.84458 0.883841 5.86505C0.734923 5.88552 0.583747 5.85902 0.448202 5.78867C0.312658 5.71833 0.198417 5.60708 0.118997 5.46811C0.0395756 5.32913 -0.00169939 5.16823 5.34654e-05 5.00446Z"
      fill="#2B2B2B"
    />
  </svg>
);

const checkedIcon = (
  <svg
    width="15"
    height="12"
    viewBox="0 0 15 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.65833 8.81667L1.18333 5.34167L0 6.51667L4.65833 11.175L14.6583 1.175L13.4833 0L4.65833 8.81667Z"
      fill="#F2766A"
    />
  </svg>
);

const CustomSelect: React.FC<ICustomSelectProps> = ({
  options = [],
  onMainFilterChange,
  label = "label",
  name = "",
  defultValue,
}) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(elementRef, () => setIsOpen(false));
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defultValue || ""
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onMainFilterChange({ name, value });
  };

  return (
    <div
      className="relative inline-block text-left w-full flex flex-col gap-[10px]"
      ref={elementRef}
    >
      <label
        htmlFor="options-menu"
        className=" text-base font-medium text-[#2B2B2B]"
      >
        {label}
      </label>
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className={
              "inline-flex justify-between items-center w-full px-[10px]  h-[34px] text-sm font-medium text-gray-700 bg-white border  rounded-md focus:outline-none   " +
              (isOpen ? "border-[#F2766A]" : "border-[#C4C4C4]")
            }
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex justify-between items-center w-full relative">
              <span>{selectedValue || "..."}</span>
              <span
                className={
                  " absolute right-0 top-1/3 " +
                  (!isOpen ? " rotate-180" : " rotate-0")
                }
              >
                {closedArrow}
              </span>
            </div>
          </button>
        </span>
      </div>

      {isOpen && (
        <div className=" z-10 top-full w-full origin-top-right absolute right-0  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5  overflow-scroll max-h-[300px]">
          <div
            className="py-0 "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={
                  "block px-[10px] py-2 mr-[15px] text-sm   cursor-pointer border-b border-[#D7D7D7] relative " +
                  (selectedValue === option.value
                    ? " text-[#F2766A] "
                    : " text-gray-700")
                }
                onClick={() => handleSelect(option.value)}
                role="menuitem"
              >
                {selectedValue === option.value && (
                  <div className=" absolute top-[10px] right-2">
                    {checkedIcon}
                  </div>
                )}
                {option.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
