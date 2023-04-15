import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";

export const useLogout = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const logout = async () => {
    try {
      await signOut(auth);
      setIsError(false);
      setErrorMessage(null);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setIsError(true);
        setErrorMessage("Something happened");
      }
    }
  };
  return { logout, isError, errorMessage };
};
