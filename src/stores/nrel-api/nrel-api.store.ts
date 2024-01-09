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
  selectedResourceApi?: string;
  selectedQueryOutput?: NRELQueryOutput;
  selectedYear?: string | number;
  selectedInterval?: string | number;
  selectedParameters?: Array<string | number>;

  intervals: Array<string | number>;
  years: Array<string | number>;
  validParameters: SelectorOption[];
  setNRELResponseQuery: (res: NRELResponseQuery) => void;
  setSelectedOutputBySelectedResource: (selectedNrelResponseQuery: string) => void;
  fetchNRELResponseQuery: (selectedLocation: LatLng) => void;
  setSelectedResourceApi: (resource: string) => void;
  setSelectedYear: (year: string | number) => void;
  setSelectedInterval: (interval: string | number) => void;
  setSelectedParameters: (selectedParameters: Array<string | number>) => void;
  updateIntervals: () => void;
  setIntervals: (intervals: Array<string | number>) => void;
  updateYears: () => void;
  setYears: (years: Array<string | number>) => void;
  updateParameterList: () => void;
}

const storeApi: StateCreator<NRELAPIState> = (set, get) => ({
  isLoading: false,
  nrelResponseQuery: undefined,
  error: undefined,
  selectedResourceApi: undefined,
  selectedQueryOutput: undefined,
  selectedYear: undefined,
  selectedInterval: undefined,
  selectedParameters: undefined,
  intervals: [],
  years: [],
  validParameters: [],
  setSelectedParameters: (selectedParameters: Array<string | number>) => {
    set((state) => ({ ...state, selectedParameters: selectedParameters }));
  },
  setIntervals: (intervals: Array<string | number>) => {
    set((state) => ({ ...state, intervals }));
  },
  setYears: (years: Array<string | number>) => {
    set((state) => ({ ...state, years }));
  },
  updateParameterList: async () => {
    console.log("UPDATING PARAMETER LIST");
    const selectedResourceApi = get().selectedResourceApi;
    const selectedInterval = get().selectedInterval;
    const selectedYear = get().selectedYear;
    console.log(selectedResourceApi, selectedInterval, selectedYear);
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
  setSelectedYear: (year) => {
    set((state) => ({ ...state, selectedYear: year }));
  },
  setSelectedInterval: (interval) => {
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
  setSelectedOutputBySelectedResource: (selectedResourceApiUrl: string) => {
    const output = get().nrelResponseQuery.outputs.find((o) => o.apiUrl === selectedResourceApiUrl);
    set((state) => ({ ...state, selectedQueryOutput: output, selectedResourceApi: selectedResourceApiUrl }));
  },
  setSelectedResourceApi: (resource: string) => {
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
