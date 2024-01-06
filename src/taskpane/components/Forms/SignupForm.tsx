import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { FirebaseError } from "firebase/app";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuthStore } from "../../../stores/auth/auth.store";
import { useUserStore } from "../../../stores/user/user.store";
import { isValidEmail } from "../../../utils/validations";
import theme from "../../styles/theme";
import Link from "../ui/Link/Link";
type FormData = {
  username: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>();
  const createUser = useAuthStore((state) => state.createUser);
  const isAuthLoading = useAuthStore((state) => state.isLoading);
  const authError = useAuthStore((state) => state.error);
  const createFirestoreUser = useUserStore((state) => state.createFirestoreUser);
  const isUserLoading = useUserStore((state) => state.isLoading);
  const userError = useUserStore((state) => state.error);
  const history = useHistory();

  const onSignupUser: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const user = await createUser(data.username, data.email, data.password);
      if (user instanceof FirebaseError) return;
      const iuser = await createFirestoreUser(user);
      history.push("/dashboard");
    } catch (error) {}
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
              type="username"
              required
              fullWidth
              id="username"
              label="Username:"
              name="username"
              autoComplete="username"
              size="small"
              {...register("username", {
                required: "This field is required",
                minLength: { value: 4, message: "You need at least 6 characters" },
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          </Grid>
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
              {...register("email", {
                required: "This field is required",
                validate: isValidEmail,
              })}
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
            {isAuthLoading || (isUserLoading && <CircularProgress />)}
            {authError && (
              <Typography variant="body1" color={theme.palette.error.light}>
                {authError.message}
              </Typography>
            )}
            {userError && (
              <Typography variant="body1" color={theme.palette.error.light}>
                {userError.message}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login">Already have an account? Sign in</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignupForm;
