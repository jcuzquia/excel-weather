import { useState } from "react";

import { FirebaseError } from "firebase/app";
import { User, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { saveNewUser } from "../firebase/dbUser";
import { authErrors } from "../firebase/firebase-errors";

interface SignupData {
  user: User | null;
  error: string | null;
  errorCode: string | null;
  isPending: boolean;
}

const initialData: SignupData = {
  user: null,
  error: null,
  errorCode: null,
  isPending: false,
};

export const useSignup = () => {
  const [signupData, setSignupData] = useState(initialData);

  const signup = async (email: string, password: string, displayName?: string) => {
    await setSignupData({ ...initialData, isPending: true });
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
      await saveNewUser(user);

      setSignupData({ ...initialData, user });
      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        setSignupData({ user: null, error: authErrors[error.code], errorCode: error.code, isPending: false });
      } else {
        setSignupData({ user: null, error: error.message, errorCode: null, isPending: false });
      }
      return null;
    }

    // useEffect(() => {
    //   const unsub = onAuthStateChanged(auth, (user) => {
    //     setSignupData((state) => ({ ...state, user }));
    //   });
    //   return () => {
    //     unsub();
    //   };
    // }, []);
  };
  return { signupData, signup };
};
