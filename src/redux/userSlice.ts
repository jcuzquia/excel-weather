import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/IUser";
import { RootState } from "./store";
interface AuthState {
  user: IUser | null;
}

type ActionType = {
  payload: IUser;
};

// TODO change the initial state in the slice when in production
const initialState: AuthState = {
  user: null,
};

// const testInitialState: AuthState = {
//   user: {
//     email: "jcuzquia@gmail.com",
//     id: "mDjIKtM9YmdD6Tl1CUwKaFVQLXG3",
//     nrelAPIKey: "mp56Z4nzq55AGq6GhvfGAl2gaEVPdPQR2c59dp7W",
//     nrelEmail: "camilo.uzquiano@outlook.com",
//     validNRELAPIKey: true,
//   },
// };

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state: AuthState, action: ActionType) => {
      state.user = action.payload;
      return state;
    },
    logout: (state) => void (state.user = null),
  },
});
export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
