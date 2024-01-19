import { User } from "firebase/auth";
import { getDoc, setDoc, updateDoc } from "firebase/firestore";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import db from "../../firebase/db";
import { IUser } from "../../interfaces/IUser";
import { NREL_API_TEST_ADDRESS } from "../../lib/constants";
import { useAuthStore } from "../auth/auth.store";
import { isValidEmail } from "../../utils/validations";
import { nrelTestApi } from "../../api/nrel-api";

export interface UserState {
  user?: IUser;
  isLoading: boolean;
  error?: Error;
  getFirestoreUserById: (id: string) => Promise<IUser>;
  createFirestoreUser: (user: User) => Promise<IUser>;
  setFirestoreUser: (user: User) => void;
  saveAndValidateAPIKey: (apikey: string, email?: string) => void;
}

const storeApi: StateCreator<UserState> = (set, get) => ({
  user: undefined,
  isLoading: false,
  error: undefined,
  setFirestoreUser: async () => {
    set((state) => ({ ...state, isLoading: true, error: undefined }));
    try {
      const id = useAuthStore.getState().currentUser.uid;
      const iuser = (await getDoc(db.user(id))).data();
      set((state) => ({ ...state, user: iuser, isLoading: false }));
    } catch (error) {
      set((state) => ({ ...state, user: undefined, isLoading: false, error: undefined }));
    }
  },
  getFirestoreUserById: async (id: string) => {
    try {
      const res = await getDoc(db.user(id));
      const user = res.data();
      return user;
    } catch (error) {
      return null;
    }
  },
  saveAndValidateAPIKey: async (apikey: string, email?: string) => {
    set((state) => ({ ...state, isLoading: true, error: undefined }));
    const id = useAuthStore.getState().currentUser.uid;
    try {
      const { status } = await nrelTestApi.get(`${NREL_API_TEST_ADDRESS}${apikey}`);
      const currentUser = get().user;
      if (status === 200) {
        currentUser.nrelAPIKey = apikey;
        currentUser.validNRELAPIKey = true;
      } else {
        currentUser.nrelAPIKey = apikey;
        currentUser.validNRELAPIKey = false;
      }
      console.log(email);
      if (email.trim().length > 0 && isValidEmail(email)) {
        console.log("IT IS VALID EMAIL");
        currentUser.nrelEmail = email;
      }
      console.log("This is the user before updating the db");
      console.log(currentUser);
      await updateDoc(db.user(id), currentUser);
      set((state) => ({ ...state, user: currentUser, isLoading: false }));
    } catch (error) {
      console.error(error);
      set((state) => ({ ...state, isLoading: false, error: error }));
    }
  },

  createFirestoreUser: async (user: User) => {
    set((state) => ({ ...state, isLoading: true, error: undefined }));
    try {
      await setDoc(db.user(user.uid), {
        email: user.email!,
        validNRELAPIKey: false,
        username: user.displayName,
      });
      const iuser = await getDoc(db.user(user.uid));
      set((state) => ({ ...state, isLoading: false, user: iuser.data() }));
      return iuser.data();
    } catch (error) {
      set((state) => ({ ...state, isLoading: false, error: error }));
      return null;
    }
  },
});

export const useUserStore = create<UserState>()(persist(storeApi, { name: "user-store" }));
