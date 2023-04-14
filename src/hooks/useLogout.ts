import { useState } from "react";

import { FirebaseError } from "firebase/app";
import { User, signInWithEmailAndPassword, signOut } from "firebase/auth";
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

export const useLogout = () => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("user signed out");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return { logout };
};
