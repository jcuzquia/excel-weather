import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import * as React from "react";
import store from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return <Provider store={store}>{children}</Provider>;
}
