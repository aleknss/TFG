import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Inventarios from "./pages/Inventarios";
import Articulos from "./pages/Articulos";
import Cuenta from "./pages/Cuenta";
import AddInventario from "./components/Inventario/AddInventario";
import InventarioView from "./components/Inventario/InventarioView";
import InventarioDefault from "./components/Inventario/InventarioDefault";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import MasInformacion from "./pages/MasInformacion";
import Contacto from "./pages/Contacto";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Header />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/info" element={<MasInformacion />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/inventarios" element={<Inventarios />}>
                  <Route index element={<InventarioDefault />} />
                  <Route path="create" element={<AddInventario />} />
                  <Route path=":id" element={<InventarioView />} />
                </Route>
                <Route path="/articulos" element={<Articulos />} />
                <Route path="/cuenta" element={<Cuenta />} />
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
