import { useEffect, useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Box, Button, TextField, Typography } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { isEmptyObject } from "../../utils";

import { jwtDecode } from "jwt-decode";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";

function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signIn = useSignIn();

  const onSubmit = (data) => {
    setLoading(true);

    if (data.password !== data.confirmpassword) {
      setError("password", { message: "Passwords must be the same" });
      setError("confirmpassword", { message: "Passwords must be the same" });
      setLoading(false);
      return;
    }

    axios
      .post("http://127.0.0.1:8000/users/register/", {
        email: data.email,
        password: data.password,
      })
      .then((registerResponse) => {
        axios
          .post("http://127.0.0.1:8000/api/token/", {
            username: data.email,
            password: data.password,
          })
          .then((loginResponse) => {
            const token = loginResponse.data.access;
            signIn({
              auth: {
                token,
                type: "Bearer",
              },
              userState: {
                id: registerResponse.data.id,
                username: data.email,
                email: data.email,
              },
            });

            navigate("/home");
          });
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(false);
  };

  const handleGoogleSignup = (response) => {
    setLoading(true);
    const token = response.credential;
    const userObject = jwtDecode(token);

    axios
      .post("http://127.0.0.1:8000/users/register/", {
        email: userObject.email,
        //KIDS DON'T DO THIS AT HOME XDDD
        password: userObject.sub,
      })
      .then((registerResponse) => {
        console.log(registerResponse);
        axios
          .post("http://127.0.0.1:8000/api/token/", {
            username: userObject.email,
            password: userObject.sub,
          })
          .then((loginResponse) => {
            const token = loginResponse.data.access;

            signIn({
              auth: {
                token,
                type: "Bearer",
              },
              userState: {
                id: registerResponse.data.id,
                username: userObject.email,
                email: userObject.email,
              },
            });

            navigate("/home");
          });
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(false);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "972496767034-fsd19qka5a961fmvr4vrr7si41nkaofs.apps.googleusercontent.com",
      callback: handleGoogleSignup,
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
                Sign Up
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

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm password"
                      variant="outlined"
                      type={"password"}
                      {...register("confirmpassword", {
                        required: "Please confirm your password",
                      })}
                      error={!!errors?.confirmpassword}
                      helperText={errors?.confirmpassword?.message}
                      InputLabelProps={{ className: "textfield__label" }}
                    />
                  </Grid>
                  <Button
                    endIcon={!loading && <HowToRegIcon />}
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
                  >
                    CREATE AN ACCOUNT
                  </Button>
                  <Link to="/signin" className="link">
                    Already have an account?
                    <span className="text-highlight__secondary"> Log In</span>
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

export default SignUp;
