import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import errorMapping from "./../Utils/errorMessages";
import { useAlert } from "../Context/AlertContext";
import { useTheme } from "../Context/ThemeContext";

const SignupForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert } = useAlert();
  const { theme } = useTheme();

  const checkUserAvailability = async () => {
    const ref = db.collection("username").doc(`${username}`);
    const response = await ref.get();
    return !response.exists;
  };

  const handleSubmit = async () => {
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

    if (await checkUserAvailability()) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (res) => {
          const ref = await db
            .collection("username")
            .doc(`${username}`)
            .set({
              uid: res.user.uid,
            })
            .then((response) => {
              setAlert({
                open: true,
                type: "success",
                message: "Signed Up",
              });
              handleClose();
            });
        })
        .catch((err) => {
          setAlert({
            open: true,
            type: "error",
            message: errorMapping[err.code] || "Some error occured",
          });
        });
    } else {
      setAlert({
        open: true,
        type: "warning",
        message: "username already taken",
      });
    }
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
        type="username"
        label="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
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
