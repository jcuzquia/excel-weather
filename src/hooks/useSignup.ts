import { useEffect, useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { auth } from "../firebase/config";
import db from "../firebase/db";
import { IUser } from "../interfaces/IUser";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const signup = async (email: string, password: string, displayName?: string) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        setIsPending(false);
        setError(null);
        updateProfile(user, { displayName });
        const u: IUser = { email: user.email, id: user.uid };
        addDoc<IUser>(db.users, u);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message + "Upper Error");
      });
    if (!isCancelled) {
      setIsPending(false);
      setError(null);
    }
    useEffect(() => {
      return () => {
        setIsCancelled(true);
      };
    }, []);
  };
  return { error, isPending, signup };
};
