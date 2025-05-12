import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const UsuarioContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api
        .get("/usuario/me")
        .then((response) => setUser(response.data))
        .catch(logout);
      setUser({ token });
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post("/auth/token", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const { access_token } = response.data;
      localStorage.setItem("authToken", access_token);
      setToken(access_token);
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      const userResponse = await api.get("/usuario/me");
      setUser(userResponse.data);
      setUser({ token: access_token });
      navigate("/cuenta");
      return true;
    } catch (error) {
      console.error(
        "Error en el login:",
        error.response?.data || error.message
      );
      localStorage.removeItem("authToken");
      setToken(null);
      setUser(null);
      delete api.defaults.headers.common["Authorization"];
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const authContextValue = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    isLoading: loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children} {}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
