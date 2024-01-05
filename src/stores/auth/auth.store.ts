import { FirebaseError } from "firebase/app";
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDoc, setDoc } from "firebase/firestore";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "../../firebase/config";
import db from "../../firebase/db";
import { AuthStatus } from "../../interfaces";
import { User } from "../../interfaces/user.interface";

export interface AuthState {
  status: AuthStatus;
  user?: User;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  createUser: (username: string, email: string, password: string) => Promise<FirebaseUser | FirebaseError>;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,

  createUser: async (username: string, email: string, password: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: username });
      await setDoc(db.user(user.uid), { email: user.email!, id: user.uid, validNRELAPIKey: false });
      return user;
    } catch (error) {
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

      const userDoc = await getDoc(db.user(response.user.uid));

      const user = userDoc.data();

      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return error.message;
      }
      return error;
    }
  },

  logoutUser: async () => {
    try {
      await signOut(auth);
      set((state) => ({ ...state, status: "pending" }));
      return null;
    } catch (error) {
      set((state) => ({ ...state, status: "pending" }));
      if (error instanceof FirebaseError) {
        return error.message;
      }
      return error;
    }
  },
});

export const useAuthStore = create<AuthState>()(persist(storeApi, { name: "auth-store" }));
