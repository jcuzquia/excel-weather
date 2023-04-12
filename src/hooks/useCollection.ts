import { CollectionReference, addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbFirestore } from "../firebase/config";
import { converter } from "../firebase/db";

export const useCollection = <T>(collectionRef: CollectionReference<T>) => {
  const [documents, setDocuments] = useState<T[]>(null);
  const addNewDocument = async <T>(collectionRef: CollectionReference<T>, data: T) => {
    try {
      await addDoc<T>(collectionRef, data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let ref = collection(dbFirestore, collectionRef.path).withConverter(converter());
    const unsub = onSnapshot(ref, (snapshot) => {
      let results: T[] = [];
      snapshot.docs.forEach((doc) => {
        const d = doc.data() as T;
        results.push(d);
      });
      setDocuments(results);
    });
    return () => unsub();
  }, [collectionRef]);
  return { documents, addNewDocument };
};
