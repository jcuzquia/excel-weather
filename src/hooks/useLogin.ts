import { useState } from "react";

import { FirebaseError } from "firebase/app";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
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

export const useLogin = () => {
  const [loginData, setLoginData] = useState(initialData);

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    setLoginData({ ...initialData, isPending: true });
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setLoginData({ ...initialData, user });
      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        setLoginData({ user: null, error: authErrors[error.code], errorCode: error.code, isPending: false });
      } else {
        setLoginData({ user: null, error: error.message, errorCode: null, isPending: false });
      }
      return null;
    }
  };

  return { loginData, loginWithEmailAndPassword };
};
