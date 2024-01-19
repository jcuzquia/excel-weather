import { StateCreator, create } from "zustand";

type Map = google.maps.Map;
export interface MapState {
  isMapReady: boolean;

  map?: Map | undefined;
  zoom: number;

  setMap: (map: Map) => void;
  setZoom: (zoom: number) => void;
}

const storeApi: StateCreator<MapState> = (set) => ({
  isMapReady: false,
  map: undefined,
  zoom: 1,

  setMap: (map: Map | undefined) => {
    set({ isMapReady: true, map });
  },
  setZoom: (zoom: number) => {
    set((state) => ({ ...state, zoom: zoom }));
  },
});

export const useMapStore = create<MapState>()(storeApi);
