import { StateCreator, create } from "zustand";

type Map = google.maps.Map;
export interface MapState {
  isMapReady: boolean;

  map?: Map | undefined;

  setMap: (map: Map) => void;
}

const storeApi: StateCreator<MapState> = (set) => ({
  isMapReady: false,
  map: undefined,

  setMap: (map: Map | undefined) => {
    set({ isMapReady: true, map });
  },
});

export const useMapStore = create<MapState>()(storeApi);
