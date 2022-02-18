import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";

import { adminLogin } from "../utils/ApiService";

import { isValidString, isValidPassword } from "../utils/validator";
import Nav from "../components/Nav";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Sanpada1215
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [agree, setAgree] = useState({
    checked: false,
  });
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    // if user is already logged in then redirect it to the dashboard
    let alreadyLogIn = localStorage.getItem("isLoggedIn");
    //console.log(alreadyLogIn);
    if (alreadyLogIn) {
      setRedirect(true);
    }
  }, []);

  const validatePassword = () => {
    // //console.log("lol", loginData.password);
    if (!isValidPassword(loginData.password)) {
      setError(true);
      setErrorMessage("Please Enter Valid Password");
      return;
    }
    setErrorMessage("");
    setError(false);
  };
  const validateUserName = () => {
    // //console.log("lol", loginData.password);
    if (!isValidString(loginData.name)) {
      setError(true);
      setErrorMessage("Please Enter Username");
      return;
    }
    setErrorMessage("");
    setError(false);
  };
  let handleInput = (e) => {
    const { id, value } = e.target;

    setLoginData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const submit = async (e) => {
    e.preventDefault();

    let { name, password } = loginData;
    if (!isValidString(name)) {
      setError(true);
      setErrorMessage("Please Enter Valid Name");
      return;
    }

    if (!isValidString(password)) {
      setError(true);
      setErrorMessage("Please Enter Password");
      return;
    }
    // if (!isValidPassword(password)) {
    //   console.log(password);
    //   setError(true);
    //   setErrorMessage("Please Enter Valid Password");
    //   return;
    // }

    try {
      setError(false);
      setErrorMessage("");
      let loginResult = await adminLogin(loginData);
      console.log(loginResult.networkError);
      if (loginResult && loginResult.networkError) {
        setError(true);
        setErrorMessage("Server Down try after some time");
        return;
      }
      if (loginResult && loginResult.status !== 200) {
        setError(true);
        setErrorMessage("Server Error! Please try again later ");
        return;
      }
      if (loginResult && loginResult.data.success === 1) {
        setLoginData({
          name: "",
          password: "",
        });

        setError(false);
        setErrorMessage("");
        setIsLogin(true);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userName", loginData.name);
        localStorage.setItem("token", loginResult.data.token);
        localStorage.setItem("adminName", loginData.name);
        setTimeout(() => {
          setRedirect(true);
        }, 1000);
        return;
      }
      setError(true);
      setErrorMessage("Username / Password is incorrect ");
    } catch (err) {
      console.log("errorrror:", err);
      setError(true);
      setErrorMessage("error");
    }
  };

  return (
    <>
      <Nav></Nav>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {redirect === true ? (
          <Redirect to="search" />
        ) : (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error === true ? (
              <Alert severity="error">{errorMessage}</Alert>
            ) : (
              <div></div>
            )}
            {isLogin === true ? (
              <Alert severity="success">
                Login Successful! Redirecting In 1 Sec.....
              </Alert>
            ) : (
              <div></div>
            )}
            <form className={classes.form} noValidate onSubmit={submit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Username"
                name="username"
                autoComplete="name"
                value={loginData.name}
                autoFocus
                onChange={handleInput}
                onBlur={validateUserName}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={loginData.password}
                autoComplete="current-password"
                onChange={handleInput}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        )}
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
