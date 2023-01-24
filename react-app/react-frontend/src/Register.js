import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { Button, Grid, TextField, Typography } from '@mui/material';

export const Register = () => {
  const { value } = useAuth();
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [validatePassword, setValidatePassword] = React.useState(null);
  const [error, setError] = React.useState(null);


  return (
    <>
      <h2>Register (Public)</h2>
      <Grid
        container
        spacing={1}
        align = "center"
        justifyContent = "center">
      <Grid
        container
        spacing={1}
        sx={{
          bgcolor: "primary.main",
          opacity: '95%',
          borderRadius: 2,
          width: '30%',
        }}>
        { (value.token == null && error)?
          <Grid item xs={12}>
            <Typography
              style={{
                color: 'red'
              }}
            >
              Either an error occurred or your password is insecure. Please try again.
            </Typography>
          </Grid>
          : null
        }
        <Grid item xs={12}>
          <TextField
            type="text"
            name="username"
            label="username"
            color="secondary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              width: '95%',
              mb: '1%',
              mt: '2%'
            }}
            InputProps={{ inputProps: { style: { color: '#000000' }}}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            name="password"
            label="password"
            color="secondary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: '95%',
              mb: '1%'
            }}
            InputProps={{ inputProps: { style: { color: '#000000' }}}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            name="validatePassword"
            label="validate password"
            color="secondary"
            value={validatePassword}
            onChange={(e) => setValidatePassword(e.target.value)}
            sx={{
              width: '95%',
              mb: '1%'
            }}
            InputProps={{ inputProps: { style: { color: '#000000' }}}}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {value.onRegister(username, password, validatePassword); setError(true)}}
            sx={{
              width: '35%',
              mb: '3%'
            }}
            >
            Register
          </Button>
        </Grid>
      </Grid>
      </Grid>
  </>
);
};
