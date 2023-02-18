import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeAuth } from "../utils/FakeAuth";
import { register } from "../utils/Register";
import { useCookies } from "react-cookie";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();

  // const [token, setToken] = useState(
  //   document.cookie
  //   .split('; ')
  //   .find((row) => row.startsWith('token='))
  //   ?.split('=')[1]);

  const handleRegister = async (username, password, validatePassword) => {
    if (password === validatePassword) {
      const success = await register(username, password);
      console.log("in handleRegister: " + success);
      if (success) {
        setCookie("token", success.token);
        navigate("/landing");
      }
    }
  };

  const handleLogin = async (username, password) => {
    const token = await fakeAuth(username, password);
    console.log(token);
    setCookie("token", token);
    navigate("/landing");
  };

  const handleLogout = () => {
    removeCookie("token");
  };

  const value = {
    token: cookie['token'],
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
