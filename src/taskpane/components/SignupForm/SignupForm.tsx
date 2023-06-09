import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Divider, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { useSignup } from "../../../hooks/useSignup";
import { isValidEmail } from "../../../utils/validations";
import theme from "../../styles/theme";

type FormData = {
  email: string;
  password: string;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FormData>();

  const { signup, error } = useSignup();

  const onSignupUser: SubmitHandler<FormData> = (data: FormData) => {
    signup(data.email, data.password);
  };
  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Divider />
      <Box component="form" noValidate sx={{ mt: 2 }} pl={4} pr={4} onSubmit={handleSubmit(onSignupUser)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="email"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              size="small"
              {...register("email", { required: "This field is required", validate: isValidEmail })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              size="small"
              {...register("password", {
                required: "This field is required",
                minLength: { value: 6, message: "You need at least 6 characters" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color={theme.palette.error.light}>
              {error}
            </Typography>
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <RouterLink to={"/dashboard"}>
              <Link>Already have an account? Sign in</Link>
            </RouterLink>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignupForm;
