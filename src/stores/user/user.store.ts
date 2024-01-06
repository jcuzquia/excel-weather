import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import db from "../../firebase/db";
import { IUser } from "../../interfaces/IUser";

export interface UserState {
  user?: IUser;
  isLoading: boolean;
  error?: Error;
  // getFireStoreUser: (id: string) => Promise<IUser>;
  createFirestoreUser: (user: User) => Promise<string | FirebaseError>;
}

const storeApi: StateCreator<UserState> = (set) => ({
  user: undefined,
  isLoading: false,
  error: undefined,
  createFirestoreUser: async (user: User) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      await setDoc(db.user(user.uid), {
        email: user.email!,
        validNRELAPIKey: false,
        username: user.displayName,
      });
      set((state) => ({ ...state, isLoading: false }));
      return user.uid;
    } catch (error) {
      set((state) => ({ ...state, isLoading: false, error: error }));
      if (error instanceof FirebaseError) {
        return error;
      } else {
        throw error; //this is for non firebase errors
      }
    }
  },

  // getFireStoreUser: async (email: string, password: string) => {
  //   try {
  //     const response = await signInWithEmailAndPassword(auth, email, password);

  //     const userDoc = await getDoc(db.user(response.user.uid));

  //     const user = userDoc.data();

  //     return user;
  //   } catch (error) {
  //     if (error instanceof FirebaseError) {
  //       return error.message;
  //     }
  //     return error;
  //   }
  // },
});

export const useUserStore = create<UserState>()(persist(storeApi, { name: "user-store" }));
