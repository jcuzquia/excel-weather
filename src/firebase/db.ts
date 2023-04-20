import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
  collection,
  doc,
} from "firebase/firestore";
import { IUser } from "../interfaces/IUser";
import { dbFirestore } from "./config";

type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never;

type Path<T> = PathImpl<T, keyof T> | keyof T;

type PathValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends Path<T[K]>
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

export type UpdateData<T extends object> = Partial<{
  [TKey in Path<T>]: PathValue<T, TKey>;
}>;

export const converter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>): DocumentData => {
    return data as DocumentData;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T => {
    const data = snapshot.data(options);
    return data as T;
  },
});

const db = {
  users: collection(dbFirestore, "users").withConverter(converter<IUser>()),
  user: (userId: string) => doc(dbFirestore, "users", userId).withConverter(converter<IUser>()),
};
export { db };
export default db;
