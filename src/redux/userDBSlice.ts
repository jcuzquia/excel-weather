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

export const userDBSlice = createSlice({
  name: "userDB",
  initialState,
  reducers: {
    login: (state: AuthState, action: ActionType) => {
      state.user = action.payload;
      return state;
    },
    logout: (state) => void (state.user = null),
  },
});
export const { login, logout } = userDBSlice.actions;
export const selectUser = (state: RootState) => state.user.user;

export default userDBSlice.reducer;
