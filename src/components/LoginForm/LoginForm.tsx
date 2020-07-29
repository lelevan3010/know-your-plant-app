import React from "react";
import { Link } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { LinearProgress } from "@material-ui/core";

import OAuthLoginButton from "../OAuthLoginButton/OAuthLoginButton";

import GoogleIcon from "../../assets/google.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginForm: {
      display: "flex",
      flexDirection: "column",
    },
    loginInput: {
      marginBottom: 20,
    },
    loginButton: {
      backgroundColor: "#5373FF",
      color: "white",
      textTransform: "none",
      fontWeight: "bold",
      fontSize: 14,
    },
  })
);

function LoginForm({ handleSubmit, errorLoginMsg, loading }: any) {
  const classes = useStyles();
  let redirectURI;
  if (process.env.NODE_ENV === "production") {
    redirectURI = "https://knowyourplant.herokuapp.com";
  } else {
    redirectURI = "http://localhost:3001";
  }
  const googleLink = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile&redirect_uri=${redirectURI}`;

  return (
    <Paper
      elevation={3}
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        maxWidth: 300,
        marginTop: "-100px",
        padding: "0 30px",
        transform: "translateY(50px)",
      }}
    >
      {loading && (
        <LinearProgress
          color="secondary"
          style={{ borderRadius: 6, margin: "0 -30px" }}
        />
      )}
      <h3 style={{ textAlign: "center" }}>Log in to your account</h3>
      <OAuthLoginButton
        name="Google"
        link={googleLink}
        icon={GoogleIcon}
        background="#4286F4"
      />
      <div style={{ borderTop: "1px solid darkgray", margin: "25px 0px" }}>
        <span
          style={{
            backgroundColor: "white",
            transform: "translateY(-15px)",
            position: "absolute",
            left: "50%",
            marginLeft: "-17px",
            padding: "0 5px",
          }}
        >
          or
        </span>
      </div>
      <Formik
        initialValues={{ logUsername: "", logPassword: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className={classes.loginForm}>
            <Field
              component={TextField}
              variant="outlined"
              label="User name"
              name="logUsername"
              type="text"
              required={true}
              className={classes.loginInput}
            />
            <Field
              component={TextField}
              variant="outlined"
              label="Password"
              name="logPassword"
              type="password"
              required={true}
              className={classes.loginInput}
            />
            <Button
              type="submit"
              className={classes.loginButton}
              disabled={isSubmitting}
            >
              Log In
            </Button>
          </Form>
        )}
      </Formik>
      <p style={{ color: "red", textAlign: "center", marginBottom: 0 }}>
        {errorLoginMsg}
      </p>
      <h4 style={{ textAlign: "center" }}>
        New member? <Link to="/signup">Sign Up</Link>
      </h4>
    </Paper>
  );
}

export default LoginForm;
