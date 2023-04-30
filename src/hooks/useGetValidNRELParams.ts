import { useQuery } from "@tanstack/react-query";
import { excelWeatherQueryApi } from "../api/excel-weatherApi";
import { NRELResponseQuery } from "../interfaces/NRELQuery";
import { useEffect } from "react";
import axios from "axios";
export const useGetValidNRELParams = (url: string) => {
  const {
    error,
    isError: isErrorFetching,
    refetch,
    data,
  } = useQuery({
    queryKey: ["queryParamenters"],
    queryFn: async () => {
      console.log("GETTING DATA");
      const response = await fetch(`${url}&attributes=not_a_valid_attribute`);
      const data = await response.json();
      console.log("==========");
      console.log(data);
      const nrelQueryData = data as NRELResponseQuery;
      console.log(nrelQueryData.errors[0]);
      const validAttributes = nrelQueryData.errors[0].split(",");
      const validValueRegex = /^[a-z_\-0-9]+$/i;
      const validValues = validAttributes.filter((value) => validValueRegex.test(value.trim()));
      console.log(validValues);
      return validValues;
    },
    enabled: false,
  });

  return {
    setInterval,
    error,
    refetch,
    isErrorFetching,
    data,
  };
};
