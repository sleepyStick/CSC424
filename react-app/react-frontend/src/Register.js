import React from "react";
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from "./context/AuthProvider";
import { Button, Grid, TextField, Typography } from '@mui/material';

export const Register = () => {
  const { value } = useAuth();
  const [failedRegister, setFailedRegister] = React.useState(false);

  const { handleSubmit, control, getValues } = useForm();
  const onSubmit = (values) => {
    value.onRegister(values.username, values.password, values.validatePassword);
    setFailedRegister(true); 
  }

  const errorMessages = {
    username: {
      required: "username is required",
    },
    password: {
      required: "password is required",
      validate: "the two passwords don't match",
      pattern: "please create a stronger password"
    }
  };

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
        { (value.token == null && failedRegister)?
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
              validate: () => getValues("password") === getValues("validatePassword"),
              // password rules:
              // - be at least 8 characters
              // - contain at least one upper case letter
              // - contain at least one lower case letter
              // - contain at least one decimal digit
              pattern: /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$/
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
          <Controller
            control={control}
            name="validatePassword"
            defaultValue=""
            rules={{
              required: true,
              validate: () => getValues("password") === getValues("validatePassword"),
              pattern: /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$/
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="password"
                fullWidth
                label="validate password"
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
            Register{" "}
          </Button>
        </Grid>
      </Grid>
      </Grid>
  </>
);
};
