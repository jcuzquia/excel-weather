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
      const selectedError = nrelQueryData.errors.find(
        (error) => error.indexOf("The optional 'attributes' parameter") !== -1
      );

      const validValueRegex = /Values may include (.+)/;
      const attributesMatch = selectedError.match(validValueRegex);
      if (attributesMatch && attributesMatch.length > 1) {
        const attributesStr = attributesMatch[1].split(",").map((attribute) => attribute.trim());
        console.log(attributesStr);
        const attributes = attributesStr.map((value) => getAttribute(value.trim()));
        return attributes;
      }
      return null;
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
