import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import image from "../assets/images/anon.png";

const Cuenta = () => {
  const { user, setUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [descripcion, setDescripcion] = useState(user.descripcion || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = () => {
    setDescripcion(user.descripcion || "");
    setError("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error(
          "Usuario no autenticado. Por favor, inicia sesión de nuevo."
        );
      }

      const apiUrl = "http://localhost:8000/usuario/change-desc";

      const datosParaEnviar = {
        descripcion: descripcion,
        user_id: user.id,
      };

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosParaEnviar),
      });

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (parseError) {
          console.error("Could not parse error response:", parseError);
        }
        throw new Error(errorMessage);
      }

      const updatedUserData = await response.json();

      setUser(updatedUserData);

      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update description:", err);
      setError(
        err.message || "No se pudo guardar la descripción. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-4">Cargando datos de usuario...</div>
    );
  }

  return (
    <div className="min-h-screen-[46px]">
      <div className="flex">
        <div className="border-black border-solid">
          <img src={image} alt="Foto de perfil" width={500} />
        </div>
        <div className="flex flex-col gap-6">
          <h1>{user.username}</h1>

          {isEditing ? (
            <div className="flex flex-col sm:flex-row items-start gap-2">
              <textarea
                className="border rounded p-2 flex-1 resize-none"
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
              <button
                className="text-gray-600 px-4 py-2 rounded hover:underline disabled:opacity-50"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <p>{user.descripcion || <em>(sin descripción)</em>}</p>
              <button
                className="text-blue-600 hover:underline"
                onClick={handleEdit}
              >
                Editar
              </button>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            className="bg-primary-color text-xl font-montserrat font-semibold text-white px-6 py-2 rounded-md hover:bg-white hover:text-primary-color hover:border-primary-color border-2 border-primary-color transition duration-300 ease-in-out"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="bg-primary-color w-4/5 m-auto h-32 rounded-md flex items-center px-12 box-border">
        <div className="text-4xl w-16 h-20 rounded-md flex items-center justify-center font-montserrat font-semibold hover:cursor-pointer bg-gray-300 text-primary-color">
          +
        </div>
      </div>
    </div>
  );
};

export default Cuenta;
