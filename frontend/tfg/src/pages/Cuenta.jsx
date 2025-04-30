import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import defaultAvatar from "../assets/images/anon.jpg";
import api from "../services/api";
import { HiLogout, HiPencil, HiCheck, HiX, HiCamera } from "react-icons/hi";

const Cuenta = () => {
  const { user, setUser, logout, isLoading: authLoading } = useAuth();

  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [descLoading, setDescLoading] = useState(false);
  const [descError, setDescError] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef(null);

  const [backendAvatarUrl, setBackendAvatarUrl] = useState(null);
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);

  useEffect(() => {
    if (user) {
      setDescripcion(user.descripcion || "");
      setPreviewUrl(null);
      setSelectedFile(null);
      setAvatarLoadFailed(false);

      if (user.id) {
        const newBackendUrl = `${api.defaults.baseURL || ''}/img/avatar/${user.id}?t=${Date.now()}`;
        console.log("Setting backend avatar URL:", newBackendUrl);
        setBackendAvatarUrl(newBackendUrl);
      } else {
        setBackendAvatarUrl(null); 
      }
    } else {
        setDescripcion("");
        setPreviewUrl(null);
        setSelectedFile(null);
        setBackendAvatarUrl(null);
        setAvatarLoadFailed(false);
    }
  }, [user]); 


// manejar y visualizar descripción
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
      setDescError(err.response?.data?.detail || err.message || "Error al guardar.");
    } finally {
      setDescLoading(false);
    }
  };

// controlar las imágenes
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    // ver si el archivo tiene un formato imagen
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setImageError("");
      // crear un url temporal para la imagen y su previsualización (sacado del vídeo de youtube d previews)
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null); 
      if (file) setImageError("Archivo no válido. Selecciona una imagen.");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setImageError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

// aquí se manda la imagen al backend
const handleImageUpload = async () => {
  if (!selectedFile) return;
  const formData = new FormData();
  formData.append('avatar', selectedFile);

  setImageLoading(true);
  setImageError("");

  try {
    if (!user || !user.id) throw new Error("User ID not available.");
    console.log(`Sending POST to: /img/change-avatar?user_id=${user.id}`);

    await api.post(`/img/change-avatar?user_id=${user.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    setAvatarLoadFailed(false);
    const newBackendUrl = `${api.defaults.baseURL || ''}/img/avatar/${user.id}?t=${Date.now()}`;
    console.log("Forcing avatar reload with URL:", newBackendUrl);
    setBackendAvatarUrl(newBackendUrl);

    // setUser(prevUser => ({ ...prevUser })); // Podría forzar re-render si fuera necesario

  } catch (err) {
    console.error("Error uploading image:", err);
    const errorMessage = err.response?.data?.detail || err.message || "Error al subir la imagen.";
    setImageError(errorMessage);
  } finally {
    setImageLoading(false);
  }
};


const getImageSource = () => {
  if (previewUrl) {
    return previewUrl;
  }
  if (avatarLoadFailed || !backendAvatarUrl) {
    return defaultAvatar;
  }
  return backendAvatarUrl;
};

const imageSource = getImageSource();

  return (
    <div className="h-[calc(100vh_-_96px)] px-4 sm:px-12 md:px-36 lg:px-72 py-12 box-border gap-12 sm:gap-24 justify-start sm:justify-center flex flex-col items-center">
      <div className="flex flex-col sm:flex-row w-full max-w-4xl h-auto sm:h-3/6 gap-6 sm:gap-10" id="cuenta">
        <div className="relative w-full sm:w-4/12 h-64 sm:h-full group flex-shrink-0">
          <img
            src={imageSource}
            alt="Foto de perfil"
            className="rounded-md object-cover w-full h-full border border-gray-300"
          />
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: "none" }} />
          <div
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center rounded-md transition-opacity duration-300 cursor-pointer"
            onClick={handleImageClick}
            title="Cambiar foto de perfil"
          >
            <HiCamera className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          {previewUrl && (
            <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-2 p-1 bg-black bg-opacity-30 rounded">
              <button
                className="bg-primary-color text-white px-3 py-1 rounded hover:bg-secondary-color disabled:opacity-50 text-sm flex items-center gap-1"
                onClick={handleImageUpload}
                disabled={imageLoading}
              >
                <HiCheck /> {imageLoading ? "Subiendo..." : "Guardar"}
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 text-sm flex items-center gap-1"
                onClick={handleCancelUpload}
                disabled={imageLoading}
              >
                <HiX /> Cancelar
              </button>
            </div>
          )}
           {imageError && <p className="text-red-100 text-xs mt-1 absolute bottom-[-25px] w-full text-center bg-red-700 bg-opacity-80 p-1 rounded">{imageError}</p>}
        </div>

        <div className="flex flex-col justify-between gap-6 w-full sm:w-8/12">
           <div className="flex flex-col gap-4">
            <h1 className="text-primary-color text-3xl sm:text-4xl font-bold break-words">
                {user.username}
            </h1>
            {isEditingDesc ? (
              <div className="flex flex-col gap-2">
                <textarea className="border rounded p-2 w-full text-base resize-none" rows={4} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Escribe algo sobre ti..."/>
                 {descError && <p className="text-red-500 text-sm">{descError}</p>}
                <div className="flex gap-2">
                    <button className="bg-primary-color text-white px-4 py-2 rounded hover:bg-secondary-color disabled:opacity-50 transition-colors duration-300 ease-in-out flex items-center gap-1" onClick={handleSaveDesc} disabled={descLoading}> <HiCheck /> {descLoading ? "Guardando..." : "Guardar"} </button>
                    <button className="text-gray-600 px-4 py-2 rounded hover:underline disabled:opacity-50 flex items-center gap-1" onClick={handleCancelDesc} disabled={descLoading}> <HiX /> Cancelar </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 flex-wrap">
                <p className="text-lg text-gray-700 text-wrap flex-1 min-w-0 break-words"> {user.descripcion || <i className="text-gray-500">Sin descripción.</i>} </p>
                <button className="text-blue-600 hover:underline text-sm flex items-center gap-1 flex-shrink-0" onClick={handleEditDesc}> <HiPencil /> Editar </button>
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