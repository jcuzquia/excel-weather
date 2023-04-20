import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import excelWeatherApi from "../../../api/excel-weatherApi";
import db from "../../../firebase/db";
import { IUser } from "../../../interfaces/IUser";
import { selectUser } from "../../../redux/userSlice";
import NRELMenu from "../NRELMenu/NRELMenu";
import { useTypedSelector } from "../../../redux/store";

const NRELAPIKEYForm = () => {
  const user = useTypedSelector(selectUser);
  const [key, setKey] = useState<string>(user.nrelAPIKey);
  const [keyIsValid, setKeyIsValid] = useState(false);

  const { error, isError, isFetching, refetch, isSuccess } = useQuery({
    queryKey: ["testData"],
    queryFn: async () => {
      if (key) {
        const { data, status } = await excelWeatherApi.get(`alt-fuel-stations/v1.json?limit=1&api_key=${key}`);
        let validAPI: boolean;
        if (status === 200) {
          validAPI = true;
        } else {
          validAPI = false;
        }
        const updateUser: IUser = { ...user, validNRELAPIKey: validAPI };
        await updateDoc(db.user(user.id), updateUser);
        setKey(key);
        setKeyIsValid(validAPI);
        return data;
      } else {
        return null;
      }
    },
    enabled: false,
  });

  const saveAPIKey = async () => {
    refetch();
  };
  let errorMessage: string | null = null;
  if (!error) {
    errorMessage = null;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "There was an error with this API Key";
  }

  useEffect(() => {
    refetch();
  }, []);
  console.log("err before render:", isError, "Is success:", isSuccess);

  return (
    <Box>
      <Box width={"100%"} display={"flex"} justifyContent={"center"} gap={1} height={87.91}>
        <Box flexGrow={1}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="apiKey"
            label="NREL API Key"
            name="nrel_api_key"
            size="small"
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
            }}
            color={keyIsValid ? "success" : null}
            error={isError}
            helperText={errorMessage ? "API Key is invalid" : keyIsValid ? "API Key is valid!" : null}
            focused
          />
        </Box>
        <Box pt={2.7}>
          <Button variant="contained" color="secondary" onClick={saveAPIKey} size="small">
            {isFetching ? <CircularProgress size={"1.5rem"} color="inherit" /> : "Save"}
          </Button>
        </Box>
      </Box>
      {keyIsValid && <NRELMenu />}
    </Box>
  );
};

export default NRELAPIKEYForm;
