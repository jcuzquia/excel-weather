import { NRELQueryOutput } from "../interfaces/NRELQuery";
import { SelectorOption } from "../interfaces/SelectorOptions";

type ResponseState = {
  availableYears: Array<SelectorOption>;
  year: string | number;
  interval: string | number;
  intervals: Array<SelectorOption>;
  solarResourceValue: string;
  selectedOutput: NRELQueryOutput;
};

type Action =
  | { type: "SET_AVAILABLE_YEARS"; payload: Array<SelectorOption> }
  | { type: "SET_YEAR"; payload: string | number }
  | { type: "SET_INTERVAL"; payload: string | number }
  | { type: "SET_INTERVALS"; payload: Array<SelectorOption> }
  | { type: "SET_SOLAR_RESOURCE_VALUE"; payload: string }
  | { type: "SET_SELECTED_OUTPUT"; payload: NRELQueryOutput };

export const initialState: ResponseState = {
  availableYears: [],
  year: "",
  interval: "",
  intervals: [],
  solarResourceValue: "",
  selectedOutput: null,
};

export const queryFormReducer = (state: ResponseState, action: Action): ResponseState => {
  switch (action.type) {
    case "SET_AVAILABLE_YEARS":
      return {
        ...state,
        availableYears: action.payload,
      };
    case "SET_YEAR":
      return {
        ...state,
        year: action.payload,
      };
    case "SET_INTERVAL":
      return {
        ...state,
        interval: action.payload,
      };
    case "SET_INTERVALS":
      return {
        ...state,
        intervals: action.payload,
      };
    case "SET_SOLAR_RESOURCE_VALUE":
      return {
        ...state,
        solarResourceValue: action.payload,
      };
    case "SET_SELECTED_OUTPUT":
      return {
        ...state,
        selectedOutput: action.payload,
      };
    default:
      throw new Error("Invalid action type");
  }
};
