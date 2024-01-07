import { Box, Button, CircularProgress, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../../stores/user/user.store";
import { isValidEmail } from "../../../utils/validations";
import Link from "../ui/Link/Link";

type FormData = {
  email: string;
  nrelKey: string;
};

interface Props {
  nrelEmail?: string;
  nrelKey?: string;
}

const NRELAPIKEYForm = ({ nrelEmail, nrelKey }: Props) => {
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);
  const userError = useUserStore((state) => state.error);
  const saveAndValidateApiKey = useUserStore((state) => state.saveAndValidateAPIKey);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    // watch,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { email: nrelEmail, nrelKey } });

  const handleNRELWebsite = () => {
    // eslint-disable-next-line no-undef
    window.open("https://developer.nrel.gov/signup/");
  };

  const onSaveAndValidateAPIKey = async () => {
    saveAndValidateApiKey(getValues("nrelKey"), getValues("email"));
  };

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Paper sx={{ p: 1 }} elevation={3}>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSaveAndValidateAPIKey)}
          display={"flex"}
          gap={1}
          flexDirection={"column"}
        >
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
          <Box width={"100%"} display={"flex"} gap={1} alignItems={"center"}>
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
                color={user.validNRELAPIKey ? "success" : "warning"}
                error={userError ? true : false}
                helperText={userError ? "API Key is invalid" : user.validNRELAPIKey ? "API Key is valid!" : null}
                focused={user.validNRELAPIKey}
              />
            </Box>

            <Button variant="contained" color="secondary" size="small" type="submit">
              {isLoading ? <CircularProgress size={"1.5rem"} color="inherit" /> : "Save"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default NRELAPIKEYForm;
