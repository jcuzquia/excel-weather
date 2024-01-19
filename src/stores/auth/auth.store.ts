import { FirebaseError } from "firebase/app";
import {
  User as FirebaseUser,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "../../firebase/config";
import { AuthStatus } from "../../interfaces";

export interface AuthState {
  status: AuthStatus;
  isLoading: boolean;
  currentUser?: FirebaseUser;
  error?: Error;
  loginUser: (email: string, password: string) => Promise<User>;
  logoutUser: () => void;
  createUser: (username: string, email: string, password: string) => Promise<FirebaseUser | FirebaseError>;
  checkAuthStatus: () => FirebaseUser | undefined;
  setLoggedIn: (user?: FirebaseUser) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: Error | undefined) => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  isLoading: false,
  error: undefined,
  currentUser: undefined,
  checkAuthStatus: () => {
    return auth.currentUser;
  },
  setLoggedIn: (user?: FirebaseUser) => {
    if (user) {
      set((state) => ({ ...state, user, status: "authorized" }));
    } else {
      set((state) => ({ ...state, user, status: "unauthorized" }));
    }
  },
  createUser: async (username: string, email: string, password: string) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      set((state) => ({ ...state, status: "authorized", currentUser: user }));
      await updateProfile(user, { displayName: username });

      return user;
    } catch (error) {
      set((state) => ({ ...state, isLoading: false, error, status: "unauthorized" }));
      if (error instanceof FirebaseError) {
        return error;
      } else {
        throw error; //this is for non firebase errors
      }
    }
  },

  loginUser: async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      set((state) => ({ ...state, status: "authorized", currentUser: response.user }));

      return response.user;
    } catch (error) {
      set((state) => ({ ...state, isLoading: false, error, status: "unauthorized" }));
      if (error instanceof FirebaseError) {
        return error.message;
      }
      return error;
    }
  },

  logoutUser: async () => {
    try {
      await signOut(auth);
      set((state) => ({ ...state, status: "unauthorized", error: undefined }));
      return null;
    } catch (error) {
      set((state) => ({ ...state, status: "unauthorized", error: error }));
      if (error instanceof FirebaseError) {
        return error.message;
      }
      return error;
    }
  },

  setIsLoading: (isLoading: boolean) => {
    set((state) => ({ ...state, isLoading }));
  },
  setError: (error: Error | undefined) => {
    set((state) => ({ ...state, error }));
  },
});

export const useAuthStore = create<AuthState>()(persist(storeApi, { name: "auth-store" }));
