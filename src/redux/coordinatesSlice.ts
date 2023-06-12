import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICoordinates } from "../interfaces/coordinates";
import { RootState } from "./store";
export interface MapState {
  address: string;
  coordinates: ICoordinates | null;
  zoom: number;
}

export const initialMapState: MapState = {
  address: "",
  coordinates: { lat: 41.8283229, lng: -86.36334289999999 },
  zoom: 15,
};

export const mapSlice = createSlice({
  name: "map",
  initialState: initialMapState,
  reducers: {
    setLocation: (state: MapState, action: PayloadAction<MapState>) => {
      state.address = action.payload.address;
      state.coordinates = action.payload.coordinates;
      state.zoom = action.payload.zoom;
      return state;
    },
    setAddress: (state: MapState, action: PayloadAction<string>) => {
      state.address = action.payload;
      return state;
    },
    setCoordinates: (state: MapState, action: PayloadAction<ICoordinates>) => {
      state.coordinates = action.payload;
      return state;
    },
    setZoom: (state: MapState, action: PayloadAction<number>) => {
      state.zoom = action.payload;
      return state;
    },
    clearCoordinates: (state: MapState) => {
      state.coordinates = null;
      state.address = "";
      state.zoom = 15;
    },
  },
});
export const { setCoordinates, setLocation, setZoom, setAddress, clearCoordinates } = mapSlice.actions;
export const selectMapState = (state: RootState) => state.coordinates;

export default mapSlice.reducer;
