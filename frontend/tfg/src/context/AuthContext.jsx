// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("usuarioId");
    if (token && id) {
      setIsAuthenticated(true);
      setUsuarioId(id);
    }
  }, []);

  const login = (token, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuarioId", id);
    setIsAuthenticated(true);
    setUsuarioId(id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
    setIsAuthenticated(false);
    setUsuarioId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, usuarioId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
