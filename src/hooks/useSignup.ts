import { useState } from "react";
import { useFirebase } from "react-redux-firebase";

export const useSignup = () => {
  const firebase = useFirebase();
  const [errorMessage, setErrorMessage] = useState(null);

  const signupWithEmailAndPassword = async (email: string, password: string) => {
    console.log("starting signup");
    try {
      const userInfo = await firebase.createUser({ email, password });
      console.log("User infor is:", userInfo);
      return userInfo;
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      return null;
    }
  };
  return { signupWithEmailAndPassword, errorMessage };
};
