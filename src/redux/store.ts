import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { default as authSlice, default as signupSlice } from "./authSlice";
import coordinatesSlice from "./coordinatesSlice";
import nrelQuerySlice from "./nrelQuerySlice";
import nrelWeatherDataFormSlice from "./nrelWeatherDataFormSlice";

const store = configureStore({
  reducer: {
    coordinates: coordinatesSlice,
    nrelQuery: nrelQuerySlice,
    nrelWeatherDataForm: nrelWeatherDataFormSlice,
    signup: signupSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
