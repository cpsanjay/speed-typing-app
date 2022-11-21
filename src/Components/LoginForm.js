import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { useAlert } from "../Context/AlertContext";
import errorMapping from "../Utils/errorMessages";
import { useTheme } from "../Context/ThemeContext";

const LoginForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    auth
      .signInWithEmailAndPassword(email, password)
      .then((ok) => {
        setAlert({
          open: true,
          type: "success",
          message: "Logged in",
        });
        handleClose();
      })
      .catch((err) => {
        setAlert({
          open: true,
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
        padding: 10,
        backgroundColor: "transparent",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
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
      <Button
        varient="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: theme.title, color: theme.backgroundColor }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
