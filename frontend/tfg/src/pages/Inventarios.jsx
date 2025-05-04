import React, { useState, useEffect } from "react";
import InventarioItem from "../components/InventarioItem";
import { HiViewGridAdd } from "react-icons/hi";
import { fetchInventariosByUser } from "../services/inventario";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
      <div
        id="sidebar"
        className="fixed bg-primary-color w-1/12 h-5/6 m-4 rounded-lg flex flex-col justify-around items-center"
      >
        <div className="w-7/12 flex flex-col gap-2">
          <Link
            to="/inventarios/create"
            className="bg-gray-200 w-full h-24 mt-6 rounded-md flex justify-center items-center hover:bg-white hover:cursor-pointer hover:shadow-2xl transition duration-300"
          >
            <HiViewGridAdd className="w-12 h-12 text-primary-color" />
          </Link>
          <p className="text-center text-gray-200 text-sm">Nuevo inventario</p>
        </div>
        {loading && <p className="text-white text-xs p-2">Cargando...</p>}
        {error && <p className="text-red-300 text-xs p-2">{error}</p>}

        {!loading && !error && inventarios.length === 0 && user && (
          <p className="text-gray-400 text-xs p-2 text-center">
            No tienes inventarios aún.
          </p>
        )}
        {!loading &&
          !error &&
          inventarios.map((inventario) => (
            <Link
              key={inventario.id}
              to={`/inventarios/${inventario.id}`}
              className="w-full flex justify-center"
            >
              <InventarioItem key={inventario.id} item={inventario} />
            </Link>
          ))}
      </div>
      <div id="fondo" className="w-full flex justify-end">
        <div id="main-content" className="w-10/12 mt-12">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Inventarios;
