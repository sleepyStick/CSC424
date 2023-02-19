import React from "react";
import { Controller, useForm } from 'react-hook-form';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useAuth } from "./context/AuthProvider";

export const Home = () => { 
  const { value } = useAuth();
  const [failedLogin, setFailedLogin] = React.useState(false);

  const { handleSubmit, control } = useForm();
  const onSubmit = (values) => {
    value.onLogin(values.username, values.password);
    setFailedLogin(true);
  }

  const errorMessages = {
    username: {
      required: "username is Required",
      pattern: ""
    },
    password: {
      required: "password is Required",
    }
  };


  return (
    <>
      <h2>Home (Public)</h2>
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
          { (value.token == null && failedLogin)?
              <Grid item xs={12}>
                <Typography
                  style={{
                    color: 'red'
                  }}
                >
                  Either an error occurred or there is an incorrect username or password. Please try again.
                </Typography>
              </Grid>
              : null
            }
        <Grid item xs={12}>
          <Controller
            control={control}
            name="username"
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="text"
                fullWidth
                label="username"
                error={error !== undefined}
                color="secondary"
                sx={{
                  width: '95%',
                  mb: '1%',
                  mt: '2%'
                }}
                helperText={error ? errorMessages.username[error.type] : ""}
                InputProps={{ inputProps: { style: { color: '#000000' }}}}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="password"
                fullWidth
                label="password"
                error={error !== undefined}
                color="secondary"
                sx={{
                  width: '95%',
                  mb: '1%',
                  mt: '2%'
                }}
                helperText={error ? errorMessages.password[error.type] : ""}
                InputProps={{ inputProps: { style: { color: '#000000' }}}}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{
              width: '35%',
              mb: '3%'
            }}
          >
            {" "}
            Sign In{" "}
          </Button>
        </Grid>
      </Grid>
      </Grid>
  </>
);
};
