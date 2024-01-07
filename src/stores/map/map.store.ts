import { LatLng } from "use-places-autocomplete";
import { StateCreator, create } from "zustand";

type Map = google.maps.Map;
export interface MapState {
  isMapReady: boolean;

  map?: Map | undefined;
  zoom: number;

  setMap: (map: Map) => void;
}

const storeApi: StateCreator<MapState> = (set) => ({
  isMapReady: false,
  map: undefined,
  zoom: 13,

  setMap: (map: Map | undefined) => {
    set({ isMapReady: true, map });
  },
});

export const useMapStore = create<MapState>()(storeApi);
