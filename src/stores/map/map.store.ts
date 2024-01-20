import { StateCreator, create } from "zustand";

type Map = google.maps.Map;
type Marker = google.maps.Marker;
export interface MapState {
  isMapReady: boolean;

  map?: Map | undefined;
  zoom: number;
  marker?: Marker;

  setMap: (map: Map) => void;
  setZoom: (zoom: number) => void;
  setMarker: (markers: Marker) => void;
  removeMarkerFromMap: () => void;
}

const storeApi: StateCreator<MapState> = (set, get) => ({
  isMapReady: false,
  map: undefined,
  zoom: 4,
  marker: undefined,

  setMap: (map: Map | undefined) => {
    set({ isMapReady: true, map });
  },
  setZoom: (zoom: number) => {
    set((state) => ({ ...state, zoom }));
  },
  setMarker: (markers: Marker) => {
    set((state) => ({ ...state, markers }));
  },
  removeMarkerFromMap: () => {
    get().marker.setMap(null);
  },
});

export const useMapStore = create<MapState>()(storeApi);
