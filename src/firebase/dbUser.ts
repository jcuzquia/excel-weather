import { User } from "firebase/auth";
import { FirestoreError, addDoc } from "firebase/firestore";
import { IUser } from "../interfaces/IUser";
import db from "./db";

export const saveNewUser = async (user: User) => {
  try {
    const ref = db.users;
    const newUser: IUser = { email: user.email, id: user.uid };
    addDoc<IUser>(ref, newUser);
  } catch (error) {
    if (error instanceof FirestoreError) {
      console.log(error);
    }
    console.log(error);
  }
};
