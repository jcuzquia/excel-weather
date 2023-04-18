import { DocumentReference, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useDocument = <T>(docRef: DocumentReference<T>) => {
  const [firestoreError, setFirestoreError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    setFirestoreError(null);
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const d = snapshot.data() as T;
          setData(d);
        } else {
          setFirestoreError(new Error("User Not found"));
        }
        setIsLoading(false);
      },
      (error) => {
        setFirestoreError(error);
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return { data, firestoreError, isLoading };
};
