import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const response = await api.get("/usuario/me");
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          logout();
        } finally {
           setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post("/auth/token", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const { access_token } = response.data;
      localStorage.setItem("authToken", access_token);
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      const userResponse = await api.get("/usuario/me");
      setUser(userResponse.data);
      setToken(access_token);

      setLoading(false);
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
      setLoading(false);
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
    setUser,
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
