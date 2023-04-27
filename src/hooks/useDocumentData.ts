import { DocumentReference, SnapshotOptions, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { isEqual } from "lodash";
export const useDocumentData = <T>(docRef: DocumentReference<T>, snapshotOptions?: SnapshotOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    console.log("Hitting firebase effect");
    const unsub = onSnapshot<T>(
      docRef,
      (snapshot) => {
        const newData = snapshot.data(snapshotOptions);
        console.log("firing onsnapshot");
        if (!isEqual(data, newData)) {
          setData(newData);
        }
        setLoading(false);
      },
      (error) => {
        setError(error);
      }
    );

    return () => unsub();
  }, [data]);

  return { data, loading, error };
};
