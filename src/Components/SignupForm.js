import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";

const SignupForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Enter All Details");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password Mismatch");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((ok) => {
        alert("user is created");
        handleClose();
      })
      .catch((err) => {
        alert("not created");
        console.log(err);
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
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      ></TextField>
      <Button
        varient="contained"
        size="large"
        style={{ backgroundColor: "red" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupForm;
