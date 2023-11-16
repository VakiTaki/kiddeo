import { ICheckboxValue, IRangeValue } from "../../data/categories";
import MyCheckboxLabels from "../form/common/checkboxGroup/checkboxGroup";
import MyTrackFalseSlider from "../form/common/slider/mySlider";
import { ITarget } from "../sidebar/sidebar";

interface FilterProps {
  type: "one_select" | "range" | "multi_select";
  values: ICheckboxValue[] | IRangeValue[];
  onFilterChange: (target: ITarget) => void;
  name: string;
}

const FilteredComponent: React.FC<FilterProps> = ({
  type,
  values,
  onFilterChange,
  name,
}) => {
  switch (type) {
    case "one_select":
      return (
        <MyCheckboxLabels
          values={values as ICheckboxValue[]}
          onFilterChange={onFilterChange}
          name={name}
        />
      );
    case "range":
      return (
        <MyTrackFalseSlider
          values={values as IRangeValue[]}
          onFilterChange={onFilterChange}
          name={name}
        />
      );
    case "multi_select":
      return (
        <MyCheckboxLabels
          values={values as ICheckboxValue[]}
          multy={true}
          onFilterChange={onFilterChange}
          name={name}
        />
      );
    default:
      return <span>Такой тип фильтра не предусмотрен</span>;
  }
};

export default FilteredComponent;
