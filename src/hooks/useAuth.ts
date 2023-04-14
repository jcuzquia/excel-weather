import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/config";
import { login } from "../redux/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const authLogin = async (email: string, password: string) => {
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const { email: e, uid } = credentials.user;
      dispatch(login({ email: e, id: uid }));
    } catch (error) {
      return null;
    }
  };
  return { authLogin };
};

export default useAuth;
