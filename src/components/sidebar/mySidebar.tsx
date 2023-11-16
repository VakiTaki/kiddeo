import { useState } from "react";
import { ISidebarData } from "../../data/categories";
import MyDatePicker from "../form/common/datePicker/myDataPicker";
import MySelect from "../form/common/select/mySelect";
import MyMainFilter from "../mainFilter/myMainFilter";
import MyAccordion from "../form/common/accordion/accordion";
import FilteredComponent from "../hoc/filtredComponent";
import { ThemeProvider, createTheme } from "@mui/material";

interface ISidebarProps {
  data: ISidebarData;
}

interface IBody {
  [key: string]: string | string[];
}

export interface ITarget {
  name: keyof IBody;
  value: string | string[];
}

interface IRequestOptions<T> {
  method: string;
  body?: T;
}

interface IRequestResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: "none",
          boxShadow: "none",
          paddingLeft: "0px",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          border: "none",
          boxShadow: "none",
          padding: "0px",
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          border: "none",
          boxShadow: "none",
          padding: "0px",
        },
      },
    },
  },
});

const MySidebar = ({ data }: ISidebarProps) => {
  const [body, setBody] = useState<IBody>({});
  console.log(body);

  async function sendRequest<T>(
    url: string,
    options: IRequestOptions<T>
  ): Promise<IRequestResponse> {
    try {
      const response = await fetch(url, {
        method: options.method,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка запроса");
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error as string };
    }
  }

  const handleChange = (target: ITarget) => {
    setBody((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendRequest("https://api.example.com/", { method: "POST", body });
  };
  return (
    <form
      className=" w-full md:w-[50%] lg:w-[25%] px-5 py-[35px]"
      onSubmit={handleSubmit}
    >
      <h2 className=" text-base text-[#2B2B2B] font-bold">Параметры подбора</h2>
      <div className=" bg-[#E3E3E3] h-[1px] mt-[10px] mb-[25px]"></div>
      <MyMainFilter onMainFilterChange={handleChange} />

      <ThemeProvider theme={theme}>
        {Object.keys(data.sidebar_filters).map((key) => (
          <MyAccordion
            key={key}
            label={key}
            sx={{
              color: "black",
            }}
          >
            <>
              {Object.keys(data.sidebar_filters[key]).map((innerKey) => (
                <MyAccordion
                  key={innerKey}
                  label={innerKey}
                  sx={{
                    color: "#515151",
                  }}
                >
                  <FilteredComponent
                    type={data.sidebar_filters[key][innerKey].type}
                    values={data.sidebar_filters[key][innerKey].values}
                    onFilterChange={handleChange}
                    name={data.sidebar_filters[key][innerKey].name}
                  />
                </MyAccordion>
              ))}
            </>
          </MyAccordion>
        ))}
      </ThemeProvider>
      <button className=" w-full mt-4 rounded-md bg-blue-600 text-white h-[34px] hover:opacity-75">
        Применить
      </button>
    </form>
  );
};

export default MySidebar;
