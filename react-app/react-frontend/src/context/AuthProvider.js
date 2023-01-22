import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeAuth } from "../utils/FakeAuth";
import { register } from "../utils/Register"
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  const handleRegister = async (username, password, validatePassword) => {
    if (password === validatePassword) {
      const success = await register(username, password);
      if (success) {
        navigate("/home");
      }
    }
  };

  const handleLogin = async (username, password) => {
    const token = await fakeAuth(username, password);
    setToken(token);
    navigate("/landing");
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
  };

  return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);
