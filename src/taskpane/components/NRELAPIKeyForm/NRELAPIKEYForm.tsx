import { Box, Button, CircularProgress, Paper, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { excelWeatherApi } from "../../../api/excel-weatherApi";
import { IUser } from "../../../interfaces/IUser";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";
import { isValidEmail } from "../../../utils/validations";
import NRELMenu from "../NRELMenu/NRELMenu";
import Link from "../ui/Link/Link";
import { useEffect } from "react";
import { useUserStore } from "../../../stores/user/user.store";

type FormData = {
  email: string;
  nrelKey: string;
};

const NRELAPIKEYForm: FC = () => {
  const dispatch = useAppDispatch();
  const user = useUserStore((state) => state.user);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    // watch,
    formState: { errors },
  } = useForm<FormData>();

  const { error, isError, isFetching, refetch, isSuccess } = useQuery({
    queryKey: ["testData"],
    queryFn: async () => {
      const key = getValues("nrelKey");
      console.log("REFETCHING: ", key);
      if (key) {
        const { data, status } = await excelWeatherApi.get(`alt-fuel-stations/v1.json?limit=1&api_key=${key}`);
        let validAPI: boolean;
        if (status === 200) {
          console.log("IT IS VALID");
          validAPI = true;
        } else {
          validAPI = false;
        }
        const updateUser: IUser = { ...user, validNRELAPIKey: validAPI, nrelAPIKey: key };

        console.log("THIS IS THE UPDATE USER!!", updateUser);
        //! TODO dispatch(updateFirestoreUser({ user: updateUser }));

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

  const saveAPIKey = async () => {
    await refetch();
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
    reset({ email: user.email, nrelKey: user.nrelAPIKey });
  }, []);

  if (!user) {
    return null;
  }

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
            id="nrelEmail"
            label="NREL Email Address"
            name="email"
            size="small"
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
                {...register("nrelKey", { required: "This field is required" })}
                color={user.validNRELAPIKey ? "success" : null}
                error={isError}
                helperText={errorMessage ? "API Key is invalid" : user.validNRELAPIKey ? "API Key is valid!" : null}
              />
            </Box>
          </Box>
          <Button variant="contained" color="secondary" size="small" type="submit">
            {isFetching ? <CircularProgress size={"1.5rem"} color="inherit" /> : "Save"}
          </Button>
        </Box>
      </Paper>

      {user.validNRELAPIKey && !errorMessage && <NRELMenu />}
    </Box>
  );
};

export default NRELAPIKEYForm;
