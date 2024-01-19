import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { NRELQueryOutput, NRELResponseQuery } from "../../interfaces/NRELQuery";
import { LatLng } from "use-places-autocomplete";
import { weatherQueryApi } from "../../api/nrel-api";
import { useUserStore } from "../user/user.store";
import { usePlacesStore } from "../places/places.store";
import { SelectorOption } from "../../interfaces/SelectorOptions";
import { getValidParams } from "../../helpers/get-valid-params";

export interface NRELAPIState {
  isLoading: boolean;
  error?: Error;
  nrelResponseQuery?: NRELResponseQuery;
  selectedResource: string;
  selectedResourceApiUrl: string;
  selectedQueryOutput?: NRELQueryOutput;
  selectedYear: string;
  selectedInterval: string;
  selectedParameters: Array<string>;

  intervals: Array<string>;
  years: Array<string>;
  validParameters: SelectorOption[];
  setNRELResponseQuery: (res: NRELResponseQuery) => void;
  fetchNRELResponseQuery: (selectedLocation: LatLng) => void;
  setSelectedResource: (resource: string) => void;
  setSelectedYear: (year: string) => void;
  setSelectedInterval: (interval: string) => void;
  setSelectedParameters: (selectedParameters: Array<string>) => void;
  updateIntervals: () => void;
  updateYears: () => void;
  updateParameterList: () => void;
}

const storeApi: StateCreator<NRELAPIState> = (set, get) => ({
  isLoading: false,
  nrelResponseQuery: undefined,
  error: undefined,
  selectedResource: "",
  selectedResourceApiUrl: "",
  selectedQueryOutput: undefined,
  selectedYear: "",
  selectedInterval: "",
  selectedParameters: [],
  intervals: [],
  years: [],
  validParameters: [],

  setSelectedParameters: (selectedParameters: Array<string>) => {
    set((state) => ({ ...state, selectedParameters: selectedParameters }));
  },

  updateParameterList: async () => {
    const selectedResourceApi = get().selectedQueryOutput.apiUrl;
    const selectedInterval = get().selectedInterval;
    const selectedYear = get().selectedYear;
    if (!selectedResourceApi || selectedResourceApi.trim().length === 0 || !selectedYear || !selectedInterval) {
      set((state) => ({ ...state, validParameters: [] }));
    } else {
      const params = await getValidParams(selectedResourceApi, selectedYear, selectedInterval);
      set((state) => ({ ...state, validParameters: params }));
    }
  },
  updateIntervals: () => {
    const selOutput = get().selectedQueryOutput;
    if (!selOutput) {
      set((state) => ({ ...state, intervals: [] }));
    } else {
      const intervals = selOutput.availableIntervals;
      set((state) => ({ ...state, intervals: intervals }));
    }
  },
  setSelectedYear: (year?) => {
    set((state) => ({ ...state, selectedYear: year }));
  },
  setSelectedInterval: (interval?) => {
    set((state) => ({ ...state, selectedInterval: interval }));
  },
  updateYears: () => {
    const selOutput = get().selectedQueryOutput;
    if (!selOutput) {
      set((state) => ({ ...state, years: [] }));
    } else {
      const years = selOutput.availableYears;
      set((state) => ({ ...state, years: years }));
    }
  },

  setNRELResponseQuery: (res: NRELResponseQuery) => {
    set((state) => ({ ...state, nrelResponseQuery: res }));
  },

  setSelectedResource: (resource: string) => {
    set((state) => ({ ...state, selectedResource: resource }));
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

export const useNRELApiStore = create<NRELAPIState>()(storeApi);
