import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NRELResponseQuery } from "../interfaces/NRELQuery";
import { RootState } from "./store";
interface QueryState {
  value: NRELResponseQuery | null;
}

const initialState: QueryState = {
  value: null,
};

export const nrelQuerySlice = createSlice({
  name: "nrelQuery",
  initialState,
  reducers: {
    responseSuccess: (state: QueryState, action: PayloadAction<NRELResponseQuery>) => {
      state.value = action.payload;
      return state;
    },
    responseFailed: (state: QueryState) => {
      state.value = null;
      return state;
    },
  },
});
export const { responseSuccess, responseFailed } = nrelQuerySlice.actions;
export const selectNRELQueryState = (state: RootState) => state.nrelQuery.value;

export default nrelQuerySlice.reducer;
