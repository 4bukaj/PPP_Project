import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useForm } from "react-hook-form";
//MUI IMPORTS
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Box, Button, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { isEmptyObject } from "../../utils";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { jwtDecode } from "jwt-decode";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "kuba@dev.com",
      password: "admin1",
    },
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signIn = useSignIn();

  const onSubmit = (data) => {
    setLoading(true);

    const formData = {
      username: data.email,
      password: data.password,
    };

    axios
      .all([
        axios.post("http://127.0.0.1:8000/users/get/", formData),
        axios.post("http://127.0.0.1:8000/api/token/", formData),
      ])
      .then(
        axios.spread((userData, session) => {
          signIn({
            auth: {
              token: session.data.access,
              type: "Bearer",
            },
            userState: {
              id: userData.data.id,
              username: userData.data.username,
              email: userData.data.email,
            },
          });

          navigate("/home");
        })
      );

    setLoading(false);
  };

  const handleGoogleSignin = (response) => {
    setLoading(true);
    const token = response.credential;
    const userObject = jwtDecode(token);

    const formData = {
      username: userObject.email,
      //KIDS DON'T DO THIS AT HOME XDDD
      password: userObject.sub,
    };

    axios
      .all([
        axios.post("http://127.0.0.1:8000/users/get/", formData),
        axios.post("http://127.0.0.1:8000/api/token/", formData),
      ])
      .then(
        axios.spread((userData, session) => {
          signIn({
            auth: {
              token: session.data.access,
              type: "Bearer",
            },
            userState: {
              id: userData.data.id,
              username: userData.data.username,
              email: userData.data.email,
            },
          });

          navigate("/home");
        })
      );

    setLoading(false);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "972496767034-fsd19qka5a961fmvr4vrr7si41nkaofs.apps.googleusercontent.com",
      callback: handleGoogleSignin,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        width: "100vw",
        margin: 0,
      }}
    >
      <CssBaseline />
      <Grid item xs={12} md={5} component={Paper} elevation={24} square>
        <div className="card-container">
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3, ease: "linear" }}
          >
            <Box className="auth-form__card">
              <Avatar sx={{ m: 1, bgcolor: "light.main", color: "dark.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h4"
                sx={{ color: "light.main" }}
              >
                Log In
              </Typography>
              <div id="signInDiv"></div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="auth-form__container"
              >
                <Grid container rowSpacing={4} mt={2} direction={"column"}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      {...register("email", {
                        required: "Email is required",
                      })}
                      error={!!errors?.email}
                      helperText={errors?.email?.message}
                      InputLabelProps={{ className: "textfield__label" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      type={"password"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      error={!!errors?.password}
                      helperText={errors?.password?.message}
                      InputLabelProps={{ className: "textfield__label" }}
                    />
                  </Grid>
                  <Button
                    endIcon={<LoginIcon />}
                    type="submit"
                    sx={{
                      marginTop: 3,
                      marginBottom: 3,
                      color: "light.main",
                      padding: "10px",
                    }}
                    variant="contained"
                    color="secondary"
                    disabled={loading || !isEmptyObject(errors)}
                    className="submit-btn"
                  >
                    LOG IN
                  </Button>
                  {/* <Link to="/reset-password" className="link">
                    Forgot your password?{" "}
                    <span className="text-highlight__secondary">Reset</span>
                  </Link> */}
                  <Link to="/signup" className="link">
                    Need an account?{" "}
                    <span className="text-highlight__secondary">Sign Up</span>
                  </Link>
                </Grid>
              </form>
            </Box>
          </motion.div>
        </div>
      </Grid>
      <Grid
        item
        md={7}
        sx={{
          backgroundImage: "url(/img/auth_screen_bg.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
