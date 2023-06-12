import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";
import { isValidEmail } from "../../../utils/validations";
import theme from "../../styles/theme";
import Link from "../ui/Link/Link";
import { getError, getStatus, loginWithEmailAndPassword } from "../../../redux/authSlice";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const status = useTypedSelector(getStatus);
  const error = useTypedSelector(getError);

  console.log("status is: ", status);

  const onLoginUser: SubmitHandler<FormData> = async (data: FormData) => {
    await dispatch(loginWithEmailAndPassword({ email: data.email, password: data.password })).unwrap();
    history.push("/dashboard");
  };
  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      pl={3}
      pr={3}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onLoginUser)} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
              {...register("email", { required: "This field is required", validate: isValidEmail })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
              {...register("password", {
                required: "This field is required",
                minLength: { value: 6, message: "You need at least 6 characters" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
        </Grid>
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {status === "loading" ? <CircularProgress /> : "Sign In"}
        </Button>
        {error && (
          <Typography variant="body1" color={theme.palette.error.light}>
            {error}
          </Typography>
        )}

        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginForm;
