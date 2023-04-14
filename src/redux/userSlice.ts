import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/IUser";
import { RootState } from "./store";
interface AuthState {
  user: IUser | null;
}

type ActionType = {
  payload: IUser;
};

const initialState: AuthState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state: AuthState, action: ActionType) => {
      console.log("Calling login in dispatch: ", action.payload);
      state.user = action.payload;
      return state;
    },
    logout: (state) => (state.user = null),
  },
});
export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
