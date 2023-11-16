import { useEffect, useState } from "react";
import "./sidebar.scss";
import { ISidebarData } from "../../data/categories";
import MyAccordion from "../form/common/accordion/accordion";
import MainFilter from "../mainFilter/mainFilter";
import FilteredComponent from "../hoc/filtredComponent";
import { Button, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

const Sidebar = ({ data }: ISidebarProps) => {
  const [body, setBody] = useState<IBody>({});

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
    <ThemeProvider theme={theme}>
      <form className="sidebar" onSubmit={handleSubmit}>
        <div className="">
          <Typography className="sidebar__header">Параметры подбора</Typography>
          <div className="line"></div>
        </div>

        <MainFilter onMainFilterChange={handleChange} />
        {Object.keys(data.sidebar_filters).map((key) => (
          <MyAccordion key={key} label={key}>
            <>
              {Object.keys(data.sidebar_filters[key]).map((innerKey) => (
                <MyAccordion key={innerKey} label={innerKey}>
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
        <Button variant="contained">Применить</Button>
      </form>
    </ThemeProvider>
  );
};

export default Sidebar;
