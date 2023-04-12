import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/IUser";
interface AuthState {
  user: IUser | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: () => {
      // console.log("login in");
    },
  },
});
export const { login } = authSlice.actions;

export default authSlice.reducer;
