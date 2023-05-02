import { useQuery } from "@tanstack/react-query";
import { NRELResponseQuery, getAttribute } from "../interfaces/NRELQuery";
export const useGetValidNRELParams = (url: string) => {
  const {
    error,
    isError: isErrorFetching,
    refetch,
    data,
  } = useQuery({
    queryKey: ["queryParamenters"],
    queryFn: async () => {
      const response = await fetch(`${url}&attributes=not_a_valid_attribute`); //using fetch to get data even if it is error
      const data = await response.json();
      const nrelQueryData = data as NRELResponseQuery;
      const validAttributes = nrelQueryData.errors[0].split(",");
      const validValueRegex = /^[a-z_\-0-9]+$/i;
      const validValues = validAttributes.filter((value) => validValueRegex.test(value.trim()));
      const attributes = validValues.map((value) => getAttribute(value.trim()));
      return attributes;
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
