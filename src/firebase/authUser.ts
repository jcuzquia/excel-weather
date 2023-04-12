import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./config";
import { FirebaseError } from "firebase/app";
/**
 * Creates a new user in Firebase Authentication with the provided email, password, and display name.
 *
 * @param {string} username - The display name of the new user.
 * @param {string} email - The email address of the new user.
 * @param {string} password - The password of the new user.
 *
 * @returns {Promise<User|null>} - A Promise that resolves with the user object if the creation is successful, otherwise it returns null.
 */
export const createUser = async (username: string, email: string, password: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: username });
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return error;
    } else {
      throw error; //this is for non firebase errors
    }
  }
};
