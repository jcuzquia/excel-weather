import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { SelectorOption } from "../interfaces/SelectorOptions";
export interface FormState {
  interval: string | number;
  intervals: Array<SelectorOption>;
  year: string | number;
  years: Array<SelectorOption>;
  attributes: Array<SelectorOption>;
  selectedAttributes: Array<string>;
  resource: string;
  resourceAPI: string;
  resources: Array<SelectorOption>;
  csvUrl: string;
}

const initialState: FormState = {
  interval: "",
  year: "",
  years: [],
  attributes: [],
  selectedAttributes: [],
  resource: "",
  resourceAPI: "",
  resources: [],
  intervals: [],
  csvUrl: "",
};

export const nrelWeatherDataFormSlice = createSlice({
  name: "nrelWeatherDataFormSlice",
  initialState,
  reducers: {
    setResource: (state: FormState, action: PayloadAction<string>) => {
      state.resource = action.payload;
      return state;
    },
    setResourceAPI: (state: FormState, action: PayloadAction<string>) => {
      state.resourceAPI = action.payload;
      return state;
    },
    setResources: (state: FormState, action: PayloadAction<Array<SelectorOption>>) => {
      state.resources = action.payload;
      return state;
    },
    setInterval: (state: FormState, action: PayloadAction<string | number>) => {
      state.interval = action.payload;
      return state;
    },

    setIntervals: (state: FormState, action: PayloadAction<Array<SelectorOption>>) => {
      state.intervals = action.payload;
      return state;
    },

    setYear: (state: FormState, action: PayloadAction<string | number>) => {
      state.year = action.payload;
      return state;
    },
    setYears: (state: FormState, action: PayloadAction<Array<SelectorOption>>) => {
      state.years = action.payload;
      return state;
    },
    setSelectedAttributes: (state: FormState, action: PayloadAction<Array<string>>) => {
      state.selectedAttributes = action.payload;
      return state;
    },
    setCSVUrl: (state: FormState, action: PayloadAction<string>) => {
      state.csvUrl = action.payload;
      return state;
    },
    clearForm: (state: FormState) => {
      state = initialState;
      return state;
    },
  },
});
export const {
  setResource,
  setResources,
  setInterval,
  setIntervals,
  setYear,
  setYears,
  clearForm,
  setResourceAPI,
  setSelectedAttributes,
  setCSVUrl,
} = nrelWeatherDataFormSlice.actions;
export const selectNRELWeatherDataFormState = (state: RootState) => state.nrelWeatherDataForm;

export default nrelWeatherDataFormSlice.reducer;
