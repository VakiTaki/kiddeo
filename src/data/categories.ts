export interface ISelectValue {
  name: string;
  value: string;
}

export interface ICheckboxValue {
  name: string;
  state: boolean;
}

export interface IRangeValue {
  min: number;
  max: number;
  from: number;
  step: number;
  state: number;
}

interface IFilter {
  type: "one_select" | "range" | "multi_select";
  name: string;
  values: ICheckboxValue[] | IRangeValue[];
}

interface IOneSidebarFilter {
  [key: string]: IFilter;
}

interface ISidebarFilters {
  [key: string]: IOneSidebarFilter;
}

export interface ISidebarData {
  id: number;
  title: string;
  sidebar_filters: ISidebarFilters;
}

export const data: ISidebarData = {
  id: 8,
  title: "Помещения",
  sidebar_filters: {
    "Популярные фильтры": {
      Вместимость: {
        type: "one_select",
        name: "count_peoples__contains",
        values: [
          {
            name: "До 20 человек",
            state: false,
          },
          {
            name: "От 20 до 50",
            state: false,
          },
          {
            name: "Больше 50",
            state: false,
          },
        ],
      },
      "Площадь (кв.м)": {
        type: "range",
        name: "square__lte",
        values: [
          {
            min: 30,
            max: 255,
            from: 30,
            step: 5,
            state: 40,
          },
        ],
      },
    },
    Дополнительно: {
      Зонирование: {
        type: "multi_select",
        name: "zoning__contains",
        values: [
          {
            name: "Место для игр",
            state: false,
          },
          {
            name: "Место для переодевания",
            state: false,
          },
          {
            name: "Место для красивых фото",
            state: false,
          },
          {
            name: "Тихий уголок для взрослых",
            state: false,
          },
        ],
      },
      Условия: {
        type: "multi_select",
        name: "conditions__contains",
        values: [
          {
            name: "Закрывается под нас",
            state: false,
          },
          {
            name: "Отдельный вход",
            state: false,
          },
          {
            name: "Можно со своей едой",
            state: false,
          },
          {
            name: "Можно со своим фотографом/аниматором",
            state: false,
          },
          {
            name: "Можно украсить самим",
            state: false,
          },
          {
            name: "Уборка после включена",
            state: false,
          },
        ],
      },
    },
  },
};
