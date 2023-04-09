import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export const useSignup = () => {
  const [error, setError] = useState(null);

  const signup = (email: string, password: string) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return { error, signup };
};
