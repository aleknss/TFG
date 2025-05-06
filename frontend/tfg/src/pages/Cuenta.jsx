import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { HiLogout, HiPencil, HiCheck, HiX, HiCamera } from "react-icons/hi";
import Avatar from "../components/Avatar"; 

const Cuenta = () => {
  const { user, setUser, logout, isLoading: authLoading } = useAuth();

  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [descLoading, setDescLoading] = useState(false);
  const [descError, setDescError] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef(null);
  const [avatarCacheKey, setAvatarCacheKey] = useState(Date.now());

  useEffect(() => {
    if (user) {
      setDescripcion(user.descripcion || "");
      setSelectedFile(null);
      setImagePreviewUrl(null);
      setImageError("");
      setAvatarCacheKey(Date.now()); 
      if (fileInputRef.current) {
         fileInputRef.current.value = "";
      }
    } else {
      setDescripcion("");
      setIsEditingDesc(false);
      setSelectedFile(null);
      setImagePreviewUrl(null);
      setImageError("");
    }
  }, [user]); 

  const handleEditDesc = () => {
    setDescripcion(user?.descripcion || "");
    setDescError("");
    setIsEditingDesc(true);
  };

  const handleCancelDesc = () => {
    setIsEditingDesc(false);
    setDescError("");
    setDescripcion(user?.descripcion || "");
  };

  const handleSaveDesc = async () => {
    setDescLoading(true);
    setDescError("");
    const nuevaDescripcion = descripcion.trim();
    try {
      if (!user || !user.id) throw new Error("User ID not available.");
      await api.put(`/usuario/change-descripcion?user_id=${user.id}`, {
        descripcion: nuevaDescripcion,
      });
      setUser((prevUser) => ({ ...prevUser, descripcion: nuevaDescripcion }));
      setIsEditingDesc(false);
    } catch (err) {
      console.error("Error saving description:", err);
      setDescError(
        err.response?.data?.detail || err.message || "Error al guardar."
      );
    } finally {
      setDescLoading(false);
    }
  };

  const handleImageClick = () => {
     if (!imageLoading) {
        fileInputRef.current?.click();
     }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setImageError("");
    } else {
      setSelectedFile(null);
      setImagePreviewUrl(null); 
      if (file) {
        setImageError("Archivo no válido. Selecciona una imagen.");
      } else {
        setImageError("");
      }
       if (fileInputRef.current) {
           fileInputRef.current.value = "";
       }
    }
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setImagePreviewUrl(null);
    setImageError("");
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile || !user || !user.id) return;

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    setImageLoading(true);
    setImageError("");

    try {
      await api.post(`/img/change-avatar?user_id=${user.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSelectedFile(null);
      setImagePreviewUrl(null);
      const newCacheKey = Date.now();
      setAvatarCacheKey(newCacheKey);

      if (fileInputRef.current) {
          fileInputRef.current.value = "";
      }

    } catch (err) {
      console.error("Error uploading avatar:", err);
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "Error al subir la imagen.";
      setImageError(errorMessage);
    } finally {
      setImageLoading(false);
    }
  };

  if (authLoading || !user) {
      return <div>Cargando datos de usuario...</div>;
  }

  return (
    <div className="h-[calc(100vh_-_96px)] px-4 sm:px-12 md:px-36 lg:px-72 py-12 box-border gap-12 sm:gap-24 justify-start sm:justify-center flex flex-col items-center">
      <div
        className="flex flex-col sm:flex-row w-full max-w-4xl h-auto sm:h-auto gap-6 sm:gap-10"
        id="cuenta"
      >
        <div className="relative w-full sm:w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 flex-shrink-0 group">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
            disabled={imageLoading} 
          />

           <div className="w-full h-full rounded-md overflow-hidden border border-gray-300">
             {imagePreviewUrl ? (
                 <img
                     src={imagePreviewUrl}
                     alt="Previsualización de avatar"
                     className="object-cover w-full h-full"
                 />
             ) : (
                 <Avatar userId={user.id} key={avatarCacheKey} className="w-full h-full" />
             )}
           </div>


          <div
            className={`absolute inset-0 bg-black flex items-center justify-center rounded-md transition-opacity duration-300 ${
                imageLoading
                    ? 'bg-opacity-50 cursor-default'
                    : 'bg-opacity-0 group-hover:bg-opacity-40 cursor-pointer opacity-0 group-hover:opacity-100' 
            }`}
            onClick={handleImageClick}
            title="Cambiar foto de perfil"
          >
             {!imageLoading && <HiCamera className="text-white text-4xl" />}
             {imageLoading && <div className="text-white text-sm">Cargando...</div>}
          </div>

          {selectedFile && !imageLoading && ( 
            <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-2 p-1 bg-black bg-opacity-50 rounded">
              <button
                className="bg-primary-color text-white px-3 py-1 rounded hover:bg-secondary-color disabled:opacity-50 text-sm flex items-center gap-1"
                onClick={handleImageUpload}
                disabled={imageLoading}
              >
                <HiCheck /> Guardar
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50 text-sm flex items-center gap-1"
                onClick={handleCancelUpload}
                disabled={imageLoading}
              >
                <HiX /> Cancelar
              </button>
            </div>
          )}

           {selectedFile && imageLoading && (
                <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-2 p-1 bg-black bg-opacity-50 rounded">
                     <button
                        className="bg-primary-color text-white px-3 py-1 rounded disabled:opacity-70 text-sm flex items-center gap-1"
                        disabled={true}
                    >
                        <HiCheck /> Subiendo...
                    </button>
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-70 text-sm flex items-center gap-1"
                        disabled={true}
                    >
                        <HiX /> Cancelar
                    </button>
                </div>
           )}


          {imageError && (
            <div className="absolute top-2 left-2 right-2 text-center text-red-600 bg-white bg-opacity-80 p-1 rounded text-xs font-medium z-10">
              {imageError}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-6 w-full sm:w-auto flex-grow"> 
          <div className="flex flex-col gap-4">
            <h1 className="text-primary-color text-3xl sm:text-4xl font-bold break-words">
              {user.username} 
            </h1>
            {isEditingDesc ? (
              <div className="flex flex-col gap-2">
                <textarea
                  className="border rounded p-2 w-full text-base resize-none focus:ring-2 focus:ring-primary-color focus:border-transparent outline-none"
                  rows={4}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Escribe algo sobre ti..."
                />
                {descError && (
                  <p className="text-red-500 text-sm">{descError}</p>
                )}
                <div className="flex gap-2">
                  <button
                    className="bg-primary-color text-white px-4 py-2 rounded hover:bg-secondary-color disabled:opacity-50 transition-colors duration-300 ease-in-out flex items-center gap-1"
                    onClick={handleSaveDesc}
                    disabled={descLoading}
                  >
                    <HiCheck /> {descLoading ? "Guardando..." : "Guardar"}
                  </button>
                  <button
                    className="text-gray-600 px-4 py-2 rounded hover:underline disabled:opacity-50 flex items-center gap-1"
                    onClick={handleCancelDesc}
                    disabled={descLoading}
                  >
                    <HiX /> Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 flex-wrap">
                <p className="text-lg text-gray-700 text-wrap flex-1 min-w-0 break-words">
                  {user.descripcion || (
                    <i className="text-gray-500">Sin descripción.</i>
                  )}
                </p>
                <button
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1 flex-shrink-0"
                  onClick={handleEditDesc}
                >
                  <HiPencil /> Editar
                </button>
              </div>
            )}
          </div>
          <button
            className="bg-red-600 text-lg font-montserrat font-semibold w-fit text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors duration-300 ease-in-out flex items-center gap-2 self-start sm:self-auto mt-4 sm:mt-0"
            onClick={logout}
          >
            <HiLogout className="w-6 h-6" /> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cuenta;