// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Inventarios from "./pages/Inventarios";
import Articulos from "./pages/Articulos";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Header />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/inventarios" element={<Inventarios />} />
              <Route path="/articulos" element={<Articulos />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
