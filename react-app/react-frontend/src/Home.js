import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { Grid, TextField } from '@mui/material';

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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            type="text"
            name="username"
            label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              width: '41%',
              mb: '2%'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            name="password"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: '41%',
              mb: '2%'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <button type="button" onClick={() => {value.onLogin(username, password); setAttempted(true)}}>
            Sign In
          </button>
        </Grid>
      </Grid>
  </>
);
};
