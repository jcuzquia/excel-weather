import { LatLng } from "use-places-autocomplete";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { geocodingApi } from "../../api/google-api";
import { getUserLocation } from "../../helpers";
import { GoogleGeocodeResponse } from "../../interfaces/coordinates";
import { GOOGLE_MAPS_API_KEY } from "../../lib/constants";

export interface PlacesState {
  isLoading: boolean;
  error?: Error;
  userLocation?: LatLng;
  selectedAddress?: string;
  selectedLocation?: LatLng;
  setUserLocation: () => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  setSelectedAddress: (selectedAddress: string) => void;
  setSelectedLocation: (lng: number, lat: number) => void;
  clearCoordinates: () => void;
  fetchSelectedCoordinates: (selectedAddress: string) => void;
}

const storeApi: StateCreator<PlacesState> = (set) => ({
  isLoading: false,
  selectedAddress: undefined,
  selectedLocation: undefined,
  error: undefined,
  userLocation: { lat: 40.73061, lng: -73.935242 },

  setSelectedAddress: (selectedAddress: string) => {
    set((state) => ({ ...state, selectedAddress }));
  },

  fetchSelectedCoordinates: async (selectedAddress: string) => {
    set((state) => ({ ...state, isLoading: true, selectedLocation: undefined, error: undefined }));
    try {
      const res = await geocodingApi<GoogleGeocodeResponse>(`${selectedAddress}&key=${GOOGLE_MAPS_API_KEY}`);
      const selectedLocation: LatLng = res.data.results[0].geometry.location;
      set((state) => ({ ...state, selectedLocation, isLoading: false, selectedAddress }));
    } catch (error) {
      set((state) => ({ ...state, selectedLocation: undefined, isLoading: false }));
    }
  },

  setSelectedLocation: (lng: number, lat: number) => {
    set((state) => ({ ...state, selectedLocation: { lat, lng } }));
  },

  setUserLocation: async () => {
    try {
      const location = await getUserLocation();
      set((state) => ({ ...state, userLocation: location, error: undefined }));
    } catch (error) {
      set((state) => ({ ...state, userLocation: undefined, error: error }));
    }
  },

  setIsLoading: (isLoading: boolean) => {
    set((state) => ({ ...state, isLoading }));
  },
  clearCoordinates: () => {
    set((state) => ({ ...state, selectedLocation: undefined, selectedAddress: undefined, error: undefined }));
  },
});

export const usePlacesStore = create<PlacesState>()(persist(storeApi, { name: "places-store" }));
