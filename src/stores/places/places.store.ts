import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getUserLocation } from "../../helpers";
import { LatLng } from "use-places-autocomplete";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: LatLng;

  setUserLocation: () => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
}

const storeApi: StateCreator<PlacesState> = (set) => ({
  isLoading: false,
  userLocation: { lat: 40.73061, lng: -73.935242 },

  setUserLocation: async () => {
    console.log("Finding User Location");
    const location = await getUserLocation();
    set((state) => ({ ...state, userLocation: location }));
  },

  setIsLoading: (isLoading: boolean) => {
    set((state) => ({ ...state, isLoading }));
  },
});

export const usePlacesStore = create<PlacesState>()(devtools(persist(storeApi, { name: "places-store" })));
