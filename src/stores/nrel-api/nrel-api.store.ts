import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { NRELResponseQuery } from "../../interfaces/NRELQuery";
import { LatLng } from "use-places-autocomplete";
import { weatherQueryApi } from "../../api/nrel-api";
import { useUserStore } from "../user/user.store";
import { usePlacesStore } from "../places/places.store";

export interface NRELAPIState {
  isLoading: boolean;
  error?: Error;
  nrelResponseQuery?: NRELResponseQuery;
  setNRELResponseQuery: (res: NRELResponseQuery) => void;
  fetchNRELResponseQuery: (selectedLocation: LatLng) => void;
}

const storeApi: StateCreator<NRELAPIState> = (set) => ({
  isLoading: false,
  nrelResponseQuery: undefined,
  error: undefined,

  setNRELResponseQuery: (res: NRELResponseQuery) => {
    set((state) => ({ ...state, nrelResponseQuery: res }));
  },

  fetchNRELResponseQuery: async () => {
    set((state) => ({ ...state, isLoading: true, nrelResponseQuery: undefined, error: undefined }));
    const user = useUserStore.getState().user;
    const selectedLocation = usePlacesStore.getState().selectedLocation;
    try {
      const res = await weatherQueryApi.get<NRELResponseQuery>(
        `nsrdb_data_query.json?api_key=${user.nrelAPIKey}&lat=${selectedLocation?.lat}&lon=${selectedLocation?.lng}`
      );
      const nrelQueryResponse = res.data;
      set((state) => ({ ...state, isLoading: true, nrelResponseQuery: nrelQueryResponse, error: undefined }));
    } catch (error) {
      set((state) => ({ ...state, isLoading: true, nrelResponseQuery: undefined, error: error }));
    }
  },
});

export const useNRELApiStore = create<NRELAPIState>()(persist(storeApi, { name: "nrel-api-store" }));
