import { Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import { Home } from "./Home";
import { Register } from "./Register";
import { Landing } from "./Landing";
import background from "./img/mountains.jpeg";

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
    <nav>
      <Link to="/landing">Landing</Link>
      <Link to="/home">Home</Link>
      <Link to="/register">Register</Link>
      {value.token && (
        <button type="button" onClick={value.onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  )
};

export default App;
