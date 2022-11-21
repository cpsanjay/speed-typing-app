import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import errorMapping from "./../Utils/errorMessages";
import { useAlert } from "../Context/AlertContext";
import { useTheme } from "../Context/ThemeContext";

const SignupForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert } = useAlert();
  const { theme } = useTheme();

  const handleSubmit = () => {
    if (!email || !password) {
      setAlert({
        open: true,
        type: "warning",
        message: "Please enter all details",
      });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({
        open: true,
        type: "warning",
        message: "Password Mismatch",
      });
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((ok) => {
        setAlert({
          open: true,
          type: "success",
          message: "Signed Up",
        });
        handleClose();
      })
      .catch((err) => {
        // alert(errorMapping[err.code] || "Some error occured");
        setAlert({
          open: "true",
          type: "error",
          message: errorMapping[err.code] || "Some error occured",
        });
      });
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        gap: "20px",
        backgroundColor: "transparent",
        padding: 10,
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.title,
          },
        }}
        InputProps={{
          style: {
            color: theme.title,
          },
        }}
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.title,
          },
        }}
        InputProps={{
          style: {
            color: theme.title,
          },
        }}
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.title,
          },
        }}
        InputProps={{
          style: {
            color: theme.title,
          },
        }}
      ></TextField>
      <Button
        varient="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: theme.title, color: theme.backgroundColor }}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupForm;
