import { AxiosInstance } from "axios";
import { useState } from "react";
interface ReturnData<T> {
  data: T | null;
  isPending: boolean;
  error: Error | null;
  fetchData: (url: string) => void;
  status: number;
}

export const useFetch = <T>(axiosInstance: AxiosInstance): ReturnData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState(null);

  const fetchData = async (url: string) => {
    setIsPending(true);
    try {
      const controller = new AbortController();
      const res = await axiosInstance(url, { signal: controller.signal });
      console.log(res.status);

      setStatus(res.status);
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      const data = await res.data;
      console.log(data);
      setIsPending(false);
      setData(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setIsPending(false);
          setError(new Error("Could not fetch the data"));
        }
      }
    }
  };

  return { data, isPending: isPending, error, fetchData, status };
};
