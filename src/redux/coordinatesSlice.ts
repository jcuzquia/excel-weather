import { createSlice } from "@reduxjs/toolkit";
import { ICoordinates } from "../interfaces/coordinates";
import { RootState } from "./store";
interface CoordinatesState {
  coordinates: ICoordinates | null;
}

type ActionType = {
  payload: ICoordinates;
};

const initialState: CoordinatesState = {
  coordinates: { lat: 10.99835602, lng: 77.01502627 },
};

export const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    setCoordinates: (state: CoordinatesState, action: ActionType) => {
      state.coordinates = action.payload;
      return state;
    },
    clearCoordinates: (state) => void (state.coordinates = null),
  },
});
export const { setCoordinates } = coordinatesSlice.actions;
export const selectCoordinates = (state: RootState) => state.coordinates;

export default coordinatesSlice.reducer;
