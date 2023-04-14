import { CollectionReference, FirestoreError, addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbFirestore } from "../firebase/config";
import { converter } from "../firebase/db";

export const useCollection = <T>(collectionRef: CollectionReference<T>) => {
  const [documents, setDocuments] = useState<T[]>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const addNewDocument = async <T>(collectionRef: CollectionReference<T>, data: T) => {
    setIsPending(true);
    try {
      await addDoc<T>(collectionRef, data);
      setError(null);
      setErrorCode(null);
    } catch (error) {
      if (error instanceof FirestoreError) {
        setError(error.message);
        setErrorCode(error.code);
      }
    }
    setIsPending(false);
  };
  useEffect(() => {
    let ref = collection(dbFirestore, collectionRef.path).withConverter(converter());
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results: T[] = [];
        snapshot.docs.forEach((doc) => {
          const d = doc.data() as T;
          results.push(d);
        });
        setDocuments(results);
      },
      (error) => {
        setError(error.message);
        setErrorCode(error.code);
      }
    );
    setIsPending(false);
    return () => unsub();
  }, [collectionRef]);
  return { documents, addNewDocument, error, errorCode, isPending };
};
