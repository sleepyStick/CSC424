import { Routes, Route, NavLink } from "react-router-dom";
import React from "react";
import { Button, Grid } from '@mui/material';
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import { Home } from "./Home";
import { Register } from "./Register";
import { Landing } from "./Landing";

export const AuthContext = React.createContext(null);

const App = () => {
  return (
      <AuthProvider>

       <Navigation />

      <h1>React Router</h1>

      <Routes>
        <Route index element={<Home />} />
        <Route
          path="landing"
          element={
            <ProtectedRoute>
              <Landing />
            </ProtectedRoute>
          }
        />
        <Route
          path="home"
          element={
              <Home />
          }
        />
        <Route
          path="register"
          element={
              <Register />
          }
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </AuthProvider>
  );
};

const Navigation = () => {
  const { value } = useAuth();
  return (
    <header>
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        bgcolor: "primary.main",
        opacity: '95%',
        paddingRight: '2%',
        paddingLeft: '2%',
      }}
    >
      <Grid
        item
        container
        direction='row'
        xs={8}
        spacing={5}
      >
        <Grid item xs={2}>
          <nav>
            <NavLink to="/landing" activeClassName="active">Landing</NavLink>
          </nav>
        </Grid>
        <Grid item xs={2}>
          <nav>
            <NavLink to="/home" activeClassName="active">Home</NavLink>
          </nav>
        </Grid>
        <Grid item xs={1}>
          <nav>
            <NavLink to="/register" activeClassName="active">Register</NavLink>
          </nav>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        {value.token && (
          <Button
            variant="contained"
            color="secondary"
            onClick={value.onLogout}
            fullWidth
            sx={{
              m: '5%',
            }}
            >
            Sign Out
          </Button>
        )}
      </Grid>
    </Grid>
    </header>
  )
};

export default App;
