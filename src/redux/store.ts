import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import userSlice from "./userSlice";
import { firebaseReducer, actionTypes } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const store = configureStore({
  reducer: {
    user: userSlice,
    firebaseReducer,
    firestoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: { ignoredActions: [actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR] } }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
