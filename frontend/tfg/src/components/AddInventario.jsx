import React from "react";
import { createInventario } from "../services/inventario";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddInventario = () => {
  const { user } = useAuth();
  const [nombre, setNombre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!nombre.trim()) {
      setError("El nombre del inventario no puede estar vacío.");
      return;
    }

    setIsLoading(true);
    
    const user_id = user.id;
    const creado_en = new Date().toISOString();

    const dataToSend = {
      nombre: nombre.trim(),
      creado_en: creado_en,
      usuario_id: user_id,
    };

    try {
      const response = await createInventario(dataToSend);
      setNombre("");
      navigate("/inventarios");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Ocurrió un error inesperado.";
      setError(`Error al crear: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Crear Nuevo Inventario
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="inventoryName"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del Inventario:
          </label>
          <input
            type="text"
            id="inventoryName"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} // Actualiza el estado 'nombre'
            placeholder="Ej: Material Oficina"
            required // Hace el campo obligatorio en HTML5
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled={isLoading} // Deshabilita mientras carga
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p> // Muestra mensajes de error
        )}

        <button
          type="submit"
          disabled={isLoading} // Deshabilita el botón mientras carga
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50`}
        >
          {isLoading ? "Creando..." : "Crear Inventario"}
        </button>
      </form>
    </>
  );
};

export default AddInventario;
