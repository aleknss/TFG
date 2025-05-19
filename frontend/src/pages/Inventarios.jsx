import React, { useState, useEffect } from "react";
import InventarioItem from "../components/Inventario/InventarioItem";
import { HiViewGridAdd } from "react-icons/hi";
import { fetchInventariosByUser } from "../services/inventario";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Inventario/Sidebar";

const Inventarios = () => {
  const [inventarios, setInventarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.id) {
      setLoading(true);
      setError(null);

      fetchInventariosByUser(user.id)
        .then((response) => {
          const actualData = response.data;
          setInventarios(Array.isArray(actualData) ? actualData : []);
        })
        .catch((err) => {
          console.error("Error fetching inventarios:", err);
          setError("No se pudieron cargar los inventarios.");
          setInventarios([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setInventarios([]);
      setLoading(false);
      setError("Usuario no identificado para cargar inventarios.");
    }
  }, [user]);

  return (
    <>
      <Sidebar loading={loading} error={error} inventarios={inventarios} user={user} />
      <div id="fondo" className="w-full flex justify-end">
        <div
          id="main-content"
          className="lg:w-10/12 w-full mt-12 flex flex-col justify-center items-center"
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Inventarios;
