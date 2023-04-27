import { Box, Button, CircularProgress, Paper, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { excelWeatherApi } from "../../../api/excel-weatherApi";
import db from "../../../firebase/db";
import { IUser } from "../../../interfaces/IUser";
import { useTypedSelector } from "../../../redux/store";
import { selectUser } from "../../../redux/userSlice";
import { isValidEmail } from "../../../utils/validations";
import NRELMenu from "../NRELMenu/NRELMenu";
import Link from "../ui/Link/Link";

type FormData = {
  email: string;
};

const NRELAPIKEYForm = () => {
  const user = useTypedSelector(selectUser);
  const [nrelEmail, setNrelEmail] = useState<string | null>(user.nrelEmail);
  const [key, setKey] = useState<string>(user.nrelAPIKey);
  const [keyIsValid, setKeyIsValid] = useState(false);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FormData>();

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
  const handleNRELWebsite = () => {
    // eslint-disable-next-line no-undef
    window.open("https://developer.nrel.gov/signup/");
  };

  const saveAPIKey = async (data: FormData) => {
    refetch();
    const updateUser: IUser = { ...user, nrelEmail: data.email };
    await updateDoc(db.user(user.id), updateUser);
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
    if (user.nrelEmail) {
      setNrelEmail(user.nrelEmail);
    } else {
      setNrelEmail("");
    }
  }, []);
  console.log("err before render:", isError, "Is success:", isSuccess);

  return (
    <Box>
      <Paper sx={{ p: 1 }} elevation={3}>
        <Box component={"form"} onSubmit={handleSubmit(saveAPIKey)} display={"flex"} gap={1} flexDirection={"column"}>
          <Typography variant="body1">Enter your NREL API Here:</Typography>
          <Typography variant="body1">
            If you don&apos;t have one, you can get one for free
            <Link onClick={handleNRELWebsite}> here:</Link>
          </Typography>
          <TextField
            margin="dense"
            required
            fullWidth
            id="email"
            label="NREL Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            size="small"
            value={nrelEmail}
            {...register("email", { required: "This field is required", validate: isValidEmail })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Box width={"100%"}>
            <Box flexGrow={1}>
              <TextField
                margin="dense"
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
          </Box>
          <Button variant="contained" color="secondary" size="small" type="submit">
            {isFetching ? <CircularProgress size={"1.5rem"} color="inherit" /> : "Save"}
          </Button>
        </Box>
      </Paper>

      {keyIsValid && !errorMessage && <NRELMenu />}
    </Box>
  );
};

export default NRELAPIKEYForm;
