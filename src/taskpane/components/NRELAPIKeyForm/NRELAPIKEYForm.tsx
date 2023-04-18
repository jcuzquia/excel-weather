import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import excelWeatherApi from "../../../api/excel-weatherApi";
import db, { UpdateData } from "../../../firebase/db";
import { useDocument } from "../../../hooks/useDocument";
import { IUser } from "../../../interfaces/IUser";
import NRELMenu from "../NRELMenu/NRELMenu";
interface Props {
  userUid: string;
}

const NRELAPIKEYForm: React.FC<Props> = ({ userUid }) => {
  const [key, setKey] = useState<string>("");
  const userRef = db.user(userUid);
  const { data, firestoreError, isLoading } = useDocument<IUser>(userRef);
  const [keyIsValid, setKeyIsValid] = useState(false);
  const {
    data: nrelData,
    error,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["testData"],
    queryFn: async () => {
      if (key) {
        const { data } = await excelWeatherApi.get(`alt-fuel-stations/v1.json?limit=1&api_key=${key}`);
        let validAPI: boolean;
        if (!isError && nrelData && !isFetching) {
          validAPI = true;
        } else {
          validAPI = false;
        }
        const updates: UpdateData<IUser> = { nrelAPIKey: key, validNRELAPIKey: validAPI };
        await updateDoc(db.user(userUid), updates);
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
    if (data) {
      setKey(data.nrelAPIKey);
      setKeyIsValid(data.validNRELAPIKey);
    }
  }, [data]);

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
      {firestoreError && <Typography variant="body1">{firestoreError.message}</Typography>}
      {keyIsValid && <NRELMenu />}
    </Box>
  );
};

export default NRELAPIKEYForm;
