import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { IUser } from "../interfaces/IUser";
import { RootState } from "./store";
import { getDoc, updateDoc } from "firebase/firestore";
import db from "../firebase/db";

export interface AuthState {
  user: IUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
}

type ActionType = {
  payload: IUser;
};

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};
interface SignUpArguments {
  username: string;
  email: string;
  password: string;
}

interface LoginArguments {
  email: string;
  password: string;
}

interface FetchUserArguments {
  id: string;
}

interface UpdateUserArguments {
  user: IUser;
}

export const signUpWithEmailAndPassword = createAsyncThunk<IUser, SignUpArguments>(
  "users/signup",
  async ({ email, password, username }) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(response.user, { displayName: username });
      const { uid, email: fEmail, displayName } = response.user;
      const newUser: IUser = { id: uid, email: fEmail, validNRELAPIKey: false, username: displayName };
      return newUser;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return error.message;
      }
      return error;
    }
  }
);

export const loginWithEmailAndPassword = createAsyncThunk<IUser, LoginArguments>(
  "users/login",
  async ({ email, password }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      const userDoc = await getDoc(db.user(response.user.uid));

      const user = userDoc.data();

      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return error.message;
      }
      return error;
    }
  }
);

export const fetchFirestoreUser = createAsyncThunk<IUser, FetchUserArguments>("users/user", async ({ id }) => {
  try {
    const userDoc = await getDoc(db.user(id));
    const user = userDoc.data();
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return error.message;
    }
    return error;
  }
});

export const updateFirestoreUser = createAsyncThunk<IUser, UpdateUserArguments>(
  "users/updateUser",
  async ({ user }) => {
    console.log("Calling Updating user thunk", user);
    try {
      await updateDoc(db.user(user.id), user);
      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return error.message;
      }
      return error;
    }
  }
);

export const logoutUser = createAsyncThunk("users/logout", async () => {
  try {
    await signOut(auth);
    return null;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return error.message;
    }
    return error;
  }
});

export const authSlice = createSlice({
  name: "signupReducer",
  initialState: initialState,
  reducers: {
    setUser: (state: AuthState, action: ActionType) => {
      state.user = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpWithEmailAndPassword.pending, (state, _action) => {
        state.status = "loading";
      })
      .addCase(signUpWithEmailAndPassword.fulfilled, (state, action) => {
        console.log("Setting up state of new user: ", action.payload);
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signUpWithEmailAndPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginWithEmailAndPassword.pending, (state, _action) => {
        state.status = "loading";
      })
      .addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginWithEmailAndPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFirestoreUser.pending, (state, _action) => {
        state.status = "loading";
      })
      .addCase(fetchFirestoreUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchFirestoreUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateFirestoreUser.pending, (state, _action) => {
        state.status = "loading";
      })
      .addCase(updateFirestoreUser.fulfilled, (state, action) => {
        console.log("Updationg user in redux!!!", action.payload);
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateFirestoreUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state, _action) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, _action) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      });
  },
});
export const { setUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.signup.user;
export const getStatus = (state: RootState) => state.signup.status;
export const getError = (state: RootState) => state.signup.error;

export default authSlice.reducer;
