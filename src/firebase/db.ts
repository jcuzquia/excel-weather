import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, collection } from "firebase/firestore";
import { IUser } from "../interfaces/IUser";
import { dbFirestore } from "./config";

export const converter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: T): DocumentData => {
    return data as unknown as DocumentData;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as T,
});

const dataPoint = <T>(collectionPath: string) => collection(dbFirestore, collectionPath).withConverter(converter<T>());

const db = {
  users: dataPoint<IUser>("users"),
};
export { db };
export default db;
