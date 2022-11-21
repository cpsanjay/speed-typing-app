import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";

const LoginForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Enter All Details");
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((ok) => {
        alert("login successfull");
        handleClose();
      })
      .catch((err) => {
        alert("did not login");
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
        value={email}
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>
      <Button
        varient="contained"
        size="large"
        style={{ backgroundColor: "red" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
