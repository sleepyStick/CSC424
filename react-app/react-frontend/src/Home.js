import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { Button, Grid, TextField } from '@mui/material';

export const Home = () => { 
  const { value } = useAuth();
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [attempted, setAttempted] = React.useState(null);


  return (
    <>
      <h2>Home (Public)</h2>
      {(value.token == null && attempted)?
        <p>Either an error occurred or there is an incorrect username or password. Please try again.</p>
        : null
      }
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
          opacity: '90%',
          borderRadius: 2,
          width: '30%',
        }}>
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
              width: '90%',
              mb: '1%'
            }}
            InputProps={{ inputProps: { style: { color: '#000000' }}}}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {value.onLogin(username, password); setAttempted(true)}}
            sx={{
              width: '35%',
              mb: '3%'
            }}
            >
            Sign In
          </Button>
        </Grid>
      </Grid>
      </Grid>
  </>
);
};
