import { Box, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import GoogleMapsTextField from "./GoogleMapsTextField";
import { excelWeatherQueryApi } from "../../../api/excel-weatherApi";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";
import { selectUser } from "../../../redux/userSlice";
import { NRELResponseQuery } from "../../../interfaces/NRELQuery";
import { selectMapState } from "../../../redux/coordinatesSlice";
import { responseSuccess } from "../../../redux/nrelQuerySlice";

const GoogleMapsAutoCompleteForm = () => {
  const user = useTypedSelector(selectUser);
  const { coordinates } = useTypedSelector(selectMapState);
  const dispatch = useAppDispatch();
  const { error, isError, refetch } = useQuery({
    queryKey: ["queryData"],
    queryFn: async () => {
      const { data } = await excelWeatherQueryApi.get(
        `nsrdb_data_query.json?api_key=${user.nrelAPIKey}&lat=${coordinates?.lat}&lon=${coordinates?.lng}`
      );
      const nrelQueryData = data as NRELResponseQuery;
      dispatch(responseSuccess(nrelQueryData));

      return null;
    },
    enabled: false,
  });

  const handleGetQueryOptions = () => {
    refetch();
  };

  const disabled = coordinates ? false : true;

  return (
    <Box width={"100%"} mt={2} display={"flex"} alignItems={"center"} gap={1}>
      <GoogleMapsTextField error={error} isError={isError} />
      <Box>
        <Button variant="contained" size="small" onClick={handleGetQueryOptions} disabled={disabled}>
          Get Data
        </Button>
      </Box>
    </Box>
  );
};

export default GoogleMapsAutoCompleteForm;
