import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import image from "../assets/images/anon.jpeg";
import api from "../services/api";
import { HiLogout } from "react-icons/hi";

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

  const handleSave = () => {
    setLoading(true);
    setError("");

    const nuevaDescripcion = descripcion.trim();
    api
      .put(`/usuario/change-descripcion?user_id=${user.id}`, {
        descripcion: nuevaDescripcion,
      })
      .then(() => {
        setUser((prevUser) => ({
          ...prevUser,
          descripcion: nuevaDescripcion,
        }));
        setIsEditing(false);
      })
      .catch((err) => setError(err.response.data.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="h-[calc(100vh_-_96px)] px-48 py-12 box-border gap-24 justify-center flex flex-col">
      <div className="flex w-full h-3/6 gap-10" id="cuenta">
        <img
          src={image}
          alt="Foto de perfil"
          className="rounded-md object-cover w-3/12 h-full"
        />
        <div className="flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            <h1 className="text-primary-color">{user.username}</h1>
            {isEditing ? (
              <div className="flex flex-col sm:flex-row items-start gap-2">
                <textarea
                  className="border rounded p-2 flex-1 resize-none"
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                <button
                  className="bg-primary-color text-white px-4 py-2 rounded hover:bg-secondary-color disabled:opacity-50"
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
                <p className="text-xl">
                  {user.descripcion || <em>(sin descripción)</em>}
                </p>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={handleEdit}
                >
                  Editar
                </button>
              </div>
            )}

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            className="bg-primary-color text-2xl font-montserrat font-semibold text-white px-8 py-4 rounded-md hover:bg-secondary-color"
            onClick={logout}
          >
            {<HiLogout className="inline-block mr-2 w-8 h-8" />}
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="bg-primary-color w-full h-32 rounded-md flex items-center px-12 box-border">
        <div className="text-4xl w-16 h-20 rounded-md flex items-center justify-center font-montserrat font-semibold hover:cursor-pointer bg-gray-300 text-primary-color">
          +
        </div>
      </div>
    </div>
  );
};

export default Cuenta;
