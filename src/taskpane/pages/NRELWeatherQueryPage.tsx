import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { excelWeatherQueryApi } from "../../api/excel-weatherApi";
import { NRELResponseQuery } from "../../interfaces/NRELQuery";
import { selectMapState } from "../../redux/coordinatesSlice";
import { useTypedSelector } from "../../redux/store";
import { selectUser } from "../../redux/userSlice";

import { useEffect } from "react";
import NRELQuerySuccess from "../components/NRELQuery/NRELQuerySuccess";

const NRELWeatherQueryPage = () => {
  const { coordinates } = useTypedSelector(selectMapState);
  const user = useTypedSelector(selectUser);
  const { error, isError, isFetching, refetch, isSuccess, data } = useQuery({
    queryKey: ["queryData"],
    queryFn: async () => {
      console.log("started quering data");
      const { data, status } = await excelWeatherQueryApi.get(
        `nsrdb_data_query.json?api_key=${user.nrelAPIKey}&lat=${coordinates?.lat}&lon=${coordinates?.lng}`
      );

      const nrelQueryData = data as NRELResponseQuery;
      console.log("RESPONSE: ", nrelQueryData);

      return nrelQueryData;
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, []);

  console.log(data);
  return <Box>{data && <NRELQuerySuccess response={data} />}</Box>;
};

export default NRELWeatherQueryPage;
